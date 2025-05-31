const talents = [
  {
    id: '1',
    name: 'Ana Silva',
    title: 'UX/UI Designer',
    location: 'São Paulo, SP',
    description: 'Especialista em criar experiências digitais que conectam pessoas e marcas. Apaixonada por design centrado no usuário.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototipação', 'Design System'],
    price: 'R$ 3.500',
    rating: 4.9,
    reviewCount: 47,
    portfolio: 'https://anasilva.design',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    available: true,
    category: 'design'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    title: 'Desenvolvedor Full Stack',
    location: 'Rio de Janeiro, RJ',
    description: 'Desenvolvedor experiente com foco em soluções escaláveis. Transformo ideias em aplicações robustas e eficientes.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    price: 'R$ 5.200',
    rating: 4.8,
    reviewCount: 63,
    portfolio: 'https://carlosdev.io',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    available: true,
    category: 'desenvolvimento'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    title: 'Social Media Manager',
    location: 'Belo Horizonte, MG',
    description: 'Estrategista digital que cria conteúdos que engajam e convertem. Especialista em redes sociais e marketing de conteúdo.',
    skills: ['Instagram', 'TikTok', 'Copy', 'Analytics', 'Canva'],
    price: 'R$ 2.800',
    rating: 4.7,
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    available: false,
    category: 'marketing'
  },
  {
    id: '4',
    name: 'Pedro Santos',
    title: 'Editor de Vídeo',
    location: 'Porto Alegre, RS',
    description: 'Editor criativo com mais de 5 anos de experiência. Especializo em conteúdo para YouTube, Instagram e campanhas publicitárias.',
    skills: ['After Effects', 'Premiere', 'DaVinci', 'Motion Graphics', 'Color Grading'],
    price: 'R$ 1.800',
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    available: true,
    category: 'video'
  },
  {
    id: '5',
    name: 'Julia Oliveira',
    title: 'Copywriter',
    location: 'Curitiba, PR',
    description: 'Palavras que vendem e conectam. Especialista em copy persuasivo para landing pages, emails e campanhas de marketing.',
    skills: ['Copywriting', 'SEO', 'Email Marketing', 'Landing Pages', 'Storytelling'],
    price: 'R$ 2.200',
    rating: 4.8,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    available: true,
    category: 'redacao'
  },
  {
    id: '6',
    name: 'Rafael Torres',
    title: 'Consultor de Marketing Digital',
    location: 'Brasília, DF',
    description: 'Estrategista que transforma dados em resultados. Especialista em Google Ads, Facebook Ads e growth marketing.',
    skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'Growth Hacking', 'CRO'],
    price: 'R$ 4.500',
    rating: 4.9,
    reviewCount: 55,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    available: true,
    category: 'consultoria'
  }
];

// Estado da aplicação
let currentPage = 'home';
let filteredTalents = [...talents];
let filters = {
  search: '',
  category: 'all',
  price: 'all',
  availability: 'all'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  updateActiveNavItem();
  renderTalents();
}

function setupEventListeners() {
  // Navegação
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      showPage(page);
    });
  });

  // Busca
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function() {
    filters.search = this.value;
    applyFilters();
    if (this.value && currentPage !== 'talents') {
      showPage('talents');
    }
  });

  // Filtros
  document.getElementById('categoryFilter').addEventListener('change', function() {
    filters.category = this.value;
    applyFilters();
  });

  document.getElementById('priceFilter').addEventListener('change', function() {
    filters.price = this.value;
    applyFilters();
  });

  document.getElementById('availabilityFilter').addEventListener('change', function() {
    filters.availability = this.value;
    applyFilters();
  });

  // Modal
  document.getElementById('profileModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });

  document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeSuccessModal();
    }
  });

  // Form submission
  document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);
}

function showPage(page) {
  // Esconder todas as páginas
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  // Mostrar página atual
  document.getElementById(page).classList.add('active');
  currentPage = page;
  
  updateActiveNavItem();
  
  // Fechar menu mobile se estiver aberto
  document.getElementById('mobileMenu').classList.remove('active');
}

