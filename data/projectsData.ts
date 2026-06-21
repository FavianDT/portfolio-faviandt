// ==========================================
// 1. DATA PRIBADI & SOSIAL MEDIA
// ==========================================
export const PERSONAL_INFO = {
  name: "FavianDT.",
  roles: ["Lulusan Teknik Informatika", "Web Developer", "Tech Enthusiast"], // Teks bergantian di Hero
  description: "Saya adalah lulusan Teknik Informatika yang berfokus pada pengembangan aplikasi web modern. Senang membangun solusi digital yang efisien, interaktif, dan mudah digunakan.",
  email: "faaviandilan04@gmail.com",
  discordUsername: "FavianDT#1234", // Sesuai untuk fitur klik-untuk-salin
  socials: {
    instagram: "https://instagram.com/username_anda",
    github: "https://github.com/username_anda",
    discord: "#", 
    youtube: "https://youtube.com/c/channel_anda",
    linkedin: "https://linkedin.com/in/username_anda"
  }
};

// ==========================================
// 2. DATA PROYEK 
// ==========================================
export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Web App",
    description: "Platform toko online interaktif lengkap dengan sistem pembayaran dan manajemen inventaris.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    category: "Fullstack", // Kategori filter: 'Frontend', 'Backend', atau 'Fullstack'
    githubUrl: "https://github.com/FavianDT",
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    title: "Portfolio Website v1",
    description: "Desain portofolio pribadi pertama dengan fokus pada performa tinggi dan animasi halus.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    githubUrl: "https://github.com/FavianDT",
    liveUrl: null // Jika belum ada live demo, isi dengan null
  },
  {
    id: 3,
    title: "Task Management API",
    description: "RESTful API tangguh untuk manajemen tugas dengan autentikasi JWT dan dokumentasi Swagger.",
    techStack: ["Express", "PostgreSQL", "Sequelize"],
    category: "Backend",
    githubUrl: "https://github.com/FavianDT",
    liveUrl: null
  }
];