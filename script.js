// ========================
// TYPING ANIMATION (HERO DINÂMICA)
// ========================
const roles = [
  "Desenvolvedor Full Stack",
  "Suporte Técnico",
];

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
  
  const speed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, speed);
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

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
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
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
});

// ========================
// BACK TO TOP BUTTON
// ========================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// INTERSECTION OBSERVER (ANIMAÇÕES)
// ========================
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);
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
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.style.display === "flex") closeLightbox();
});

// ========================
// GALLERY SYSTEM COMPLETO
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
  
  // Limpar dots existentes
  dotsContainer.innerHTML = '';
  
  // Criar os dots
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateGallery();
    });
    dotsContainer.appendChild(dot);
  }
  
  function updateGallery() {
    const trackWidth = track.parentElement.clientWidth;
    track.style.transform = `translateX(-${currentIndex * trackWidth}px)`;
    
    // Atualizar dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  function nextImage() {
    if (currentIndex < totalImages - 1) {
      currentIndex++;
      updateGallery();
    }
  }
  
  function prevImage() {
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery();
    }
  }
  
  // Eventos dos botões
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  
  // Clique nas imagens para abrir lightbox
  images.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });
  
  // Atualizar ao redimensionar
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateGallery, 100);
  });
  
  // Inicializar
  setTimeout(updateGallery, 100);
}

// Inicializar todas as galerias quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery').forEach(initGallery);
});

// ========================
// SISTEMA DE INSTALAÇÃO DO CURRÍCULO
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

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && installModal.style.display === 'flex') {
    closeInstallModal();
  }
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
  
  // Auto-scroll
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

async function startInstallation() {
  // Reset
  terminalOutput.innerHTML = '';
  fileList.innerHTML = '';
  let currentProgress = 0;
  updateInstallProgress(0);
  
  // Adicionar arquivos
  files.forEach(file => addFileItem(file, false));
  
  // Fase 1: Terminal Messages (0-60%)
  for (let i = 0; i < terminalMessages.length; i++) {
    const msg = terminalMessages[i];
    addTerminalLine(msg.text, msg.type);
    
    if (msg.text.includes('Verificando')) {
      updateInstallStatus('Verificando sistema...');
    } else if (msg.text.includes('Escaneando')) {
      updateInstallStatus('Executando scan de segurança...', 'fa-shield');
    } else if (msg.text.includes('Descompactando')) {
      updateInstallStatus('Descompactando arquivos...', 'fa-file-archive');
    } else if (msg.text.includes('dependências')) {
      updateInstallStatus('Instalando dependências...', 'fa-cube');
    } else if (msg.text.includes('Compilando')) {
      updateInstallStatus('Compilando assets...', 'fa-code');
    }
    
    currentProgress = (i / terminalMessages.length) * 60;
    updateInstallProgress(currentProgress);
    
    await sleep(300 + Math.random() * 200);
  }
  
  // Fase 2: Instalação de arquivos (60-95%)
  updateInstallStatus('Instalando arquivos do currículo...', 'fa-file');
  
  for (let i = 0; i < files.length; i++) {
    // Marcar arquivo como completado
    const fileItems = fileList.querySelectorAll('.file-item');
    if (fileItems[i]) {
      fileItems[i].classList.add('completed');
      fileItems[i].innerHTML = `<i class="fas fa-check-circle"></i> ${files[i].name} ✓`;
    }
    
    addTerminalLine(`✓ Instalado: ${files[i].name}`, 'success');
    
    currentProgress = 60 + ((i + 1) / files.length) * 35;
    updateInstallProgress(currentProgress);
    
    await sleep(200 + Math.random() * 150);
  }
  
  // Fase 3: Finalização (95-100%)
  updateInstallStatus('Finalizando instalação...', 'fa-check');
  addTerminalLine('Criando atalhos no sistema...', 'normal');
  await sleep(300);
  
  addTerminalLine('Registrando no menu iniciar...', 'normal');
  await sleep(300);
  
  addTerminalLine('✓ Instalação concluída com sucesso!', 'success');
  addTerminalLine(' Currículo pronto para uso!', 'success');
  
  updateInstallProgress(100);
  updateInstallStatus('Instalação completa!', 'fa-check-circle');
  
  await sleep(500);
  
  // Efeito de glitch final
  const modal = document.querySelector('.install-content');
  modal.style.animation = 'none';
  setTimeout(() => {
    modal.style.animation = '';
  }, 10);
  
  // Baixar o arquivo real
  await sleep(1000);
  downloadCurriculo();
  
  // Fechar modal após 2 segundos
  setTimeout(() => {
    closeInstallModal();
  }, 2000);
}