function updateActiveNavItem() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-page') === currentPage) {
      item.classList.add('active');
    }
  });
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
}

function applyFilters() {
  filteredTalents = talents.filter(talent => {
    // Filtro de busca
    const matchesSearch = filters.search === '' || 
      talent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      talent.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));

    // Filtro de categoria
    const matchesCategory = filters.category === 'all' || 
      talent.category === filters.category ||
      talent.title.toLowerCase().includes(filters.category.toLowerCase());

    // Filtro de disponibilidade
    const matchesAvailability = filters.availability === 'all' ||
      (filters.availability === 'available' && talent.available) ||
      (filters.availability === 'busy' && !talent.available);

    // Filtro de preço
    const priceValue = parseInt(talent.price.replace(/[^\d]/g, ''));
    const matchesPrice = filters.price === 'all' ||
      (filters.price === 'low' && priceValue < 3000) ||
      (filters.price === 'medium' && priceValue >= 3000 && priceValue <= 5000) ||
      (filters.price === 'high' && priceValue > 5000);

    return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
  });

  renderTalents();
}

function clearFilters() {
  filters = {
    search: '',
    category: 'all',
    price: 'all',
    availability: 'all'
  };

  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = 'all';
  document.getElementById('priceFilter').value = 'all';
  document.getElementById('availabilityFilter').value = 'all';

  applyFilters();
}

