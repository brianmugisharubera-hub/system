  // Premium Loading Button logic
  const premiumBtn = document.getElementById('premiumServiceBtn');
  if (premiumBtn) {
    let isLoading = false;
    premiumBtn.addEventListener('click', function (e) {
      if (isLoading) return;
      isLoading = true;
      premiumBtn.classList.add('loading');
      // Fade out text, show spinner handled by CSS
      setTimeout(() => {
        premiumBtn.classList.remove('loading');
        isLoading = false;
        // Scroll to services section
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);
    });
  }


document.addEventListener('DOMContentLoaded', function () {
    // Featured Vehicles Carousel
    const vehicleData = [
      { name: 'Toyota Land Cruiser', type: 'Land Cruiser', img: 'Land cruiser/IMG-20260408-WA0052.jpg' },
      { name: 'Toyota RAV4', type: 'SUV', img: 'SUV/IMG-20260408-WA0003.jpg' },
      { name: 'BMW', type: 'Luxury Car', img: 'Luxury Car/IMG-20260408-WA0054.jpg' },
      { name: 'Toyota Hiace', type: 'Van', img: 'VAN/IMG-20260408-WA0018.jpg' },
      { name: 'Toyota Pickup', type: 'Pick Up', img: 'Pick up/IMG-20260408-WA0041.jpg' },
      { name: 'Toyota Coaster', type: 'coaster', img: 'Coaster/IMG-20260408-WA0079.jpg' },
      { name: ' Hyundai Bus', type: 'Bus', img: 'Bus/IMG-20260408-WA0045.jpg' },
      { name: 'small car', type: 'hybrid', img: 'SmallCar/IMG-20260408-WA0036.jpg' },
    ];
    const cardsToShow = 3;
    let vehicleIndex = 0;
    let vehicleInterval;
    const carouselContainer = document.querySelector('.vehicle-carousel-container');
    const track = document.querySelector('.vehicle-carousel-track');
    if (track) {
      track.style.scrollbarWidth = 'none';
      track.style.msOverflowStyle = 'none';
    }

    const prevBtn = carouselContainer ? carouselContainer.querySelector('.vehicle-carousel-arrow.prev') : null;
    const nextBtn = carouselContainer ? carouselContainer.querySelector('.vehicle-carousel-arrow.next') : null;
    const dotsContainer = carouselContainer ? carouselContainer.querySelector('.vehicle-carousel-dots') : null;

    // Drag scroll for vehicle carousel (mouse and touch)
    if (track) {
      let isDown = false;
      let startX;
      let scrollLeft;
      // Mouse events
      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('dragging');
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        e.preventDefault();
      });
      track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('dragging');
        track.style.cursor = '';
      });
      track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('dragging');
        track.style.cursor = '';
      });
      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.2; // scroll speed
        track.scrollLeft = scrollLeft - walk;
      });
      // Touch events
      track.addEventListener('touchstart', (e) => {
        isDown = true;
        track.classList.add('dragging');
        track.style.cursor = 'grabbing';
        startX = e.touches[0].pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      }, { passive: true });
      track.addEventListener('touchend', () => {
        isDown = false;
        track.classList.remove('dragging');
        track.style.cursor = '';
      });
      track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - track.offsetLeft;
        const walk = (x - startX) * 1.2;
        track.scrollLeft = scrollLeft - walk;
      }, { passive: true });
      // Set cursor to grab by default
      track.style.cursor = 'grab';
    }

    function renderVehicleCards() {
      if (!track) return;
      track.innerHTML = '';
      const start = vehicleIndex;
      for (let i = 0; i < cardsToShow; i++) {
        const idx = (start + i) % vehicleData.length;
        const v = vehicleData[idx];
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.style = 'background:#fff;border:1px solid #e5e7eb;border-radius:0.7rem;overflow:hidden;display:flex;flex-direction:column;align-items:center;box-shadow:0 1px 4px rgba(0,0,0,0.06);transition:box-shadow 0.2s;min-width:260px;max-width:320px;width:100%;height:370px;position:relative;';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', String(i * 120));
        card.onmouseenter = () => card.style.boxShadow = '0 6px 24px rgba(30,41,59,0.13)';
        card.onmouseleave = () => card.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
        const img = document.createElement('img');
        img.src = v.img;
        img.alt = v.name;
        img.style = 'width:100%;height:60%;object-fit:cover;background:#f3f3f3;';
        card.appendChild(img);
        const name = document.createElement('div');
        name.textContent = v.name;
        name.style = 'font-weight:700;color:#222;font-size:1.13rem;margin-top:1.1rem;';
        card.appendChild(name);
        const type = document.createElement('div');
        type.textContent = v.type;
        type.style = 'font-size:0.97rem;color:#888;margin-bottom:1.1rem;';
        card.appendChild(type);
        const btnRow = document.createElement('div');
        btnRow.style = 'display:flex;gap:0.7rem;margin-top:auto;margin-bottom:1.2rem;';
        const bookBtn = document.createElement('a');
        bookBtn.href = 'contact.html';
        bookBtn.textContent = 'Book Now';
        bookBtn.style = 'background:#5E9330;color:#fff;font-weight:600;padding:0.5rem 1.2rem;border:none;border-radius:0.4rem;font-size:1rem;box-shadow:0 1px 3px rgba(94,147,48,0.08);text-decoration:none;transition:background 0.18s;';
        bookBtn.onmouseenter = () => bookBtn.style.background = '#497324';
        bookBtn.onmouseleave = () => bookBtn.style.background = '#5E9330';
        const detailsBtn = document.createElement('a');
        detailsBtn.href = 'contact.html';
        detailsBtn.textContent = 'Details';
        detailsBtn.style = 'background:#fff;color:#222;font-weight:600;padding:0.5rem 1.2rem;border:1.5px solid #222;border-radius:0.4rem;font-size:1rem;text-decoration:none;transition:background 0.18s;';
        detailsBtn.onmouseenter = () => { detailsBtn.style.background = '#222'; detailsBtn.style.color = '#fff'; };
        detailsBtn.onmouseleave = () => { detailsBtn.style.background = '#fff'; detailsBtn.style.color = '#222'; };
        btnRow.appendChild(bookBtn);
        btnRow.appendChild(detailsBtn);
        card.appendChild(btnRow);
        track.appendChild(card);
      }
      if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
      }
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const total = vehicleData.length;
      const dotCount = total;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'vehicle-carousel-dot';
        dot.style = 'width:11px;height:11px;border-radius:50%;border:none;background:' + (i === vehicleIndex ? '#5E9330' : '#e5e7eb') + ';margin:0 2px;cursor:pointer;transition:background 0.18s;';
        dot.onclick = () => { vehicleIndex = i; updateCarousel(); resetInterval(); };
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      renderVehicleCards();
      renderDots();
    }

    function prevVehicle() {
      vehicleIndex = (vehicleIndex - 1 + vehicleData.length) % vehicleData.length;
      updateCarousel();
      resetInterval();
    }
    function nextVehicle() {
      vehicleIndex = (vehicleIndex + 1) % vehicleData.length;
      updateCarousel();
      resetInterval();
    }
    function resetInterval() {
      if (vehicleInterval) clearInterval(vehicleInterval);
      vehicleInterval = setInterval(nextVehicle, 4000);
    }

    if (carouselContainer && track && prevBtn && nextBtn && dotsContainer) {
      prevBtn.addEventListener('click', prevVehicle);
      nextBtn.addEventListener('click', nextVehicle);
      updateCarousel();
      vehicleInterval = setInterval(nextVehicle, 4000);
    }
  // Sidebar Navigation
  const openSidebarBtn = document.getElementById('openOverlayNav');
  const closeSidebarBtn = document.getElementById('closeSidebarPanel');
  const sidebarPanel = document.getElementById('sidebarPanel');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarLinks = sidebarPanel ? sidebarPanel.querySelectorAll('.sidebar-link') : [];

  function openSidebar() {
    if (sidebarPanel && sidebarOverlay) {
      sidebarOverlay.style.display = 'block';
      sidebarPanel.style.display = 'flex';
      setTimeout(() => {
        sidebarOverlay.classList.add('open');
        sidebarPanel.classList.add('open');
      }, 10);
      document.body.style.overflow = 'hidden';
      sidebarPanel.focus();
    }
  }
  function closeSidebar() {
    if (sidebarPanel && sidebarOverlay) {
      sidebarOverlay.classList.remove('open');
      sidebarPanel.classList.remove('open');
      setTimeout(() => {
        sidebarOverlay.style.display = 'none';
        sidebarPanel.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
      openSidebarBtn && openSidebarBtn.focus();
    }
  }
  if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
  if (sidebarPanel) {
    sidebarPanel.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSidebar();
    });
  }
  // Set active nav link
  function setActiveSidebarLink() {
    const path = window.location.pathname.split('/').pop();
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
      if (
        (link.classList.contains('home-link') && (path === '' || path === 'index.html')) ||
        (link.classList.contains('about-link') && path === 'about.html') ||
        (link.classList.contains('services-link') && window.location.hash === '#services') ||
        (link.classList.contains('contact-link') && path === 'contact.html')
      ) {
        link.classList.add('active');
      }
    });
  }
  setActiveSidebarLink();
  window.addEventListener('hashchange', setActiveSidebarLink);

  
  const revealSections = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    revealSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        section.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formMessage.textContent = '';
      formMessage.style.color = 'var(--brand-green)';
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = '#c0392b';
        return;
      }
      formMessage.textContent = 'Sending...';
      setTimeout(() => {
        formMessage.textContent = 'Thank you for contacting us!';
        formMessage.style.color = 'var(--brand-green)';
        contactForm.reset();
      }, 1200);
    });
    // Animated input focus
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', e => {
        e.target.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focused');
      });
    });
  }

  
  document.querySelectorAll('.animate-btn').forEach((btn, i) => {
    btn.style.animationDelay = (0.2 + i * 0.15) + 's';
  });
});
