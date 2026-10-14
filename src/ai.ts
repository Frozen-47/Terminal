export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export interface AskAIParams {
  message: string;
  history: ChatMessage[];
}

const LOCAL_KNOWLEDGE = [
  {
    keywords: ['who are you', 'who is elsa', 'your name', 'identity'],
    response: "I'm Elsa, the interactive AI assistant for Sabareesh's (Frozen) portfolio. I can answer questions about his software projects, technical skills, experience, education, and how to get in touch!"
  },
  {
    keywords: ['who is sabareesh', 'about sabareesh', 'who is frozen', 'bio', 'background'],
    response: "Sabareesh (known online as Frozen) is an Information Technology student and software developer from Erode, Tamil Nadu, India. He specializes in C++, Java, Python, and modern web systems, focusing on writing clean, optimized, and performant code."
  },
  {
    keywords: ['tech stack', 'languages', 'skills', 'technologies', 'programming language'],
    response: "Sabareesh's technical stack spans:\n• Languages: Java, C, C++, Python, HTML, CSS, TypeScript\n• Core Computer Science: Data Structures & Algorithms, Object-Oriented Programming (OOP), Linux system administration, Git version control, Clerk auth\n• Cloud & Deployment: Vercel, Supabase, Netlify, Render, GitHub Pages"
  },
  {
    keywords: ['devsnapz', 'founder'],
    response: "DevSnapz is a developer-first community hub founded and built by Sabareesh. It enables creators to showcase projects, receive mentorship, share guidance threads, and sponsor open-source work. Built using React, TypeScript, Tailwind, and Vite with local-first database state."
  },
  {
    keywords: ['aiverse', 'ai encyclopedia'],
    response: "AIverse (https://aiverse.frozenn.in) is Sabareesh's open-source AI encyclopedia. It organizes and catalogs modern AI tools, LLMs, and models in a unified, searchable registry. He actively welcomes open-source contributors!"
  },
  {
    keywords: ['grade calculator', 'gpa', 'cgpa'],
    response: "Grade Calculator (https://getgpa.vercel.app/) is a clean and blazing-fast web tool built by Sabareesh to compute GPA and CGPA instantly using a 10-point academic grading scale."
  },
  {
    keywords: ['todo', 'to-do'],
    response: "To-do App is an interactive terminal-style task manager created by Sabareesh for both Android and web, designed with a command-line aesthetic for high-efficiency task creation and tracking (GitHub: Frozen-47/To-do)."
  },
  {
    keywords: ['arcticdex'],
    response: "ArcticDEX is a cross-platform, customizable science fiction terminal emulator featuring hardware monitoring and touchscreen support (GitHub: Frozen-47/ArcticDEX)."
  },
  {
    keywords: ['solunar', 'discord'],
    response: "Solunar is a minimal, elegant Discord theme built by Sabareesh for Vencord, tuned with balanced colors and clean aesthetics for dark and light modes (GitHub: Frozen-47/Solunar)."
  },
  {
    keywords: ['projects', 'what has he built', 'repositories', 'portfolio works'],
    response: "Sabareesh has 20+ active GitHub repositories. Highlights include:\n1. AIverse (https://aiverse.frozenn.in) - Open-source AI encyclopedia\n2. Grade Calculator (https://getgpa.vercel.app/) - Fast GPA/CGPA tool\n3. DevSnapz (https://github.com/DevSnapz/Landing) - Developer hub & showcase\n4. To-do App (GitHub: Frozen-47/To-do) - Terminal-styled productivity tool\n5. ArcticDEX (GitHub: Frozen-47/ArcticDEX) - Sci-fi terminal emulator\n6. Solunar (GitHub: Frozen-47/Solunar) - Minimalist Discord theme\n7. WordsMuseum (GitHub: Frozen-47/WordsMuseum) - Interactive HTML typography"
  },
  {
    keywords: ['experience', 'work', 'timeline', 'career'],
    response: "Sabareesh's experience includes:\n• Founder & Builder @ DevSnapz (Currently Building) — Crafting a developer community and project showcase hub.\n• Independent Developer (2023 – Present) — Developing and shipping responsive web apps, managing Linux configurations and cloud deployments.\n• Collaborative Programming on GitHub — Managing branch-based student repositories, pull requests, and Git workflows."
  },
  {
    keywords: ['contact', 'email', 'discord', 'reach', 'hire', 'collaborate'],
    response: "You can reach Sabareesh directly via:\n• Email: sabareeshgm47@gmail.com\n• Discord: frozen (User ID: 1272910357517701147)\n• GitHub: https://github.com/Frozen-47\n• Portfolio: https://frozenn.in"
  },
  {
    keywords: ['resume', 'cv'],
    response: "You can view or download Sabareesh's résumé directly at /Resume.pdf or by typing 'resume' into the terminal!"
  },
  {
    keywords: ['education', 'college', 'studying', 'where is he studying'],
    response: "Sabareesh is an Information Technology undergraduate student based in Erode, Tamil Nadu, India, with strong passion for systems engineering and software architecture."
  },
  {
    keywords: ['cybersecurity', 'security'],
    response: "Cybersecurity is one of Sabareesh's core areas of passion alongside software engineering. He regularly explores cryptographic primitives, secure coding, and hands-on decryption challenges like the one built into this terminal (type 'game' to play)!"
  }
];

export const askAI = async (params: AskAIParams | string): Promise<string> => {
  const message = typeof params === 'string' ? params : params.message;
  const history = typeof params === 'string' ? [] : params.history;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.reply) return data.reply;
    }
  } catch {
    // Fall through to smart local offline responder
  }

  // Smart local fallback using local knowledge base
  const lower = message.toLowerCase();
  for (const item of LOCAL_KNOWLEDGE) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.response;
    }
  }

  // Context-aware generic fallback
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello! I'm Elsa. How can I help you explore Sabareesh's portfolio today? You can ask about his projects, skills, experience, or try commands in the terminal.";
  }

  return "Sabareesh is an IT student and developer focused on backend systems, Java, C++, and modern web engineering. Feel free to ask about his specific projects (like AIverse, Grade Calculator, DevSnapz), his skills, or type 'help' in the terminal for more commands!";
};