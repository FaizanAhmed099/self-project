// Only keep the global DOMContentLoaded block below

// Sidebar toggle logic for all pages
// This ensures the menu toggle button works for the sidebar

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
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

  // Dropdown logic for DeepSearch and CodeQlik
  function setupDropdown(btnId, dropdownId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const group = btn.closest('.dropdown-group');
    const dropdown = document.getElementById(dropdownId);
    if (!group || !dropdown) return;
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
        group.classList.remove('open');
      });
    });
  }
  setupDropdown('deepsearchDropdownBtn', 'deepsearchDropdown');
  setupDropdown('codeqlikDropdownBtn', 'codeqlikDropdown');

  document.addEventListener('click', function() {
    document.querySelectorAll('.dropdown-group').forEach(g => g.classList.remove('open'));
  });
});

// Surahs Selection

 // Sample Surah data (expand to all 114 as needed)
//  const surahs = [
//   { number: 1, name: "Al-Faatiha", english: "The Opening", ayahs: 7, revelation: "Meccan" },
//   { number: 2, name: "Al-Baqara", english: "The Cow", ayahs: 286, revelation: "Medinan" },
//   { number: 3, name: "Aal-i-Imraan", english: "The Family of Imraan", ayahs: 200, revelation: "Medinan" },
//   { number: 4, name: "An-Nisaa", english: "The Women", ayahs: 176, revelation: "Medinan" },
//   { number: 5, name: "Al-Ma'idah", english: "The Table", ayahs: 120, revelation: "Medinan" },
//   { number: 6, name: "Al-An'am", english: "The Cattle", ayahs: 165, revelation: "Medinan" },
//   { number: 7, name: "Al-A'raf", english: "The Heights", ayahs: 206, revelation: "Medinan" },
//   { number: 8, name: "Al-Anfal", english: "The Spoils of War", ayahs: 75, revelation: "Medinan" },
//   { number: 9, name: "At-Tawbah", english: "The Repentance", ayahs: 129, revelation: "Medinan" },
//   { number: 10, name: "Yunus", english: "Jonah", ayahs: 109, revelation: "Medinan" },
//   { number: 11, name: "Hud", english: "Hud", ayahs: 123, revelation: "Medinan" },
//   { number: 12, name: "Yusuf", english: "Joseph", ayahs: 111, revelation: "Medinan" },
//   { number: 13, name: "Ar-Ra'd", english: "The Thunder", ayahs: 43, revelation: "Medinan" },
//   { number: 14, name: "Ibrahim", english: "Abraham", ayahs: 52, revelation: "Medinan" },
//   { number: 15, name: "Al-Hijr", english: "The Rocky Tract", ayahs: 99, revelation: "Medinan" },
//   { number: 16, name: "An-Nahl", english: "The Bee", ayahs: 128, revelation: "Medinan" },
//   { number: 17, name: "Al-Isra", english: "The Night Journey", ayahs: 111, revelation: "Medinan" },
//   { number: 18, name: "Al-Kahf", english: "The Cave", ayahs: 119, revelation: "Medinan" },
//   { number: 19, name: "Maryam", english: "Mary", ayahs: 93, revelation: "Medinan" },
//   { number: 20, name: "Ta-Ha", english: "The Mount", ayahs: 88, revelation: "Medinan" },
//   { number: 21, name: "Al-Anbiya", english: "The Prophets", ayahs: 135, revelation: "Medinan" },
//   { number: 22, name: "Al-Haj", english: "The Pilgrimage", ayahs: 78, revelation: "Medinan" },
//   { number: 23, name: "Al-Mu'minun", english: "The Believers", ayahs: 112, revelation: "Medinan" },
//   { number: 24, name: "An-Nur", english: "The Light", ayahs: 64, revelation: "Medinan" },
//   { number: 25, name: "Al-Furqan", english: "The Criterion", ayahs: 73, revelation: "Medinan" },
//   { number: 26, name: "Ash-Shu'ara", english: "The Poets", ayahs: 209, revelation: "Medinan" },
//   { number: 27, name: "An-Naml", english: "The Ant", ayahs: 93, revelation: "Medinan" },
//   { number: 28, name: "Al-Qasas", english: "The Story", ayahs: 88, revelation: "Medinan" },
//   { number: 29, name: "Al-Ankabut", english: "The Spider", ayahs: 69, revelation: "Medinan" },
//   { number: 30, name: "Ar-Rum", english: "The Romans", ayahs: 60, revelation: "Medinan" },
//   { number: 31, name: "Luqman", english: "Luqman", ayahs: 34, revelation: "Medinan" },
//   { number: 32, name: "As-Sajdah", english: "The Prostration", ayahs: 30, revelation: "Medinan" },
//   { number: 33, name: "Al-Ahzab", english: "The Combined Forces", ayahs: 73, revelation: "Medinan" },
//   { number: 34, name: "Saba", english: "Sheba", ayahs: 54, revelation: "Medinan" },
//   { number: 35, name: "An-Naml", english: "The Ant", ayahs: 53, revelation: "Medinan" },
//   { number: 36, name: "Al-Qasas", english: "The Story", ayahs: 45, revelation: "Medinan" },
//   { number: 37, name: "Al-Ankabut", english: "The Spider", ayahs: 89, revelation: "Medinan" },
//   { number: 38, name: "Ar-Rum", english: "The Romans", ayahs: 59, revelation: "Medinan" },
//   { number: 39, name: "Luqman", english: "Luqman", ayahs: 37, revelation: "Medinan" },
//   { number: 40, name: "Al-Kafirun", english: "The Disbelievers", ayahs: 35, revelation: "Medinan" },
//   { number: 41, name: "An-Nasr", english: "The Help", ayahs: 37, revelation: "Medinan" },
//   { number: 42, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 43, name: "Al-Ikhlas", english: "The Sincerity", ayahs: 29, revelation: "Medinan" },
//   { number: 44, name: "Al-Falaq", english: "The Daybreak", ayahs: 18, revelation: "Medinan" },
//   { number: 45, name: "An-Nas", english: "The People", ayahs: 45, revelation: "Medinan" },
//   { number: 46, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 47, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 48, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 49, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 50, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 51, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 52, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 53, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
//   { number: 54, name: "Al-Masad", english: "The Blast", ayahs: 38, revelation: "Medinan" },
// ];
function renderSurahCards() {
  const grid = document.getElementById('surahsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  surahs.forEach(surah => {
    const card = document.createElement('a');
    card.className = 'surah-card';
    card.href = '#';
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

// Edition Section

// Sample edition data
// const editions = [
//   {
//     name: "King Fahad Quran Complex",
//     subtitle: "تفسير المیسر",
//     language: "Arabic",
//     type: "Tafsir"
//   },
//   {
//     name: "Vasim Mammadaliyev And Ziya Bunyadov",
//     subtitle: "Məmmədəliyev & Bünyadov",
//     language: "Azerbaijani",
//     type: "Translation"
//   },
//   {
//     name: "Alikhan Musayev",
//     subtitle: "Musayev",
//     language: "Azerbaijani",
//     type: "Translation"
//   },
//   {
//     name: "Muhiuddin Khan",
//     subtitle: "মুহিউদ্দীন খান",
//     language: "Bangla",
//     type: "Translation"
//   }
// ];
// function renderEditionCards() {
//   const grid = document.getElementById('editionsGrid');
//   if (!grid) return;
//   grid.innerHTML = '';
//   editions.forEach(edition => {
//     const card = document.createElement('a');
//     card.className = 'edition-card';
//     card.href = '#';
//     card.innerHTML = `
//       <div class="edition-icon"><span class="material-symbols-outlined">person</span></div>
//       <div class="edition-name"><b>${edition.name}</b></div>
//       <div class="edition-subtitle">${edition.subtitle}</div>
//       <div class="edition-language">Language : <span>${edition.language}</span></div>
//       <div class="edition-type">Type : <span>${edition.type}</span></div>
//       <button class="edition-action" onclick="event.stopPropagation(); event.preventDefault();"><span class="material-symbols-outlined">edit</span></button>
//     `;
//     grid.appendChild(card);
//   });
// }
// document.addEventListener('DOMContentLoaded', renderEditionCards);



// Pop-up strat section
function openModal() {
  document.getElementById("loginModal").style.display = "grid";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

// Close when clicking outside the modal
window.onclick = function(event) {
  const modal = document.getElementById("loginModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// Modal tab switching and password toggle
function showLogin(e) {
  e.preventDefault();
  document.getElementById('loginTab').classList.add('active');
  document.getElementById('registerTab').classList.remove('active');
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}
function showRegister(e) {
  e.preventDefault();
  document.getElementById('registerTab').classList.add('active');
  document.getElementById('loginTab').classList.remove('active');
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
}
function togglePassword(inputId, el) {
  var input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    el.style.opacity = 0.6;
  } else {
    input.type = 'password';
    el.style.opacity = 1;
  }
}

// Qibla

const KAABA_LAT = 21.4225;
    const KAABA_LNG = 39.8262;

    function getQiblaAngle(lat, lng) {
      const dLng = (KAABA_LNG - lng) * Math.PI / 180;
      const lat1 = lat * Math.PI / 180;
      const lat2 = KAABA_LAT * Math.PI / 180;

      const y = Math.sin(dLng) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

      let brng = Math.atan2(y, x) * 180 / Math.PI;
      return (brng + 360) % 360;
    }

    function rotateArrow(angle) {
      document.getElementById("arrow").style.transform = `translateX(-50%) rotate(${angle}deg)`;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const qiblaAngle = getQiblaAngle(userLat, userLng);

      document.getElementById("info").innerHTML = `Qibla Angle: ${qiblaAngle.toFixed(2)}° from North`;

      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientationabsolute", handleOrientation, true);
        window.addEventListener("deviceorientation", handleOrientation, true);

        function handleOrientation(event) {
          const compassHeading = event.webkitCompassHeading || Math.abs(event.alpha - 360);
          const angle = qiblaAngle - compassHeading;
          rotateArrow(angle);
        }
      } else {
        document.getElementById("info").innerHTML += "<br>Compass not supported on this device.";
      }
    }, error => {
      document.getElementById("info").innerText = "Location access denied.";
    });

    function updateLiveClockCard() {
  // Use Indian Standard Time (Asia/Kolkata)
  const now = new Date();

  // Time in IST
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
  const timeStr = now.toLocaleTimeString('en-US', optionsTime);

  // Date in IST
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' };
  const dateStr = now.toLocaleDateString('en-US', optionsDate);

  // Day in IST
  const optionsDay = { weekday: 'long', timeZone: 'Asia/Kolkata' };
  const dayStr = now.toLocaleDateString('en-US', optionsDay);

  // Set
  const timeElem = document.getElementById('live-clock-time');
  const dateElem = document.getElementById('live-clock-date');
  const dayElem = document.getElementById('live-clock-day');
  if (timeElem && dateElem && dayElem) {
    timeElem.textContent = timeStr;
    dateElem.textContent = dateStr;
    dayElem.textContent = dayStr;
  }
}
setInterval(updateLiveClockCard, 1000);
updateLiveClockCard();

function showButtons() {
  // Show Quran text and buttons
  document.getElementById("quranText").classList.remove("hidden");
  document.getElementById("extraButtons").classList.remove("hidden");
  // Hide Hadees text and buttons
  document.getElementById("hadeesText").classList.add("hidden");
  document.getElementById("extraButtonssecound").classList.add("hidden");
}

function showHadeesButtons() {
  // Hide Quran text and buttons
  document.getElementById("quranText").classList.add("hidden");
  document.getElementById("extraButtons").classList.add("hidden");
  // Show Hadees text and buttons
  document.getElementById("hadeesText").classList.remove("hidden");
  document.getElementById("extraButtonssecound").classList.remove("hidden");
}

// Only show Chapter/Surah buttons when either is clicked
document.addEventListener('DOMContentLoaded', function() {
  var chapterBtn = document.getElementById('chapterBtn');
  var surahBtn = document.getElementById('surahBtn');
  if (chapterBtn) {
    chapterBtn.addEventListener('click', function(e) {
      // Prevent navigation for demo, remove this line in production
      // e.preventDefault();
      document.getElementById("quranText").classList.remove("hidden");
      document.getElementById("extraButtons").classList.remove("hidden");
      document.getElementById("hadeesText").classList.add("hidden");
      document.getElementById("extraButtonssecound").classList.add("hidden");
    });
  }
  if (surahBtn) {
    surahBtn.addEventListener('click', function(e) {
      // Prevent navigation for demo, remove this line in production
      // e.preventDefault();
      document.getElementById("quranText").classList.remove("hidden");
      document.getElementById("extraButtons").classList.remove("hidden");
      document.getElementById("hadeesText").classList.add("hidden");
      document.getElementById("extraButtonssecound").classList.add("hidden");
    });
  }
});


// Islamic date 

const now = new Date();

// Gregorian Date
const gregorianDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(now);
document.getElementById('gregorian').textContent = gregorianDate;

// Hijri Date
const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(now);
document.getElementById('hijri').textContent = 'Hijri: ' + hijriDate;

// Prayer time

// Add a mapping for prayer names in Urdu
const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const prayerNamesUrdu = {
  'Fajr': 'فجر',
  'Dhuhr': 'ظہر',
  'Asr': 'عصر',
  'Maghrib': 'مغرب',
  'Isha': 'عشاء'
};

// For test mode: keep the prayer index global
window._testPrayerIdx = window._testPrayerIdx || 0;

function getPrayerTimes(lat, lon) {
  const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const times = data.data.timings;
      // For testing: cycle through prayerOrder for each popup
      if (window._testPrayerIdx !== undefined) {
        nextPrayer = prayerOrder[window._testPrayerIdx % prayerOrder.length];
        nextTime = new Date(Date.now() + 10000); // 10 seconds from now
        window._testPrayerIdx++;
      } else {
        // --- Real logic ---
        for (let prayer of prayerOrder) {
          let [h, m] = times[prayer].split(':').map(Number);
          const prayerTime = new Date();
          prayerTime.setHours(h);
          prayerTime.setMinutes(m);
          prayerTime.setSeconds(0);

          if (prayerTime > now) {
            nextPrayer = prayer;
            nextTime = prayerTime;
            break;
          }
        }
        // If all prayers passed, next is Fajr tomorrow
        if (!nextPrayer) {
          let [h, m] = times['Fajr'].split(':').map(Number);
          const tmr = new Date();
          tmr.setDate(tmr.getDate() + 1);
          tmr.setHours(h, m, 0, 0);
          nextPrayer = 'Fajr';
          nextTime = tmr;
        }
      }
      document.getElementById('prayerName').textContent = `Next Prayer: ${nextPrayer}`;
      let popupShown = false;
      function updateCountdown() {
        const now = new Date();
        const diff = nextTime - now;
        if (diff <= 0 && !popupShown) {
          // Show both English and Urdu in the popup, loop audio
          const urdu = prayerNamesUrdu[nextPrayer] || '';
          showPopupAndPlayAudio(`🕌 It's time to pray ${nextPrayer} (${urdu})!`, true, function onPopupClose() {
            // For test mode: update the prayer name after closing
            if (window._testPrayerIdx !== undefined) {
              getPrayerTimes(0, 0);
              return;
            }
            location.reload(); // reload for next prayer only after popup is closed
          });
          popupShown = true;
          return;
        }
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          document.getElementById('remaining').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);
    });
}

