// ========================
// TYPING ANIMATION
// ========================
const roles = ["Desenvolvedor Full Stack", "Suporte Técnico"];

const categoryColors = {
  frontend: "#a855f7",
  backend: "#3b82f6",
  db: "#10b981",
  infra: "#f59e0b"
};

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById("typed-text");

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
    return;
  }
  setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ========================
// PARTICLE SYSTEM
// ========================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.3 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ========================
// SCROLL FUNCTIONS
// ========================
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// ========================
// SCROLL PROGRESS BAR
// ========================
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((winScroll / height) * 100) + '%';
});

// ========================
// BACK TO TOP
// ========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// INTERSECTION OBSERVER
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

// ========================
// LIGHTBOX
// ========================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}
function closeLightbox() {
  lightbox.style.display = "none";
}
closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") closeLightbox();
});

// ========================
// GALLERY SYSTEM
// ========================
function initGallery(galleryElement) {
  const track = galleryElement.querySelector(".gallery-track");
  const images = galleryElement.querySelectorAll(".gallery-track img");
  const prevBtn = galleryElement.querySelector(".prev");
  const nextBtn = galleryElement.querySelector(".next");
  const dotsContainer = galleryElement.querySelector(".gallery-dots");
  if (!images.length) return;

  let currentIndex = 0;
  const totalImages = images.length;
  dotsContainer.innerHTML = '';

  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { currentIndex = i; updateGallery(); });
    dotsContainer.appendChild(dot);
  }

  function updateGallery() {
    track.style.transform = `translateX(-${currentIndex * track.parentElement.clientWidth}px)`;
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateGallery(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < totalImages - 1) { currentIndex++; updateGallery(); } });

  images.forEach(img => {
    img.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(img.src); });
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateGallery, 100);
  });
  setTimeout(updateGallery, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery').forEach(initGallery);
});

// ========================
// SISTEMA DE INSTALAÇÃO
// ========================
const installModal = document.getElementById('installModal');
const terminalOutput = document.getElementById('terminalOutput');
const installProgressBar = document.getElementById('installProgressBar');
const installProgressText = document.getElementById('installProgressText');
const installStatus = document.getElementById('installStatus');
const fileList = document.getElementById('fileList');
const btnInstalarCurriculo = document.getElementById('btn-instalar-curriculo');

function openInstallModal() {
  installModal.style.display = 'flex';
  startInstallation();
}
function closeInstallModal() {
  installModal.style.display = 'none';
}
window.closeInstallModal = closeInstallModal;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && installModal.style.display === 'flex') closeInstallModal();
});

const terminalMessages = [
  { text: 'Inicializando sistema de instalação...', type: 'normal' },
  { text: 'Verificando compatibilidade do sistema...', type: 'normal' },
  { text: 'Sistema compatível - Windows 11 Pro detectado', type: 'success' },
  { text: 'Escaneando por malware...', type: 'normal' },
  { text: 'Nenhuma ameaça detectada', type: 'success' },
  { text: 'Preparando diretório de instalação...', type: 'normal' },
  { text: 'Descompactando Currículo_v2.6.exe...', type: 'normal' },
  { text: 'Instalando dependências...', type: 'normal' },
  { text: 'Node.js encontrado', type: 'success' },
  { text: 'Python 3.11 encontrado', type: 'success' },
  { text: 'Configurando variáveis de ambiente...', type: 'normal' },
  { text: 'Compilando assets...', type: 'warning' },
  { text: 'Assets compilados com sucesso!', type: 'success' },
  { text: 'Registrando no sistema...', type: 'normal' },
  { text: 'INSTALAÇÃO CONCLUÍDA!', type: 'success' }
];

const files = [
  { name: 'curriculo.exe', icon: 'fa-file-code' },
  { name: 'skills.dat', icon: 'fa-database' },
  { name: 'experience.json', icon: 'fa-file-alt' },
  { name: 'portfolio.db', icon: 'fa-server' },
  { name: 'config.ini', icon: 'fa-cog' },
  { name: 'readme.md', icon: 'fa-book' }
];