function renderTalents() {
  const grid = document.getElementById('talentsGrid');
  const noResults = document.getElementById('noResults');

  if (filteredTalents.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';
  
  grid.innerHTML = filteredTalents.map(talent => `
    <div class="talent-card" onclick="openTalentProfile('${talent.id}')">
      <div class="talent-header">
        <div class="status ${talent.available ? 'available' : 'busy'}">
          <span class="status-dot"></span>
          ${talent.available ? 'Disponível' : 'Ocupado'}
        </div>
        ${talent.portfolio ? `
          <a href="${talent.portfolio}" target="_blank" class="portfolio-link" onclick="event.stopPropagation()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15,3 21,3 21,9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        ` : ''}
      </div>

      <div class="talent-profile">
        <img src="${talent.image}" alt="${talent.name}" class="talent-image">
        <h3 class="talent-name">${talent.name}</h3>
        <p class="talent-title">${talent.title}</p>
        
        <div class="talent-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${talent.location}
        </div>

        <div class="talent-rating">
          <svg class="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
          </svg>
          <span class="rating-number">${talent.rating}</span>
          <span class="rating-count">(${talent.reviewCount} avaliações)</span>
        </div>
      </div>

      <p class="talent-description">${talent.description}</p>

      <div class="talent-skills">
        ${talent.skills.slice(0, 4).map(skill => `
          <span class="skill-tag">${skill}</span>
        `).join('')}
        ${talent.skills.length > 4 ? `
          <span class="skill-more">+${talent.skills.length - 4} mais</span>
        ` : ''}
      </div>

      <div class="talent-price">
        <div class="price-amount">${talent.price}</div>
        <div class="price-unit">por projeto</div>
      </div>

      <div class="talent-actions">
        <button class="btn-outline" onclick="event.stopPropagation(); openTalentProfile('${talent.id}')">
          Ver Perfil
        </button>
        <button 
          class="btn-hire" 
          ${!talent.available ? 'disabled' : ''}
          onclick="event.stopPropagation(); hireTalent('${talent.id}')"
        >
          ${talent.available ? 'Contratar' : 'Indisponível'}
        </button>
      </div>
    </div>
  `).join('');
}

function openTalentProfile(talentId) {
  const talent = talents.find(t => t.id === talentId);
  if (!talent) return;

  const modal = document.getElementById('profileModal');
  const modalName = document.getElementById('modalName');
  const modalBody = document.getElementById('modalBody');

  modalName.textContent = talent.name;
  
  modalBody.innerHTML = `
    <div style="display: flex; align-items: start; gap: 1.5rem; margin-bottom: 2rem;">
      <img src="${talent.image}" alt="${talent.name}" style="width: 6rem; height: 6rem; border-radius: 50%; object-fit: cover; border: 4px solid white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <div style="flex: 1;">
        <p style="font-size: 1.125rem; color: #0F4A5C; font-weight: 600; margin-bottom: 0.5rem;">${talent.title}</p>
        
        <div style="display: flex; align-items: center; color: #4A5568; margin-bottom: 0.75rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${talent.location}</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#F6D55C" style="margin-right: 0.25rem;">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
          </svg>
          <span style="font-weight: 600; color: #1A202C; margin-right: 0.25rem;">${talent.rating}</span>
          <span style="color: #4A5568;">(${talent.reviewCount} avaliações)</span>
        </div>
      </div>
      
      <div class="status ${talent.available ? 'available' : 'busy'}">
        <span class="status-dot"></span>
        ${talent.available ? 'Disponível' : 'Ocupado'}
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #1A202C; margin-bottom: 0.75rem;">Sobre</h3>
      <p style="color: #4A5568; line-height: 1.6;">${talent.description}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #1A202C; margin-bottom: 0.75rem;">Habilidades</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${talent.skills.map(skill => `
          <span class="skill-tag">${skill}</span>
        `).join('')}
      </div>
    </div>

    ${talent.portfolio ? `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.125rem; font-weight: 600; color: #1A202C; margin-bottom: 0.75rem;">Portfólio</h3>
        <a href="${talent.portfolio}" target="_blank" style="display: inline-flex; align-items: center; color: #0F4A5C; text-decoration: none; transition: color 0.2s;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Ver portfólio completo
        </a>
      </div>
    ` : ''}

    <div style="background: #F7FAFC; border-radius: 0.75rem; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;">
      <div style="font-size: 1.875rem; font-weight: bold; color: #0F4A5C; margin-bottom: 0.25rem;">${talent.price}</div>
      <div style="color: #4A5568;">por projeto</div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1.125rem; font-weight: 600; color: #1A202C; margin-bottom: 0.75rem;">Contato</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div style="display: flex; align-items: center; color: #4A5568;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.75rem;">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>${talent.name.toLowerCase().replace(' ', '.')}@email.com</span>
        </div>
        <div style="display: flex; align-items: center; color: #4A5568;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.75rem;">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>(11) 9 9999-9999</span>
        </div>
      </div>
    </div>

    <div style="display: flex; gap: 0.75rem; padding-top: 1.5rem; border-top: 1px solid #E2E8F0;">
      <button 
        class="btn-outline" 
        style="flex: 1; padding: 0.75rem 1.5rem;" 
        onclick="closeModal()"
      >
        Fechar
      </button>
      <button 
        class="btn-hire" 
        style="flex: 1; padding: 0.75rem 1.5rem;" 
        ${!talent.available ? 'disabled' : ''}
        onclick="hireTalent('${talent.id}')"
      >
        ${talent.available ? 'Quero Contratar' : 'Indisponível'}
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('profileModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function hireTalent(talentId) {
  const talent = talents.find(t => t.id === talentId);
  if (talent) {
    alert(`Iniciando conversa com ${talent.name}...`);
    closeModal();
  }
}

// Form handling functions
function handleProfileSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const skills = document.getElementById('profileSkills').value.split(',').map(skill => skill.trim());
  
  const newTalent = {
    id: Date.now().toString(),
    name: document.getElementById('profileName').value,
    title: document.getElementById('profileTitle').value,
    location: document.getElementById('profileLocation').value,
    description: document.getElementById('profileDescription').value,
    skills: skills,
    price: document.getElementById('profilePrice').value,
    rating: 5.0,
    reviewCount: 0,
    portfolio: document.getElementById('profilePortfolio').value || null,
    image: document.getElementById('profileImage').value || 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
    available: document.getElementById('profileAvailability').value === 'true',
    category: 'novo'
  };
  
  // Add to talents array
  talents.push(newTalent);
  
  // Reset form
  event.target.reset();
  
  // Show success modal
  showSuccessModal();
  
  // Update talents grid if on talents page
  if (currentPage === 'talents') {
    applyFilters();
  }
}

function showSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}