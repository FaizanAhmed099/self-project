document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  const chaptersGrid = document.querySelector('.chapters-grid');

  // Toggle sidebar
  if (menuToggle && sidebar && sidebarClose) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });

    // Close sidebar
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('show');
      menuToggle.classList.remove('active');
    });
  }

  // Info Section Accordion
  const infoHeaders = document.querySelectorAll('.info-header');
  infoHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');

      // Optional: Close other items
      if (item.classList.contains('active')) {
        infoHeaders.forEach(otherHeader => {
          const otherItem = otherHeader.parentElement;
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });

  // Generate chapter cards if on chapters page
  if (chaptersGrid) {
    // for (let i = 1; i <= 30; i++) {
    //   const card = document.createElement('a');
    //   card.href = '#'; // Link to individual chapter page in the future
    //   card.className = 'chapter-card';

    //   // card.innerHTML = `
    //   //   <div class="chapter-number">${i}</div>
    //   //   <div class="chapter-juz">Chapter (Juz)</div>
    //   // `;

    //   chaptersGrid.appendChild(card);
    // }
  }
});

// Dropdown logic for DeepSearch and CodeQlik
function setupDropdown(btnId, dropdownId) {
  const btn = document.getElementById(btnId);
  const group = btn.closest('.dropdown-group');
  const dropdown = document.getElementById(dropdownId);

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    // Close all other dropdowns
    document.querySelectorAll('.dropdown-group').forEach(g => {
      if (g !== group) g.classList.remove('open');
    });
    group.classList.toggle('open');
  });

  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      // Optionally update label here
      group.classList.remove('open');
    });
  });
}

document.addEventListener('click', function() {
  document.querySelectorAll('.dropdown-group').forEach(g => g.classList.remove('open'));
});

document.addEventListener('DOMContentLoaded', function() {
  setupDropdown('deepsearchDropdownBtn', 'deepsearchDropdown');
  setupDropdown('codeqlikDropdownBtn', 'codeqlikDropdown');
});