function addTerminalLine(message, type = 'normal') {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  const prompt = document.createElement('span');
  prompt.className = 'prompt';
  prompt.textContent = '>';
  const text = document.createElement('span');
  text.textContent = ' ' + message;
  text.className = type;
  line.appendChild(prompt);
  line.appendChild(text);
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function updateInstallProgress(percent) {
  installProgressBar.style.width = percent + '%';
  installProgressText.textContent = Math.round(percent) + '%';
}

function updateInstallStatus(message, icon = 'fa-spinner fa-spin') {
  installStatus.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
}

function addFileItem(file, completed = false) {
  const item = document.createElement('div');
  item.className = 'file-item' + (completed ? ' completed' : '');
  item.innerHTML = `<i class="fas ${file.icon}"></i> ${file.name} ${completed ? '✓' : '...'}`;
  fileList.appendChild(item);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startInstallation() {
  terminalOutput.innerHTML = '';
  fileList.innerHTML = '';
  updateInstallProgress(0);
  files.forEach(file => addFileItem(file, false));

  for (let i = 0; i < terminalMessages.length; i++) {
    const msg = terminalMessages[i];
    addTerminalLine(msg.text, msg.type);
    if (msg.text.includes('Verificando')) updateInstallStatus('Verificando sistema...');
    else if (msg.text.includes('Escaneando')) updateInstallStatus('Executando scan de segurança...', 'fa-shield');
    else if (msg.text.includes('Descompactando')) updateInstallStatus('Descompactando arquivos...', 'fa-file-archive');
    else if (msg.text.includes('dependências')) updateInstallStatus('Instalando dependências...', 'fa-cube');
    else if (msg.text.includes('Compilando')) updateInstallStatus('Compilando assets...', 'fa-code');
    updateInstallProgress((i / terminalMessages.length) * 60);
    await sleep(300 + Math.random() * 200);
  }

  updateInstallStatus('Instalando arquivos do currículo...', 'fa-file');
  for (let i = 0; i < files.length; i++) {
    const fileItems = fileList.querySelectorAll('.file-item');
    if (fileItems[i]) {
      fileItems[i].classList.add('completed');
      fileItems[i].innerHTML = `<i class="fas fa-check-circle"></i> ${files[i].name} ✓`;
    }
    addTerminalLine(`✓ Instalado: ${files[i].name}`, 'success');
    updateInstallProgress(60 + ((i + 1) / files.length) * 35);
    await sleep(200 + Math.random() * 150);
  }

  updateInstallStatus('Finalizando instalação...', 'fa-check');
  addTerminalLine('Criando atalhos no sistema...', 'normal');
  await sleep(300);
  addTerminalLine('Registrando no menu iniciar...', 'normal');
  await sleep(300);
  addTerminalLine('✓ Instalação concluída com sucesso!', 'success');
  addTerminalLine(' Currículo pronto para uso!', 'success');
  updateInstallProgress(100);
  updateInstallStatus('Instalação completa!', 'fa-check-circle');
  await sleep(1000);
  downloadCurriculo();
  setTimeout(() => closeInstallModal(), 2000);
}

function downloadCurriculo() {
  const link = document.createElement('a');
  link.href = 'Cassiano Soares.pdf';
  link.download = 'Curriculo_Cassiano_Soares.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

if (btnInstalarCurriculo) {
  btnInstalarCurriculo.addEventListener('click', (e) => { e.preventDefault(); openInstallModal(); });
}

// ========================
// KONAMI CODE
// ========================
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateHackerMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
function activateHackerMode() {
  document.body.style.animation = 'hackerGlitch 0.5s infinite';
  setTimeout(() => {
    document.body.style.animation = '';
    alert('Você invocou a vaca medonha');
  }, 2000);
}

// ========================
// SKILL OBSERVER
// ========================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ========================
// SISTEMA DE NOTAS
// ========================
class RecruiterNotesSystem {
  constructor() {
    this.notes = this.loadNotes();
    this.currentRating = 0;
    this.init();
  }
  init() {
    this.cacheElements();
    this.bindEvents();
    this.updateNotesList();
    this.updateStats();
  }
  cacheElements() {
    this.toggleBtn = document.getElementById('notesToggleBtn');
    this.panel = document.getElementById('notesPanel');
    this.closeBtn = document.getElementById('notesClose');
    this.saveBtn = document.getElementById('saveNoteBtn');
    this.clearBtn = document.getElementById('clearNoteBtn');
    this.noteCategory = document.getElementById('noteCategory');
    this.noteTitle = document.getElementById('noteTitle');
    this.noteContent = document.getElementById('noteContent');
    this.notesList = document.getElementById('notesList');
    this.filterCategory = document.getElementById('filterCategory');
    this.sortNotes = document.getElementById('sortNotes');
    this.notesBadge = document.getElementById('notesBadge');
    this.totalNotesSpan = document.getElementById('totalNotes');
    this.stars = document.querySelectorAll('#ratingStars i');
  }
  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.togglePanel());
    this.closeBtn.addEventListener('click', () => this.closePanel());
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });
    this.stars.forEach(star => {
      star.addEventListener('click', () => this.setRating(star.dataset.rating));
      star.addEventListener('mouseover', () => this.highlightStars(star.dataset.rating));
    });
    const starsContainer = document.getElementById('ratingStars');
    if (starsContainer) {
      starsContainer.addEventListener('mouseleave', () => this.highlightStars(this.currentRating));
    }
    this.saveBtn.addEventListener('click', () => this.saveNote());
    this.clearBtn.addEventListener('click', () => this.clearForm());
    this.filterCategory.addEventListener('change', () => this.updateNotesList());
    this.sortNotes.addEventListener('change', () => this.updateNotesList());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.panel.classList.contains('show')) this.closePanel();
    });
  }
  togglePanel() {
    this.panel.classList.toggle('show');
    if (this.panel.classList.contains('show')) this.updateNotesList();
  }
  closePanel() { this.panel.classList.remove('show'); }
  switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.toggle('active', content.id === tabId + 'Tab'));
    if (tabId === 'history') this.updateNotesList();
  }
  setRating(rating) { this.currentRating = parseInt(rating); this.highlightStars(rating); }
  highlightStars(rating) {
    this.stars.forEach(star => {
      star.className = parseInt(star.dataset.rating) <= rating ? 'fas fa-star' : 'far fa-star';
    });
  }
  saveNote() {
    const title = this.noteTitle.value.trim();
    const content = this.noteContent.value.trim();
    const n = translations[currentLang].notes;
    if (!title || !content) { alert(currentLang === 'pt' ? 'Por favor, preencha título e conteúdo da nota' : 'Please fill in the title and note content'); return; }
    this.notes.push({ id: Date.now(), category: this.noteCategory.value, title, content, rating: this.currentRating, date: new Date().toISOString() });
    this.saveNotes();
    this.clearForm();
    this.updateStats();
    this.updateNotesList();
    this.switchTab('history');
  }
  clearForm() {
    this.noteTitle.value = '';
    this.noteContent.value = '';
    this.noteCategory.value = 'technical';
    this.currentRating = 0;
    this.highlightStars(0);
  }
  updateNotesList() {
    const category = this.filterCategory.value;
    const sort = this.sortNotes.value;
    const n = translations[currentLang].notes;
    let filteredNotes = category === 'all' ? [...this.notes] : this.notes.filter(note => note.category === category);
    filteredNotes.sort((a, b) => {
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sort === 'rating') return b.rating - a.rating;
      return new Date(b.date) - new Date(a.date);
    });
    if (filteredNotes.length === 0) {
      this.notesList.innerHTML = `
        <div class="empty-notes">
          <i class="fas fa-clipboard"></i>
          <p>${n.empty_title}</p>
          <small>${n.empty_hint}</small>
        </div>`;
      return;
    }
    this.notesList.innerHTML = filteredNotes.map(note => this.createNoteElement(note)).join('');
  }
  createNoteElement(note) {
    const n = translations[currentLang].notes;
    const categoryLabels = n.categories;
    const stars = '★'.repeat(note.rating) + '☆'.repeat(5 - note.rating);
    const locale = currentLang === 'pt' ? 'pt-BR' : 'en-US';
    const date = new Date(note.date).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    return `<div class="note-item">
      <div class="note-header">
        <span class="note-category">${categoryLabels[note.category] || note.category}</span>
        ${note.rating > 0 ? `<span class="note-rating">${stars}</span>` : ''}
      </div>
      <div class="note-title">${this.escapeHtml(note.title)}</div>
      <div class="note-content">${this.escapeHtml(note.content)}</div>
      <div class="note-footer"><span><i class="far fa-calendar"></i> ${date}</span></div>
    </div>`;
  }
  escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
  updateStats() {
    const total = this.notes.length;
    if (this.notesBadge) this.notesBadge.textContent = total;
    if (this.totalNotesSpan) this.totalNotesSpan.textContent = total;
  }
  loadNotes() { const saved = localStorage.getItem('recruiter_notes_cassiano'); return saved ? JSON.parse(saved) : []; }
  saveNotes() { localStorage.setItem('recruiter_notes_cassiano', JSON.stringify(this.notes)); }
}

