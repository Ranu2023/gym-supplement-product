document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      
      // Toggle icon between bars and X
      const icon = mobileMenuBtn.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.product-card .btn');
  const cartCount = document.querySelector('.cart-btn');
  
  let cartItems = 0;
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      cartItems++;
      cartCount.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cartItems})`;
      
      // Animation effect
      button.textContent = 'Added!';
      button.style.background = '#4CAF50';
      
      setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.background = '';
      }, 1000);
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  });
  
  // Sticky header effect
  const header = document.querySelector('.header');
  const headerHeight = header.offsetHeight;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Form validation
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      // Simple validation
      if (!nameInput.value.trim()) {
        highlightError(nameInput);
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        highlightError(emailInput);
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        highlightError(messageInput);
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.background = '#4CAF50';
          
          // Reset form
          contactForm.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        }, 1500);
      }
    });
  }
  
  function highlightError(element) {
    element.style.borderColor = '#d32f2f';
  }
  
  function removeError(element) {
    element.style.borderColor = '';
  }
  
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  // Product hover effect
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// Add mobile menu styles
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @media (max-width: 768px) {
      .main-nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: var(--color-black);
        padding: 1rem;
        border-bottom: 1px solid var(--color-gray-800);
        display: none;
      }
      
      .main-nav.active {
        display: block;
      }
      
      .main-nav ul {
        flex-direction: column;
        gap: 1rem;
      }
      
      .header.scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
    }
  </style>
`);

// launch
// Define launchDate once
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate.getTime() - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (distance > 0) {
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
  } else {
    const countdownEl = document.querySelector('.countdown');
    if (countdownEl) {
      countdownEl.innerHTML = '<h3 style="color: white; font-size: 2rem;">🎉 We\'re Live! 🎉</h3>';
    }
    clearInterval(timer); // stop the countdown once it reaches zero
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});


document.addEventListener('DOMContentLoaded', function() {
  // Table of Contents functionality
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.privacy-section');
  
  // Smooth scrolling for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Remove active class from all links
        tocLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight current section in TOC while scrolling
  function updateActiveSection() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = '#' + section.id;
      }
    });
    
    // Update active TOC link
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Throttled scroll event listener
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll);
  
  // Initialize active section on page load
  updateActiveSection();
  
  // Animate cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  const animatedElements = document.querySelectorAll('.usage-card, .info-card, .rights-card, .sharing-item, .privacy-section');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Copy email functionality
  const emailElements = document.querySelectorAll('.contact-item span');
  
  emailElements.forEach(element => {
    if (element.textContent.includes('@')) {
      element.style.cursor = 'pointer';
      element.title = 'Click to copy email';
      
      element.addEventListener('click', function() {
        const email = this.textContent;
        
        // Copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            showCopyNotification('Email copied to clipboard!');
          });
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = email;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showCopyNotification('Email copied to clipboard!');
        }
      });
    }
  });
  
  // Show copy notification
  function showCopyNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--gradient-primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      z-index: 1000;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
  
  // Print functionality
  function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    printButton.className = 'btn btn-outline';
    printButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 100;
      display: none;
    `;
    
    printButton.addEventListener('click', () => {
      window.print();
    });
    
    document.body.appendChild(printButton);
    
    // Show print button on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        printButton.style.display = 'block';
      } else {
        printButton.style.display = 'none';
      }
    });
  }
  
  addPrintButton();
  
  // Back to top functionality
  function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: var(--gradient-primary);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 100;
      opacity: 0;
      transform: scale(0);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    `;
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.transform = 'scale(1)';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.transform = 'scale(0)';
      }
    });
  }
  
  addBackToTopButton();
});

// Print styles
const printStyles = `
  @media print {
    .header, .footer, .privacy-toc, .back-to-top {
      display: none !important;
    }
    
    .privacy-wrapper {
      grid-template-columns: 1fr !important;
    }
    
    .privacy-main {
      box-shadow: none !important;
      border: none !important;
    }
    
    .privacy-section {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
    
    .privacy-main {
      background: white !important;
      color: black !important;
    }
  }
`;

// Add print styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);