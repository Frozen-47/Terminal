export type LanguageCode = 'en' | 'ta' | 'es' | 'de' | 'ja' | 'hi' | 'fr';

export const ACTION_MESSAGES: Record<LanguageCode, { copied: string; resume: string; copyError: string; dismiss: string }> = {
  en: { copied: 'Email copied successfully', resume: 'Opening résumé in a new tab…', copyError: 'Could not copy email. Please try again.', dismiss: 'Dismiss notification' },
  ta: { copied: 'மின்னஞ்சல் வெற்றிகரமாக நகலெடுக்கப்பட்டது', resume: 'புதிய தாவலில் சுயவிவரம் திறக்கப்படுகிறது…', copyError: 'மின்னஞ்சலை நகலெடுக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.', dismiss: 'அறிவிப்பை மூடு' },
  es: { copied: 'Correo copiado correctamente', resume: 'Abriendo el currículum en una nueva pestaña…', copyError: 'No se pudo copiar el correo. Inténtalo de nuevo.', dismiss: 'Cerrar notificación' },
  de: { copied: 'E-Mail-Adresse erfolgreich kopiert', resume: 'Lebenslauf wird in einem neuen Tab geöffnet…', copyError: 'E-Mail-Adresse konnte nicht kopiert werden. Bitte erneut versuchen.', dismiss: 'Benachrichtigung schließen' },
  ja: { copied: 'メールアドレスをコピーしました', resume: '新しいタブで履歴書を開いています…', copyError: 'コピーできませんでした。もう一度お試しください。', dismiss: '通知を閉じる' },
  hi: { copied: 'ईमेल सफलतापूर्वक कॉपी किया गया', resume: 'नए टैब में रिज़्यूमे खुल रहा है…', copyError: 'ईमेल कॉपी नहीं हुआ। फिर कोशिश करें।', dismiss: 'सूचना बंद करें' },
  fr: { copied: 'Adresse e-mail copiée', resume: 'Ouverture du CV dans un nouvel onglet…', copyError: 'Impossible de copier l’adresse e-mail. Réessayez.', dismiss: 'Fermer la notification' },
};

export const PROJECT_SEARCH_LABELS: Record<LanguageCode, {
  placeholder: string; clear: string; empty: string; next: string; pinned: string; others: string; refresh: string;
}> = {
  en: { placeholder: 'Search projects, technologies, or ideas…', clear: 'Clear search', empty: 'No projects found in this tab. Try another search or tab.', next: 'Next projects', pinned: 'Pinned', others: 'Others', refresh: 'Refresh repositories' },
  ta: { placeholder: 'திட்டங்கள், தொழில்நுட்பங்கள் அல்லது யோசனைகளைத் தேடுங்கள்…', clear: 'தேடலை அழி', empty: 'இந்தத் தாவலில் திட்டங்கள் இல்லை. வேறு தேடல் அல்லது தாவலை முயற்சிக்கவும்.', next: 'அடுத்த திட்டங்கள்', pinned: 'பின் செய்தவை', others: 'மற்றவை', refresh: 'களஞ்சியங்களைப் புதுப்பி' },
  es: { placeholder: 'Busca proyectos, tecnologías o ideas…', clear: 'Borrar búsqueda', empty: 'No hay proyectos en esta pestaña. Prueba otra búsqueda o pestaña.', next: 'Siguientes proyectos', pinned: 'Fijados', others: 'Otros', refresh: 'Actualizar repositorios' },
  de: { placeholder: 'Projekte, Technologien oder Ideen suchen…', clear: 'Suche löschen', empty: 'Keine Projekte in diesem Tab gefunden. Versuche eine andere Suche oder einen anderen Tab.', next: 'Nächste Projekte', pinned: 'Angeheftet', others: 'Weitere', refresh: 'Repositorys aktualisieren' },
  ja: { placeholder: 'プロジェクト・技術・アイデアを検索…', clear: '検索をクリア', empty: 'このタブには該当するプロジェクトがありません。検索語やタブを変更してください。', next: '次のプロジェクト', pinned: 'ピン留め', others: 'その他', refresh: 'リポジトリを更新' },
  hi: { placeholder: 'प्रोजेक्ट, तकनीक या विचार खोजें…', clear: 'खोज साफ़ करें', empty: 'इस टैब में कोई प्रोजेक्ट नहीं मिला। दूसरी खोज या टैब आज़माएँ।', next: 'अगले प्रोजेक्ट', pinned: 'पिन किए गए', others: 'अन्य', refresh: 'रिपॉज़िटरी रीफ़्रेश करें' },
  fr: { placeholder: 'Rechercher des projets, technologies ou idées…', clear: 'Effacer la recherche', empty: 'Aucun projet dans cet onglet. Essayez une autre recherche ou un autre onglet.', next: 'Projets suivants', pinned: 'Épinglés', others: 'Autres', refresh: 'Actualiser les dépôts' },
};

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
];

export interface PinnedRepoTranslation {
  description: string;
  tag: string;
}

export interface TimelineItemTranslation {
  title: string;
  subtitle: string;
  date: string;
  badge: string | null;
  description: string[];
}