// ========================
// TIMELINE — DADOS BILÍNGUES
// ========================
const eventsData = {
  pt: [
    { year: '2022', role: 'Participante da FLL (FIRST LEGO League)', place: 'SESI / Equipe de Robótica', badge: 'Experiência', badgeClass: 'badge-exp', title: 'Competição de Robótica FLL', sub: 'FIRST LEGO League · 2023', desc: 'Participação na competição FIRST LEGO League, desenvolvendo soluções com robótica e programação em equipe. Atuei na construção e programação do robô LEGO, além de colaborar na pesquisa e apresentação de projetos inovadores, desenvolvendo habilidades como trabalho em equipe, resolução de problemas e pensamento lógico.', tags: ['Robótica', 'Programação', 'Trabalho em Equipe', 'Lógica'] },
    { year: '2024', role: 'Início do curso técnico em ADS', place: 'SENAI Cruzeiro', badge: 'Educação', badgeClass: 'badge-edu', title: 'Formação Técnica em ADS', sub: 'SENAI · 2024', desc: 'Início da formação técnica em Análise e Desenvolvimento de Sistemas, com foco em lógica de programação, desenvolvimento web e fundamentos de banco de dados.', tags: ['Lógica', 'HTML', 'CSS', 'JavaScript'] },
    { year: '2025', role: 'Conclusão do curso técnico', place: 'SENAI Cruzeiro', badge: 'Educação', badgeClass: 'badge-edu', title: 'Técnico em ADS concluído', sub: 'SENAI · 2025', desc: 'Conclusão do curso técnico em ADS com desenvolvimento de projetos práticos e consolidação de conhecimentos em desenvolvimento full stack.', tags: ['PHP', 'MySQL', 'Laravel', 'JavaScript'] },
    { year: '2025', role: 'TCC', place: 'Projeto acadêmico', badge: 'TCC', badgeClass: 'badge-edu', title: 'AutoAbout · TCC', sub: 'Full Stack + IA · 2025', desc: 'Desenvolvimento de uma plataforma no-code para criação de chatbots com editor visual, integração com API do WhatsApp e uso de IA para automação de atendimento.', tags: ['TypeScript', 'Node.js', 'WhatsApp API', 'IA'] },
    { year: '2026', role: 'Início da graduação em ADS', place: 'SENAI', badge: 'Educação', badgeClass: 'badge-edu', title: 'Graduação em ADS', sub: 'SENAI · 2026', desc: 'Início da graduação em Análise e Desenvolvimento de Sistemas, aprofundando conhecimentos em arquitetura de software, engenharia de sistemas e desenvolvimento escalável.', tags: ['Engenharia de Software', 'Arquitetura', 'Full Stack'] },
    { year: '2026', role: 'DG Consultoria', place: 'Projeto profissional', badge: 'Trabalho', badgeClass: 'badge-work', title: 'DG Consultoria SST', sub: 'Desenvolvedor Full Stack · 2026', desc: 'Desenvolvimento de uma plataforma EAD completa com catálogo de cursos, integração de pagamentos e painel administrativo.', tags: ['Laravel', 'MySQL', 'Stripe', 'Vue.js'] }
  ],
  en: [
    { year: '2022', role: 'FLL (FIRST LEGO League) Participant', place: 'SESI / Robotics Team', badge: 'Experience', badgeClass: 'badge-exp', title: 'FLL Robotics Competition', sub: 'FIRST LEGO League · 2023', desc: 'Participated in the FIRST LEGO League competition, developing robotics and programming solutions as a team. Worked on building and programming the LEGO robot, collaborated on research and presentation of innovative projects, building skills in teamwork, problem-solving, and logical thinking.', tags: ['Robotics', 'Programming', 'Teamwork', 'Logic'] },
    { year: '2024', role: 'Started technical course in SDA', place: 'SENAI Cruzeiro', badge: 'Education', badgeClass: 'badge-edu', title: 'Technical Degree in SDA', sub: 'SENAI · 2024', desc: 'Started the technical program in Systems Development and Analysis, focused on programming logic, web development, and database fundamentals.', tags: ['Logic', 'HTML', 'CSS', 'JavaScript'] },
    { year: '2025', role: 'Completed technical course', place: 'SENAI Cruzeiro', badge: 'Education', badgeClass: 'badge-edu', title: 'Technical Degree completed', sub: 'SENAI · 2025', desc: 'Completed the technical program in SDA with hands-on project development and consolidation of full stack development knowledge.', tags: ['PHP', 'MySQL', 'Laravel', 'JavaScript'] },
    { year: '2025', role: 'Capstone Project', place: 'Academic project', badge: 'Capstone', badgeClass: 'badge-edu', title: 'AutoAbout · Capstone', sub: 'Full Stack + AI · 2025', desc: 'Built a no-code platform for creating chatbots with a visual editor, WhatsApp API integration, and AI-powered automation for customer service.', tags: ['TypeScript', 'Node.js', 'WhatsApp API', 'AI'] },
    { year: '2026', role: "Started Bachelor's degree in SDA", place: 'SENAI', badge: 'Education', badgeClass: 'badge-edu', title: "Bachelor's in SDA", sub: 'SENAI · 2026', desc: "Started the bachelor's degree in Systems Development and Analysis, deepening knowledge in software architecture, systems engineering, and scalable development.", tags: ['Software Engineering', 'Architecture', 'Full Stack'] },
    { year: '2026', role: 'DG Consultoria', place: 'Professional project', badge: 'Work', badgeClass: 'badge-work', title: 'DG Consultoria SST', sub: 'Full Stack Developer · 2026', desc: 'Built a complete e-learning platform with a course catalog, payment integration, and an admin panel for managing students and content.', tags: ['Laravel', 'MySQL', 'Stripe', 'Vue.js'] }
  ]
};

