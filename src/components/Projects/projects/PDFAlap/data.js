/**
 * PDF-ALAP Project Data
 * Case study content for the multilingual PDF chatbot project.
 */

const pdfAlapData = {
  id: "pdf-chatbot",
  slug: "multilingual-pdf-chatbot-rag",
  visibility: "public",
  category: "project",
  featured: false,
  title: "PDF-ALAP — Multilingual PDF Chatbot",
  tagline: "Ask your documents anything — in Bangla or English",
  stack: [
    "Python",
    "Streamlit",
    "FastAPI",
    "FAISS",
    "Tesseract OCR",
    "Google Gemini",
    "LangChain",
  ],
  summary:
    "A privacy-first RAG system that answers questions from PDFs in English and Bangla, with OCR support for scanned documents.",
  links: {
    repo: "https://github.com/Chinmoy17/PDF-ALAP",
    demo: null,
  },

  // Hero stats
  stats: [
    { value: "2", label: "Languages" },
    { value: "100%", label: "Local Processing" },
    { value: "OCR", label: "Scanned PDF Support" },
  ],

  // Technical specifications extracted from the actual codebase
  techSpecs: {
    title: "Technical Specifications",
    models: [
      {
        name: "Gemini 2.5 Pro",
        purpose: "Answer generation (LLM)",
        config: "temperature=0.4",
      },
      {
        name: "models/embedding-001",
        purpose: "Text embeddings (Google)",
        config: "768-dim vectors",
      },
      {
        name: "paraphrase-multilingual-MiniLM-L12-v2",
        purpose: "Evaluation embeddings",
        config: "Sentence Transformers",
      },
    ],
    chunking: {
      strategy: "RecursiveCharacterTextSplitter",
      chunkSize: 1024,
      chunkOverlap: 300,
    },
    dependencies: [
      { name: "streamlit", purpose: "Web UI framework" },
      { name: "google-generativeai", purpose: "Gemini API client" },
      { name: "langchain", purpose: "RAG orchestration" },
      { name: "langchain_google_genai", purpose: "LangChain Gemini integration" },
      { name: "faiss-cpu", purpose: "Vector similarity search" },
      { name: "pdfplumber", purpose: "PDF text extraction" },
      { name: "pytesseract", purpose: "OCR for scanned pages" },
      { name: "PyPDF2", purpose: "PDF parsing fallback" },
      { name: "fastapi", purpose: "REST API backend" },
      { name: "uvicorn", purpose: "ASGI server" },
      { name: "chromadb", purpose: "Alternative vector store (experimented)" },
      { name: "tabulate", purpose: "Evaluation output formatting" },
    ],
    ocr: {
      engine: "Tesseract OCR",
      languages: "ben+eng (Bangla + English)",
      resolution: "300 DPI for image conversion",
    },
  },

  // The Challenge
  challenge: {
    title: "The Challenge",
    content: `Most RAG tutorials assume clean, English PDFs. Reality is messier — especially in Bangladesh.

I needed a tool to study for board exams (HSC). My study materials were a mix of digital PDFs and scanned textbook pages, all in Bangla. Existing chatbots either:
- Couldn't handle Bangla text at all
- Broke on scanned/image PDFs
- Required uploading documents to cloud services (privacy concern)

The real challenge? **Bangla OCR is hard.** The script has 50 letters, compound characters (যুক্তবর্ণ), and encoding nightmares — Unicode vs ASCII representations that look identical but aren't.`,
  },

  // Technical Decisions
  decisions: [
    {
      question: "Why Gemini embeddings over OpenAI?",
      answer:
        "Gemini's embedding-001 model significantly outperformed OpenAI's ada-002 on Bangla text. It correctly captured semantic similarity even with mixed Bangla-English queries — crucial for my HSC study materials.",
      icon: "brain",
    },
    {
      question: "Why FAISS for vector search?",
      answer:
        "Lightweight, runs entirely local, no external dependencies. Perfect for a privacy-first tool where documents never leave the user's machine. I also experimented with ChromaDB but FAISS was faster for my use case.",
      icon: "database",
    },
    {
      question: "Why Tesseract for OCR?",
      answer:
        "Open source, supports Bangla script (ben+eng mode), and can run at 300 DPI for better accuracy. The tradeoff: slower than cloud OCR, but keeps everything local. Not perfect — compound characters still trip it up sometimes.",
      icon: "scan",
    },
    {
      question: "Why both Streamlit and FastAPI?",
      answer:
        "Streamlit for rapid UI prototyping — I could iterate on the chat interface in hours, not days. FastAPI as a headless backend for integration or batch processing. Honestly, I built both because I wanted to learn both.",
      icon: "layers",
    },
  ],

  // Architecture layers
  architecture: {
    title: "How It Works",
    layers: [
      {
        name: "Input Layer",
        description: "PDF upload, automatic OCR detection for scanned pages",
        tech: "pdfplumber, pytesseract (300 DPI, ben+eng)",
      },
      {
        name: "Processing Layer",
        description: "Unicode normalization (NFKC), header removal, whitespace cleanup",
        tech: "Custom regex, unicodedata.normalize()",
      },
      {
        name: "Chunking Layer",
        description: "Split text into overlapping chunks for better context",
        tech: "RecursiveCharacterTextSplitter (1024 chars, 300 overlap)",
      },
      {
        name: "Embedding Layer",
        description: "Convert chunks to semantic vectors",
        tech: "GoogleGenerativeAIEmbeddings (embedding-001)",
      },
      {
        name: "Retrieval Layer",
        description: "Find most relevant chunks via similarity search",
        tech: "FAISS (local, CPU-based)",
      },
      {
        name: "Generation Layer",
        description: "Generate answers from retrieved context",
        tech: "Gemini 2.5 Pro (temperature=0.4)",
      },
    ],
  },

  // Features grid
  features: [
    {
      title: "Multilingual",
      description: "Ask in Bangla or English — the system understands both and responds in your language",
      icon: "globe",
    },
    {
      title: "OCR Support",
      description: "Automatically detects scanned pages and runs Tesseract OCR at 300 DPI",
      icon: "scan",
    },
    {
      title: "Privacy First",
      description: "All processing happens locally — FAISS index stays on your machine",
      icon: "shield",
    },
    {
      title: "Conversation Memory",
      description: "Maintains context across multiple questions in the same session",
      icon: "message-circle",
    },
    {
      title: "REST API",
      description: "FastAPI backend with /upload_pdf and /ask endpoints for automation",
      icon: "code",
    },
    {
      title: "Evaluation Tools",
      description: "Semantic similarity scoring with multilingual MiniLM + grounding checks",
      icon: "check-circle",
    },
  ],

  // Bangla OCR deep dive
  banglaOCR: {
    title: "The Bangla OCR Problem",
    content: `Bangla script is beautiful but technically challenging:

**50+ base characters** — More than double the Latin alphabet
**Compound letters (যুক্তবর্ণ)** — Two or more consonants combine into a single glyph
**Vowel diacritics** — Attach to consonants in unpredictable positions
**Encoding chaos** — The same visual character can have multiple Unicode representations

The biggest headache? **Normalization.** A word like "বাংলা" (Bangla) can be encoded multiple ways that look identical but fail string matching. I had to build custom cleaning pipelines using \`unicodedata.normalize("NFKC", text)\` before embedding.

Tesseract's \`ben+eng\` mode handles most cases, but compound characters like ক্ষ (ক + ষ rendered as one glyph) still sometimes get split or misrecognized. It's not perfect — but it works well enough for textbook PDFs.`,
    examples: [
      { issue: "যুক্তবর্ণ (compounds)", example: "ক্ষ = ক + ষ (but rendered as one glyph)" },
      { issue: "Multiple encodings", example: '"বাংলা" can be 5+ different byte sequences' },
      { issue: "Diacritic placement", example: "ি vs ী attach at different positions" },
    ],
  },

  // Evaluation section
  evaluation: {
    title: "Evaluation Approach",
    content: `I wanted to know if the answers were actually good — not just "it runs without crashing." So I built a simple evaluation pipeline:

**Semantic Similarity**: Using \`paraphrase-multilingual-MiniLM-L12-v2\` from Sentence Transformers, I compare the generated answer to an expected answer. This works across languages — crucial for Bangla.

**Grounding Check**: Does the expected answer appear in the retrieved context? If yes, the retrieval pipeline is doing its job.

**Test Cases**: Manually curated questions from my HSC Bangla textbook (অপরিচিতা story) with expected answers. Example: "কল্যানীর বাবার নাম কী ছিল?" → "শম্ভুনাথ বাবু"

This isn't production-grade evaluation (no automated test suites, no A/B testing), but it gave me confidence that the system actually worked for my use case.`,
  },

  // Lessons learned - more humble and reflective
  lessons: {
    title: "Lessons Learned",
    content: `Let me be honest: this was a learning project. I built it to study for exams and to understand RAG systems hands-on. Looking back, I can see plenty of things that aren't best practices — but that's exactly why I learned so much.

**What worked well:**
- Gemini embeddings were the right call for multilingual — OpenAI's ada-002 just couldn't handle Bangla semantic similarity
- Local-first design made it actually usable for my study materials (I wasn't going to upload my entire textbook collection to some cloud service)
- Streamlit let me iterate on the UI in hours instead of days
- The evaluation pipeline, even though simple, caught real issues early

**What I'd do differently now:**
- Use a more robust OCR pipeline — maybe ensemble Tesseract with EasyOCR or PaddleOCR for better compound character handling
- Implement paragraph-aware chunking instead of just character counts (LangChain's RecursiveCharacterTextSplitter is convenient but not optimal for structured text)
- Add proper caching — recomputing embeddings for the same document every time is wasteful
- Write actual tests. I learned this the hard way when a "small refactor" broke the entire OCR pipeline and I didn't notice for two days
- Use a proper config file instead of hardcoded values scattered across files

**The honest truth:** This project taught me more about text processing edge cases than any course could. Bangla OCR alone took weeks to get right. Unicode normalization? I now have opinions about NFKC vs NFC. Chunking strategies? I understand why people write papers about this.

It's not the cleanest codebase. It's not production-ready. But it works, it helped me study, and I learned a ton building it. Sometimes that's enough.`,
  },

  // Screenshots
  screenshots: [
    {
      src: "/assets/projects/pdf-alap/general.png",
      alt: "PDF-ALAP main interface showing chat with uploaded PDF",
      caption: "The Streamlit interface: upload PDFs and chat in Bangla or English",
    },
    {
      src: "/assets/projects/pdf-alap/demo.png",
      alt: "Demo of PDF-ALAP answering a question",
      caption: "Answering questions from a Bangla textbook (HSC অপরিচিতা)",
    },
    {
      src: "/assets/projects/pdf-alap/gen2.png",
      alt: "PDF-ALAP generating response",
      caption: "Context-aware responses grounded in document content",
    },
  ],

  // Use cases
  useCases: [
    { emoji: "📚", title: "Education", description: "Study from textbooks and exam papers" },
    { emoji: "⚖️", title: "Legal", description: "Search through legal documents" },
    { emoji: "📝", title: "Research", description: "Query academic papers and notes" },
    { emoji: "🧾", title: "HR", description: "Compare resumes with job descriptions" },
  ],

  // Prompt template (extracted from actual code)
  promptTemplate: `You will be given a pdf as context. Once you get the question look for answer in the whole pdf. Try to reason with it.
You may even need to calculate or solve a problem based on the context, even need to get the idea.
Even if you can't find any direct answer, try to answer the question based on the whole pdf.
Try to be specific in your answer. You may even need to find relation between people on the story or the context in the pdf.
If you can't find any direct answer try to answer the question based on the whole pdf.
Don't over justify your answer. Try to be concise. Give the main answer in bold first, then explain a bit if necessary.
Respond in the same language as the question.`,
};

export default pdfAlapData;