function downloadCurriculo() {
  const curriculoUrl = 'Cassiano Soares.pdf';
  const link = document.createElement('a');
  link.href = curriculoUrl;
  link.download = 'Curriculo_Cassiano_Soares.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listener do botão
if (btnInstalarCurriculo) {
  btnInstalarCurriculo.addEventListener('click', function(e) {
    e.preventDefault();
    openInstallModal();
  });
}

// Função global para fechar o modal
window.closeInstallModal = closeInstallModal;
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
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
  // Matrix rain effect
  document.body.style.animation = 'hackerGlitch 0.5s infinite';
  setTimeout(() => {
    document.body.style.animation = '';
    alert('Você invocou a vaca medonha');
  }, 2000);
}
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
      });
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}
// ========================
// SISTEMA DE NOTAS SIMPLIFICADO
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
      starsContainer.addEventListener('mouseleave', () => {
        this.highlightStars(this.currentRating);
      });
    }
    
    this.saveBtn.addEventListener('click', () => this.saveNote());
    this.clearBtn.addEventListener('click', () => this.clearForm());
    this.filterCategory.addEventListener('change', () => this.updateNotesList());
    this.sortNotes.addEventListener('change', () => this.updateNotesList());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.panel.classList.contains('show')) {
        this.closePanel();
      }
    });
  }
  
  togglePanel() {
    this.panel.classList.toggle('show');
    if (this.panel.classList.contains('show')) {
      this.updateNotesList();
    }
  }
  
  closePanel() {
    this.panel.classList.remove('show');
  }
  
  switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === tabId + 'Tab');
    });
    
    if (tabId === 'history') {
      this.updateNotesList();
    }
  }
  
  setRating(rating) {
    this.currentRating = parseInt(rating);
    this.highlightStars(rating);
  }
  
  highlightStars(rating) {
    this.stars.forEach(star => {
      const starRating = parseInt(star.dataset.rating);
      star.className = starRating <= rating ? 'fas fa-star' : 'far fa-star';
    });
  }
  
  saveNote() {
    const title = this.noteTitle.value.trim();
    const content = this.noteContent.value.trim();
    
    if (!title || !content) {
      alert('Por favor, preencha título e conteúdo da nota');
      return;
    }
    
    const note = {
      id: Date.now(),
      category: this.noteCategory.value,
      title: title,
      content: content,
      rating: this.currentRating,
      date: new Date().toISOString()
    };
    
    this.notes.push(note);
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
    
    let filteredNotes = category === 'all' 
      ? [...this.notes] 
      : this.notes.filter(note => note.category === category);
    
    filteredNotes.sort((a, b) => {
      switch(sort) {
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'rating': return b.rating - a.rating;
        default: return new Date(b.date) - new Date(a.date);
      }
    });
    
    if (filteredNotes.length === 0) {
      this.notesList.innerHTML = `
        <div class="empty-notes">
          <i class="fas fa-clipboard"></i>
          <p>Nenhuma nota ainda</p>
          <small>Clique em "Nova Nota" para começar</small>
        </div>
      `;
      return;
    }
    
    this.notesList.innerHTML = filteredNotes
      .map(note => this.createNoteElement(note))
      .join('');
  }
  
  createNoteElement(note) {
    const categoryLabels = {
      technical: 'Habilidades Técnicas',
      soft: 'Soft Skills',
      experience: 'Experiência',
      portfolio: 'Portfólio',
      other: 'Outro'
    };
    
    const stars = '★'.repeat(note.rating) + '☆'.repeat(5 - note.rating);
    const date = new Date(note.date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `
      <div class="note-item">
        <div class="note-header">
          <span class="note-category">${categoryLabels[note.category]}</span>
          ${note.rating > 0 ? `<span class="note-rating">${stars}</span>` : ''}
        </div>
        <div class="note-title">${this.escapeHtml(note.title)}</div>
        <div class="note-content">${this.escapeHtml(note.content)}</div>
        <div class="note-footer">
          <span><i class="far fa-calendar"></i> ${date}</span>
        </div>
      </div>
    `;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  updateStats() {
    const total = this.notes.length;
    if (this.notesBadge) this.notesBadge.textContent = total;
    if (this.totalNotesSpan) this.totalNotesSpan.textContent = total;
  }
  
  loadNotes() {
    const saved = localStorage.getItem('recruiter_notes_cassiano');
    return saved ? JSON.parse(saved) : [];
  }
  
  saveNotes() {
    localStorage.setItem('recruiter_notes_cassiano', JSON.stringify(this.notes));
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  window.notesSystem = new RecruiterNotesSystem();
});