let events = [...eventsData.pt];

const tlTrack = document.getElementById('timelineTrack');
const detailCard = document.getElementById('detailCard');
const tlPrev = document.getElementById('tlPrev');
const tlNext = document.getElementById('tlNext');
const tlProgressLine = document.getElementById('tlProgressLine');
const dotsNav = document.getElementById('tlDotsNav');

let activeIndex = 0;

function buildTimeline() {
  tlTrack.innerHTML = '';
  events.forEach((ev, i) => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-year">${ev.year}</div>
      <div class="tl-dot-wrapper"><div class="tl-dot"></div></div>
      <div class="tl-content">
        <div class="tl-role">${ev.role}</div>
        <div class="tl-place">${ev.place}</div>
        <span class="tl-badge ${ev.badgeClass}">${ev.badge}</span>
      </div>
    `;
    item.addEventListener('click', () => setActive(i));
    tlTrack.appendChild(item);
  });

  dotsNav.innerHTML = '';
  events.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'tl-dot-nav';
    d.addEventListener('click', () => setActive(i));
    dotsNav.appendChild(d);
  });

  setActive(0, false);
}

function setActive(idx, animate = true) {
  activeIndex = idx;
  const items = tlTrack.querySelectorAll('.tl-item');
  const navDots = dotsNav.querySelectorAll('.tl-dot-nav');

  items.forEach((item, i) => {
    item.classList.remove('active', 'done');
    if (i === idx) item.classList.add('active');
    else if (i < idx) item.classList.add('done');
  });

  navDots.forEach((d, i) => d.classList.toggle('active', i === idx));

  tlProgressLine.style.width = (idx === 0 ? 5 : (idx / (events.length - 1)) * 100) + '%';
  tlPrev.disabled = idx === 0;
  tlNext.disabled = idx === events.length - 1;

  const ev = events[idx];
  document.getElementById('detailTitle').textContent = ev.title;
  document.getElementById('detailSub').textContent = ev.sub;
  document.getElementById('detailDesc').textContent = ev.desc;
  document.getElementById('detailYear').textContent = ev.year;
  document.getElementById('detailTags').innerHTML = ev.tags.map(t => `<span class="detail-tag">${t}</span>`).join('');

  detailCard.classList.remove('visible');
  setTimeout(() => detailCard.classList.add('visible'), 50);

  const itemWidth = tlTrack.querySelector('.tl-item')?.offsetWidth || 180;
  const scrollArea = document.getElementById('timelineScroll').offsetWidth;
  const maxOffset = Math.max(0, events.length * itemWidth - scrollArea);
  let targetOffset = Math.min(Math.max(0, (idx - 1) * itemWidth), maxOffset);
  tlTrack.style.transform = `translateX(-${targetOffset}px)`;
}

tlPrev.addEventListener('click', () => { if (activeIndex > 0) setActive(activeIndex - 1); });
tlNext.addEventListener('click', () => { if (activeIndex < events.length - 1) setActive(activeIndex + 1); });

buildTimeline();
setTimeout(() => setActive(0), 200);

const tlScroll = document.getElementById('timelineScroll');
let startX = 0;
tlScroll.addEventListener('touchstart', e => startX = e.touches[0].clientX);
tlScroll.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - startX;
  if (dx < -40 && activeIndex < events.length - 1) setActive(activeIndex + 1);
  if (dx > 40 && activeIndex > 0) setActive(activeIndex - 1);
});

// ========================
// SKILLS — BUBBLES
// ========================
function getCats() {
  const t = translations[currentLang];
  return {
    backend:  { label: t.cats.backend,  color: '#3b82f6', text: '#fff', bg: 'rgba(59,130,246,0.12)' },
    frontend: { label: t.cats.frontend, color: '#8b5cf6', text: '#fff', bg: 'rgba(139,92,246,0.12)' },
    db:       { label: t.cats.db,       color: '#10b981', text: '#fff', bg: 'rgba(16,185,129,0.12)' },
    infra:    { label: t.cats.infra,    color: '#f59e0b', text: '#fff', bg: 'rgba(245,158,11,0.12)' },
  };
}

const PROJECTS = {
  dg:   { name: 'DG Consultoria', color: '#3b82f6' },
  auto: { name: 'AutoAbout',      color: '#8b5cf6' },
  free: { name: 'Freelances',     color: '#10b981' },
  tcc:  { name: 'TCC / Pessoal',  color: '#f59e0b' },
};

const techs = [
  { id:'php',     label:'PHP',          icon:'https://logo.svgcdn.com/logos/php.svg',           cat:'backend',  level:85, projects:['dg','free'] },
  { id:'laravel', label:'Laravel',      icon:'https://logo.svgcdn.com/logos/laravel.svg',        cat:'backend',  level:85, projects:['dg'] },
  { id:'python',  label:'Python',       icon:'https://logo.svgcdn.com/logos/python.svg',         cat:'backend',  level:90, projects:['tcc','free'] },
  { id:'node',    label:'Node.js',      icon:'https://logo.svgcdn.com/logos/nodejs.svg',         cat:'backend',  level:78, projects:['auto','tcc'] },
  { id:'ts',      label:'TypeScript',   icon:'https://logo.svgcdn.com/logos/typescript.svg',     cat:'frontend', level:80, projects:['auto'] },
  { id:'js',      label:'JavaScript',   icon:'https://logo.svgcdn.com/logos/javascript.svg',     cat:'frontend', level:90, projects:['dg','auto','free','tcc'] },
  { id:'react',   label:'React',        icon:'https://logo.svgcdn.com/logos/react.svg',          cat:'frontend', level:75, projects:['free','tcc'] },
  { id:'vue',     label:'Vue.js',       icon:'https://icon-icons.com/download-file?file=https%3A%2F%2Fimages.icon-icons.com%2F2415%2FPNG%2F512%2Fvuejs_original_wordmark_logo_icon_146305.png&id=146305&pack_or_individual=pack', cat:'frontend', level:72, projects:['dg'] },
  { id:'css',     label:'CSS/Tailwind', icon:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1920px-CSS3_logo_and_wordmark.svg.png', cat:'frontend', level:85, projects:['dg','auto','free','tcc'] },
  { id:'mysql',   label:'MySQL',        icon:'https://logo.svgcdn.com/logos/mysql.svg',          cat:'db',       level:80, projects:['dg','free'] },
  { id:'pg',      label:'PostgreSQL',   icon:'https://logo.svgcdn.com/logos/postgresql.svg',     cat:'db',       level:70, projects:['tcc'] },
  { id:'stripe',  label:'Stripe',       icon:'https://logo.svgcdn.com/logos/stripe.svg',         cat:'infra',    level:75, projects:['dg'] },
  { id:'gemini',  label:'Gemini AI',    icon:'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/google-gemini-924j3051o55m98g4rwehj.png/google-gemini-fjwerd7ldxwt4c010vyoh.png?_a=DATAiZAAZAA0', cat:'infra', level:72, projects:['auto'] },
  { id:'wp',      label:'WhatsApp API', icon:'https://logo.svgcdn.com/logos/whatsapp.svg',       cat:'infra',    level:70, projects:['auto'] },
  { id:'aws',     label:'AWS',          icon:'https://logo.svgcdn.com/logos/aws.svg',            cat:'db',       level:65, projects:['aula'] },
  { id:'docker',  label:'Docker',       icon:'https://logo.svgcdn.com/logos/docker.svg',         cat:'infra',    level:68, projects:['dg','tcc'] },
  { id:'html',    label:'HTML',         icon:'https://logo.svgcdn.com/logos/html-5.svg',         cat:'frontend', level:90, projects:['dg','auto','free','tcc'] },
  { id:'git',     label:'Git',          icon:'https://logo.svgcdn.com/logos/git-icon.svg',       cat:'infra',    level:80, projects:['dg','auto','free','tcc'] },
  { id:'linux',   label:'Linux',        icon:'https://logo.svgcdn.com/logos/linux-tux.svg',      cat:'infra',    level:70, projects:['aula'] },
  { id:'django',  label:'Django',       icon:'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/django-icon.png', cat:'backend', level:60, projects:['aula'] },
];

const arena = document.getElementById('arena');
let activeBubble = null;

function buildLegend() {
  const leg = document.getElementById('legend');
  leg.innerHTML = '';
  Object.entries(getCats()).forEach(([key, cat]) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span class="legend-swatch" style="background:${cat.color}"></span>${cat.label}`;
    leg.appendChild(item);
  });
}

