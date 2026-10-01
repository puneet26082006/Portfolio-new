export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 600;
export type DrawingPoint = { x: number; y: number };
export type DrawingStroke = {
  kind: "pen" | "marker" | "eraser";
  color: string;
  width: number;
  points: DrawingPoint[];
};
export type DrawingLabel = {
  kind: "text" | "sticker";
  color: string;
  size: number;
  text: string;
  point: DrawingPoint;
};
export type DrawingAction = DrawingStroke | DrawingLabel;
export type DrawingDocument = { background: string; actions: DrawingAction[] };
export const emptyDrawing = (): DrawingDocument => ({
  background: "#ffffff",
  actions: [],
});
export function drawingPoint(
  x: number,
  y: number,
  rect: { left: number; top: number; width: number; height: number },
): DrawingPoint {
  return {
    x: Math.max(
      0,
      Math.min(CANVAS_WIDTH, ((x - rect.left) * CANVAS_WIDTH) / rect.width),
    ),
    y: Math.max(
      0,
      Math.min(CANVAS_HEIGHT, ((y - rect.top) * CANVAS_HEIGHT) / rect.height),
    ),
  };
}
export function renderDrawing(
  ctx: CanvasRenderingContext2D,
  document: DrawingDocument,
  draft?: DrawingAction | null,
) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (const action of draft
    ? [...document.actions, draft]
    : document.actions) {
    ctx.save();
    if ("text" in action) {
      ctx.font = `${action.size}px ${action.kind === "sticker" ? '"Segoe UI Emoji", sans-serif' : "Inter, Arial, sans-serif"}`;
      ctx.fillStyle = action.color;
      ctx.textBaseline = "middle";
      ctx.fillText(action.text, action.point.x, action.point.y);
    } else {
      const points = action.points;
      if (!points.length) {
        ctx.restore();
        continue;
      }
      ctx.globalCompositeOperation =
        action.kind === "eraser" ? "destination-out" : "source-over";
      ctx.globalAlpha = action.kind === "marker" ? 0.3 : 1;
      ctx.strokeStyle = action.color;
      ctx.fillStyle = action.color;
      ctx.lineWidth = action.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      if (points.length === 1) {
        ctx.arc(points[0].x, points[0].y, action.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++)
          ctx.quadraticCurveTo(
            points[i].x,
            points[i].y,
            (points[i].x + points[i + 1].x) / 2,
            (points[i].y + points[i + 1].y) / 2,
          );
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      }
    }
    ctx.restore();
  }
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = document.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.restore();
}

export type DrawingHistory = {
  past: DrawingDocument[];
  present: DrawingDocument;
  future: DrawingDocument[];
};
export function drawingHistory(
  present: DrawingDocument = emptyDrawing(),
): DrawingHistory {
  return { past: [], present, future: [] };
}
export function commitDrawing(
  history: DrawingHistory,
  present: DrawingDocument,
): DrawingHistory {
  return {
    past: [...history.past.slice(-39), history.present],
    present,
    future: [],
  };
}
export function undoDrawing(history: DrawingHistory): DrawingHistory {
  if (!history.past.length) return history;
  return {
    past: history.past.slice(0, -1),
    present: history.past[history.past.length - 1],
    future: [history.present, ...history.future],
  };
}
export function redoDrawing(history: DrawingHistory): DrawingHistory {
  if (!history.future.length) return history;
  return {
    past: [...history.past, history.present],
    present: history.future[0],
    future: history.future.slice(1),
  };
}
