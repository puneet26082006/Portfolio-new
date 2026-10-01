export type MediumPost = {
  title: string;
  url: string;
  date: string;
  displayDate: string;
  tags: string[];
  excerpt: string;
  image: string;
  imageAlt: string;
  readMinutes: number;
};
export const MEDIUM_PROFILE = "https://medium.com/@puneetsaxena168";
// Verified against the author RSS feed on October 1, 2026. Reading times estimated at 200 words/minute.
export const MEDIUM_POSTS: MediumPost[] = [
  {
    title: "Exploring the Future: My Journey with the Vertex AI Gemini API",
    url: "https://medium.com/@puneetsaxena168/exploring-the-future-my-journey-with-the-vertex-ai-gemini-api-1ed10f76533d",
    date: "2025-05-31",
    displayDate: "May 31, 2025",
    tags: ["Gemini", "Vertex AI", "Google Cloud", "Prompt Engineering"],
    excerpt:
      "My hands-on introduction to the Gemini API: multimodal inputs, prompt techniques, the Vertex AI SDK, and responsible AI application development.",
    image:
      "https://cdn-images-1.medium.com/max/1024/1*KYtT3R4NyUFUJMCCAXVFJg.png",
    imageAlt:
      "Google Cloud skill badge featured in Exploring the Future: My Journey with the Vertex AI Gemini API",
    readMinutes: 3,
  },
  {
    title:
      "Mastering Multimodality: My Journey Through “Rich Documents with Gemini and Multimodal RAG”",
    url: "https://medium.com/@puneetsaxena168/mastering-multimodality-my-journey-through-rich-documents-with-gemini-and-multimodal-rag-eec2644656c1",
    date: "2025-05-28",
    displayDate: "May 28, 2025",
    tags: ["Multimodal RAG", "Gemini", "Document AI", "Vertex AI"],
    excerpt:
      "What I learned about connecting Gemini, Document AI, and retrieval-augmented generation to make sense of text, images, and rich documents.",
    image:
      "https://cdn-images-1.medium.com/max/997/1*-csZ8qfGrKv3lF4TP6gjuQ.png",
    imageAlt:
      "Google Cloud skill badge featured in Mastering Multimodality: My Journey Through “Rich Documents with Gemini and Multimodal RAG”",
    readMinutes: 2,
  },
  {
    title: "Building the Future: My Journey with GenAI, Gemini, and Streamlit",
    url: "https://medium.com/@puneetsaxena168/building-the-future-my-journey-with-genai-gemini-and-streamlit-9bda079f31c0",
    date: "2025-05-16",
    displayDate: "May 16, 2025",
    tags: ["Streamlit", "Gemini", "Python", "Google Cloud"],
    excerpt:
      "Building interactive AI applications with Gemini and Streamlit, from crafting prompts to connecting a Python interface with Google Cloud.",
    image:
      "https://cdn-images-1.medium.com/max/1024/1*4dbPRtLILWKwiUP0pv5p_Q.png",
    imageAlt:
      "Google Cloud skill badge featured in Building the Future: My Journey with GenAI, Gemini, and Streamlit",
    readMinutes: 3,
  },
  {
    title:
      "Building Real-World GenAI Applications with Gemini & Imagen on Google Cloud: My Learning Journey",
    url: "https://medium.com/@puneetsaxena168/building-real-world-genai-applications-with-gemini-imagen-on-google-cloud-my-learning-journey-1e71f1c0c16a",
    date: "2025-05-07",
    displayDate: "May 7, 2025",
    tags: ["Imagen", "Gemini", "Vertex AI", "Google Cloud"],
    excerpt:
      "Lessons from combining Gemini and Imagen to build conversational and creative applications, including deployment and responsible AI practices.",
    image:
      "https://cdn-images-1.medium.com/max/1024/1*9CbTCOalI1FVMQuiFG3yzQ.png",
    imageAlt:
      "Google Cloud skill badge featured in Building Real-World GenAI Applications with Gemini & Imagen on Google Cloud: My Learning Journey",
    readMinutes: 3,
  },
  {
    title:
      "How I Learned Prompt Design with Vertex AI — A Certified Experience",
    url: "https://medium.com/@puneetsaxena168/how-i-learned-prompt-design-with-vertex-ai-a-certified-experience-97664be9654e",
    date: "2025-05-03",
    displayDate: "May 3, 2025",
    tags: ["Prompt Engineering", "Vertex AI", "Gemini"],
    excerpt:
      "From prompt templates and few-shot examples to testing in Vertex AI Studio: the lessons behind my Google Cloud prompt design skill badge.",
    image:
      "https://cdn-images-1.medium.com/max/1005/1*ZEggMVT07LMOLOD1ZbAt7Q.png",
    imageAlt:
      "Google Cloud skill badge featured in How I Learned Prompt Design with Vertex AI — A Certified Experience",
    readMinutes: 3,
  },
];