function placeBubbles(filterCat) {
  arena.innerHTML = '';
  const width = arena.clientWidth;
  const height = arena.clientHeight;
  const visible = filterCat === 'all' ? techs : techs.filter(t => t.cat === filterCat);
  const nodes = visible.map(t => ({ ...t, radius: 18 + (t.level / 100) * 15 }));

  const simulation = d3.forceSimulation(nodes)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("charge", d3.forceManyBody().strength(-20))
    .force("collision", d3.forceCollide().radius(d => d.radius + 4))
    .force("x", d3.forceX(width / 2).strength(0.05))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .alphaDecay(0.02);

  const bubbles = d3.select(arena)
    .selectAll(".bubble")
    .data(nodes)
    .enter()
    .append("div")
    .attr("class", "bubble")
    .style("position", "absolute")
    .style("width", d => d.radius * 2 + "px")
    .style("height", d => d.radius * 2 + "px")
    .style("border-radius", "50%")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("align-items", "center")
    .style("justify-content", "center")
    .style("cursor", "pointer")
    .style("box-shadow", d => `0 0 20px ${categoryColors[d.cat]}`)
    .style("border", d => `1px solid ${categoryColors[d.cat]}`)
    .style("background", d => categoryColors[d.cat] + "33")
    .style("backdrop-filter", "blur(10px)")
    .html(d => `<div style="display:flex;flex-direction:column;align-items:center;"><img src="${d.icon}" alt="${d.label}" style="width:28px;height:28px;object-fit:contain;"/><span style="font-size:10px;margin-top:2px;color:#fff;">${d.level}%</span></div>`);

  bubbles.call(
    d3.drag()
      .on("start", (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
      .on("end", (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
  );

  bubbles.on("click", function(event, d) {
    arena.querySelectorAll('.bubble').forEach(b => b.classList.remove('active', 'dimmed'));
    this.classList.add('active');
    const cats = getCats();
    const cat = cats[d.cat];
    const t = translations[currentLang];
    const panel = document.getElementById('detailPanel');
    const dotDiv = document.getElementById('detailDot');
    dotDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = d.icon; img.alt = d.label;
    img.style.width = '32px'; img.style.height = '32px'; img.style.objectFit = 'contain';
    dotDiv.appendChild(img);
    dotDiv.style.background = cat.bg;
    dotDiv.style.border = `1px solid ${cat.color}55`;
    document.getElementById('detailName').textContent = d.label;
    document.getElementById('detailCat').textContent = `${cat.label} · ${d.level}% ${t.skill_mastery}`;
    const projectsContainer = document.getElementById('detailProjects');
    projectsContainer.innerHTML = '';
    if (d.projects && d.projects.length > 0) {
      d.projects.forEach(pid => {
        const proj = PROJECTS[pid];
        if (proj) {
          const projName = t.projects_label[pid] || proj.name;
          const chip = document.createElement('div');
          chip.className = 'proj-chip';
          chip.innerHTML = `<span class="proj-dot" style="background:${proj.color}"></span>${projName}`;
          projectsContainer.appendChild(chip);
        }
      });
    } else {
      projectsContainer.innerHTML = `<span style="font-size:12px;color:var(--color-text-secondary)">${t.skill_no_projects}</span>`;
    }
    panel.classList.add('show');
  });

  simulation.on("tick", () => {
    nodes.forEach(d => {
      d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
      d.y = Math.max(d.radius, Math.min(height - d.radius, d.y));
    });
    bubbles.style("left", d => (d.x - d.radius) + "px").style("top", d => (d.y - d.radius) + "px");
  });
}

document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeBubble = null;
  document.getElementById('detailPanel').classList.remove('show');
  placeBubbles(btn.dataset.cat);
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    placeBubbles(document.querySelector('.filter-btn.active')?.dataset.cat || 'all');
  }, 150);
});

