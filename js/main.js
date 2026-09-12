/**
 * Trey Durden - Thermal Applications Engineer & HVAC Specialist
 * Interactive Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle (Full-Screen 100vw / 100vh Modal Popup)
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const navMenu = document.getElementById('navMenu');

  if (navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove('show');
      document.body.style.overflow = '';
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.textContent = '☰';
      }
    };

    const openMenu = () => {
      navMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        mobileNavToggle.textContent = '✕';
      }
    };

    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navMenu.classList.contains('show')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('show')) {
        if (!navMenu.contains(e.target) && (!mobileNavToggle || !mobileNavToggle.contains(e.target))) {
          closeMenu();
        }
      }
    });

    // Close when clicking any nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          closeMenu();
        }
      });
    });
  }

  // 2. Interactive Heat Mode 🔥 vs Cool Mode ❄️ Climate Switcher (Hero Section)
  const heatModeBtn = document.getElementById('heatModeBtn');
  const coolModeBtn = document.getElementById('coolModeBtn');
  const heroDynamicTitle = document.getElementById('heroDynamicTitle');
  const heroDynamicDesc = document.getElementById('heroDynamicDesc');
  const heroTempGauge = document.getElementById('heroTempGauge');

  if (heatModeBtn && coolModeBtn) {
    heatModeBtn.addEventListener('click', () => {
      heatModeBtn.classList.add('active', 'heat');
      coolModeBtn.classList.remove('active', 'cool');
      
      if (heroDynamicTitle) {
        heroDynamicTitle.innerHTML = '<span class="trey-hero-brand">Trey Durden</span> <span class="text-gradient">Thermal Engineering &amp; HVAC</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'High-performance thermodynamic analysis, residential system design, and commercial HVAC engineering with field-tested precision.';
      }
      if (heroTempGauge) {
        heroTempGauge.textContent = '24/7';
        heroTempGauge.style.borderColor = 'var(--color-salmon)';
        heroTempGauge.style.color = '#ffffff';
      }
    });

    coolModeBtn.addEventListener('click', () => {
      coolModeBtn.classList.add('active', 'cool');
      heatModeBtn.classList.remove('active', 'heat');

      if (heroDynamicTitle) {
        heroDynamicTitle.innerHTML = 'Precision Load Balancing <span class="text-gradient-cyan">&amp; Cooling Architectures</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Keep facilities and residential estates optimized during extreme temperature peaks with high-SEER2 multi-zone and geothermal systems.';
      }
      if (heroTempGauge) {
        heroTempGauge.textContent = '68°F';
        heroTempGauge.style.borderColor = 'var(--color-cyan)';
        heroTempGauge.style.color = 'var(--color-cyan)';
      }
    });
  }

  // 3. Accordion Multi-Group Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header, .stat-accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isOpen = parentItem.classList.contains('active');

      const parentWrapper = header.closest('.accordion-wrapper, .accordion-stats-wrapper');
      if (parentWrapper) {
        const siblingItems = parentWrapper.querySelectorAll('.accordion-item, .stat-accordion-item');
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

  // 4. Hash Link & Deep-Link Accordion Auto-Open
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

  // 5. Service Filter Pills (Services Page)
  const filterPills = document.querySelectorAll('.service-filter-pill[data-target]');
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

  // 6. Product Filter Pills (Products Page)
  const productFilterPills = document.querySelectorAll('.service-filter-pill[data-filter]');
  const productCards = document.querySelectorAll('.feature-bento-card[data-category]');

  if (productFilterPills.length > 0 && productCards.length > 0) {
    productFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        productFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-filter');

        productCards.forEach(card => {
          if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. Form Handlers
  const heroQuoteForm = document.getElementById('heroQuoteForm');
  if (heroQuoteForm) {
    heroQuoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quoteName') ? document.getElementById('quoteName').value : 'Client';
      const service = document.getElementById('quoteService') ? document.getElementById('quoteService').value : 'Engineering Consultation';
      alert(`🎉 Thank you, ${name}! Your consultation request for "${service}" has been received. Trey Durden will review your thermal specs and follow up within 24 hours.`);
      heroQuoteForm.reset();
    });
  }

  // 8. Interactive Hardware Studio Stage (4 Thumbnails Switcher)
  const thumbnailItems = document.querySelectorAll('.thumbnail-bento-item');
  const primaryProductImg = document.getElementById('primaryProductImg');
  const stageBadge = document.getElementById('stageBadge');

  if (thumbnailItems.length > 0 && primaryProductImg) {
    thumbnailItems.forEach(item => {
      item.addEventListener('click', () => {
        thumbnailItems.forEach(t => t.classList.remove('active'));
        item.classList.add('active');

        const newImg = item.getAttribute('data-img');
        const newTitle = item.getAttribute('data-title');

        if (newImg) {
          primaryProductImg.style.opacity = '0.2';
          primaryProductImg.style.transform = 'scale(0.95)';
          setTimeout(() => {
            primaryProductImg.src = newImg;
            primaryProductImg.style.opacity = '1';
            primaryProductImg.style.transform = 'scale(1)';
          }, 150);
        }

        if (stageBadge && newTitle) {
          stageBadge.textContent = newTitle;
        }
      });
    });
  }
});