export interface TranslationStrings {
  role: string;
  aboutP1Part1: string;
  aboutP1SoftwareDev: string;
  aboutP1And: string;
  aboutP1Cybersecurity: string;
  aboutP1Part2: string;
  aboutP1Python: string;
  aboutP1Comma: string;
  aboutP1Cpp: string;
  aboutP1AndLang: string;
  aboutP1Java: string;
  aboutP1Part3: string;
  aboutP2Part1: string;
  aboutP2Repos: string;
  aboutP2Part2: string;
  viewResume: string;
  copyEmail: string;
  emailCopied: string;
  aiChat: string;
  contributionsOn: string;
  experienceTitle: string;
  experienceSubtitle: string;
  skillsTitle: string;
  skillsSubtitle: string;
  collapse: string;
  showAll: string;
  projectsTitle: string;
  projectsSubtitle: string;
  tabPinned: string;
  tabOthers: string;
  viewAllGitHub: string;
  footerCredits: string;
  location: string;
  loadingRepos: string;
  starSingular: string;
  starPlural: string;
  switchToLight: string;
  switchToDark: string;
  categories: Record<string, string>;
  skillNames: Record<string, string>;
  pinnedRepos: Record<string, PinnedRepoTranslation>;
  experienceTimeline: TimelineItemTranslation[];
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    role: 'IT Student & Software Developer',
    aboutP1Part1: "Hi, I'm Sabareesh, an IT student passionate about ",
    aboutP1SoftwareDev: 'software development',
    aboutP1And: ' and ',
    aboutP1Cybersecurity: 'cybersecurity',
    aboutP1Part2: '. I have hands-on experience with ',
    aboutP1Python: 'Python',
    aboutP1Comma: ', ',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: ', and ',
    aboutP1Java: 'Java',
    aboutP1Part3: ', focusing on writing optimized, efficient code. Eager to learn, grow, and build impactful real-world solutions.',
    aboutP2Part1: 'I have ',
    aboutP2Repos: '20+ repositories',
    aboutP2Part2: ' on GitHub featuring projects, tools, and experiments — constantly exploring new technologies and shipping clean, practical solutions.',
    viewResume: 'View Resume',
    copyEmail: 'Copy Email',
    emailCopied: 'Email Copied',
    aiChat: 'AI Chat',
    contributionsOn: 'contributions on',
    experienceTitle: 'Experience',
    experienceSubtitle: 'Professional timeline and work achievements',
    skillsTitle: 'Skills & Technologies',
    skillsSubtitle: 'Tools, frameworks, and foundational CS concepts I build with',
    collapse: 'Collapse',
    showAll: 'Show All',
    projectsTitle: 'Projects',
    projectsSubtitle: 'Some of my active builds and open-source contributions',
    tabPinned: 'Pinned',
    tabOthers: 'All Repos',
    viewAllGitHub: 'View all on GitHub',
    footerCredits: 'Designed & Developed by Sabareesh GanesaMoorthi',
    location: 'Erode, India',
    loadingRepos: 'Loading recent repositories from GitHub...',
    starSingular: 'star',
    starPlural: 'stars',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    categories: {
      Languages: 'Languages',
      Core: 'Core',
      Hosting: 'Hosting',
    },
    skillNames: {
      'Data Structures': 'Data Structures',
      Algorithms: 'Algorithms',
      'Problem Solving': 'Problem Solving',
      OOPs: 'OOPs',
    },
    pinnedRepos: {
      AiVerse: {
        description: 'Open-source AI encyclopedia. Organizing AI tools & models in one place. Looking for collaborators to help build this together! 🚀',
        tag: 'Live',
      },
      'To-do': {
        description: 'An interactive terminal-style To-Do list application built with HTML and CSS. Designed to give a command-line experience inside the browser for managing tasks.',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'A clean and fast web app to calculate GPA and CGPA. Enter subjects, credits, and grades — the calculator instantly gives accurate results using a 10-point grading system.',
        tag: 'Live',
      },
      ArcticDEX: {
        description: 'A cross-platform, customizable science fiction terminal emulator with advanced monitoring & touchscreen support.',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'A custom minimal Discord theme for Vencord, focused on clean UI, smooth colors, and a balanced dark/light experience. Designed for simplicity lovers. 🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: 'The official landing page and web application codebase for DevSnapz — an interactive project showcase, collaboration, and sponsorship hub for developers.',
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: 'Founder & Builder',
        subtitle: '⚡ DevSnapz',
        date: 'Currently Building',
        badge: 'Active',
        description: [
          'Building a developer-first community hub to showcase creations, get mentorship, and sponsor open source.',
          'Implemented Project Showcase, Guidance Boards, and Code Contributions using React, TypeScript, Tailwind, and Vite.',
          'Integrated local-first database state for persisting guidance threads, backer lists, and projects inside browser storage.',
        ],
      },
      {
        title: 'Independent Developer',
        subtitle: 'Self-Directed',
        date: '2023 – Present',
        badge: 'Remote',
        description: [
          'Designed, developed, and deployed multiple web applications using modern front-end technologies.',
          'Configured Linux-based environments; managed packages, permissions, and shell scripts.',
          'Maintained personal portfolio site with custom web hosting configuration and Git version control.',
        ],
      },
      {
        title: 'Collaborative Programming',
        subtitle: 'GitHub Project',
        date: 'Past',
        badge: null,
        description: [
          'Built and maintained a shared repository for class programming exercises.',
          'Implemented branch-based contributions where each student manages their own code.',
          'Practiced Git workflows: branching, merging, pull requests, and conflict resolution.',
          'Strengthened team collaboration and code organization skills.',
        ],
      },
    ],
  },
  ta: {
    role: 'ஐடி மாணவர் & மென்பொருள் உருவாக்குநர்',
    aboutP1Part1: 'வணக்கம், நான் சபரீஷ். ',
    aboutP1SoftwareDev: 'மென்பொருள் மேம்பாடு',
    aboutP1And: ' மற்றும் ',
    aboutP1Cybersecurity: 'சைபர் பாதுகாப்பு',
    aboutP1Part2: ' துறைகளில் மிகுந்த ஆர்வம் கொண்ட தகவல் தொழில்நுட்ப மாணவர். ',
    aboutP1Python: 'Python',
    aboutP1Comma: ', ',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: ' மற்றும் ',
    aboutP1Java: 'Java',
    aboutP1Part3: ' கொண்டு வேகமான, உகந்த நிரல்களை உருவாக்குவதில் அனுபவம் பெற்றவன். புதிய தொழில்நுட்பங்களைக் கற்கவும், நடைமுறைத் தீர்வுகளை உருவாக்கவும் ஆர்வமாக உள்ளேன்.',
    aboutP2Part1: 'பயனுள்ள செயலிகள், கருவிகள் மற்றும் சோதனைக் களங்களை உள்ளடக்கிய ',
    aboutP2Repos: '20-க்கும் மேற்பட்ட களஞ்சியங்களை (Repositories)',
    aboutP2Part2: ' GitHub-ல் உருவாக்கியுள்ளேன் — எப்போதும் புதிய தொழில்நுட்பங்களை ஆராய்ந்து எளிய, சிறந்த தீர்வுகளை வழங்கி வருகிறேன்.',
    viewResume: 'விவரக்குறிப்பு (Resume)',
    copyEmail: 'மின்னஞ்சலை நகலெடு',
    emailCopied: 'நகலெடுக்கப்பட்டது',
    aiChat: 'AI உரையாடல்',
    contributionsOn: 'பங்களிப்புகள் -',
    experienceTitle: 'அனுபவம்',
    experienceSubtitle: 'பணிப் பயணம் மற்றும் முக்கிய சாதனைகள்',
    skillsTitle: 'திறன்கள் & தொழில்நுட்பங்கள்',
    skillsSubtitle: 'நான் பயன்படுத்தும் கருவிகள், கட்டமைப்புகள் மற்றும் கணினி அடிப்படைகள்',
    collapse: 'சுருக்கு',
    showAll: 'அனைத்தையும் காட்டு',
    projectsTitle: 'திட்டங்கள்',
    projectsSubtitle: 'எனது முக்கிய படைப்புகள் மற்றும் திறந்த மூல பங்களிப்புகள்',
    tabPinned: 'முக்கியமானவை',
    tabOthers: 'அனைத்து திட்டங்களும்',
    viewAllGitHub: 'GitHub-ல் அனைத்தையும் காண்க',
    footerCredits: 'சபரீஷ் கணேசமூர்த்தி அவர்களால் வடிவமைக்கப்பட்டு உருவாக்கப்பட்டது',
    location: 'ஈரோடு, இந்தியா',
    loadingRepos: 'GitHub-லிருந்து களஞ்சியங்கள் ஏற்றப்படுகின்றன...',
    starSingular: 'ஸ்டார்',
    starPlural: 'ஸ்டார்கள்',
    switchToLight: 'லைட் மோடுக்கு மாற்றுக',
    switchToDark: 'டார்க் மோடுக்கு மாற்றுக',
    categories: {
      Languages: 'மொழிகள்',
      Core: 'அடிப்படை',
      Hosting: 'ஹோஸ்டிங்',
    },
    skillNames: {
      'Data Structures': 'தரவு கட்டமைப்புகள்',
      Algorithms: 'அல்காரிதம்கள்',
      'Problem Solving': 'சிக்கல் தீர்த்தல்',
      OOPs: 'பொருள்சார் நிரலாக்கம் (OOP)',
    },
    pinnedRepos: {
      AiVerse: {
        description: 'திறந்த மூல செயற்கை நுண்ணறிவு கலைக்களஞ்சியம். AI கருவிகள் மற்றும் மாதிரிகளை ஒரே இடத்தில் ஒழுங்கமைக்கிறது. இணைந்து உருவாக்க வாருங்கள்! 🚀',
        tag: 'நேரலை',
      },
      'To-do': {
        description: 'HTML மற்றும் CSS கொண்டு உருவாக்கப்பட்ட டெர்மினல் பாணியிலான பணி மேலாண்மை செயலி. உலாவிக்குள் கட்டளை வரி (CLI) அனுபவத்தை வழங்குகிறது.',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'GPA மற்றும் CGPA-ஐ உடனடியாகக் கணக்கிடும் விரைவான இணைய செயலி. பாடங்கள் மற்றும் மதிப்பெண்களை உள்ளிட்டால் 10-புள்ளி அளவீட்டில் துல்லியமான முடிவுகளைத் தரும்.',
        tag: 'நேரலை',
      },
      ArcticDEX: {
        description: 'கணினி அளவீட்டு கண்காணிப்பு மற்றும் தொடுதிரை ஆதரவுடன் கூடிய தனிப்பயனாக்கக்கூடிய அறிவியல் புனைகதை டெர்மினல் எமுலேட்டர்.',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'Vencord-க்கான தூய, எளிய டிஸ்கார்ட் தீம். சீரான டார்க்/லைட் அனுபவம் மற்றும் எளிமையை விரும்புவோருக்கான வடிவமைப்பு. 🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: 'DevSnapz-ன் அதிகாரப்பூர்வ இறங்குப் பக்கம். உருவாக்குநர்கள் தங்கள் படைப்புகளைக் காட்சிப்படுத்தவும், வழிகாட்டல் பெறவும் உருவான தளம்.',
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: 'நிறுவனர் & உருவாக்குநர்',
        subtitle: '⚡ DevSnapz',
        date: 'தற்போது கட்டமைக்கப்படுகிறது',
        badge: 'செயலில்',
        description: [
          'உருவாக்குநர்கள் தங்கள் திட்டங்களைக் காட்சிப்படுத்தவும், வழிகாட்டல் பெறவும், திறந்த மூலத்தை ஆதரிக்கவும் ஒரு சமூக மையத்தை உருவாக்கி வருகிறேன்.',
          'React, TypeScript, Tailwind மற்றும் Vite பயன்படுத்தி Project Showcase, Guidance Boards மற்றும் Code Contributions அம்சங்களை உருவாக்கினேன்.',
          'வழிகாட்டல் பதிவுகள், ஆதரவாளர்கள் பட்டியல் மற்றும் திட்டங்களை உலாவி நினைவகத்தில் சேமிக்க Local-First தரவுத்தள நிலையை ஒருங்கிணைத்தேன்.',
        ],
      },
      {
        title: 'தனித்த உருவாக்குநர்',
        subtitle: 'சுய கற்றல்',
        date: '2023 – தற்போது',
        badge: 'தொலைதூரப் பணி',
        description: [
          'நவீன முன்னணித் தொழில்நுட்பங்களைப் பயன்படுத்தி பல வலைப்பின்னல் செயலிகளை வடிவமைத்து, உருவாக்கி வெளியிட்டேன்.',
          'லினக்ஸ் அடிப்படையிலான சூழல்களை அமைத்தேன்; தொகுப்புகள், அனுமதிகள் மற்றும் ஷெல் ஸ்கிரிப்ட்களை நிர்வகித்தேன்.',
          'தனிப்பயன் வலை ஹோஸ்டிங் கட்டமைப்பு மற்றும் கிட் பதிப்புக் கட்டுப்பாட்டுடன் போர்ட்ஃபோலியோ தளத்தைப் பராமரித்தேன்.',
        ],
      },
      {
        title: 'கூட்டு நிரலாக்கம்',
        subtitle: 'GitHub திட்டம்',
        date: 'கடந்த கால',
        badge: null,
        description: [
          'வகுப்பு நிரலாக்க பயிற்சிகளுக்காக ஒரு பகிரப்பட்ட களஞ்சியத்தை உருவாக்கி பராமரித்தேன்.',
          'ஒவ்வொரு மாணவரும் தங்கள் சொந்த குறியீட்டை நிர்வகிக்கும் கிளை அடிப்படையிலான (branch-based) பங்களிப்புகளை அமைத்தேன்.',
          'Git பணிப்பாய்வுகளை நடைமுறைப்படுத்தினேன்: கிளைத்தல், இணைத்தல், இழுத்தல் கோரிக்கைகள் மற்றும் முரண்பாடுகளைத் தீர்த்தல்.',
          'குழு ஒத்துழைப்பு மற்றும் குறியீட்டு அமைப்புத் திறன்களை வலுப்படுத்தினேன்.',
        ],
      },
    ],
  },
  es: {
    role: 'Estudiante de TI & Desarrollador de Software',
    aboutP1Part1: 'Hola, soy Sabareesh, un estudiante de TI apasionado por el ',
    aboutP1SoftwareDev: 'desarrollo de software',
    aboutP1And: ' y la ',
    aboutP1Cybersecurity: 'ciberseguridad',
    aboutP1Part2: '. Cuento con experiencia práctica en ',
    aboutP1Python: 'Python',
    aboutP1Comma: ', ',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: ' y ',
    aboutP1Java: 'Java',
    aboutP1Part3: ', enfocado en escribir código optimizado y eficiente. Con ganas de aprender, crecer y crear soluciones reales de gran impacto.',
    aboutP2Part1: 'Tengo más de ',
    aboutP2Repos: '20 repositorios',
    aboutP2Part2: ' en GitHub con proyectos, herramientas y experimentos — explorando constantemente nuevas tecnologías y publicando soluciones limpias y prácticas.',
    viewResume: 'Ver Currículum',
    copyEmail: 'Copiar Correo',
    emailCopied: 'Correo Copiado',
    aiChat: 'Chat IA',
    contributionsOn: 'contribuciones en',
    experienceTitle: 'Experiencia',
    experienceSubtitle: 'Trayectoria profesional y logros alcanzados',
    skillsTitle: 'Habilidades & Tecnologías',
    skillsSubtitle: 'Herramientas, frameworks y conceptos clave con los que construyo',
    collapse: 'Colapsar',
    showAll: 'Mostrar todo',
    projectsTitle: 'Proyectos',
    projectsSubtitle: 'Algunas de mis creaciones y contribuciones de código abierto',
    tabPinned: 'Destacados',
    tabOthers: 'Todos los Repos',
    viewAllGitHub: 'Ver todo en GitHub',
    footerCredits: 'Diseñado y desarrollado por Sabareesh GanesaMoorthi',
    location: 'Erode, India',
    loadingRepos: 'Cargando repositorios recientes desde GitHub...',
    starSingular: 'estrella',
    starPlural: 'estrellas',
    switchToLight: 'Cambiar a modo claro',
    switchToDark: 'Cambiar a modo oscuro',
    categories: {
      Languages: 'Lenguajes',
      Core: 'Núcleo',
      Hosting: 'Alojamiento',
    },
    skillNames: {
      'Data Structures': 'Estructuras de Datos',
      Algorithms: 'Algoritmos',
      'Problem Solving': 'Resolución de Problemas',
      OOPs: 'POO',
    },
    pinnedRepos: {
      AiVerse: {
        description: 'Enciclopedia de IA de código abierto. Organiza herramientas y modelos de IA en un solo lugar. ¡Buscando colaboradores para construir esto juntos! 🚀',
        tag: 'En vivo',
      },
      'To-do': {
        description: 'Aplicación interactiva de lista de tareas estilo terminal construida con HTML y CSS. Ofrece una experiencia de línea de comandos en el navegador.',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'Una aplicación web limpia y rápida para calcular GPA y CGPA al instante mediante un sistema de calificación de 10 puntos.',
        tag: 'En vivo',
      },
      ArcticDEX: {
        description: 'Emulador de terminal de ciencia ficción personalizable y multiplataforma con monitorización avanzada y soporte táctil.',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'Tema minimalista personalizado de Discord para Vencord, enfocado en interfaz limpia y balance claro/oscuro. 🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: 'Página de inicio y base de código oficial de DevSnapz: espacio interactivo para exhibir proyectos, colaborar y patrocinar.',
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: 'Fundador y Creador',
        subtitle: '⚡ DevSnapz',
        date: 'Construyendo actualmente',
        badge: 'Activo',
        description: [
          'Construyendo un centro comunitario para desarrolladores donde mostrar creaciones, recibir mentoría y patrocinar open source.',
          'Implementé escaparate de proyectos, tableros de orientación y aportes de código usando React, TypeScript, Tailwind y Vite.',
          'Integré base de datos local-first para persistir hilos, patrocinadores y proyectos en el navegador.',
        ],
      },
      {
        title: 'Desarrollador Independiente',
        subtitle: 'Autodidacta',
        date: '2023 – Presente',
        badge: 'Remoto',
        description: [
          'Diseñé, desarrollé y desplegué múltiples aplicaciones web utilizando tecnologías front-end modernas.',
          'Configuré entornos Linux, paquetes, permisos y scripts en shell.',
          'Mantuve sitio de portafolio personal con alojamiento personalizado y Git.',
        ],
      },
      {
        title: 'Programación Colaborativa',
        subtitle: 'Proyecto GitHub',
        date: 'Anterior',
        badge: null,
        description: [
          'Creé y mantuve un repositorio compartido para ejercicios prácticos de clase.',
          'Implementé flujos de trabajo basados en ramas donde cada estudiante gestiona su código.',
          'Practiqué Git: branching, merging, pull requests y resolución de conflictos.',
          'Fortalecí la colaboración en equipo y la organización de código.',
        ],
      },
    ],
  },
  de: {
    role: 'IT-Student & Softwareentwickler',
    aboutP1Part1: 'Hallo, ich bin Sabareesh, ein IT-Student mit Leidenschaft für ',
    aboutP1SoftwareDev: 'Softwareentwicklung',
    aboutP1And: ' und ',
    aboutP1Cybersecurity: 'Cybersicherheit',
    aboutP1Part2: '. Ich verfüge über praktische Erfahrung in ',
    aboutP1Python: 'Python',
    aboutP1Comma: ', ',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: ' und ',
    aboutP1Java: 'Java',
    aboutP1Part3: ', mit Fokus auf optimierten, effizienten Code. Stets motiviert zu lernen, mich weiterzuentwickeln und wirkungsvolle Lösungen zu schaffen.',
    aboutP2Part1: 'Ich besitze über ',
    aboutP2Repos: '20 Repositories',
    aboutP2Part2: ' auf GitHub mit Projekten, Tools und Experimenten — ständig auf der Suche nach neuen Technologien und sauberen, praktischen Lösungen.',
    viewResume: 'Lebenslauf ansehen',
    copyEmail: 'E-Mail kopieren',
    emailCopied: 'E-Mail kopiert',
    aiChat: 'KI-Chat',
    contributionsOn: 'Beiträge am',
    experienceTitle: 'Erfahrung',
    experienceSubtitle: 'Beruflicher Werdegang und Meilensteine',
    skillsTitle: 'Kenntnisse & Technologien',
    skillsSubtitle: 'Tools, Frameworks und CS-Grundlagen, mit denen ich entwickle',
    collapse: 'Einklappen',
    showAll: 'Alle anzeigen',
    projectsTitle: 'Projekte',
    projectsSubtitle: 'Einige meiner aktiven Builds und Open-Source-Beiträge',
    tabPinned: 'Highlights',
    tabOthers: 'Alle Repos',
    viewAllGitHub: 'Alle auf GitHub ansehen',
    footerCredits: 'Entworfen & entwickelt von Sabareesh GanesaMoorthi',
    location: 'Erode, Indien',
    loadingRepos: 'Lade aktuelle Repositories von GitHub...',
    starSingular: 'Stern',
    starPlural: 'Sterne',
    switchToLight: 'Zu hellem Modus wechseln',
    switchToDark: 'Zu dunklem Modus wechseln',
    categories: {
      Languages: 'Sprachen',
      Core: 'Kern',
      Hosting: 'Hosting',
    },
    skillNames: {
      'Data Structures': 'Datenstrukturen',
      Algorithms: 'Algorithmen',
      'Problem Solving': 'Problemlösung',
      OOPs: 'OOP',
    },
    pinnedRepos: {
      AiVerse: {
        description: 'Open-Source-KI-Enzyklopädie. Organisiert KI-Tools & Modelle an einem Ort. Auf der Suche nach Mitwirkenden! 🚀',
        tag: 'Live',
      },
      'To-do': {
        description: 'Interaktive To-Do-Listen-Anwendung im Terminal-Stil mit HTML und CSS. Bringt das Befehlszeilen-Erlebnis in den Browser.',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'Eine schlanke und schnelle Web-App zur sofortigen Berechnung von GPA und CGPA auf einer 10-Punkte-Skala.',
        tag: 'Live',
      },
      ArcticDEX: {
        description: 'Ein plattformübergreifender Sci-Fi-Terminal-Emulator mit Systemmetrik-Überwachung und Touchscreen-Unterstützung.',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'Ein minimalistisches Discord-Theme für Vencord mit klarer Benutzeroberfläche und ausgewogener Dark/Light-Darstellung. 🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: 'Die offizielle Landingpage und Codebasis für DevSnapz — ein interaktiver Showcase-, Kollaborations- und Sponsoring-Hub.',
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: 'Gründer & Entwickler',
        subtitle: '⚡ DevSnapz',
        date: 'Aktuell im Aufbau',
        badge: 'Aktiv',
        description: [
          'Aufbau eines Community-Hubs für Entwickler zum Präsentieren von Projekten, Mentoring und Sponsoring.',
          'Umsetzung von Projekt-Showcase, Leitfaden-Boards und Code-Beiträgen mit React, TypeScript, Tailwind und Vite.',
          'Integration eines Local-First-Datenbankzustands für Threads, Unterstützer und Projekte im Browser.',
        ],
      },
      {
        title: 'Freier Entwickler',
        subtitle: 'Selbstgesteuert',
        date: '2023 – Heute',
        badge: 'Remote',
        description: [
          'Konzeption, Entwicklung und Bereitstellung moderner Webanwendungen mit Front-End-Technologien.',
          'Konfiguration von Linux-Umgebungen, Paketverwaltung und Shell-Skripten.',
          'Pflege der Portfolio-Website mit benutzerdefinierter Hosting-Konfiguration und Git.',
        ],
      },
      {
        title: 'Kollaboratives Programmieren',
        subtitle: 'GitHub-Projekt',
        date: 'Früher',
        badge: null,
        description: [
          'Erstellung und Pflege eines gemeinsamen Repositorys für Programmierübungen.',
          'Etablierung branch-basierter Beiträge, bei denen jeder Studierende eigenen Code verwaltet.',
          'Praxisnahe Git-Workflows: Branching, Merging, Pull Requests und Konfliktlösung.',
          'Stärkung der Teamarbeit und Codeorganisation.',
        ],
      },
    ],
  },
  ja: {
    role: 'IT専攻学生 & ソフトウェアエンジニア',
    aboutP1Part1: 'こんにちは、サバリーシュ（Sabareesh）です。',
    aboutP1SoftwareDev: 'ソフトウェア開発',
    aboutP1And: 'と',
    aboutP1Cybersecurity: 'サイバーセキュリティ',
    aboutP1Part2: 'に情熱を注ぐIT専攻の学生です。',
    aboutP1Python: 'Python',
    aboutP1Comma: '、',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: '、',
    aboutP1Java: 'Java',
    aboutP1Part3: 'の実務経験があり、最適化された効率的なコードの記述に注力しています。学び、成長し、実用的なソリューションを構築することを目指しています。',
    aboutP2Part1: 'GitHub上にツール、Webアプリ、実験的プロジェクトなど',
    aboutP2Repos: '20以上のリポジトリ',
    aboutP2Part2: 'を公開中。常に新しい技術を探求し、クリーンで実践的な成果物を届けています。',
    viewResume: '履歴書を見る',
    copyEmail: 'メールをコピー',
    emailCopied: 'コピー完了',
    aiChat: 'AIチャット',
    contributionsOn: 'コントリビューション：',
    experienceTitle: '経歴',
    experienceSubtitle: '職務経歴と主な実績',
    skillsTitle: 'スキル & テクノロジー',
    skillsSubtitle: '活用しているツール、フレームワーク、およびCSの基礎',
    collapse: '折りたたむ',
    showAll: 'すべて表示',
    projectsTitle: 'プロジェクト',
    projectsSubtitle: 'アクティブな開発とオープンソース貢献',
    tabPinned: '注目',
    tabOthers: 'すべてのリポ',
    viewAllGitHub: 'GitHubですべて見る',
    footerCredits: 'Sabareesh GanesaMoorthi によるデザイン & 開発',
    location: 'インド、エロード',
    loadingRepos: 'GitHubからリポジトリを読み込み中...',
    starSingular: 'スター',
    starPlural: 'スター',
    switchToLight: 'ライトモードに切替',
    switchToDark: 'ダークモードに切替',
    categories: {
      Languages: 'プログラミング言語',
      Core: 'コア基礎',
      Hosting: 'ホスティング',
    },
    skillNames: {
      'Data Structures': 'データ構造',
      Algorithms: 'アルゴリズム',
      'Problem Solving': '問題解決',
      OOPs: 'オブジェクト指向',
    },
    pinnedRepos: {
      AiVerse: {
        description: 'オープンソースのAI百科事典。AIツールやモデルをワンストップで体系化。共同開発者を募集中！ 🚀',
        tag: '公開中',
      },
      'To-do': {
        description: 'HTMLとCSSで構築されたターミナル風インタラクティブToDoアプリ。ブラウザ内でコマンドライン操作の感覚を提供します。',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'GPAとCGPAを瞬時に計算するクリーンで高速なWebアプリ。10段階評価で科目の単位と成績から正確な結果を算出します。',
        tag: '公開中',
      },
      ArcticDEX: {
        description: '高度なモニタリングとタッチスクリーン対応を備えた、クロスプラットフォームのSFターミナルエミュレータ。',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'Vencord向けのミニマルなDiscordカスタムテーマ。美しいUIと調和の取れたダーク/ライト体験を追求。🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: 'DevSnapzの公式ランディングページ。クリエイターがプロジェクトを発表し、コラボレーションや支援を受けるためのハブ。',
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: '創業者 & 開発者',
        subtitle: '⚡ DevSnapz',
        date: '現在開発中',
        badge: '進行中',
        description: [
          'クリエイターが作品を披露し、メンターシップを受け、オープンソースを支援できる開発者ファーストのコミュニティハブを構築。',
          'React、TypeScript、Tailwind、Viteを用いてプロジェクトショーケース、ガイダンスボード、コード貢献を実装。',
          'ブラウザストレージ内でスレッドや支援者リストを保持するLocal-Firstデータベース状態を統合。',
        ],
      },
      {
        title: 'インディペンデント開発者',
        subtitle: '独学・自主開発',
        date: '2023年 – 現在',
        badge: 'リモート',
        description: [
          'モダンなフロントエンド技術を活用し、複数のWebアプリケーションを設計、開発、公開。',
          'Linux環境の構築、パッケージ管理、権限設定、シェルスクリプト運用。',
          '独自ホスティング設定とGitバージョン管理によるポートフォリオサイトの保守・運用。',
        ],
      },
      {
        title: '共同プログラミング',
        subtitle: 'GitHubプロジェクト',
        date: '過去',
        badge: null,
        description: [
          'プログラミング演習のための共有リポジトリを構築および保守。',
          '各受講生が自身のコードを管理するブランチベースの貢献フローを確立。',
          'ブランチ作成、マージ、プルリクエスト、競合解決などのGitワークフローを実践。',
          'チームコラボレーションとコード整理能力を強化。',
        ],
      },
    ],
  },
  hi: {
    role: 'आईटी छात्र और सॉफ्टवेयर डेवलपर',
    aboutP1Part1: 'नमस्ते, मैं सबरीश हूँ, ',
    aboutP1SoftwareDev: 'सॉफ्टवेयर डेवलपमेंट',
    aboutP1And: ' और ',
    aboutP1Cybersecurity: 'साइबर सुरक्षा',
    aboutP1Part2: ' में गहरी रुचि रखने वाला आईटी छात्र। मुझे ',
    aboutP1Python: 'Python',
    aboutP1Comma: ', ',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: ' और ',
    aboutP1Java: 'Java',
    aboutP1Part3: ' का व्यावहारिक अनुभव है, और मेरा ध्यान कुशल और अनुकूलित कोड लिखने पर रहता है। निरंतर सीखने, आगे बढ़ने और प्रभावशाली समाधान बनाने के लिए उत्सुक हूँ।',
    aboutP2Part1: 'गिटहब (GitHub) पर मेरे ',
    aboutP2Repos: '20 से अधिक रिपॉजिटरी',
    aboutP2Part2: ' हैं जिनमें प्रोजेक्ट्स, टूल्स और प्रयोग शामिल हैं — हमेशा नई तकनीकों की खोज और व्यावहारिक समाधान तैयार करने में तत्पर।',
    viewResume: 'बायोडाटा देखें',
    copyEmail: 'ईमेल कॉपी करें',
    emailCopied: 'कॉपी हो गया',
    aiChat: 'AI चैट',
    contributionsOn: 'योगदान तिथि:',
    experienceTitle: 'अनुभव',
    experienceSubtitle: 'व्यावसायिक यात्रा और उपलब्धियाँ',
    skillsTitle: 'कौशल और तकनीकें',
    skillsSubtitle: 'उपकरण, फ्रेमवर्क और कंप्यूटर साइंस के मूल सिद्धांत',
    collapse: 'छोटा करें',
    showAll: 'सभी देखें',
    projectsTitle: 'प्रोजेक्ट्स',
    projectsSubtitle: 'मेरे सक्रिय प्रोजेक्ट्स और ओपन-सोर्स योगदान',
    tabPinned: 'प्रमुख',
    tabOthers: 'सभी रिपॉजिटरी',
    viewAllGitHub: 'GitHub पर सभी देखें',
    footerCredits: 'सबरीश गणेषमूर्ति द्वारा डिज़ाइन और विकसित',
    location: 'इरोड, भारत',
    loadingRepos: 'गिटहब से नवीनतम रिपॉजिटरी लोड हो रही हैं...',
    starSingular: 'स्टार',
    starPlural: 'स्टार',
    switchToLight: 'लाइट मोड में बदलें',
    switchToDark: 'डार्क मोड में बदलें',
    categories: {
      Languages: 'भाषाएँ',
      Core: 'मूल अवधारणाएँ',
      Hosting: 'होस्टिंग',
    },
    skillNames: {
      'Data Structures': 'डेटा संरचनाएं',
      Algorithms: 'एल्गोरिदम',
      'Problem Solving': 'समस्या समाधान',
      OOPs: 'ऊप्स (OOP)',
    },
    pinnedRepos: {
      AiVerse: {
        description: 'ओपन-सोर्स AI विश्वकोश। AI टूल्स और मॉडल्स को एक ही स्थान पर व्यवस्थित करता है। साथ मिलकर निर्माण करने के लिए सहयोगियों का स्वागत है! 🚀',
        tag: 'लाइव',
      },
      'To-do': {
        description: 'HTML और CSS से बना टर्मिनल-शैली का टू-डू लिस्ट ऐप। ब्राउज़र में कमांड-लाइन जैसा अनुभव देने के लिए डिज़ाइन किया गया।',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'GPA और CGPA की त्वरित गणना के लिए एक स्वच्छ और तेज़ वेब ऐप। 10-पॉइंट ग्रेडिंग सिस्टम के आधार पर सटीक परिणाम देता है।',
        tag: 'लाइव',
      },
      ArcticDEX: {
        description: 'सिस्टम मेट्रिक्स मॉनिटरिंग और टचस्क्रीन सपोर्ट से लैस क्रॉस-प्लेटफ़ॉर्म साइंस-फ़िक्शन टर्मिनल एमुलेटर।',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'Vencord के लिए एक कस्टम मिनिमल डिस्कोर्ड थीम, जो स्वच्छ UI और संतुलित डार्क/लाइट अनुभव पर केंद्रित है। 🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: 'DevSnapz का आधिकारिक लैंडिंग पेज और कोडबेस — डेवलपर्स के लिए प्रोजेक्ट प्रदर्शन, सहयोग और प्रायोजन का हब।',
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: 'संस्थापक और निर्माता',
        subtitle: '⚡ DevSnapz',
        date: 'वर्तमान में निर्माणरत',
        badge: 'सक्रिय',
        description: [
          'डेवलपर्स के लिए कृतियों को प्रदर्शित करने, मेंटरशिप पाने और ओपन-सोर्स को प्रायोजित करने के लिए एक कम्युनिटी हब बना रहा हूँ।',
          'React, TypeScript, Tailwind और Vite का उपयोग करके प्रोजेक्ट शोकेस, गाइडेंस बोर्ड और कोड कंट्रीब्यूशन तैयार किया।',
          'ब्राउज़र स्टोरेज में गाइडेंस थ्रेड्स और प्रोजेक्ट्स को सुरक्षित रखने के लिए लोकल-फर्स्ट डेटाबेस स्टेट को एकीकृत किया।',
        ],
      },
      {
        title: 'स्वतंत्र डेवलपर',
        subtitle: 'स्व-निर्देशित',
        date: '2023 – वर्तमान',
        badge: 'रिमोट',
        description: [
          'आधुनिक फ्रंट-एंड तकनीकों का उपयोग करके कई वेब एप्लिकेशन डिज़ाइन, विकसित और तैनात किए।',
          'लिनक्स-आधारित वातावरण, पैकेज, अनुमतियाँ और शेल स्क्रिप्ट्स को कॉन्फ़िगर किया।',
          'कस्टम वेब होस्टिंग और Git वर्ज़न कंट्रोल के साथ पर्सनल पोर्टफोलियो का प्रबंधन किया।',
        ],
      },
      {
        title: 'सहयोगात्मक प्रोग्रामिंग',
        subtitle: 'गिटहब प्रोजेक्ट',
        date: 'पूर्व',
        badge: null,
        description: [
          'कक्षा प्रोग्रामिंग अभ्यासों के लिए एक साझा रिपॉजिटरी बनाई और उसका प्रबंधन किया।',
          'ब्रांच-आधारित योगदान लागू किया जहाँ प्रत्येक छात्र अपने कोड का स्वयं प्रबंधन करता है।',
          'Git वर्कफ़्लो का अभ्यास: ब्रांचिंग, मर्जिंग, पुल रिक्वेस्ट और विरोध समाधान।',
          'टीम सहयोग और कोड संगठन कौशल को सुदृढ़ किया।',
        ],
      },
    ],
  },
  fr: {
    role: 'Étudiant en informatique & Développeur',
    aboutP1Part1: "Bonjour, je m'appelle Sabareesh, étudiant en informatique passionné par le ",
    aboutP1SoftwareDev: 'développement logiciel',
    aboutP1And: ' et la ',
    aboutP1Cybersecurity: 'cybersécurité',
    aboutP1Part2: ". J'ai une expérience pratique avec ",
    aboutP1Python: 'Python',
    aboutP1Comma: ', ',
    aboutP1Cpp: 'C++',
    aboutP1AndLang: ' et ',
    aboutP1Java: 'Java',
    aboutP1Part3: ", axée sur l'écriture de code optimisé et performant. Désireux d'apprendre, d'évoluer et de créer des solutions concrètes.",
    aboutP2Part1: "J'ai plus de ",
    aboutP2Repos: '20 dépôts',
    aboutP2Part2: ' sur GitHub présentant des projets, des outils et des expérimentations — constamment à la découverte de nouvelles technologies et orienté vers des solutions claires.',
    viewResume: 'Voir le CV',
    copyEmail: "Copier l'email",
    emailCopied: 'Email copié',
    aiChat: 'Chat IA',
    contributionsOn: 'contributions le',
    experienceTitle: 'Expérience',
    experienceSubtitle: 'Parcours professionnel et réalisations',
    skillsTitle: 'Compétences & Technologies',
    skillsSubtitle: "Outils, frameworks et concepts fondamentaux avec lesquels je développe",
    collapse: 'Réduire',
    showAll: 'Tout afficher',
    projectsTitle: 'Projets',
    projectsSubtitle: 'Quelques-uns de mes projets et contributions open source',
    tabPinned: 'En vedette',
    tabOthers: 'Tous les dépôts',
    viewAllGitHub: 'Tout voir sur GitHub',
    footerCredits: 'Conçu et développé par Sabareesh GanesaMoorthi',
    location: 'Erode, Inde',
    loadingRepos: 'Chargement des dépôts récents depuis GitHub...',
    starSingular: 'étoile',
    starPlural: 'étoiles',
    switchToLight: 'Passer en mode clair',
    switchToDark: 'Passer en mode sombre',
    categories: {
      Languages: 'Langages',
      Core: 'Fondations',
      Hosting: 'Hébergement',
    },
    skillNames: {
      'Data Structures': 'Structures de Données',
      Algorithms: 'Algorithmes',
      'Problem Solving': 'Résolution de Problèmes',
      OOPs: 'POO',
    },
    pinnedRepos: {
      AiVerse: {
        description: "Encyclopédie d'IA open source. Organise les outils et modèles d'IA en un seul endroit. À la recherche de contributeurs pour construire ensemble ! 🚀",
        tag: 'En direct',
      },
      'To-do': {
        description: 'Application de liste de tâches interactive style terminal en HTML/CSS. Conçue pour offrir une expérience en ligne de commande dans le navigateur.',
        tag: 'GitHub',
      },
      GradeCalculator: {
        description: 'Application web rapide et épurée pour calculer la moyenne (GPA/CGPA) selon un barème de 10 points.',
        tag: 'En direct',
      },
      ArcticDEX: {
        description: 'Émulateur de terminal de science-fiction multiplateforme et personnalisable avec surveillance système avancée.',
        tag: 'GitHub',
      },
      Solunar: {
        description: 'Thème Discord minimaliste personnalisé pour Vencord, axé sur une interface épurée et équilibrée. 🌙',
        tag: 'GitHub',
      },
      'DevSnapz/Landing': {
        description: "Page d'accueil officielle et code de DevSnapz — vitrine de projets, collaboration et parrainage pour développeurs.",
        tag: 'GitHub',
      },
    },
    experienceTimeline: [
      {
        title: 'Fondateur & Créateur',
        subtitle: '⚡ DevSnapz',
        date: 'En cours de développement',
        badge: 'Actif',
        description: [
          'Création d’un hub communautaire pour développeurs afin de présenter leurs projets, recevoir du mentorat et sponsoriser l’open source.',
          'Mise en œuvre du showcase de projets, des espaces de conseils et des contributions de code avec React, TypeScript, Tailwind et Vite.',
          'Intégration d’une base de données local-first pour persister les fils de discussion et projets dans le navigateur.',
        ],
      },
      {
        title: 'Développeur Indépendant',
        subtitle: 'Autodidacte',
        date: '2023 – Présent',
        badge: 'À distance',
        description: [
          'Conception, développement et déploiement de multiples applications web utilisant les technologies front-end modernes.',
          'Configuration d’environnements Linux, gestion des paquets, permissions et scripts shell.',
          'Maintenance du portfolio personnel avec hébergement personnalisé et gestion de versions Git.',
        ],
      },
      {
        title: 'Programmation Collaborative',
        subtitle: 'Projet GitHub',
        date: 'Passé',
        badge: null,
        description: [
          'Création et maintenance d’un dépôt partagé pour les exercices de programmation.',
          'Mise en place de contributions par branches où chaque étudiant gère son propre code.',
          'Pratique des workflows Git : branches, fusions, pull requests et résolution de conflits.',
          'Renforcement de la collaboration d’équipe et de l’organisation du code.',
        ],
      },
    ],
  },
};
