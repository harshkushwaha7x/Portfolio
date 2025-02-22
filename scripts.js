// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
  });
  
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    if(mobileMenu.style.maxHeight){
      mobileMenu.style.maxHeight = null;
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    }
  });
  
  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.pageYOffset > 300){
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const text = "Hi, I'm Harsh Kushwaha";
  const typingText = document.getElementById("typing-text");
  
  let index = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = text.substring(0, index);
  
    // Update the text content
    typingText.textContent = currentText;
  
    if (!isDeleting && index < text.length) {
      // Typing phase: Add one character at a time
      index++;
      setTimeout(type, 100); // Typing speed (100ms per character)
    } else if (isDeleting && index > 0) {
      // Deleting phase: Remove one character at a time
      index--;
      setTimeout(type, 50); // Deleting speed (50ms per character)
    } else {
      // Switch between typing and deleting
      isDeleting = !isDeleting;
  
      // Add a pause before starting the next phase
      setTimeout(type, isDeleting ? 1000 : 100); // Pause before deleting or typing
    }
  }
  
  // Start the typing animation
  type();

  // Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeIconPath = document.getElementById('themeIconPath');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    updateIcon('light');
  } else {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    updateIcon('dark');
  }
});

function updateIcon(theme) {
  if (theme === 'dark') {
    themeIconPath.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
  } else {
    themeIconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
  }
}