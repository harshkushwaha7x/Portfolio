// Initialize AOS with proper error handling
const initAOS = () => {
  try {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-quad',
      mirror: false
    });
  } catch (error) {
    console.error('AOS initialization failed:', error);
  }
};

// Enhanced mobile menu with touch support
const initMobileMenu = () => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  const toggleMenu = () => {
    mobileMenu.style.maxHeight = mobileMenu.style.maxHeight 
      ? null 
      : `${mobileMenu.scrollHeight}px`;
  };

  menuBtn.addEventListener('click', toggleMenu);
  menuBtn.addEventListener('touchstart', toggleMenu);

  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.maxHeight = null;
    });
  });
};

// Smooth scroll for all navigation links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Improved typing animation with persistent cursor blink
const initTypingAnimation = () => {
  const text = "Hi, I'm Harsh Kushwaha";
  const typingText = document.getElementById("typing-text");
  let index = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deleteSpeed = 50;
  let pauseDuration = 1500;

  const animate = () => {
    const currentText = text.substring(0, index);
    
    typingText.innerHTML = currentText + '<span class="typing-cursor"></span>';

    if (!isDeleting) {
      // Typing phase
      if (index < text.length) {
        index++;
        setTimeout(animate, typingSpeed);
      } else {
        // Start deleting after pause
        isDeleting = true;
        setTimeout(animate, pauseDuration);
      }
    } else {
      // Deleting phase
      if (index > 0) {
        index--;
        setTimeout(animate, deleteSpeed);
      } else {
        // Restart cycle after deletion
        isDeleting = false;
        setTimeout(animate, typingSpeed);
      }
    }
  };

  // Start animation
  animate();
};

// Enhanced dark mode with system preference detection
const initDarkMode = () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIconPath = document.getElementById('themeIconPath');
  const body = document.body;

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  systemTheme.addEventListener('change', e => {
    if(!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  const updateIcon = (theme) => {
    const iconPaths = {
      dark: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
      light: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    };
    themeIconPath.setAttribute('d', iconPaths[theme]);
  };

  const setTheme = (theme) => {
    body.classList.remove('dark', 'light');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
    updateIcon(theme);
  };

  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || getSystemTheme();
  setTheme(savedTheme);
};

// Enhanced form submission with loading state
const initForm = () => {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Server response was not OK');
      }
    } catch (error) {
      alert('Error sending message. Please try again later.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
};

// Initialize all components with error handling
document.addEventListener('DOMContentLoaded', () => {
  try {
    initAOS();
    initMobileMenu();
    initSmoothScroll();
    initTypingAnimation();
    initDarkMode();
    initForm();
    initBackToTop();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

const initBackToTop = () => {
  const backToTop = document.getElementById('backToTop');

  const checkScroll = () => {
    // Show button when either:
    // 1. Scrolled more than 300px from top
    // 2. Near bottom of page (100px threshold)
    const scrolledFromTop = window.pageYOffset > 300;
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    
    backToTop.style.display = scrolledFromTop || nearBottom ? 'block' : 'none';
  };

  window.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll); // Handle screen resize
  checkScroll(); // Initial check

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};