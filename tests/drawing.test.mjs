import test from "node:test";
import assert from "node:assert/strict";
import {
  drawingPoint,
  drawingHistory,
  commitDrawing,
  undoDrawing,
  redoDrawing,
  renderDrawing,
} from "../lib/drawing.ts";

test("drawing coordinates remain accurate when the canvas is scaled or zoomed", () => {
  assert.deepEqual(
    drawingPoint(250, 200, { left: 100, top: 100, width: 300, height: 200 }),
    { x: 450, y: 300 },
  );
  assert.deepEqual(
    drawingPoint(-50, 999, { left: 0, top: 0, width: 300, height: 200 }),
    { x: 0, y: 600 },
  );
});
test("undo restores cleared drawings and redo history is discarded after a new edit", () => {
  const stroke = {
    kind: "pen",
    color: "#000000",
    width: 3,
    points: [{ x: 20, y: 20 }],
  };
  let history = drawingHistory();
  history = commitDrawing(history, { ...history.present, actions: [stroke] });
  history = commitDrawing(history, { ...history.present, actions: [] });
  history = undoDrawing(history);
  assert.equal(history.present.actions.length, 1);
  const old = history.present;
  history = redoDrawing(history);
  assert.equal(history.present.actions.length, 0);
  history = undoDrawing(history);
  history = commitDrawing(history, {
    ...history.present,
    background: "#fff7df",
  });
  assert.equal(history.future.length, 0);
  assert.equal(old.background, "#ffffff");
});
test("eraser removes ink before the chosen paper color is composited underneath", () => {
  const calls = [];
  const ctx = {
    save() {},
    restore() {},
    clearRect() {},
    beginPath() {},
    moveTo() {},
    quadraticCurveTo() {},
    lineTo() {},
    arc() {},
    fill() {
      calls.push(["fill", this.globalCompositeOperation]);
    },
    stroke() {
      calls.push(["stroke", this.globalCompositeOperation]);
    },
    fillRect() {
      calls.push(["background", this.globalCompositeOperation, this.fillStyle]);
    },
  };
  renderDrawing(ctx, {
    background: "#fff7df",
    actions: [
      { kind: "pen", color: "#000", width: 3, points: [{ x: 1, y: 1 }] },
      { kind: "eraser", color: "#000", width: 20, points: [{ x: 1, y: 1 }] },
    ],
  });
  assert.deepEqual(calls, [
    ["fill", "source-over"],
    ["fill", "destination-out"],
    ["background", "destination-over", "#fff7df"],
  ]);
});