// ========================
// INICIALIZAR NOTAS
// ========================
document.addEventListener('DOMContentLoaded', () => {
  window.notesSystem = new RecruiterNotesSystem();
});

// ========================
// SISTEMA DE IDIOMAS
// ========================
const translations = {
  pt: {
    typing_roles: ["Desenvolvedor Full Stack", "Suporte Técnico"],
    tagline: "Transformando ideias em código | Soluções que fazem a diferença",
    btn_projects: "Ver Projetos",
    btn_contact: "Contato",
    btn_cv: "Instalar Currículo",
    about_label: "sobre mim",
    about_title_1: "Desenvolvedor",
    about_title_2: "apaixonado",
    about_title_3: "por código",
    about_desc: "Desenvolvedor Full Stack com foco em criar experiências digitais que realmente fazem a diferença. Do back-end robusto em Laravel/Python até interfaces modernas em React — transformo ideias em produtos funcionais e escaláveis.",
    pill_1: "Trabalho presencial / remoto",
    pill_2: "Taubaté, BR",
    pill_3: "Disponível para projetos",
    stat_exp: "anos de experiência",
    stat_proj: "projetos entregues",
    stat_tech: "tecnologias dominadas",
    stat_learn: "vontade de aprender",
    section_projects: "Projetos em Destaque",
    section_skills: "Stack Tecnológico",
    section_certs: "Certificados",
    project1_desc: "Sistema completo de EAD para venda de cursos online na área de segurança do trabalho. Plataforma com catálogo dinâmico, processamento de pagamentos integrado, envio automático de credenciais e painel administrativo completo para gestão de alunos e conteúdos.",
    project2_desc: "Plataforma inovadora para criação de chatbots com interface visual baseada em blocos (no-code). Permite que usuários sem conhecimento técnico construam fluxos de conversa complexos, integrando IA para respostas inteligentes e personalizáveis.",
    project_link: "Acessar Projeto",
    footer_title: "Vamos Criar Algo Incrível?",
    footer_desc: "Entre em contato e vamos conversar sobre seu próximo projeto",
    contact_email: "Email",
    nav_notes: "Notas do Recrutador",
    tl_title: "Trajetória",
    filters_all: "Todas",
    filters_backend: "Back-end",
    filters_frontend: "Front-end",
    filters_db: "Banco de dados",
    filters_infra: "Infra & IA",
    skill_mastery: "de domínio",
    skill_no_projects: "Nenhum projeto listado",
    cats: {
      backend:  "Back-end",
      frontend: "Front-end",
      db:       "Banco de dados",
      infra:    "Infra & IA",
    },
    projects_label: {
      dg:   "DG Consultoria",
      auto: "AutoAbout",
      free: "Freelances",
      tcc:  "TCC / Pessoal",
    },
    notes: {
      toggle_btn: "Notas do Recrutador",
      header: "Notas do Recrutador",
      tab_write: "Nova Nota",
      tab_history: "Notas Salvas",
      candidate_role: "Desenvolvedor Full Stack",
      rating_label: "Avaliação:",
      category_label: "Categoria:",
      categories: {
        technical: "Habilidades Técnicas",
        soft: "Soft Skills",
        experience: "Experiência",
        portfolio: "Portfólio",
        other: "Outro",
      },
      title_label: "Título:",
      title_placeholder: "Ex: Destaque em PHP",
      content_label: "Nota:",
      content_placeholder: "Escreva suas observações sobre o candidato...",
      btn_save: "Salvar Nota",
      btn_clear: "Limpar",
      filter_all: "Todas categorias",
      sort_newest: "Mais recentes",
      sort_oldest: "Mais antigas",
      sort_rating: "Melhor avaliação",
      footer_stats: "notas salvas localmente",
      empty_title: "Nenhuma nota ainda",
      empty_hint: 'Clique em "Nova Nota" para começar',
    },
    certs: [
      { tag: "Infra & Cloud", title: "Fundamentos de Segurança em Nuvem", sub: "Microsoft SC-900", inst: "Microsoft" },
      { tag: "Infra & Cloud", title: "Implantação de Serviços em Nuvem", sub: "Google Cloud Foundations", inst: "Google" },
      { tag: "Dados", title: "Power BI", sub: "Business Intelligence & Dashboards", inst: "SENAI" },
      { tag: "Redes", title: "CCNA — Introdução ao Networking", sub: "Cisco Networking Academy", inst: "Cisco" },
      { tag: "Infra", title: "Linux Unhatched", sub: "Fundamentos de Linux", inst: "Cisco" },
    ],
  },
  en: {
    typing_roles: ["Full Stack Developer", "Tech Support"],
    tagline: "Turning ideas into code | Solutions that make a difference",
    btn_projects: "See Projects",
    btn_contact: "Contact",
    btn_cv: "Install Resume",
    about_label: "about me",
    about_title_1: "Developer",
    about_title_2: "passionate",
    about_title_3: "about code",
    about_desc: "Full Stack Developer focused on creating digital experiences that truly make a difference. From robust back-end with Laravel/Python to modern interfaces in React — I turn ideas into functional, scalable products.",
    pill_1: "On-site / remote work",
    pill_2: "Taubaté, BR",
    pill_3: "Available for projects",
    stat_exp: "years of experience",
    stat_proj: "projects delivered",
    stat_tech: "technologies mastered",
    stat_learn: "will to learn",
    section_projects: "Featured Projects",
    section_skills: "Tech Stack",
    section_certs: "Certificates",
    project1_desc: "Complete e-learning system for selling online courses in occupational safety. Platform with dynamic catalog, integrated payment processing, automatic credential delivery and full admin panel for managing students and content.",
    project2_desc: "Innovative platform for building chatbots with a visual block-based interface (no-code). Lets non-technical users build complex conversation flows, integrating AI for smart, customizable responses.",
    project_link: "Visit Project",
    footer_title: "Let's Build Something Amazing?",
    footer_desc: "Get in touch and let's talk about your next project",
    contact_email: "Email",
    nav_notes: "Recruiter Notes",
    tl_title: "Journey",
    filters_all: "All",
    filters_backend: "Back-end",
    filters_frontend: "Front-end",
    filters_db: "Database",
    filters_infra: "Infra & AI",
    skill_mastery: "proficiency",
    skill_no_projects: "No projects listed",
    cats: {
      backend:  "Back-end",
      frontend: "Front-end",
      db:       "Database",
      infra:    "Infra & AI",
    },
    projects_label: {
      dg:   "DG Consultoria",
      auto: "AutoAbout",
      free: "Freelance",
      tcc:  "Capstone / Personal",
    },
    notes: {
      toggle_btn: "Recruiter Notes",
      header: "Recruiter Notes",
      tab_write: "New Note",
      tab_history: "Saved Notes",
      candidate_role: "Full Stack Developer",
      rating_label: "Rating:",
      category_label: "Category:",
      categories: {
        technical: "Technical Skills",
        soft: "Soft Skills",
        experience: "Experience",
        portfolio: "Portfolio",
        other: "Other",
      },
      title_label: "Title:",
      title_placeholder: "Ex: Strong PHP skills",
      content_label: "Note:",
      content_placeholder: "Write your observations about the candidate...",
      btn_save: "Save Note",
      btn_clear: "Clear",
      filter_all: "All categories",
      sort_newest: "Most recent",
      sort_oldest: "Oldest first",
      sort_rating: "Best rating",
      footer_stats: "notes saved locally",
      empty_title: "No notes yet",
      empty_hint: 'Click "New Note" to get started',
    },
    certs: [
      { tag: "Infra & Cloud", title: "Cloud Security Fundamentals", sub: "Microsoft SC-900", inst: "Microsoft" },
      { tag: "Infra & Cloud", title: "Cloud Services Deployment", sub: "Google Cloud Foundations", inst: "Google" },
      { tag: "Data", title: "Power BI", sub: "Business Intelligence & Dashboards", inst: "SENAI" },
      { tag: "Networking", title: "CCNA — Introduction to Networking", sub: "Cisco Networking Academy", inst: "Cisco" },
      { tag: "Infra", title: "Linux Unhatched", sub: "Linux Fundamentals", inst: "Cisco" },
    ],
  }
};