function init() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        getPrayerTimes(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        document.getElementById('prayerName').textContent = 'Location permission denied';
      }
    );
  } else {
    document.getElementById('prayerName').textContent = 'Geolocation not supported';
  }
}

init();

// Sehri-time

    // Set your location coordinates here
    const latitude = 28.6139;  // e.g. Delhi
    const longitude = 77.2090;

    const coordinates = new adhan.Coordinates(latitude, longitude);

    const params = adhan.CalculationMethod.Other();
    params.fajrAngle = 18;
    params.ishaAngle = 18;

    const date = new Date();
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    // Format time nicely
    const formatTime = (date) => {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Insert into the page
    document.addEventListener("DOMContentLoaded", () => {
      const sehriTime = formatTime(prayerTimes.fajr);
      document.getElementById("sehriTime").textContent = sehriTime;
    });

// --- REUSABLE POPUP AND AUDIO FUNCTION ---
let popupTimer = null;
let popupIsOpen = false;
let popupAudio = null;

function showPopupAndPlayAudio(message, loopAudio = false, onClose = null) {
  const popup = document.getElementById('thirtySecPopup');
  const popupMsg = popup ? popup.querySelector('p') : null;
  const okBtn = popup ? popup.querySelector('button') : null;
  // Stop any previous audio
  if (popupAudio) {
    popupAudio.pause();
    popupAudio.currentTime = 0;
  }
  popupAudio = new Audio('assets/Audio/alert-2.mp3');
  if (loopAudio) popupAudio.loop = true;
  if (popup && popupMsg && okBtn) {
    if (message) {
      popupMsg.textContent = message;
    } else {
      popupMsg.textContent = 'Time for a break!';
    }
    popup.style.display = 'block';
    popupIsOpen = true;
    // Play audio instantly
    popupAudio.currentTime = 0;
    popupAudio.play();
    // Remove any previous click listeners
    okBtn.onclick = null;
    okBtn.textContent = 'OK';
    okBtn.style.minWidth = '80px';
    okBtn.style.padding = '0.5rem 1.5rem';
    okBtn.style.background = '#198754';
    okBtn.style.color = '#fff';
    okBtn.style.borderRadius = '5px';
    okBtn.style.fontSize = '1rem';
    okBtn.style.cursor = 'pointer';
    okBtn.onclick = function() {
      // Stop audio immediately
      if (popupAudio) {
        popupAudio.pause();
        popupAudio.currentTime = 0;
        popupAudio.loop = false;
      }
      popup.style.display = 'none';
      popupIsOpen = false;
      if (typeof onClose === 'function') onClose();
      // For test mode: trigger next countdown without reload
      if (window._testPrayerIdx !== undefined) {
        // Re-run getPrayerTimes with dummy location to cycle
        getPrayerTimes(0, 0);
        return;
      }
      restartPopupTimer();
    };
  }
}

function restartPopupTimer() {
  if (popupTimer) clearTimeout(popupTimer);
  popupTimer = setTimeout(() => {
    if (!popupIsOpen) {
      showPopupAndPlayAudio('Time for a break!');
    }
  }, 3000);
}

// --- DUMMY TEST FUNCTION FOR 3-SECOND POPUP ---
// function startDummyPopupEvery3Seconds() {
//   let idx = 0;
//   let autoCloseTimer = null;
//   let audioTimer = null;
//
//   function showNextPrayerPopup() {
//     const prayer = prayerOrder[idx % prayerOrder.length];
//     const urdu = prayerNamesUrdu[prayer] || '';
//     showPopupAndPlayAudio(`🕌 It's time to pray ${prayer} (${urdu})!`);
//     idx++;
//     // Auto-close after 10 seconds if not closed manually
//     if (autoCloseTimer) clearTimeout(autoCloseTimer);
//     autoCloseTimer = setTimeout(() => {
//       // Stop audio and close popup if still open
//       if (popupAudio) {
//         popupAudio.pause();
//         popupAudio.currentTime = 0;
//       }
//       const popup = document.getElementById('thirtySecPopup');
//       if (popup && popup.style.display !== 'none') {
//         popup.style.display = 'none';
//         popupIsOpen = false;
//         // Show next popup after 3 seconds
//         setTimeout(showNextPrayerPopup, 3000);
//       }
//     }, 10000);
//     // Ensure audio plays for up to 10 seconds
//     if (audioTimer) clearTimeout(audioTimer);
//     if (popupAudio) {
//       popupAudio.currentTime = 0;
//       popupAudio.play();
//       audioTimer = setTimeout(() => {
//         if (popupAudio) {
//           popupAudio.pause();
//           popupAudio.currentTime = 0;
//         }
//       }, 10000);
//     }
//     // Patch the OK button to also show next popup after 3 seconds
//     const popup = document.getElementById('thirtySecPopup');
//     const okBtn = popup ? popup.querySelector('button') : null;
//     if (okBtn) {
//       okBtn.onclick = function() {
//         if (popupAudio) {
//           popupAudio.pause();
//           popupAudio.currentTime = 0;
//         }
//         popup.style.display = 'none';
//         popupIsOpen = false;
//         if (autoCloseTimer) clearTimeout(autoCloseTimer);
//         if (audioTimer) clearTimeout(audioTimer);
//         setTimeout(showNextPrayerPopup, 3000);
//       };
//     }
//   }
//   // Start the first popup
//   showNextPrayerPopup();
// }
// document.addEventListener('DOMContentLoaded', function() {
//   startDummyPopupEvery3Seconds();
// });
// Real prayer time popup logic is already implemented in getPrayerTimes and showPopupAndPlayAudio.