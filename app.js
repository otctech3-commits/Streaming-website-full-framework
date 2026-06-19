// ===== MK ANIME - MAIN APP =====
const animeData = [
  {
    id: 1,
    title: "Jujutsu Kaisen 0",
    category: "action",
    type: "movie",
    year: 2021,
    rating: 8.9,
    duration: "1h 45m",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    description: "Yuta Okkotsu, a high school student who gains control of an extremely powerful Cursed Spirit and gets enrolled in the Tokyo Prefectural Jujutsu High School.",
    videoUrl: "https://www.youtube.com/embed/pkKu9hLT-t8",
    episodes: 1,
    trending: true
  },
  {
    id: 2,
    title: "Demon Slayer: Mugen Train",
    category: "action",
    type: "movie",
    year: 2020,
    rating: 8.5,
    duration: "1h 57m",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
    description: "Tanjiro and his comrades embark on a new mission aboard the Mugen Train to face a demon who has been tormenting passengers.",
    videoUrl: "https://www.youtube.com/embed/ATJYac_dORw",
    episodes: 1,
    trending: true
  },
  {
    id: 3,
    title: "Attack on Titan Final Season",
    category: "action",
    type: "tv",
    year: 2023,
    rating: 9.0,
    duration: "24 ep",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop",
    description: "The battle for Paradis reaches its climax as Eren's true plan is revealed to the world.",
    videoUrl: "https://www.youtube.com/embed/MGRm4IzK1SQ",
    episodes: 24,
    trending: true
  },
  {
    id: 4,
    title: "Your Name",
    category: "romance",
    type: "movie",
    year: 2016,
    rating: 8.4,
    duration: "1h 46m",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
    description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
    videoUrl: "https://www.youtube.com/embed/xU47nhruN-Q",
    episodes: 1
  },
  {
    id: 5,
    title: "One Piece Film Red",
    category: "adventure",
    type: "movie",
    year: 2022,
    rating: 7.3,
    duration: "1h 55m",
    image: "https://images.unsplash.com/photo-1614583224978-f05ce19c5cdb?w=400&h=600&fit=crop",
    description: "Uta, the most beloved singer in the world, reveals herself to be the daughter of Shanks.",
    videoUrl: "https://www.youtube.com/embed/BfkL8Gr07JU",
    episodes: 1
  },
  {
    id: 6,
    title: "Spy x Family",
    category: "comedy",
    type: "tv",
    year: 2022,
    rating: 8.6,
    duration: "25 ep",
    image: "https://images.unsplash.com/photo-1621570074981-ee6a0145c8e3?w=400&h=600&fit=crop",
    description: "A spy, an assassin, and a telepath come together to form a fake family.",
    videoUrl: "https://www.youtube.com/embed/ofXigq9aIpo",
    episodes: 25
  },
  {
    id: 7,
    title: "Chainsaw Man",
    category: "action",
    type: "tv",
    year: 2022,
    rating: 8.7,
    duration: "12 ep",
    image: "https://images.unsplash.com/photo-1633532209268-2d87e5c9b74f?w=400&h=600&fit=crop",
    description: "Denji becomes a devil hunter to pay off his father's debt to the yakuza.",
    videoUrl: "https://www.youtube.com/embed/l96zmDlWCBk",
    episodes: 12
  },
  {
    id: 8,
    title: "Suzume",
    category: "fantasy",
    type: "movie",
    year: 2022,
    rating: 7.7,
    duration: "2h 2m",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop",
    description: "A 17-year-old girl helps close doors that are causing disasters all over Japan.",
    videoUrl: "https://www.youtube.com/embed/F7nQ0VUAOXA",
    episodes: 1
  }
];

let filteredData = [...animeData];
let currentView = 'grid';

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const yearFilter = document.getElementById('yearFilter');
const typeFilter = document.getElementById('typeFilter');
const sortFilter = document.getElementById('sortFilter');
const loadMoreBtn = document.getElementById('loadMore');
const playerModal = document.getElementById('playerModal');
const closePlayer = document.getElementById('closePlayer');
const modalOverlay = document.getElementById('modalOverlay');
const videoPlayer = document.getElementById('videoPlayer');
const heroPlay = document.getElementById('heroPlay');
const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderMovies();
  initEventListeners();
  initScrollHeader();
  updateHero();
  initViewToggle();
  initMobileMenu();
});