let currentLang = 'pt';

function toggleLang() {
  document.getElementById('langSwitcher').classList.toggle('open');
}

function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  document.getElementById('langFlag').textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
  document.getElementById('langLabel').textContent = lang === 'pt' ? 'PT' : 'EN';
  document.querySelectorAll('.lang-option').forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
  document.getElementById('langSwitcher').classList.remove('open');

  document.querySelector('.tagline').textContent = t.tagline;

  const btns = document.querySelectorAll('.button-group .btn');
  if (btns[0]) btns[0].innerHTML = `<i class="fas fa-arrow-down"></i> ${t.btn_projects}`;
  if (btns[1]) btns[1].innerHTML = `<i class="fas fa-envelope"></i> ${t.btn_contact}`;
  if (btns[2]) btns[2].innerHTML = `<i class="fas fa-download"></i> ${t.btn_cv}`;

  const sectionLabel = document.querySelector('.section-label');
  if (sectionLabel) sectionLabel.textContent = t.about_label;

  const aboutTitle = document.querySelector('.about-title');
  if (aboutTitle) aboutTitle.innerHTML = `${t.about_title_1}<br><span>${t.about_title_2}</span> ${t.about_title_3}`;

  const aboutDesc = document.querySelector('.about-desc');
  if (aboutDesc) aboutDesc.textContent = t.about_desc;

  const pills = document.querySelectorAll('.about-pills .pill');
  if (pills[0]) pills[0].textContent = t.pill_1;
  if (pills[1]) pills[1].textContent = t.pill_2;
  if (pills[2]) pills[2].textContent = t.pill_3;

  const statLabels = document.querySelectorAll('.stat-label');
  if (statLabels[0]) statLabels[0].textContent = t.stat_exp;
  if (statLabels[1]) statLabels[1].textContent = t.stat_proj;
  if (statLabels[2]) statLabels[2].textContent = t.stat_tech;
  if (statLabels[3]) statLabels[3].textContent = t.stat_learn;

  const tlTitle = document.querySelector('.timeline-title');
  if (tlTitle) tlTitle.textContent = t.tl_title;

  // ✅ TIMELINE
  events.length = 0;
  eventsData[lang].forEach(e => events.push(e));
  buildTimeline();
  setTimeout(() => setActive(0), 50);

  // ✅ SECTION TITLES
  const sectionTitles = document.querySelectorAll('.section-title');
  if (sectionTitles[0]) sectionTitles[0].textContent = t.section_projects;
  if (sectionTitles[1]) sectionTitles[1].textContent = t.section_skills;

  const certTitle = document.querySelector('#certificates .section-title');
  if (certTitle) certTitle.textContent = t.section_certs;

  // ✅ PROJETOS
  const projectDescs = document.querySelectorAll('.project-content p');
  if (projectDescs[0]) projectDescs[0].textContent = t.project1_desc;
  if (projectDescs[1]) projectDescs[1].textContent = t.project2_desc;
  document.querySelectorAll('.project-link span').forEach(link => link.textContent = t.project_link);

  // ✅ FOOTER
  const footerH2 = document.querySelector('footer h2');
  if (footerH2) footerH2.textContent = t.footer_title;
  const footerP = document.querySelector('footer > p');
  if (footerP) footerP.textContent = t.footer_desc;
  const emailLink = document.querySelector('.contact-links a:first-child');
  if (emailLink) emailLink.innerHTML = `<i class="fas fa-envelope"></i> ${t.contact_email}`;

  // ✅ STACK — legenda + bolhas
  buildLegend();
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.cat || 'all';
  placeBubbles(activeFilter);

  // ✅ FILTROS
  const filterBtns = document.querySelectorAll('.filter-btn');
  ['filters_all','filters_backend','filters_frontend','filters_db','filters_infra'].forEach((key, i) => {
    if (filterBtns[i]) filterBtns[i].textContent = t[key];
  });

  // ✅ CERTIFICADOS
  const certCards = document.querySelectorAll('.cert-card');
  t.certs.forEach((c, i) => {
    if (!certCards[i]) return;
    const tag  = certCards[i].querySelector('.cert-tag');
    const h3   = certCards[i].querySelector('h3');
    const sub  = certCards[i].querySelector('.cert-sub');
    const inst = certCards[i].querySelector('.cert-inst');
    if (tag)  tag.textContent  = c.tag;
    if (h3)   h3.textContent   = c.title;
    if (sub)  sub.textContent  = c.sub;
    if (inst) {
      const icon = inst.querySelector('i');
      inst.textContent = ' ' + c.inst;
      if (icon) inst.prepend(icon);
    }
  });

  // ✅ NOTAS DO RECRUTADOR
  const n = t.notes;

  const notesToggleSpan = document.querySelector('.notes-toggle-btn span:not(.notes-badge)');
  if (notesToggleSpan) notesToggleSpan.textContent = n.toggle_btn;

  const notesHeaderH3 = document.querySelector('.notes-header h3');
  if (notesHeaderH3) notesHeaderH3.innerHTML = `<i class="fas fa-clipboard-list"></i> ${n.header}`;

  const tabBtns = document.querySelectorAll('.notes-tabs .tab-btn');
  if (tabBtns[0]) tabBtns[0].innerHTML = `<i class="fas fa-pencil-alt"></i> ${n.tab_write}`;
  if (tabBtns[1]) tabBtns[1].innerHTML = `<i class="fas fa-list"></i> ${n.tab_history}`;

  const candidateRoleEl = document.querySelector('.notes-candidate-info p');
  if (candidateRoleEl) candidateRoleEl.textContent = n.candidate_role;

  const ratingLabelEl = document.querySelector('.rating-system span');
  if (ratingLabelEl) ratingLabelEl.textContent = n.rating_label;

  const formLabels = document.querySelectorAll('.notes-form label');
  if (formLabels[0]) formLabels[0].textContent = n.category_label;
  if (formLabels[1]) formLabels[1].textContent = n.title_label;
  if (formLabels[2]) formLabels[2].textContent = n.content_label;

  const noteTitleInput = document.getElementById('noteTitle');
  if (noteTitleInput) noteTitleInput.placeholder = n.title_placeholder;

  const noteContentTA = document.getElementById('noteContent');
  if (noteContentTA) noteContentTA.placeholder = n.content_placeholder;

  const saveNoteBtn = document.getElementById('saveNoteBtn');
  if (saveNoteBtn) saveNoteBtn.innerHTML = `<i class="fas fa-save"></i> ${n.btn_save}`;

  const clearNoteBtn = document.getElementById('clearNoteBtn');
  if (clearNoteBtn) clearNoteBtn.innerHTML = `<i class="fas fa-eraser"></i> ${n.btn_clear}`;

  const noteCategory = document.getElementById('noteCategory');
  if (noteCategory) {
    noteCategory.options[0].text = n.categories.technical;
    noteCategory.options[1].text = n.categories.soft;
    noteCategory.options[2].text = n.categories.experience;
    noteCategory.options[3].text = n.categories.portfolio;
    noteCategory.options[4].text = n.categories.other;
  }

  const filterCategory = document.getElementById('filterCategory');
  if (filterCategory) {
    filterCategory.options[0].text = n.filter_all;
    filterCategory.options[1].text = n.categories.technical;
    filterCategory.options[2].text = n.categories.soft;
    filterCategory.options[3].text = n.categories.experience;
    filterCategory.options[4].text = n.categories.portfolio;
    filterCategory.options[5].text = n.categories.other;
  }

  const sortNotes = document.getElementById('sortNotes');
  if (sortNotes) {
    sortNotes.options[0].text = n.sort_newest;
    sortNotes.options[1].text = n.sort_oldest;
    sortNotes.options[2].text = n.sort_rating;
  }

  const totalNotesEl = document.getElementById('totalNotes');
  const notesStatsEl = document.getElementById('notesStats');
  if (notesStatsEl && totalNotesEl) {
    const count = totalNotesEl.textContent;
    notesStatsEl.innerHTML = `<i class="fas fa-save"></i> <span id="totalNotes">${count}</span> ${n.footer_stats}`;
  }

  const emptyNotes = document.querySelector('.empty-notes');
  if (emptyNotes) {
    const p = emptyNotes.querySelector('p');
    const small = emptyNotes.querySelector('small');
    if (p) p.textContent = n.empty_title;
    if (small) small.textContent = n.empty_hint;
  }

  // Atualiza lista de notas com labels traduzidos
  if (window.notesSystem) window.notesSystem.updateNotesList();

  // ✅ TYPING
  roles.length = 0;
  t.typing_roles.forEach(r => roles.push(r));
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
  const switcher = document.getElementById('langSwitcher');
  if (switcher && !switcher.contains(e.target)) switcher.classList.remove('open');
});

// ========================
// INICIALIZAR SKILLS
// ========================
buildLegend();
placeBubbles('all');