// Surahs Selection

 // Sample Surah data (expand to all 114 as needed)
 const surahs = [
  { number: 1, name: "Al-Faatiha", english: "The Opening", ayahs: 7, revelation: "Meccan" },
  { number: 2, name: "Al-Baqara", english: "The Cow", ayahs: 286, revelation: "Medinan" },
  { number: 3, name: "Aal-i-Imraan", english: "The Family of Imraan", ayahs: 200, revelation: "Medinan" },
  { number: 4, name: "An-Nisaa", english: "The Women", ayahs: 176, revelation: "Medinan" },
  { number: 5, name: "Al-Ma'idah", english: "The Table", ayahs: 120, revelation: "Medinan" },
  { number: 6, name: "Al-An'am", english: "The Cattle", ayahs: 165, revelation: "Medinan" },
  { number: 7, name: "Al-A'raf", english: "The Heights", ayahs: 206, revelation: "Medinan" },
  { number: 8, name: "Al-Anfal", english: "The Spoils of War", ayahs: 75, revelation: "Medinan" },
  { number: 9, name: "At-Tawbah", english: "The Repentance", ayahs: 129, revelation: "Medinan" },
  { number: 10, name: "Yunus", english: "Jonah", ayahs: 109, revelation: "Medinan" },
  { number: 11, name: "Hud", english: "Hud", ayahs: 123, revelation: "Medinan" },
  { number: 12, name: "Yusuf", english: "Joseph", ayahs: 111, revelation: "Medinan" },
  { number: 13, name: "Ar-Ra'd", english: "The Thunder", ayahs: 43, revelation: "Medinan" },
  { number: 14, name: "Ibrahim", english: "Abraham", ayahs: 52, revelation: "Medinan" },
  { number: 15, name: "Al-Hijr", english: "The Rocky Tract", ayahs: 99, revelation: "Medinan" },
  { number: 16, name: "An-Nahl", english: "The Bee", ayahs: 128, revelation: "Medinan" },
  { number: 17, name: "Al-Isra", english: "The Night Journey", ayahs: 111, revelation: "Medinan" },
  { number: 18, name: "Al-Kahf", english: "The Cave", ayahs: 119, revelation: "Medinan" },
  { number: 19, name: "Maryam", english: "Mary", ayahs: 93, revelation: "Medinan" },
  { number: 20, name: "Ta-Ha", english: "The Mount", ayahs: 88, revelation: "Medinan" },
  { number: 21, name: "Al-Anbiya", english: "The Prophets", ayahs: 135, revelation: "Medinan" },
  { number: 22, name: "Al-Haj", english: "The Pilgrimage", ayahs: 78, revelation: "Medinan" },
  { number: 23, name: "Al-Mu'minun", english: "The Believers", ayahs: 112, revelation: "Medinan" },
  { number: 24, name: "An-Nur", english: "The Light", ayahs: 64, revelation: "Medinan" },
  { number: 25, name: "Al-Furqan", english: "The Criterion", ayahs: 73, revelation: "Medinan" },
  { number: 26, name: "Ash-Shu'ara", english: "The Poets", ayahs: 209, revelation: "Medinan" },
  { number: 27, name: "An-Naml", english: "The Ant", ayahs: 93, revelation: "Medinan" },
  { number: 28, name: "Al-Qasas", english: "The Story", ayahs: 88, revelation: "Medinan" },
  { number: 29, name: "Al-Ankabut", english: "The Spider", ayahs: 69, revelation: "Medinan" },
  { number: 30, name: "Ar-Rum", english: "The Romans", ayahs: 60, revelation: "Medinan" },
  { number: 31, name: "Luqman", english: "Luqman", ayahs: 34, revelation: "Medinan" },
  { number: 32, name: "As-Sajdah", english: "The Prostration", ayahs: 30, revelation: "Medinan" },
  { number: 33, name: "Al-Ahzab", english: "The Combined Forces", ayahs: 73, revelation: "Medinan" },
  { number: 34, name: "Saba", english: "Sheba", ayahs: 54, revelation: "Medinan" },
  { number: 35, name: "An-Naml", english: "The Ant", ayahs: 53, revelation: "Medinan" },
  { number: 36, name: "Al-Qasas", english: "The Story", ayahs: 45, revelation: "Medinan" },
  { number: 37, name: "Al-Ankabut", english: "The Spider", ayahs: 89, revelation: "Medinan" },
  { number: 38, name: "Ar-Rum", english: "The Romans", ayahs: 59, revelation: "Medinan" },
  { number: 39, name: "Luqman", english: "Luqman", ayahs: 37, revelation: "Medinan" },
  { number: 40, name: "Al-Kafirun", english: "The Disbelievers", ayahs: 35, revelation: "Medinan" },
  { number: 41, name: "An-Nasr", english: "The Help", ayahs: 37, revelation: "Medinan" },
  { number: 42, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 43, name: "Al-Ikhlas", english: "The Sincerity", ayahs: 29, revelation: "Medinan" },
  { number: 44, name: "Al-Falaq", english: "The Daybreak", ayahs: 18, revelation: "Medinan" },
  { number: 45, name: "An-Nas", english: "The People", ayahs: 45, revelation: "Medinan" },
  { number: 46, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 47, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 48, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 49, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 50, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 51, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 52, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 53, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
  { number: 54, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
];
function renderSurahCards() {
  const grid = document.getElementById('surahsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  surahs.forEach(surah => {
    const card = document.createElement('a');
    card.className = 'surah-card';
    card.href = '#'; // Link to individual surah page in the future
    card.innerHTML = `
      <div class="surah-number">${surah.number}</div>
      <div class="surah-name"><b>${surah.name}</b></div>
      <div class="surah-english">${surah.english}</div>
      <div class="surah-ayahs">Ayahs : <span>${surah.ayahs}</span></div>
      <div class="surah-revelation">Revelation : <span>${surah.revelation}</span></div>
    `;
    grid.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded', renderSurahCards);

// Sidebar toggle logic (copied from home page)
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  if (menuToggle && sidebar && sidebarClose) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('show');
      menuToggle.classList.remove('active');
    });
  }
});

// Edition Section

// Sample edition data
const editions = [
  {
    name: "King Fahad Quran Complex",
    subtitle: "تفسير المیسر",
    language: "Arabic",
    type: "Tafsir"
  },
  {
    name: "Vasim Mammadaliyev And Ziya Bunyadov",
    subtitle: "Məmmədəliyev & Bünyadov",
    language: "Azerbaijani",
    type: "Translation"
  },
  {
    name: "Alikhan Musayev",
    subtitle: "Musayev",
    language: "Azerbaijani",
    type: "Translation"
  },
  {
    name: "Muhiuddin Khan",
    subtitle: "মুহিউদ্দীন খান",
    language: "Bangla",
    type: "Translation"
  }
];
function renderEditionCards() {
  const grid = document.getElementById('editionsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  editions.forEach(edition => {
    const card = document.createElement('a');
    card.className = 'edition-card';
    card.href = '#';
    card.innerHTML = `
      <div class="edition-icon"><span class="material-symbols-outlined">person</span></div>
      <div class="edition-name"><b>${edition.name}</b></div>
      <div class="edition-subtitle">${edition.subtitle}</div>
      <div class="edition-language">Language : <span>${edition.language}</span></div>
      <div class="edition-type">Type : <span>${edition.type}</span></div>
      <button class="edition-action" onclick="event.stopPropagation(); event.preventDefault();"><span class="material-symbols-outlined">edit</span></button>
    `;
    grid.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded', renderEditionCards);

// Sidebar toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  if (menuToggle && sidebar && sidebarClose) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('show');
      menuToggle.classList.remove('active');
    });
  }
});
