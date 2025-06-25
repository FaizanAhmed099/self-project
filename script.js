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
    for (let i = 1; i <= 30; i++) {
      const card = document.createElement('a');
      card.href = '#'; // Link to individual chapter page in the future
      card.className = 'chapter-card';

      card.innerHTML = `
        <div class="chapter-number">${i}</div>
        <div class="chapter-juz">Chapter (Juz)</div>
      `;

      chaptersGrid.appendChild(card);
    }
  }
});

