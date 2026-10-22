/**
 * Techfest IIT Bombay - Main App Controller
 */

// Event Dataset for Modal Details & Exploration
const EVENT_DATA = {
  robowars: {
    title: "Robowars: Clash of Titans",
    category: "Competitions",
    prize: "₹10,00,000",
    teamSize: "2 - 8 Members",
    venue: "Gymkhana Combat Arena, IIT Bombay",
    dates: "Dec 27 - 29, 2026",
    image: "assets/images/robowars-art.jpg",
    description: "The flagship combat robotics championship of Asia. Steel behemoths clash inside a high-strength bulletproof arena with pneumatic flippers, hardened spin blades, and high-kinetic crushing axes.",
    rules: [
      "Weight classifications: 60kg Heavyweight, 15kg Featherweight, and 8kg Beetleweight.",
      "Combat duration: 3-minute rounds with active pit traps and arena hazards.",
      "Safety interlocks, wireless failsafes, and battery insulation mandatory."
    ]
  },
  zerocode: {
    title: "ZeroCode: AI Prompt & Agent Architecture",
    category: "Competitions",
    prize: "₹3,50,000",
    teamSize: "1 - 3 Members",
    venue: "LCC Computer Center / Online Hybrid",
    dates: "Dec 27, 2026",
    image: "assets/images/expo-art.jpg",
    description: "Design autonomous multi-agent reasoning graphs, neural prompt chains, and synthetic task solvers under rigorous latency and accuracy constraints.",
    rules: [
      "Real-time benchmark evaluation against unseen validation datasets.",
      "Open to all undergraduate, postgraduate, and international research students."
    ]
  },
  dronegp: {
    title: "International Drone Racing Grand Prix",
    category: "Competitions",
    prize: "₹5,00,000",
    teamSize: "1 - 4 Pilots",
    venue: "Main Football Ground, IIT Bombay",
    dates: "Dec 28, 2026",
    image: "assets/images/technoholix-art.jpg",
    description: "High-octane FPV quadcopter racing through neon holographic gates, acute hairpin chicanes, and multi-level vertical tunnels at speeds exceeding 140 km/h.",
    rules: [
      "5-inch custom propeller class, 4S-6S battery regulation.",
      "Live HD video feed transmission to spectator arena screens."
    ]
  },
  quantumai: {
    title: "Quantum Computation & Qiskit Masterclass",
    category: "Workshops",
    prize: "IITB Certification",
    teamSize: "Individual",
    venue: "Department of Physics, IIT Bombay",
    dates: "Dec 27, 2026",
    image: "assets/images/expo-art.jpg",
    description: "Hands-on quantum algorithm development, exploring superposition, entanglement, and Shor's algorithm execution on real quantum hardware cloud simulators.",
    rules: [
      "Led by premier quantum researchers and IBM Quantum ambassadors.",
      "Official certificate of completion provided by Techfest, IIT Bombay."
    ]
  },
  humanoidexpo: {
    title: "International Tech Expo: Next-Gen Bionics & Humanoids",
    category: "Tech Expo",
    prize: "Open Exhibition",
    teamSize: "Global Innovators",
    venue: "Indoor Badminton Stadium, IIT Bombay",
    dates: "Dec 27 - 29, 2026",
    image: "assets/images/expo-art.jpg",
    description: "A showcase of world-leading robotics, AI avatars, bionic prosthetic limbs, and space rovers from over 45 international labs and defense organizations.",
    rules: [
      "Interactive live demonstrations and public access tours daily from 10 AM to 5 PM."
    ]
  },
  technoholix: {
    title: "Technoholix: Tech-Art Symphony & EDM Pro-Nite",
    category: "Technoholix",
    prize: "Festival Highlight",
    teamSize: "General Audience",
    venue: "Gymkhana Main Stage, IIT Bombay",
    dates: "Dec 29, 2026 (Night)",
    image: "assets/images/technoholix-art.jpg",
    description: "The crown jewel finale of Techfest: an open-air spectacle blending laser choreographies, 500-drone aerial light formations, pyrotechnics, and international EDM artists.",
    rules: [
      "Access included with registered Techfest Delegate Passes."
    ]
  }
};

