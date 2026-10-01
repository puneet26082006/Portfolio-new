export type WallNote = {
  id: string;
  name: string;
  message: string;
  color: string;
  date: string;
  drawing?: string;
  owner?: string;
  approved?: boolean;
};
export const PIN_COLORS = [
  { name: "Purple", color: "#7e22ce" },
  { name: "Red", color: "#dc2626" },
  { name: "Emerald", color: "#059669" },
  { name: "Blue", color: "#0284c7" },
  { name: "Amber", color: "#d97706" },
  { name: "Pink", color: "#db2777" },
  { name: "Indigo", color: "#4f46e5" },
  { name: "Teal", color: "#0d9488" },
  { name: "Rose", color: "#be123c" },
  { name: "Violet", color: "#7c3aed" },
  { name: "Orange", color: "#ea580c" },
  { name: "Green", color: "#16a34a" },
];
export const WALL_COLORS = [
  ...PIN_COLORS.map((pin) => pin.color),
  "#4d2b80",
  "#145a75",
  "#7a254d",
  "#79561d",
  "#245645",
];
const GRADIENTS = [
  ["#2e1065", "#581c87"],
  ["#450a0a", "#991b1b"],
  ["#022c22", "#065f46"],
  ["#082f49", "#075985"],
  ["#451a03", "#92400e"],
  ["#500724", "#9d174d"],
  ["#1e1b4b", "#3730a3"],
  ["#042f2e", "#115e59"],
  ["#4c0519", "#9f1239"],
  ["#2e1065", "#5b21b6"],
  ["#431407", "#9a3412"],
  ["#052e16", "#166534"],
];
export function wallGradient(color: string) {
  const index = PIN_COLORS.findIndex((pin) => pin.color === color);
  const [start, end] = GRADIENTS[index < 0 ? 0 : index];
  return `linear-gradient(135deg, ${start}, ${end})`;
}
export type WallRow = {
  id: string;
  user_id: string;
  author_name: string;
  message: string;
  color: string;
  drawing: string | null;
  created_at: string;
  approved: boolean;
};
export function wallNote(row: WallRow): WallNote {
  return {
    id: row.id,
    owner: row.user_id,
    name: row.author_name,
    message: row.message,
    color: WALL_COLORS.includes(row.color) ? row.color : WALL_COLORS[0],
    drawing: row.drawing?.startsWith("data:image/png;base64,")
      ? row.drawing
      : undefined,
    date: new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(row.created_at)),
    approved: row.approved,
  };
}
export function wallError(code?: string): string {
  if (code === "P0001")
    return "You have reached the posting limit. Please wait before adding another note.";
  if (code === "42501" || code === "PGRST301")
    return "Please sign in again before posting.";
  if (code === "22023" || code === "23514")
    return "Check your name and message. Drawings must fit within the canvas.";
  return "The wall could not save your note. Please try again in a moment.";
}
