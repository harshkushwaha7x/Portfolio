/**
 * Portfolio Website JavaScript
 * Main functionality for interactive features, theme switching, and animations
 */

// Wrap all code in an IIFE to avoid polluting the global namespace
(function() {
  'use strict';

  // ==========================================================================
  // CONFIGURATION & CONSTANTS
  // ==========================================================================

  const CONFIG = {
    typing: {
      text: "Hi, I'm Harsh Kushwaha",
      typingSpeed: 100,
      deleteSpeed: 50,
      pauseDuration: 1500
    },
    aos: {
      duration: 800,
      once: true,
      easing: 'ease-out-quad',
      mirror: false
    },
    github: {
      username: 'harshkushwaha7x'
    },
    leetcode: {
      username: 'harsh_kushwaha_7x'
    }
  };

  const THEME_ICONS = {
    dark: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    light: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  };

  // ==========================================================================
  // UTILITY FUNCTIONS
  // ==========================================================================

  /**
   * Get system theme preference
   * @returns {string} 'dark' or 'light'
   */
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  /**
   * Safely get element by ID with error handling
   * @param {string} id - Element ID
   * @returns {Element|null}
   */
  const getElement = (id) => {
    try {
      return document.getElementById(id);
    } catch (error) {
      console.warn(`Element with ID '${id}' not found:`, error);
      return null;
    }
  };

  /**
   * Safely get elements by selector with error handling
   * @param {string} selector - CSS selector
   * @returns {NodeList}
   */
  const getElements = (selector) => {
    try {
      return document.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Elements with selector '${selector}' not found:`, error);
      return [];
    }
  };

  // ==========================================================================
  // ANIMATION & UI COMPONENTS
  // ==========================================================================

  /**
   * Initialize AOS (Animate On Scroll) library
   */
  const initAOS = () => {
    try {
      if (typeof AOS !== 'undefined') {
        AOS.init(CONFIG.aos);
      }
    } catch (error) {
      console.error('AOS initialization failed:', error);
    }
  };

  /**
   * Initialize typing animation with cursor blink
   */
  const initTypingAnimation = () => {
    const typingText = getElement('typing-text');
    if (!typingText) return;

    const { text, typingSpeed, deleteSpeed, pauseDuration } = CONFIG.typing;
    let index = 0;
    let isDeleting = false;

    const animate = () => {
      const currentText = text.substring(0, index);
      typingText.innerHTML = `${currentText}<span class="typing-cursor"></span>`;

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

    animate();
  };

  /**
   * Initialize back to top button functionality
   */
  const initBackToTop = () => {
    const backToTop = getElement('backToTop');
    if (!backToTop) return;

    const checkScroll = () => {
      const scrolledFromTop = window.pageYOffset > 300;
      const nearBottom = window.innerHeight + window.scrollY >= 
        document.documentElement.scrollHeight - 100;
      
      backToTop.style.display = scrolledFromTop || nearBottom ? 'block' : 'none';
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    backToTop.addEventListener('click', scrollToTop);
    
    checkScroll(); // Initial check
  };

  // ==========================================================================
  // NAVIGATION & MOBILE MENU
  // ==========================================================================

  /**
   * Initialize mobile menu with touch support
   */
  const initMobileMenu = () => {
    const menuBtn = getElement('menuBtn');
    const mobileMenu = getElement('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;

    const toggleMenu = (e) => {
      e.preventDefault();
      mobileMenu.style.maxHeight = mobileMenu.style.maxHeight 
        ? null 
        : `${mobileMenu.scrollHeight}px`;
    };

    const closeMenu = () => {
      mobileMenu.style.maxHeight = null;
    };

    // Toggle menu on click/touch
    menuBtn.addEventListener('click', toggleMenu);
    menuBtn.addEventListener('touchstart', toggleMenu, { passive: false });

    // Close menu when clicking menu links
    getElements('#mobileMenu a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  };

  /**
   * Initialize smooth scroll for all navigation links
   */
  const initSmoothScroll = () => {
    getElements('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  // ==========================================================================
  // THEME MANAGEMENT
  // ==========================================================================

  /**
   * Update theme-dependent images
   */
  const updateThemeImages = () => {
    const isDark = document.body.classList.contains('dark');
    
    // GeeksforGeeks image
    const gfgImg = getElement('gfg-img');
    if (gfgImg) {
      gfgImg.src = isDark ? 
        'src/image/GeeksforGeeks-Dark.png' : 
        'src/image/GeeksforGeeks-Light.png';
    }

    // HackerRank image
    const hrImg = getElement('hackerrank-img');
    if (hrImg) {
      hrImg.src = isDark ? 
        'src/image/HackerRank-Dark.png' : 
        'src/image/HackerRank-Light.png';
    }
  };

  /**
   * Update GitHub stats cards theme
   */
  const updateGitHubCards = () => {
    const githubStatsImg = getElement('github-stats-img');
    const githubLangsImg = getElement('github-langs-img');
    const githubContainer = getElement('github-stats-container');
    
    if (!githubStatsImg || !githubLangsImg) return;

    const { username } = CONFIG.github;
    const isDark = document.body.classList.contains('dark');

    if (isDark) {
      githubStatsImg.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&title_color=ffffff&icon_color=ffffff&text_color=ffffff`;
      githubLangsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&langs_count=8&title_color=ffffff&text_color=ffffff`;
    } else {
      githubStatsImg.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true&title_color=1E40AF&icon_color=1E40AF&text_color=000000`;
      githubLangsImg.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true&langs_count=8&title_color=1E40AF&text_color=000000`;
    }

    // Update container background
    if (githubContainer) {
      githubContainer.style.backgroundColor = isDark ? '#000000' : 'white';
    }
  };

  /**
   * Update LeetCode card theme
   */
  const updateLeetCodeCard = () => {
    const leetcodeCard = getElement('leetcode-card');
    if (!leetcodeCard) return;

    const { username } = CONFIG.leetcode;
    const isDark = document.body.classList.contains('dark');
    const theme = isDark ? 'dark' : 'white';
    
    leetcodeCard.src = `https://leetcard.jacoblin.cool/${username}?theme=${theme}&ext=heatmap`;
  };

  /**
   * Update scroll arrow styling
   */
  const updateScrollArrow = () => {
    const scrollArrow = document.querySelector('#home .animate-bounce');
    if (!scrollArrow) return;

    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
      scrollArrow.style.backgroundColor = '#000000';
      scrollArrow.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      scrollArrow.style.color = '#ffffff';
    } else {
      scrollArrow.style.backgroundColor = '#ffffff';
      scrollArrow.style.borderColor = 'rgba(0, 0, 0, 0.1)';
      scrollArrow.style.color = '#1a202c';
    }
  };

  /**
   * Update all theme-dependent elements
   */
  const updateAllThemeElements = () => {
    updateThemeImages();
    updateGitHubCards();
    updateLeetCodeCard();
    updateScrollArrow();
    
    // Preserve Get In Touch button styling in dark mode
    if (document.body.classList.contains('dark')) {
      const getInTouchBtn = document.querySelector('a[href="#contact"].inline-block');
      if (getInTouchBtn) {
        Object.assign(getInTouchBtn.style, {
          backgroundColor: 'white',
          color: '#1f2937',
          borderColor: '#1f2937'
        });
      }
    }
  };

  /**
   * Initialize dark mode with system preference detection
   */
  const initDarkMode = () => {
    const themeToggle = getElement('themeToggle');
    const themeIconPath = getElement('themeIconPath');
    const body = document.body;

    if (!themeToggle) return;

    // Listen for system theme changes
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    systemTheme.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

    /**
     * Update theme icon
     * @param {string} theme - 'dark' or 'light'
     */
    const updateIcon = (theme) => {
      if (themeIconPath && THEME_ICONS[theme]) {
        themeIconPath.setAttribute('d', THEME_ICONS[theme]);
      }
    };

    /**
     * Set theme and update all related elements
     * @param {string} theme - 'dark' or 'light'
     */
    const setTheme = (theme) => {
      body.classList.remove('dark', 'light');
      body.classList.add(theme);
      localStorage.setItem('theme', theme);
      updateIcon(theme);
      updateAllThemeElements();
    };

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
      setTheme(newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || getSystemTheme();
    setTheme(savedTheme);
  };

  // ==========================================================================
  // FORM HANDLING
  // ==========================================================================

  /**
   * Initialize form submission with loading state
   */
  const initForm = () => {
    const form = document.querySelector('form');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Set loading state
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
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        alert('Error sending message. Please try again later.');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  };

  // ==========================================================================
  // PROJECT MODALS
  // ==========================================================================

  /**
   * Initialize project modal functionality
   */
  const initProjectModals = () => {
    const modal = getElement('projectModal');
    const closeModalBtn = getElement('closeModal');
    const projectLinks = getElements('.text-blue-500');
    
    if (!modal) return;

    // Project modal elements
    const projectModals = [
      'project1Details',
      'project2Details',
      'project3Details',
      'project4Details',
      'project5Details',
      'project6Details'
    ].map(id => getElement(id)).filter(Boolean);

    /**
     * Show specific project modal
     * @param {Element} projectModalContent - Modal content element
     */
    const showModal = (projectModalContent) => {
      if (!projectModalContent) return;
      
      // Hide all project details
      getElements('#projectModal > div > div').forEach(details => {
        details.classList.add('hidden');
      });
      
      // Show selected project
      projectModalContent.classList.remove('hidden');
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    };

    /**
     * Hide modal
     */
    const hideModal = () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    // Add click handlers for project links
    projectLinks.forEach((link, index) => {
      if (projectModals[index]) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          showModal(projectModals[index]);
        });
      }
    });

    // Close modal handlers
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', hideModal);
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        hideModal();
      }
    });
  };

  // ==========================================================================
  // VIDEO BACKGROUND
  // ==========================================================================

  /**
   * Initialize video background autoplay
   */
  const initVideoBackground = () => {
    const video = document.querySelector('#backgroundVideo');
    if (!video) return;

    video.play().catch(error => {
      console.log('Video autoplay failed (this is normal on some browsers):', error);
    });
  };

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  /**
   * Initialize all components with comprehensive error handling
   */
  const initializeApp = () => {
    const initializers = [
      { name: 'AOS', fn: initAOS },
      { name: 'Mobile Menu', fn: initMobileMenu },
      { name: 'Smooth Scroll', fn: initSmoothScroll },
      { name: 'Typing Animation', fn: initTypingAnimation },
      { name: 'Dark Mode', fn: initDarkMode },
      { name: 'Form', fn: initForm },
      { name: 'Back to Top', fn: initBackToTop },
      { name: 'Project Modals', fn: initProjectModals },
      { name: 'Video Background', fn: initVideoBackground }
    ];

    initializers.forEach(({ name, fn }) => {
      try {
        fn();
        console.log(`✓ ${name} initialized successfully`);
      } catch (error) {
        console.error(`✗ ${name} initialization failed:`, error);
      }
    });
  };

  // ==========================================================================
  // DOM READY EVENT
  // ==========================================================================

  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    // DOM is already loaded
    initializeApp();
  }

})();