// Schedule Data
const SCHEDULE_DATA = {
  day1: [
    { time: "09:30 AM", title: "Grand Inaugural Ceremony: An Aetherial Renaissance", loc: "Convocation Hall", tag: "Ceremony" },
    { time: "11:00 AM", title: "Keynote: Next Horizon in Autonomous Intelligence", loc: "PC Saxena Auditorium", tag: "Keynote" },
    { time: "01:30 PM", title: "International Robowars: Preliminary Clash", loc: "Gymkhana Arena", tag: "Robotics" },
    { time: "03:30 PM", title: "Quantum Deep Dive Workshop with Industry Mentors", loc: "Lecture Hall Complex", tag: "Workshop" },
    { time: "06:30 PM", title: "Laser Illusionist & Optical Art Spectacle", loc: "Open Air Theatre", tag: "Technoholix" }
  ],
  day2: [
    { time: "10:00 AM", title: "ZeroCode AI National Hackathon Sprint", loc: "LCC Computing Center", tag: "AI Sprint" },
    { time: "11:30 AM", title: "Defense Tech & Aerospace Innovations Summit", loc: "Convocation Hall", tag: "Summit" },
    { time: "02:00 PM", title: "Drone Grand Prix: High Speed Qualifiers", loc: "Main Football Ground", tag: "Drone GP" },
    { time: "04:00 PM", title: "Robowars: Semi-Finals & Crusher Showdowns", loc: "Gymkhana Arena", tag: "Robotics" },
    { time: "07:00 PM", title: "Bioluminescent Light Show & Synthwave Soundscapes", loc: "Gymkhana Main Stage", tag: "Technoholix" }
  ],
  day3: [
    { time: "10:00 AM", title: "Finals: Cozmoclench & Autonomous Meshmerize", loc: "Old SAC Arena", tag: "Robotics" },
    { time: "01:00 PM", title: "Global Innovators Expo: Grand Jury Presentation", loc: "Exhibition Pavilions", tag: "Exhibition" },
    { time: "03:30 PM", title: "Robowars: Heavyweight World Championship Final", loc: "Gymkhana Arena", tag: "Robotics" },
    { time: "05:30 PM", title: "Felicitation Ceremony & Prize Valedictory", loc: "Convocation Hall", tag: "Awards" },
    { time: "07:30 PM", title: "Technoholix Grand Finale: 500-Drone Swarm & EDM", loc: "Gymkhana Main Stage", tag: "Technoholix" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initNavbarScroll();
  initAudioControls();
  initEventFilters();
  initModal();
  initScheduleTabs();
  initStatsObserver();
  initNewsletterForm();
  initHoverSounds();
});

// 1. Live Festival Countdown Timer
function initCountdown() {
  // Festival target date: December 27, 2026 09:00:00 IST
  const targetDate = new Date('2026-12-27T09:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

// 2. Navbar Scroll Effects
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '75px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#090d16';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderRadius = '20px';
        navLinks.style.border = '1px solid rgba(0,240,255,0.2)';
      }
    });
  }
}

// 3. Audio Controls
function initAudioControls() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-label');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = window.TechfestAudio.toggle();
      toggleBtn.classList.toggle('active', active);
      if (soundLabel) {
        soundLabel.textContent = active ? 'AUDIO: ON' : 'AUDIO: OFF';
      }
      showToast(active ? '🔊 Aetherial Soundscapes Activated' : '🔇 Audio Muted');
    });
  }
}

function initHoverSounds() {
  const interactiveEls = document.querySelectorAll('.btn, .nav-link, .filter-btn, .event-card, .schedule-tab, .chip-cmd');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.TechfestAudio) window.TechfestAudio.playHover();
    });
  });
}

// 4. Event Filtering
function initEventFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.TechfestAudio) window.TechfestAudio.playClick();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      eventCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 5. Modal System
function initModal() {
  const backdrop = document.getElementById('event-modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalCat = document.getElementById('modal-cat');
  const modalPrize = document.getElementById('modal-prize');
  const modalTeam = document.getElementById('modal-team');
  const modalVenue = document.getElementById('modal-venue');
  const modalDesc = document.getElementById('modal-desc');
  const modalRules = document.getElementById('modal-rules');
  const regForm = document.getElementById('modal-reg-form');

  window.openEventModal = function (eventKey) {
    const data = EVENT_DATA[eventKey];
    if (!data) return;

    if (window.TechfestAudio) window.TechfestAudio.playClick();

    if (modalImg) modalImg.src = data.image;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCat) modalCat.textContent = `Category: ${data.category}`;
    if (modalPrize) modalPrize.textContent = `Prize: ${data.prize}`;
    if (modalTeam) modalTeam.textContent = `Team: ${data.teamSize}`;
    if (modalVenue) modalVenue.textContent = `Venue: ${data.venue}`;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalRules) {
      modalRules.innerHTML = data.rules.map(r => `<li>${r}</li>`).join('');
    }

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const email = document.getElementById('reg-email').value;
      const college = document.getElementById('reg-college').value;

      if (window.TechfestAudio) window.TechfestAudio.playSuccess();
      showToast(`🎉 Registered! Welcome to Techfest, ${name}!`);
      closeModal();
      regForm.reset();
    });
  }
}

// 6. Schedule Matrix Day Switcher
function initScheduleTabs() {
  const tabs = document.querySelectorAll('.schedule-tab');
  const listEl = document.getElementById('timeline-list');
  if (!tabs.length || !listEl) return;

  function renderDay(dayKey) {
    const items = SCHEDULE_DATA[dayKey] || [];
    listEl.innerHTML = items.map(item => `
      <div class="timeline-item">
        <div class="timeline-time">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${item.time}
        </div>
        <div class="timeline-info">
          <h4>${item.title}</h4>
          <p>Location: ${item.loc}</p>
        </div>
        <div class="timeline-badge">${item.tag}</div>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (window.TechfestAudio) window.TechfestAudio.playClick();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const day = tab.getAttribute('data-day');
      renderDay(day);
    });
  });

  // Render Day 1 by default
  renderDay('day1');
}

// 7. Animated Numbers on Scroll
function initStatsObserver() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const step = Math.max(1, Math.floor(target / 45));

          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) observer.observe(statsSection);
}

// 8. Newsletter Form
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input && input.value) {
      if (window.TechfestAudio) window.TechfestAudio.playSuccess();
      showToast(`⚡ Subscribed: ${input.value} added to Techfest Broadcast!`);
      input.value = '';
    }
  });
}

// 9. Toast Utility
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
