export type Project = {
  slug: string;
  title: string;
  kicker: string;
  period: string;
  summary: string;
  overview: string;
  role: string;
  platform: string;
  status: string;
  tags: string[];
  features: string[];
  links: { label: string; href: string }[];
  palette: [string, string];
  mark: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "smartflow-ai",
    title: "SmartFlow AI",
    kicker: "AI Productivity Platform",
    period: "2026",
    summary:
      "A proactive productivity command center that connects tasks, calendars, habits, focus sessions, inbox signals, and an AI assistant.",
    overview:
      "SmartFlow AI was built around a simple problem: deadlines are rarely missed because people cannot work; they are missed because priorities, reminders, and context live in different places. The product brings those signals into one workspace and helps the user decide what to do next.",
    role: "Full-stack Developer",
    platform: "Web · Cloud Run",
    status: "Live",
    tags: ["React 19", "TanStack", "Firebase", "Gemini", "Cloud Run"],
    features: [
      "Urgent/important task matrix with quick capture and reminders",
      "Daily planner with Pomodoro focus sessions and habit streaks",
      "AI assistant with voice, attachments, and saved conversation history",
      "Google Calendar and Gmail workflows for schedule and inbox context",
      "Firebase Authentication, Firestore, Realtime Database, and Cloudinary storage",
    ],
    links: [
      {
        label: "Open live product",
        href: "https://smart-flow-ai-172578386000.us-central1.run.app/",
      },
    ],
    palette: ["#b93668", "#ef9f43"],
    mark: "SF",
    featured: true,
  },
  {
    slug: "fair-relief-routing",
    title: "Fair Relief Routing",
    kicker: "C++ Optimization Engine",
    period: "Sep 2026",
    summary:
      "A fair-allocation and vehicle-routing engine that protects regional equity while reducing travel distance under a 70% stock constraint.",
    overview:
      "The planner solves allocation and routing together. It first protects the minimum regional service ratio, then improves regional balance, and only then minimizes distance. A modular C++ architecture keeps allocation, routing, validation, metrics, and visualization independent.",
    role: "Optimization & C++ Developer",
    platform: "C++17 · Interactive SVG",
    status: "Competition project",
    tags: ["C++", "CVRP", "Local Search", "2-opt", "SVG"],
    features: [
      "Fair regional targets derived from available stock and regional demand",
      "Capacity-constrained cheapest-insertion route construction",
      "2-opt and fairness-preserving local search for distance reduction",
      "Strict validation of stock, demand, vehicle capacity, and route uniqueness",
      "Interactive route dashboard for three official CVRPLIB instances",
    ],
    links: [
      {
        label: "View source",
        href: "https://github.com/puneet26082006/COC-3.0",
      },
    ],
    palette: ["#4058c7", "#57c5ff"],
    mark: "FR",
    featured: true,
  },
  {
    slug: "honey-comb",
    title: "Honey Comb",
    kicker: "AI Scam Intelligence",
    period: "2026",
    summary:
      "An AI honeypot API that detects scam patterns, extracts useful intelligence, and keeps fraudulent conversations engaged safely.",
    overview:
      "Honey Comb combines deterministic entity extraction with an LLM-driven conversation agent. It recognizes common Indian scam patterns, identifies red flags, extracts phone numbers, UPI IDs, links, and case references, and maintains a natural multi-turn response strategy.",
    role: "AI & Backend Developer",
    platform: "Node.js · Serverless API",
    status: "Top 2% · AI India Impact Summit",
    tags: ["Node.js", "Express", "Groq", "Llama", "Security"],
    features: [
      "Scam classification across phishing, UPI, job, lottery, and impersonation fraud",
      "Structured extraction of financial identifiers, contact details, and malicious links",
      "Context-aware multi-turn engagement powered by Groq",
      "Red-flag analysis and final session intelligence summary",
      "Serverless API designed for fast integration with messaging channels",
    ],
    links: [
      {
        label: "View source",
        href: "https://github.com/puneet26082006/Honey-Comb-Scam-detection-",
      },
    ],
    palette: ["#d48b16", "#f5d04b"],
    mark: "HC",
    featured: true,
  },
  {
    slug: "pixora-ai",
    title: "Pixora AI",
    kicker: "Creative AI Web App",
    period: "2026",
    summary:
      "A polished background-removal workflow with authentication, cloud media storage, credits, payments, and automated processing.",
    overview:
      "Pixora turns a single-purpose AI capability into a complete product flow: sign in, upload, process, preview, download, and manage usage. The interface is responsive and the supporting services handle media storage, customer credits, and payments.",
    role: "Full-stack Developer",
    platform: "React · Web",
    status: "Product build",
    tags: ["React", "Supabase", "Cloudinary", "Razorpay", "n8n"],
    features: [
      "One-click AI background removal with clear before/after feedback",
      "Supabase authentication and user-level credit tracking",
      "Cloudinary-backed media uploads and transformed asset delivery",
      "Razorpay checkout flow for subscription and credit purchases",
      "n8n workflows coordinating processing and account updates",
    ],
    links: [
      {
        label: "Open live demo",
        href: "https://tanstack-start-app.puneetsaxena168.workers.dev/",
      },
    ],
    palette: ["#9a46d8", "#ef68a4"],
    mark: "PX",
  },
  {
    slug: "virtual-herbal-garden",
    title: "Virtual Herbal Garden",
    kicker: "Interactive Learning Platform",
    period: "2025",
    summary:
      "A digital garden for exploring medicinal plants, learning traditional uses, and connecting with a community of learners and herbal enthusiasts.",
    overview:
      "The project turns botanical information into an approachable visual experience. It organizes plant knowledge, supports discovery, and creates space for people to share experiences and learn from experts.",
    role: "Frontend Developer",
    platform: "Responsive Web",
    status: "Showcase project",
    tags: ["React", "TypeScript", "Education", "Community"],
    features: [
      "Browsable medicinal-plant collection with structured learning content",
      "Responsive information cards optimized for quick exploration",
      "Community-oriented experience for sharing discoveries and practical notes",
      "Accessible visual hierarchy for learners on mobile and desktop",
    ],
    links: [
      {
        label: "View source",
        href: "https://github.com/puneet26082006/Virtual-herbal-garden-showcase-20",
      },
    ],
    palette: ["#16794c", "#83c769"],
    mark: "VG",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  intro: string;
  sections: { title: string; body: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "how-i-built-a-consistent-dsa-system",
    title: "How I Built a Consistent DSA System",
    excerpt:
      "The routine behind a 160-day challenge, 100-day LeetCode badge, and steady progress across four competitive-programming platforms.",
    date: "Sep 2026",
    readTime: "6 min",
    category: "Competitive Programming",
    intro:
      "Consistency became easier when I stopped treating every practice session like a contest and started giving each session one clear job.",
    sections: [
      {
        title: "Separate learning from proving",
        body: [
          "On learning days I allow editorials, notes, and slow implementation. On contest days I measure speed, decision-making, and recovery after a wrong approach. Mixing the two made every difficult problem feel like failure.",
          "The separation also makes review honest: a contest mistake becomes a topic for the next learning session instead of a rating verdict.",
        ],
      },
      {
        title: "Keep a small feedback loop",
        body: [
          "After each problem I record the key observation, the wrong turn I took, and the smallest reusable pattern. The note is short enough to review before a contest.",
          "Streaks helped me show up, but review is what converted repetition into rating progress.",
        ],
      },
    ],
  },
  {
    slug: "fairness-before-distance-in-relief-routing",
    title: "Why Fairness Comes Before Distance in Relief Routing",
    excerpt:
      "A practical explanation of lexicographic optimization, regional service ratios, and the routing trade-offs inside Fair Relief Routing.",
    date: "Sep 2026",
    readTime: "8 min",
    category: "Algorithms",
    intro:
      "The shortest route is not automatically the best relief plan. When stock is scarce, optimizing distance first can quietly leave an entire region under-served.",
    sections: [
      {
        title: "Use priorities, not arbitrary weights",
        body: [
          "The optimizer first maximizes the weakest regional service ratio. Only solutions tied on that measure are compared by balance, and distance becomes the deciding factor after equity is protected.",
          "This order is easy to explain and avoids a fragile weighted sum where a small coefficient change can reverse the intended policy.",
        ],
      },
      {
        title: "Improve routes without breaking equity",
        body: [
          "The local search redistributes allocation only inside the same region, preserving regional totals exactly. Route moves and 2-opt can then reduce travel while the fairness score stays unchanged.",
        ],
      },
    ],
  },
  {
    slug: "shipping-smartflow-ai-on-cloud-run",
    title: "From Student Project to a Deployed AI Product",
    excerpt:
      "What changed when SmartFlow AI moved from a feature checklist to a real product running on Cloud Run.",
    date: "Jul 2026",
    readTime: "7 min",
    category: "Building in Public",
    intro:
      "Deployment forced every loose end into the open: authentication state, slow AI responses, file handling, calendar permissions, and the difference between a demo and a dependable workflow.",
    sections: [
      {
        title: "Design around the user’s next decision",
        body: [
          "The dashboard became clearer when tasks, reminders, and urgency were organized around what the user should do next. Features stopped competing for attention and began supporting one flow.",
        ],
      },
      {
        title: "Integrations need graceful failure",
        body: [
          "Calendar, email, storage, and AI services fail in different ways. Clear loading, empty, permission, and retry states matter as much as the successful response.",
          "That lesson now shapes how I build every external integration.",
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
