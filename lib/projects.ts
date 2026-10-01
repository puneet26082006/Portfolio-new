export type Project = {
  id: string;
  title: string;
  category: string;
  label: string;
  description: string;
  tags: string[];
  accent: string;
  image: string;
  live?: string;
  github?: string;
  detailHref?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "smart-flow-ai",
    title: "Smart Flow AI",
    category: "AI Productivity App",
    label: "AI co-pilot",
    description:
      "An intelligent workspace bringing together task management, habit tracking, smart scheduling, and AI insights to help you stay focused and in flow.",
    tags: [
      "AI Insights",
      "Task Management",
      "Smart Calendar",
      "Habit Tracking",
      "Focus Mode",
    ],
    accent: "#9856e8",
    image: "/projects/smart-flow-mobile.webp",
    live: "https://smart-flow-ai-172578386000.us-central1.run.app/",
  },
  {
    id: "pixora-ai",
    title: "Pixora AI",
    category: "AI Web App",
    label: "AI editor",
    description:
      "One-click AI background removal with a responsive editing experience, secure accounts, image storage, and credit-based subscriptions.",
    tags: ["React", "Tailwind CSS", "ClipDrop API", "Supabase", "Razorpay"],
    accent: "#7c5cfc",
    image: "/projects/pixora-mobile.webp",
    live: "https://tanstack-start-app.puneetsaxena168.workers.dev/",
  },
  {
    id: "fair-relief-routing",
    title: "Fair Relief Routing",
    category: "C++ Optimization Engine",
    label: "Fair allocation",
    description:
      "A fair-allocation and vehicle-routing optimizer that protects regional equity under a 70% stock constraint, then improves balance and travel distance. Includes an interactive route dashboard.",
    tags: ["C++17", "CVRP", "Local Search", "2-opt", "SVG Dashboard"],
    accent: "#38bdf8",
    image: "/projects/fair-relief-mobile.webp",
    github: "https://github.com/puneet26082006/COC-3.0",
  },
  {
    id: "honey-comb",
    title: "Honey Comb",
    category: "AI Platform",
    label: "Top 2%",
    description:
      "An AI honeypot that detects scam messages, extracts intelligence, and engages scammers in context-aware conversations. Selected among the Top 2% at the AI India Impact Summit.",
    tags: ["Node.js", "Express", "Groq AI", "Llama 3.1", "Vercel"],
    accent: "#e4a637",
    image: "/projects/honey-comb-mobile.webp",
    github: "https://github.com/puneet26082006/Honey-Comb-Scam-detection-",
  },
  {
    id: "legal-document-assistant",
    title: "Legal Document Assistant",
    category: "Generative AI Web App",
    label: "Document AI",
    description:
      "A generative-AI project focused on making legal documents easier to work with through a dedicated web assistant.",
    tags: ["Generative AI", "Legal Documents", "Web App", "Cloud Run"],
    accent: "#b68a55",
    image: "/projects/legal-assistant-mobile.webp",
    live: "https://frontend-35044873694.asia-south1.run.app/",
    github: "https://github.com/puneet26082006/Legal-Documents-Gen-Ai-Project",
  },
];
