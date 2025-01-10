const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

navbarToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    navbarToggler.classList.remove("active");
  });
}



/**
 * search toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    searchBox.classList.toggle("active");
  });
}



/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Carousel functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots-container');

    let currentIndex = 0;
    const totalItems = items.length;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCarousel() {
        items.forEach((item, index) => {
            let relativeIndex = ((index - currentIndex) % totalItems + totalItems) % totalItems;
            
            if (relativeIndex > 1) relativeIndex -= totalItems;
            if (relativeIndex < -1) relativeIndex += totalItems;
            
            const translateX = relativeIndex * 350;
            const translateZ = Math.abs(relativeIndex) * -50;
            const opacity = 1 - (Math.abs(relativeIndex) * 0.2);
            
            item.style.transform = `
                translateX(${translateX}px)
                translateZ(${translateZ}px)
            `;
            item.style.opacity = opacity;
            item.style.zIndex = 10 - Math.abs(relativeIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
        updateDots();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
        updateDots();
    }

    // Initialize carousel
    updateCarousel();

    // Event listeners
    if (prevButton && nextButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Auto-advance
    let autoAdvance = setInterval(nextSlide, 3000);

    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoAdvance);
        });

        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(nextSlide, 3000);
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                prevSlide();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});

// Particle effects
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }
}

function updateViewerCount() {
    const counts = document.querySelectorAll('.count');
    counts.forEach(count => {
        const viewers = Math.floor(Math.random() * 2000 + 500);
        count.textContent = viewers > 1000 ? 
            (viewers/1000).toFixed(1) + 'K watching' : 
            viewers + ' watching';
    });
}

// Initialize particles and viewer count when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setInterval(updateViewerCount, 5000);
});

function getRandomMessage() {
    const messages = [
        '🎮 Very Sigma ',
        '🚀 Let\'s go! ',
        '✨ Sigma! ',
        '⭐ Awesome! ',
        '👏 Nice one! ',
        '💪 Keep it up! ',
        '🔥 On Fire! ',
        '💫 Incredible! '
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Search functionality
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchSubmit = document.querySelector('.search-submit');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('.search-field');

// Open search container
searchBtn.addEventListener('click', () => {
    searchContainer.classList.add('active');
    searchInput.focus(); // Automatically focus the input field
});

// Close search container when clicking outside
searchClose.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = ''; // Clear the input field
});

// Handle search submission
searchSubmit.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // You can customize this part based on your needs
        // Example: Redirect to search results page
        window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        
        // Or if you want to search within the current page:
        // searchCurrentPage(searchTerm);
    }
}

// Optional: Search within current page function
function searchCurrentPage(searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'gi');
    const textNodes = document.evaluate(
        "//text()[not(ancestor::script)][not(ancestor::style)]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    // Remove existing highlights
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
    });

    // Add new highlights
    for (let i = 0; i < textNodes.snapshotLength; i++) {
        const node = textNodes.snapshotItem(i);
        const matches = node.textContent.match(searchRegex);
        
        if (matches) {
            const span = document.createElement('span');
            span.innerHTML = node.textContent.replace(searchRegex, match => 
                `<span class="search-highlight">${match}</span>`
            );
            node.parentNode.replaceChild(span, node);
        }
    }
}

// Optional: Add this CSS for highlighting search results
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        background-color: rgba(43, 112, 204, 0.3);
        border-radius: 2px;
        padding: 0 2px;
    }
`;
document.head.appendChild(style);

// Close search with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    }
});
// ... existing code ...

// Disable F12 and common dev tool shortcuts
document.addEventListener('keydown', function(event) {
  // Prevent F12
  if (event.key === 'F12') {
      event.preventDefault();
      return false;
  }

  // Prevent Ctrl+Shift+I (Chrome dev tools)
  if (event.ctrlKey && event.shiftKey && event.key === 'I') {
      event.preventDefault();
      return false;
  }

  // Prevent Ctrl+Shift+J (Chrome dev tools)
  if (event.ctrlKey && event.shiftKey && event.key === 'J') {
      event.preventDefault();
      return false;
  }

  // Prevent Ctrl+Shift+C (Chrome dev tools)
  if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      event.preventDefault();
      return false;
  }

  // Prevent Ctrl+U (View Source)
  if (event.ctrlKey && event.key === 'u') {
      event.preventDefault();
      return false;
  }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  return false;
});