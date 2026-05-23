"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { PenLine, Eraser, Trash2, Minus, Plus, Download, Undo, Square, Type, ArrowRight, Check, X, MousePointer2, Grid3x3, List, GitBranch } from "lucide-react";

type Tool = "select" | "pen" | "rectangle" | "arrow" | "text" | "eraser";

interface Point {
  x: number;
  y: number;
}

interface Element {
  id: string;
  type: "freehand" | "rectangle" | "arrow" | "text";
  points?: Point[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  start?: Point;
  end?: Point;
  text?: string;
  color: string;
  lineWidth: number;
}

const COLORS = [
  "#ffffff", "#a1a1aa", "#f87171", "#fbbf24", "#34d399", "#60a5fa", "#c084fc", "#f472b6",
];

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

function getBoundingBox(el: Element): { x: number; y: number; w: number; h: number } | null {
  switch (el.type) {
    case "freehand":
      if (!el.points || el.points.length === 0) return null;
      const xs = el.points.map((p) => p.x);
      const ys = el.points.map((p) => p.y);
      return {
        x: Math.min(...xs) - el.lineWidth,
        y: Math.min(...ys) - el.lineWidth,
        w: Math.max(...xs) - Math.min(...xs) + el.lineWidth * 2,
        h: Math.max(...ys) - Math.min(...ys) + el.lineWidth * 2,
      };
    case "rectangle":
      if (el.x === undefined || el.y === undefined || el.width === undefined || el.height === undefined) return null;
      return { x: el.x, y: el.y, w: el.width, h: el.height };
    case "arrow":
      if (!el.start || !el.end) return null;
      return {
        x: Math.min(el.start.x, el.end.x) - el.lineWidth,
        y: Math.min(el.start.y, el.end.y) - el.lineWidth,
        w: Math.abs(el.end.x - el.start.x) + el.lineWidth * 2,
        h: Math.abs(el.end.y - el.start.y) + el.lineWidth * 2,
      };
    case "text":
      if (el.text === undefined || el.x === undefined || el.y === undefined) return null;
      const lines = el.text.split("\n");
      const fontSize = Math.max(14, el.lineWidth * 5);
      const maxLineWidth = Math.max(...lines.map((line) => line.length)) * fontSize * 0.6;
      return { x: el.x, y: el.y, w: maxLineWidth, h: lines.length * fontSize * 1.4 };
  }
}

function pointInBox(p: Point, box: { x: number; y: number; w: number; h: number }): boolean {
  return p.x >= box.x && p.x <= box.x + box.w && p.y >= box.y && p.y <= box.y + box.h;
}

function boxesOverlap(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export default function PaperPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [elements, setElements] = useState<Element[]>([]);
  const [history, setHistory] = useState<Element[][]>([]);
  const [tool, setTool] = useState<Tool>("select");
  const [color, setColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(2);

  // Selection & move
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const isMovingRef = useRef(false);
  const moveOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const lastMousePosRef = useRef<Point>({ x: 0, y: 0 });

  // Dot grid
  const [showDotGrid, setShowDotGrid] = useState(false);

  // Drawing state
  const isDrawingRef = useRef(false);
  const startPosRef = useRef<Point>({ x: 0, y: 0 });
  const currentPosRef = useRef<Point>({ x: 0, y: 0 });
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [isShapeDragging, setIsShapeDragging] = useState(false);

  // Text editing
  const [textEdit, setTextEdit] = useState<{ x: number; y: number; value: string } | null>(null);

  // Persist to localStorage — load on mount, save after every change
  const loadedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("neuro-os-paper");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.elements) setElements(parsed.elements);
        if (parsed.history) setHistory(parsed.history);
        if (parsed.showDotGrid !== undefined) setShowDotGrid(parsed.showDotGrid);
      }
    } catch {
      // ignore corrupt storage
    }
    loadedRef.current = true;
    return () => { loadedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    // Safety: don't save empty state over existing drawings
    if (elements.length === 0 && history.length === 0) return;
    try {
      localStorage.setItem("neuro-os-paper", JSON.stringify({ elements, history, showDotGrid }));
    } catch {
      // ignore quota exceeded
    }
  }, [elements, history, showDotGrid]);

  const getPoint = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const drawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dot grid background
    if (showDotGrid) {
      ctx.fillStyle = "#262626";
      const spacing = 20;
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    elements.forEach((el) => {
      ctx.strokeStyle = el.color;
      ctx.fillStyle = el.color;
      ctx.lineWidth = el.lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      switch (el.type) {
        case "freehand":
          if (!el.points || el.points.length < 2) return;
          ctx.beginPath();
          ctx.moveTo(el.points[0].x, el.points[0].y);
          for (let i = 1; i < el.points.length - 1; i++) {
            const midX = (el.points[i].x + el.points[i + 1].x) / 2;
            const midY = (el.points[i].y + el.points[i + 1].y) / 2;
            ctx.quadraticCurveTo(el.points[i].x, el.points[i].y, midX, midY);
          }
          ctx.lineTo(el.points[el.points.length - 1].x, el.points[el.points.length - 1].y);
          ctx.stroke();
          break;

        case "rectangle":
          if (el.x === undefined || el.y === undefined || el.width === undefined || el.height === undefined) return;
          ctx.strokeRect(el.x, el.y, el.width, el.height);
          break;

        case "arrow":
          if (!el.start || !el.end) return;
          ctx.beginPath();
          ctx.moveTo(el.start.x, el.start.y);
          ctx.lineTo(el.end.x, el.end.y);
          ctx.stroke();
          const angle = Math.atan2(el.end.y - el.start.y, el.end.x - el.start.x);
          const headLen = 10;
          ctx.beginPath();
          ctx.moveTo(el.end.x, el.end.y);
          ctx.lineTo(el.end.x - headLen * Math.cos(angle - Math.PI / 6), el.end.y - headLen * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(el.end.x - headLen * Math.cos(angle + Math.PI / 6), el.end.y - headLen * Math.sin(angle + Math.PI / 6));
          ctx.closePath();
          ctx.fill();
          break;

        case "text":
          if (el.text === undefined || el.x === undefined || el.y === undefined) return;
          drawTextOnCanvas(ctx, el.text, el.x, el.y, el.color, el.lineWidth);
          break;
      }

      // Selection highlight
      if (el.id === selectedId) {
        const box = getBoundingBox(el);
        if (box) {
          ctx.save();
          ctx.strokeStyle = "#60a5fa";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(box.x - 4, box.y - 4, box.w + 8, box.h + 8);
          ctx.restore();
        }
      }
    });

    // In-progress shape preview
    if (currentPoints.length > 1 && (tool === "pen" || tool === "eraser")) {
      ctx.beginPath();
      ctx.strokeStyle = tool === "eraser" ? "#000000" : color;
      ctx.lineWidth = tool === "eraser" ? lineWidth * 6 : lineWidth;
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      for (let i = 1; i < currentPoints.length - 1; i++) {
        const midX = (currentPoints[i].x + currentPoints[i + 1].x) / 2;
        const midY = (currentPoints[i].y + currentPoints[i + 1].y) / 2;
        ctx.quadraticCurveTo(currentPoints[i].x, currentPoints[i].y, midX, midY);
      }
      ctx.lineTo(currentPoints[currentPoints.length - 1].x, currentPoints[currentPoints.length - 1].y);
      ctx.stroke();
    }

    if (isShapeDragging && startPosRef.current && (tool === "rectangle" || tool === "arrow")) {
      const start = startPosRef.current;
      const end = currentPosRef.current;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.setLineDash([5, 5]);

      if (tool === "rectangle") {
        ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
      } else if (tool === "arrow") {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const headLen = 10;
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(end.x - headLen * Math.cos(angle - Math.PI / 6), end.y - headLen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(end.x - headLen * Math.cos(angle + Math.PI / 6), end.y - headLen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.setLineDash([]);
    }
  }, [elements, currentPoints, tool, color, lineWidth, isShapeDragging, selectedId, showDotGrid]);

  useEffect(() => {
    drawAll();
  }, [drawAll]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawAll();
    }
  }, [drawAll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ResizeObserver is more reliable than window resize for container sizing
    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(container);

    // Also handle window resize
    window.addEventListener("resize", resize);

    // Initial resize after a tick to ensure container has layout
    const id = requestAnimationFrame(resize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [resize]);

  function drawTextOnCanvas(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, textColor: string, lw: number) {
    const fontSize = Math.max(14, lw * 5);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "top";
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * fontSize * 1.4);
    });
  }

  // Find element at point (reverse order = topmost first)
  const hitTest = useCallback((point: Point): Element | null => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const box = getBoundingBox(elements[i]);
      if (box && pointInBox(point, box)) {
        return elements[i];
      }
    }
    return null;
  }, [elements]);

  const moveElement = useCallback((el: Element, dx: number, dy: number): Element => {
    const moved = { ...el };
    switch (el.type) {
      case "freehand":
        moved.points = el.points?.map((p) => ({ x: p.x + dx, y: p.y + dy }));
        break;
      case "rectangle":
        moved.x = (el.x ?? 0) + dx;
        moved.y = (el.y ?? 0) + dy;
        break;
      case "arrow":
        moved.start = { x: (el.start?.x ?? 0) + dx, y: (el.start?.y ?? 0) + dy };
        moved.end = { x: (el.end?.x ?? 0) + dx, y: (el.end?.y ?? 0) + dy };
        break;
      case "text":
        moved.x = (el.x ?? 0) + dx;
        moved.y = (el.y ?? 0) + dy;
        break;
    }
    return moved;
  }, []);

  const commitText = useCallback(() => {
    if (!textEdit || !textAreaRef.current) return;
    const text = textAreaRef.current.value;
    if (text.trim()) {
      const newElement: Element = {
        id: genId(),
        type: "text",
        x: textEdit.x,
        y: textEdit.y,
        text: text,
        color,
        lineWidth,
      };
      setHistory((prev) => [...prev, elements]);
      setElements((prev) => [...prev, newElement]);
    }
    setTextEdit(null);
    textAreaRef.current = null;
  }, [textEdit, color, lineWidth, elements]);

  const cancelText = useCallback(() => {
    setTextEdit(null);
    textAreaRef.current = null;
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".text-overlay")) return;

    const point = getPoint(e);

    // Select tool: click to select, drag to move
    if (tool === "select") {
      const hit = hitTest(point);
      if (hit) {
        setSelectedId(hit.id);
        isMovingRef.current = true;
        lastMousePosRef.current = point;
      } else {
        setSelectedId(null);
      }
      return;
    }

    // Text tool
    if (tool === "text") {
      if (textEdit) commitText();
      setTextEdit({ x: point.x, y: point.y, value: "" });
      setSelectedId(null);
      return;
    }

    // Drawing tools
    if (textEdit) commitText();
    setSelectedId(null);

    isDrawingRef.current = true;
    startPosRef.current = point;
    currentPosRef.current = point;

    if (tool === "pen" || tool === "eraser") {
      setCurrentPoints([point]);
    } else if (tool === "rectangle" || tool === "arrow") {
      setIsShapeDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const point = getPoint(e);
    currentPosRef.current = point;

    // Move selected element — use delta from last position to avoid stale closure drift
    if (tool === "select" && isMovingRef.current && selectedId) {
      const dx = point.x - lastMousePosRef.current.x;
      const dy = point.y - lastMousePosRef.current.y;
      lastMousePosRef.current = point;

      setElements((prev) =>
        prev.map((item) => (item.id === selectedId ? moveElement(item, dx, dy) : item))
      );
      return;
    }

    // Drawing
    if (!isDrawingRef.current) return;

    if (tool === "pen" || tool === "eraser") {
      setCurrentPoints((prev) => [...prev, point]);
    } else if (tool === "rectangle" || tool === "arrow") {
      drawAll();
    }
  };

  const handleMouseUp = () => {
    // Stop moving
    if (tool === "select" && isMovingRef.current) {
      isMovingRef.current = false;
      // Save state for undo
      setHistory((prev) => [...prev, elements]);
      return;
    }

    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (tool === "pen" || tool === "eraser") {
      if (currentPoints.length > 1) {
        if (tool === "eraser") {
          const eraserBox = getBoundingBox({
            id: "temp",
            type: "freehand",
            points: currentPoints,
            color: "#000000",
            lineWidth: lineWidth * 6,
          });
          if (eraserBox) {
            setHistory((prev) => [...prev, elements]);
            setElements((prev) => prev.filter((el) => {
              const box = getBoundingBox(el);
              if (!box) return true;
              return !boxesOverlap(eraserBox, box);
            }));
          }
        } else {
          const newElement: Element = {
            id: genId(),
            type: "freehand",
            points: [...currentPoints],
            color,
            lineWidth,
          };
          setHistory((prev) => [...prev, elements]);
          setElements((prev) => [...prev, newElement]);
        }
      }
      setCurrentPoints([]);
    } else if (tool === "rectangle") {
      const start = startPosRef.current;
      const end = currentPosRef.current;
      if (Math.abs(end.x - start.x) > 2 && Math.abs(end.y - start.y) > 2) {
        const newElement: Element = {
          id: genId(),
          type: "rectangle",
          x: Math.min(start.x, end.x),
          y: Math.min(start.y, end.y),
          width: Math.abs(end.x - start.x),
          height: Math.abs(end.y - start.y),
          color,
          lineWidth,
        };
        setHistory((prev) => [...prev, elements]);
        setElements((prev) => [...prev, newElement]);
      }
      setIsShapeDragging(false);
    } else if (tool === "arrow") {
      const start = startPosRef.current;
      const end = currentPosRef.current;
      if (Math.abs(end.x - start.x) > 2 || Math.abs(end.y - start.y) > 2) {
        const newElement: Element = {
          id: genId(),
          type: "arrow",
          start,
          end,
          color,
          lineWidth,
        };
        setHistory((prev) => [...prev, elements]);
        setElements((prev) => [...prev, newElement]);
      }
      setIsShapeDragging(false);
    }
  };

  const handleMouseLeave = () => {
    handleMouseUp();
  };

  const clearCanvas = () => {
    setHistory((prev) => [...prev, elements]);
    setElements([]);
    setCurrentPoints([]);
    setTextEdit(null);
    setSelectedId(null);
    textAreaRef.current = null;
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setElements(previous);
    setSelectedId(null);
  };

  const download = () => {
    if (textEdit) commitText();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `neuro-os-paper-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const toolButton = (t: Tool, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => {
        if (textEdit) commitText();
        setTool(t);
        setTextEdit(null);
        textAreaRef.current = null;
      }}
      className={`p-2 rounded-md transition-colors ${
        tool === t ? "bg-neutral-800 text-white" : "text-zinc-500 hover:text-white hover:bg-neutral-900"
      }`}
      title={label}
    >
      {icon}
    </button>
  );

  // Auto-focus textarea when it appears
  useEffect(() => {
    if (textEdit && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [textEdit]);

  const fontSize = Math.max(14, lineWidth * 5);

  const cursorStyle =
    tool === "text" ? "text" :
    tool === "select" ? "default" :
    "crosshair";

  // Template insertion helpers
  const addArrayTemplate = () => {
    const startX = 60;
    const startY = 60;
    const cellW = 50;
    const cellH = 40;
    const gap = 4;
    const newEls: Element[] = [];
    for (let i = 0; i < 6; i++) {
      newEls.push({
        id: genId(),
        type: "rectangle",
        x: startX + i * (cellW + gap),
        y: startY,
        width: cellW,
        height: cellH,
        color: color,
        lineWidth: Math.max(1, lineWidth),
      });
    }
    setHistory((prev) => [...prev, elements]);
    setElements((prev) => [...prev, ...newEls]);
  };

  const addLinkedListTemplate = () => {
    const startX = 60;
    const startY = 60;
    const nodeW = 44;
    const nodeH = 28;
    const gap = 36;
    const newEls: Element[] = [];
    for (let i = 0; i < 4; i++) {
      newEls.push({
        id: genId(),
        type: "rectangle",
        x: startX + i * (nodeW + gap),
        y: startY,
        width: nodeW,
        height: nodeH,
        color: color,
        lineWidth: Math.max(1, lineWidth),
      });
      if (i < 3) {
        newEls.push({
          id: genId(),
          type: "arrow",
          start: { x: startX + i * (nodeW + gap) + nodeW, y: startY + nodeH / 2 },
          end: { x: startX + (i + 1) * (nodeW + gap), y: startY + nodeH / 2 },
          color: color,
          lineWidth: Math.max(1, lineWidth),
        });
      }
    }
    setHistory((prev) => [...prev, elements]);
    setElements((prev) => [...prev, ...newEls]);
  };

  const addTreeTemplate = () => {
    const cx = 200;
    const cy = 50;
    const r = 24;
    const dy = 70;
    const dx = 80;
    const newEls: Element[] = [];
    // Root
    newEls.push({ id: genId(), type: "rectangle", x: cx - r, y: cy, width: r * 2, height: r * 1.2, color, lineWidth: Math.max(1, lineWidth) });
    // Left child
    newEls.push({ id: genId(), type: "rectangle", x: cx - dx - r, y: cy + dy, width: r * 2, height: r * 1.2, color, lineWidth: Math.max(1, lineWidth) });
    // Right child
    newEls.push({ id: genId(), type: "rectangle", x: cx + dx - r, y: cy + dy, width: r * 2, height: r * 1.2, color, lineWidth: Math.max(1, lineWidth) });
    // Arrows
    newEls.push({ id: genId(), type: "arrow", start: { x: cx, y: cy + r * 1.2 }, end: { x: cx - dx, y: cy + dy }, color, lineWidth: Math.max(1, lineWidth) });
    newEls.push({ id: genId(), type: "arrow", start: { x: cx, y: cy + r * 1.2 }, end: { x: cx + dx, y: cy + dy }, color, lineWidth: Math.max(1, lineWidth) });
    setHistory((prev) => [...prev, elements]);
    setElements((prev) => [...prev, ...newEls]);
  };

  const templateButton = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <button
      onClick={() => { if (textEdit) commitText(); onClick(); }}
      className="p-2 text-zinc-500 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
      title={label}
    >
      {icon}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paper</h1>
          <p className="text-sm text-zinc-500 mt-1">Whiteboard for thinking. Draw diagrams, trace algorithms, sketch structures.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={history.length === 0} className="p-2 text-zinc-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors disabled:opacity-30" title="Undo">
            <Undo size={16} />
          </button>
          <button onClick={clearCanvas} className="p-2 text-zinc-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors" title="Clear">
            <Trash2 size={16} />
          </button>
          <button onClick={download} className="p-2 text-zinc-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors" title="Download">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-3 p-2 bg-neutral-950 border border-neutral-800 rounded-md">
        <div className="flex items-center gap-1">
          {toolButton("select", <MousePointer2 size={16} />, "Select & Move")}
          {toolButton("pen", <PenLine size={16} />, "Pen")}
          {toolButton("rectangle", <Square size={16} />, "Rectangle")}
          {toolButton("arrow", <ArrowRight size={16} />, "Arrow")}
          {toolButton("text", <Type size={16} />, "Text")}
          {toolButton("eraser", <Eraser size={16} />, "Eraser")}
        </div>

        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-5 h-5 rounded-full border transition-all ${color === c ? "border-white scale-110" : "border-transparent hover:border-zinc-500"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-px h-5 bg-neutral-800 mx-1" />

        <div className="flex items-center gap-1">
          {templateButton(<Grid3x3 size={16} />, "Array Template", addArrayTemplate)}
          {templateButton(<List size={16} />, "Linked List Template", addLinkedListTemplate)}
          {templateButton(<GitBranch size={16} />, "Binary Tree Template", addTreeTemplate)}
        </div>

        <div className="w-px h-5 bg-neutral-800 mx-1" />

        <button
          onClick={() => setShowDotGrid((v) => !v)}
          className={`px-2 py-1 text-[10px] font-medium rounded border transition-colors ${
            showDotGrid ? "bg-white text-black border-white" : "border-neutral-800 text-zinc-500 hover:text-white"
          }`}
        >
          Dot Grid
        </button>

        <div className="flex items-center gap-1.5">
          <button onClick={() => setLineWidth(Math.max(1, lineWidth - 1))} className="p-1 text-zinc-500 hover:text-white transition-colors">
            <Minus size={12} />
          </button>
          <div className="rounded-full bg-white transition-all" style={{ width: lineWidth * 3, height: lineWidth * 3 }} />
          <button onClick={() => setLineWidth(Math.min(10, lineWidth + 1))} className="p-1 text-zinc-500 hover:text-white transition-colors">
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="touch-none"
          style={{ width: "100%", height: "100%", cursor: cursorStyle }}
        />

        {/* Text overlay */}
        {textEdit && (
          <div
            className="text-overlay absolute"
            style={{
              left: textEdit.x,
              top: textEdit.y,
              zIndex: 10,
            }}
          >
            <textarea
              ref={(el) => {
                textAreaRef.current = el;
                if (el) {
                  requestAnimationFrame(() => el.focus());
                }
              }}
              defaultValue={textEdit.value}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancelText();
                }
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  commitText();
                }
              }}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              className="bg-transparent border-none outline-none resize-none overflow-hidden p-0 m-0 block"
              style={{
                color: color,
                fontSize: fontSize,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                lineHeight: "1.4",
                caretColor: color,
                cursor: "text",
                minWidth: "100px",
                minHeight: `${fontSize * 1.4}px`,
                width: `${Math.max(100, containerRef.current ? containerRef.current.clientWidth - textEdit.x - 20 : 400)}px`,
                whiteSpace: "pre",
              }}
            />
            <div className="flex items-center gap-1 mt-1">
              <button
                onClick={commitText}
                className="px-2 py-0.5 bg-white text-black text-[10px] font-medium rounded hover:bg-zinc-200 transition-colors flex items-center gap-1"
              >
                <Check size={10} /> Done
              </button>
              <button
                onClick={cancelText}
                className="px-2 py-0.5 border border-neutral-700 text-zinc-400 text-[10px] rounded hover:border-zinc-500 hover:text-white transition-colors flex items-center gap-1"
              >
                <X size={10} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