// ===== RENDER MOVIES =====
function renderMovies() {
  moviesGrid.innerHTML = filteredData.map(anime => `
    <div class="movie-card" data-id="${anime.id}">
      <div class="movie-poster">
        <img src="${anime.image}" alt="${anime.title}" loading="lazy">
        <div class="movie-overlay">
          <div class="play-icon"><i class="fa-solid fa-play"></i></div>
        </div>
        <span class="movie-badge">HD</span>
        <span class="movie-rating"><i class="fa-solid fa-star"></i> ${anime.rating}</span>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${anime.title}</h3>
        <div class="movie-meta">
          <span>${anime.year}</span>
          <span>${anime.duration}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Add click listeners
  document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openPlayer(id);
    });
  });
}

// ===== FILTERS =====
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const genre = genreFilter.value;
  const year = yearFilter.value;
  const type = typeFilter.value;
  const sort = sortFilter.value;

  filteredData = animeData.filter(anime => {
    const matchSearch = anime.title.toLowerCase().includes(searchTerm) ||
                       anime.description.toLowerCase().includes(searchTerm);
    const matchGenre = genre === 'all' || anime.category === genre;
    const matchYear = year === 'all' || anime.year.toString() === year;
    const matchType = type === 'all' || anime.type === type;
    return matchSearch && matchGenre && matchYear && matchType;
  });

  // Sort
  if (sort === 'rating') {
    filteredData.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'popular') {
    filteredData.sort((a, b) => (b.trending || 0) - (a.trending || 0));
  } else if (sort === 'name') {
    filteredData.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredData.sort((a, b) => b.year - a.year);
  }

  renderMovies();
}

// ===== PLAYER MODAL =====
function openPlayer(id) {
  const anime = animeData.find(a => a.id === id);
  if (!anime) return;

  document.getElementById('playerTitle').textContent = anime.title;
  document.getElementById('playerRating').innerHTML = `<i class="fa-solid fa-star"></i> ${anime.rating}`;
  document.getElementById('playerYear').textContent = anime.year;
  document.getElementById('playerDuration').textContent = anime.duration;
  document.getElementById('playerDesc').textContent = anime.description;
  videoPlayer.src = anime.videoUrl + '?autoplay=1';

  // Episodes
  const episodesContainer = document.getElementById('episodes');
  const episodeList = document.getElementById('episodeList');
  if (anime.episodes > 1) {
    episodeList.style.display = 'block';
    episodesContainer.innerHTML = Array.from({length: anime.episodes}, (_, i) =>
      `<button class="episode-btn ${i === 0? 'active' : ''}">${i + 1}</button>`
    ).join('');

    // Episode click
    document.querySelectorAll('.episode-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // You can change video URL per episode here
      });
    });
  } else {
    episodeList.style.display = 'none';
  }

  playerModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePlayerModal() {
  playerModal.classList.remove('active');
  videoPlayer.src = '';
  document.body.style.overflow = '';
}

// ===== HERO UPDATE =====
function updateHero() {
  const trending = animeData.filter(a => a.trending)[0] || animeData[0];
  heroTitle.textContent = trending.title;
  heroDesc.textContent = trending.description;
  document.querySelector('.hero-bg').style.backgroundImage =
    `linear-gradient(180deg,transparent 0%,var(--bg) 100%), url('${trending.image.replace('w=400&h=600', 'w=1920')}')`;

  heroPlay.onclick = () => openPlayer(trending.id);
}

// ===== VIEW TOGGLE =====
function initViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      moviesGrid.style.gridTemplateColumns =
        currentView === 'list'? '1fr' : 'repeat(auto-fill,minmax(200px,1fr))';
    });
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// ===== SCROLL HEADER =====
function initScrollHeader() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// ===== EVENT LISTENERS =====
function initEventListeners() {
  searchInput.addEventListener('input', applyFilters);
  genreFilter.addEventListener('change', applyFilters);
  yearFilter.addEventListener('change', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
  sortFilter.addEventListener('change', applyFilters);

  closePlayer.addEventListener('click', closePlayerModal);
  modalOverlay.addEventListener('click', closePlayerModal);

  loadMoreBtn.addEventListener('click', () => {
    // Simulate load more
    loadMoreBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    setTimeout(() => {
      loadMoreBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Load More';
      // Add more anime here in real app
    }, 1000);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
}

// ===== MOBILE MENU CSS =====
const style = document.createElement('style');
style.textContent = `
 .mobile-menu.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
 .mobile-menu.active span:nth-child(2) { opacity: 0; }
 .mobile-menu.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
 .nav-links.active {
    transform: translateY(0)!important;
    opacity: 1!important;
    pointer-events: all!important;
  }
  body.light-theme {
    --bg: #f5f5f5;
    --bg2: #ffffff;
    --card: #ffffff;
    --border: #e0e0e0;
    --text: #1a1a1a;
    --text-dim: #666;
  }
`;
document.head.appendChild(style);
