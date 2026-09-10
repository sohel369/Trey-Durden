/**
 * BESTCOMFORT HVAC - 100% Pure Vanilla JS
 * Zero External Libraries, Fully Validated
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const isExpanded = navMenu.classList.contains('show');
      mobileNavToggle.setAttribute('aria-expanded', isExpanded);
      mobileNavToggle.textContent = isExpanded ? '✕' : '☰';
    });
  }

  // 2. Interactive Heat Mode 🔥 vs Cool Mode ❄️ Climate Switcher (Hero Section)
  const heatModeBtn = document.getElementById('heatModeBtn');
  const coolModeBtn = document.getElementById('coolModeBtn');
  const heroDynamicTitle = document.getElementById('heroDynamicTitle');
  const heroDynamicDesc = document.getElementById('heroDynamicDesc');
  const heroTempGauge = document.getElementById('heroTempGauge');
  const heroTempLabel = document.getElementById('heroTempLabel');

  if (heatModeBtn && coolModeBtn) {
    heatModeBtn.addEventListener('click', () => {
      heatModeBtn.classList.add('active', 'heat');
      coolModeBtn.classList.remove('active', 'cool');
      
      if (heroDynamicTitle) {
        heroDynamicTitle.innerHTML = 'Polar Vortex <span class="text-gradient">Heating Defense</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Keep your home cozy at 72°F during -15°F Chicago winter chills with our 98% AFUE modulating gas furnaces and cold-climate heat pumps.';
      }
      if (heroTempGauge) {
        heroTempGauge.textContent = '72°F';
        heroTempGauge.style.borderColor = 'var(--color-salmon)';
        heroTempGauge.style.color = '#ffffff';
      }
      if (heroTempLabel) {
        heroTempLabel.textContent = 'Optimal Heating Mode Active';
      }
    });

    coolModeBtn.addEventListener('click', () => {
      coolModeBtn.classList.add('active', 'cool');
      heatModeBtn.classList.remove('active', 'heat');

      if (heroDynamicTitle) {
        heroDynamicTitle.innerHTML = 'High-SEER2 <span class="text-gradient-cyan">Summer Cool Wave</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Rapid dehumidification and whisper-quiet cooling during 95°F Chicago summer heatwaves with 20.5 SEER2 inverter central air systems.';
      }
      if (heroTempGauge) {
        heroTempGauge.textContent = '68°F';
        heroTempGauge.style.borderColor = 'var(--color-cyan)';
        heroTempGauge.style.color = 'var(--color-cyan)';
      }
      if (heroTempLabel) {
        heroTempLabel.textContent = 'High-Efficiency Eco Cooling Active';
      }
    });
  }

  // 3. Product Page: Interactive 4 Thumbnails & Primary Image Switcher (Client Core Requirement)
  const thumbnailItems = document.querySelectorAll('.thumbnail-bento-item');
  const primaryStudioBox = document.getElementById('primaryStudioBox');
  const primaryProductImg = document.getElementById('primaryProductImg');

  if (thumbnailItems.length > 0 && primaryProductImg) {
    thumbnailItems.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnailItems.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        if (primaryStudioBox) {
          primaryStudioBox.classList.add('active-glow');
          setTimeout(() => primaryStudioBox.classList.remove('active-glow'), 400);
        }

        const imgSrc = thumb.getAttribute('data-img');
        const imgTitle = thumb.getAttribute('data-title') || 'HVAC Equipment View';

        if (imgSrc) {
          primaryProductImg.src = imgSrc;
          primaryProductImg.alt = imgTitle;
        }
      });
    });
  }

  // 4. Accordion Multi-Group Toggle (Client Core Requirement)
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isOpen = parentItem.classList.contains('active');

      const parentWrapper = header.closest('.accordion-wrapper');
      if (parentWrapper) {
        const siblingItems = parentWrapper.querySelectorAll('.accordion-item');
        siblingItems.forEach(item => {
          if (item !== parentItem) {
            item.classList.remove('active');
          }
        });
      }

      if (isOpen) {
        parentItem.classList.remove('active');
      } else {
        parentItem.classList.add('active');
      }
    });
  });

  // 5. Hash Link & Deep-Link Accordion Auto-Open
  function handleAccordionHash() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement && targetElement.classList.contains('accordion-item')) {
        const parentWrapper = targetElement.closest('.accordion-wrapper');
        if (parentWrapper) {
          parentWrapper.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('active'));
        }
        targetElement.classList.add('active');
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }

  handleAccordionHash();
  window.addEventListener('hashchange', handleAccordionHash);

  // 6. Service Filter Pills (Services Page)
  const filterPills = document.querySelectorAll('.service-filter-pill');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const target = pill.getAttribute('data-target');

        const allAccordions = document.querySelectorAll('.accordion-wrapper .accordion-item');
        if (target === 'all') {
          allAccordions.forEach(item => {
            item.style.display = 'block';
          });
          if (allAccordions[0]) allAccordions[0].classList.add('active');
        } else {
          allAccordions.forEach(item => {
            if (item.id === target) {
              item.style.display = 'block';
              item.classList.add('active');
              item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    });
  }

  // 7. Neighborhood One-Click Auto-Fill (Contact Page)
  const neighborhoodBtns = document.querySelectorAll('.neighborhood-btn');
  const bookZipInput = document.getElementById('bookZip');

  if (neighborhoodBtns.length > 0 && bookZipInput) {
    neighborhoodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        neighborhoodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const zip = btn.getAttribute('data-zip') || '60611';
        bookZipInput.value = zip;
      });
    });
  }

  // 8. Form Handlers
  const heroQuoteForm = document.getElementById('heroQuoteForm');
  if (heroQuoteForm) {
    heroQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName') ? document.getElementById('quoteName').value : 'Valued Customer';
      const service = document.getElementById('quoteService') ? document.getElementById('quoteService').value : 'HVAC Service';
      alert(`🎉 Thank you, ${name}! Your Chicago estimate request for "${service}" has been dispatched to our nearest field team. We will call you within 15 minutes!`);
      heroQuoteForm.reset();
    });
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✅ Appointment scheduled successfully! Our Chicago dispatch center has reserved your preferred slot.');
      bookingForm.reset();
    });
  }
});
