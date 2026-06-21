import { useState, useEffect } from "react";
// MENG-IMPORT DATA DARI FILE EKSTERNAL
import { PERSONAL_INFO, INITIAL_PROJECTS } from "../data/projectsData";

export default function Home() {
  // ==========================================
  // REACT STATES (LOGIKA INTERAKTIF)
  // ==========================================
  const [projects] = useState(INITIAL_PROJECTS);
  const [activeFilter, setActiveFilter] = useState("All"); // State filter kategori proyek
  const [showBackToTop, setShowBackToTop] = useState(false); // State tombol kembali ke atas
  const [copySuccess, setCopySuccess] = useState(false); // State pop-up salin Discord
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0); // Indeks teks role di Hero
  const [typedText, setTypedText] = useState(""); // Teks yang sedang diketik
  const [isDeleting, setIsDeleting] = useState(false); // Status arah hapus ketikan

  // Efek Ketik Dinamis (Typing Effect) pada Bagian Hero
  // Efek Ketik Dinamis (Typing Effect) pada Bagian Hero
useEffect(() => {
  let timer: NodeJS.Timeout;
  const currentFullText = PERSONAL_INFO.roles[currentRoleIndex];
  
  if (isDeleting) {
    timer = setTimeout(() => {
      setTypedText(currentFullText.substring(0, typedText.length - 1));
    }, 50); // Kecepatan menghapus huruf
  } else {
    timer = setTimeout(() => {
      setTypedText(currentFullText.substring(0, typedText.length + 1));
    }, 100); // Kecepatan mengetik huruf
  }

  if (!isDeleting && typedText === currentFullText) {
    timer = setTimeout(() => setIsDeleting(true), 2000); // Jeda diam sebelum teks dihapus
  } else if (isDeleting && typedText === "") {
    // FIX: Dibungkus dengan setTimeout 0ms agar dieksekusi secara asinkron
    timer = setTimeout(() => {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 0);
  }

  return () => clearTimeout(timer);
}, [typedText, isDeleting, currentRoleIndex]);

  // Memantau Scroll Layar untuk Menampilkan Tombol Back to Top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi Klik-untuk-Salin ID Discord otomatis ke Clipboard
  const copyDiscordToClipboard = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
  e.preventDefault();
  navigator.clipboard.writeText(PERSONAL_INFO.discordUsername);
  setCopySuccess(true);
  setTimeout(() => setCopySuccess(false), 2500); // Notifikasi toast hilang setelah 2.5 detik
  };

  // Memfilter Proyek Berdasarkan Kategori yang Aktif
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 scroll-behavior-smooth">
      
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight text-emerald-400 hover:scale-105 transition duration-300 cursor-pointer">
            Init.Dev
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-emerald-400 transition relative py-1 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#projects" className="hover:text-emerald-400 transition relative py-1 group">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-emerald-400 transition relative py-1 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </nav>
      </header>

      {/* FIXED SOSIAL MEDIA SIDEBAR (Tampilan Desktop - Sisi Kiri Layar) */}
      <div className="hidden md:flex flex-col fixed bottom-0 left-8 gap-6 z-40 after:content-[''] after:w-px after:h-24 after:bg-slate-800 after:mx-auto">
        <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 hover:-translate-y-1 transition duration-300">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
        <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:-translate-y-1 transition duration-300">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="#" onClick={copyDiscordToClipboard} className="text-slate-400 hover:text-indigo-500 hover:-translate-y-1 transition duration-300 relative group">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
          <span className="absolute left-8 bg-indigo-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Salin Tag</span>
        </a>
        <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-600 hover:-translate-y-1 transition duration-300">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555a3.002 3.002 0 0 0-2.11 2.108C0 8.03 0 12 0 12s0 3.97.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.97 24 12 24 12s0-3.97-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-600 hover:-translate-y-1 transition duration-300">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
      </div>

      <main className="max-w-5xl mx-auto px-6 space-y-32 py-20 relative">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-start space-y-6 relative overflow-hidden">
          {/* Ornamen Desain Radial Glow */}
          <div className="absolute top-1/4 right-0 -z-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse"></div>
          
          <p className="text-emerald-400 font-mono text-sm tracking-wider animate-bounce">Hai, nama saya</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-100 transition-all duration-500 hover:text-emerald-400 cursor-default">
            {PERSONAL_INFO.name}
          </h1>
          
          {/* Animasi Ketik Elemen Peran */}
          <h2 className="text-3xl md:text-5xl font-bold text-slate-400 min-h-[50px] flex items-center">
            <span className="text-slate-100">{typedText}</span>
            <span className="w-1 h-8 md:h-12 bg-emerald-400 ml-1 animate-pulse">|</span>
          </h2>
          
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
            {PERSONAL_INFO.description}
          </p>

          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="px-6 py-3 bg-emerald-500 text-slate-950 font-semibold rounded-lg hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
              Lihat Proyek Saya
            </a>
            <a href="#contact" className="px-6 py-3 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 rounded-lg transition duration-300">
              Hubungi Saya
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-100">Tentang Saya</h2>
            <div className="h-1 w-20 bg-emerald-500 rounded"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                Saya menyukai proses memecahkan masalah kompleks dan mengubahnya menjadi antarmuka aplikasi yang intuitif. Sejak mendalami Teknik Informatika, saya mendedikasikan waktu saya untuk mempelajari cara kerja web modern yang berkecepatan tinggi serta aman.
              </p>
              <p>
                Di luar perkuliahan, saya aktif melakukan eksplorasi projek mandiri guna mematangkan dasar logika pemrograman serta kemandirian analisis sistem saya.
              </p>
              
              {/* Tautan Sosial Media Pendukung (Hanya tampil di Layar Mobile/HP) */}
              <div className="flex md:hidden gap-5 pt-4">
                <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition duration-200">Instagram</a>
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition duration-200">GitHub</a>
                <a href="#" onClick={copyDiscordToClipboard} className="text-slate-400 hover:text-indigo-500 transition duration-200">Discord</a>
              </div>
            </div>
            
            {/* Kartu Daftar Keahlian Singkat */}
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl space-y-4">
              <h4 className="font-semibold text-slate-100">Teknologi Terakhir</h4>
              <ul className="grid grid-cols-2 gap-2 text-sm font-mono text-slate-400">
                <li className="flex items-center gap-2"><span className="text-emerald-400">▹</span> Javascript</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">▹</span> React / NextJS</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">▹</span> Node.js</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">▹</span> Tailwind CSS</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">▹</span> PostgreSQL</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400">▹</span> Git / Github</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-100">Proyek Pilihan</h2>
              <div className="h-1 w-20 bg-emerald-500 rounded"></div>
            </div>
            
            {/* PANEL INTERAKTIF FILTER KATEGORI PROYEK */}
            <div className="flex flex-wrap gap-2 bg-slate-900/60 p-1 rounded-lg border border-slate-800 font-mono text-sm">
              {["All", "Frontend", "Backend", "Fullstack"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded transition duration-200 ${
                    activeFilter === category 
                      ? "bg-emerald-500 text-slate-950 font-bold" 
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Looping Render Grid Proyek Ter-Filter */}
          <div className="grid md:grid-cols-2 gap-6 transition-all duration-500">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_4px_25px_rgba(16,185,129,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                {/* Efek Garis Menyala Saat Kursor Menyorot Kartu */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition duration-200">{project.title}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="text-xs font-mono px-2 py-1 bg-slate-950 text-emerald-400 rounded border border-emerald-500/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 text-sm font-medium pt-2 border-t border-slate-800/80">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 hover:translate-x-1 transition duration-200 flex items-center gap-1">
                      GitHub <span>→</span>
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 hover:translate-x-1 transition duration-200 flex items-center gap-1">
                        Live Demo <span>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Feedback Jika Kategori Yang Dipilih Kosong */}
          {filteredProjects.length === 0 && (
            <p className="text-center text-slate-500 font-mono py-12">Belum ada proyek dalam kategori {activeFilter}.</p>
          )}
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-12 text-center max-w-xl mx-auto space-y-8 scroll-mt-24">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Mari Terhubung</h2>
            <div className="h-1 w-20 bg-emerald-500 rounded mx-auto"></div>
          </div>
          <p className="text-slate-400 text-lg">
            Saya selalu terbuka untuk diskusi mengenai peluang kerja, proyek kolaborasi, atau sekadar bertukar pikiran.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="px-8 py-3.5 border border-emerald-500 text-emerald-400 rounded-lg hover:bg-emerald-500/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition duration-300 font-medium text-lg">
              Kirim Email Sekarang
            </a>
            
            {/* Menu Navigasi Sosial Media Bawah Halaman */}
            <div className="flex flex-wrap justify-center gap-4 text-sm font-mono pt-4 text-slate-400">
              <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-200">Instagram</a>
              <span className="text-slate-700">•</span>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition duration-200">LinkedIn</a>
              <span className="text-slate-700">•</span>
              <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition duration-200">YouTube</a>
              <span className="text-slate-700">•</span>
              <button onClick={copyDiscordToClipboard} className="hover:text-indigo-400 transition duration-200 cursor-pointer">
                Discord
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-10 text-center text-sm text-slate-500 font-mono space-y-2">
        <p>© 2026 FavianDT. All rights reserved.</p>
        <p className="text-xs text-slate-600">Built using React & Tailwind CSS</p>
      </footer>

      {/* NOTIFIKASI POP-UP TOAST (Akan Muncul Saat Klik Salin Discord) */}
      <div className={`fixed bottom-8 right-8 z-50 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 transform ${
        copySuccess ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
        <span>Tag Discord <b>{PERSONAL_INFO.discordUsername}</b> berhasil disalin!</span>
      </div>

      {/* TOMBOL TOMBOL KEMBALI KE ATAS (BACK TO TOP) FLUID */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-40 bg-emerald-500 text-slate-950 p-3 rounded-full shadow-lg hover:bg-emerald-400 hover:scale-110 transition-all duration-300 ${
          showBackToTop && !copySuccess ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Kembali ke atas"
      >
        <svg className="w-6 h-6 stroke-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

    </div>
  );
}