/**
 * Best Comfort HVAC Joliet Office - Interactive Vanilla JS
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

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('show');
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavToggle.textContent = '☰';
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
        heroDynamicTitle.innerHTML = 'Best Comfort HVAC <span class="text-gradient">Heating &amp; Cooling Experts</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Professional HVAC services for residential and commercial customers in the Chicago & Joliet area. 24/7 emergency service available with same-day appointments.';
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
        heroDynamicTitle.innerHTML = 'Summer High-Efficiency <span class="text-gradient-cyan">Cooling &amp; AC Defense</span>';
      }
      if (heroDynamicDesc) {
        heroDynamicDesc.textContent = 'Keep your home ice-cold during 95°F Midwest heat waves with high-SEER2 central AC and multi-zone ductless systems.';
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
      const name = document.getElementById('quoteName') ? document.getElementById('quoteName').value : 'Valued Customer';
      const service = document.getElementById('quoteService') ? document.getElementById('quoteService').value : 'HVAC Service';
      alert(`🎉 Thank you, ${name}! Your Joliet request for "${service}" has been received. Our dispatch team will call you within 15 minutes at 815-556-0660!`);
      heroQuoteForm.reset();
    });
  }

  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('✅ Appointment scheduled successfully! Best Comfort HVAC Joliet Office will contact you shortly to confirm your service slot.');
      bookingForm.reset();
    });
  }
});
