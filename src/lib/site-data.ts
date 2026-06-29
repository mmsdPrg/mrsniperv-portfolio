export const siteConfig = {
  name: "MrSniperV",
  title: "MrSniperV | Backend & Full-Stack Developer",
  description:
    "I build scalable, secure, and high-performance web applications with 8+ years of experience.",
  url: "https://mrsniperv.dev",
  github: "https://github.com/mmsdPrg",
  experience: "8+",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skillCategories = [
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["C#", "ASP.NET Core", "Dapper", "API", "SignalR", "Python"],
    level: 95,
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: ["SQL Server", "PostgreSQL", "MongoDB", "Redis"],
    level: 90,
  },
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "JavaScript", "HTML", "CSS", "jQuery"],
    level: 82,
  },
  {
    title: "DevOps",
    icon: "🚀",
    skills: ["Git", "Docker", "Kubernetes"],
    level: 78,
  },
];

export const skills = skillCategories.flatMap((c) => c.skills);

export const experienceItems = [
  {
    title: "Backend Development",
    description:
      "Designing robust server-side architectures with clean separation of concerns and high reliability.",
  },
  {
    title: "Full-Stack Development",
    description:
      "Delivering end-to-end solutions from database layer to responsive user interfaces.",
  },
  {
    title: "Database Design",
    description:
      "Modeling relational and NoSQL schemas optimized for performance and scalability.",
  },
  {
    title: "API Development",
    description:
      "Building RESTful services with versioning, security, and production-grade documentation.",
  },
  {
    title: "Real-Time Systems",
    description:
      "Implementing live communication with SignalR, WebSockets, and event-driven patterns.",
  },
  {
    title: "Docker & Kubernetes Deployment",
    description:
      "Containerizing applications and orchestrating cloud-native deployments at scale.",
  },
];

export const educationItems = [
  {
    degree: "Bachelor's Degree",
    school: "Zand University",
  },
  {
    degree: "Master's Degree",
    school: "Shiraz University",
  },
];

export const liveProjects = [
  {
    name: "Otolme",
    url: "https://otolme.ir",
    domain: "otolme.ir",
    description: "Automotive marketplace platform with listings, search, and business workflows.",
    tags: ["ASP.NET Core", "SQL Server", "React"],
  },
  {
    name: "Radbar24",
    url: "https://radbar24.ir",
    domain: "radbar24.ir",
    description: "Service-oriented web platform built for real-world operations and daily usage.",
    tags: ["C#", "API", "JavaScript"],
  },
  {
    name: "HyperPro24",
    url: "https://hyperpro24.ir",
    domain: "hyperpro24.ir",
    description: "High-performance business web application with scalable backend architecture.",
    tags: ["ASP.NET Core", "PostgreSQL", "Docker"],
  },
  {
    name: "Narvan Preschool",
    url: "https://narvanpreschool.ir",
    domain: "narvanpreschool.ir",
    description: "Educational institution website with content management and responsive design.",
    tags: ["React", "HTML", "CSS"],
  },
  {
    name: "Scalp Melk",
    url: "https://scalpmelk.ir",
    domain: "scalpmelk.ir",
    description: "Real estate platform with property listings and admin management tools.",
    tags: ["ASP.NET Core", "SQL Server", "Dapper"],
  },
  {
    name: "Danial Shoes",
    url: "https://danialshoes.ir",
    domain: "danialshoes.ir",
    description: "E-commerce style retail website with product catalog and modern UI.",
    tags: ["JavaScript", "jQuery", "API"],
  },
];

export const aboutPoints = [
  "8+ years of hands-on software engineering experience",
  "Strong backend architecture mindset",
  "Skilled in building scalable APIs and real-world business systems",
  "Experienced with databases, caching, real-time communication, and cloud-native deployment",
  "Problem solver with clean code, maintainability, and performance focus",
  "Comfortable with both backend and frontend development",
  "Fast learner and detail-oriented developer",
];

export const floatingSnippets = [
  "await api.deploy();",
  "SELECT * FROM users;",
  "kubectl apply -f",
  "hub.Clients.All.SendAsync",
  "services.AddScoped<IRepo>",
  "docker compose up -d",
];
