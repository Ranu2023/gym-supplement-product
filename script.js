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
