document.addEventListener('DOMContentLoaded', () => {
    // Identify the current page (detect the #projects-page, etc.)
    const currentPage = getCurrentPage();
  
    // Fade in the entire body
    fadeIn(document.body, 600);
  
    // If this page has an associated text animation, set it up
    setupTextAnimation(currentPage);
  
    // Add fade-out behavior to main buttons
    const mainButtons = document.querySelectorAll('.main-button');
    mainButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const buttonId = button.id;
        let targetPage;
        switch(buttonId) {
          case 'timeline-btn':
            targetPage = 'timeline.html';
            break;
          case 'projects-btn':
            targetPage = 'projects.html';
            break;
          case 'jobs-btn':
            targetPage = 'jobs.html';
            break;
          case 'about-btn':
            targetPage = 'about.html';
            break;
          default:
            targetPage = 'index.html';
        }
        fadeOut(document.body, 600, () => {
          window.location.href = targetPage;
        });
      });
    });

    // Add fade-out behavior to logo
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent immediate navigation
        const targetPage = logoLink.getAttribute('href');
        fadeOut(document.body, 600, () => {
          window.location.href = targetPage;
        });
      });
    }

    // Projects Card Click Handling
    if (currentPage === 'projects') {
      const projectCards = document.querySelectorAll('.card');
      projectCards.forEach(card => {
        card.addEventListener('click', () => {
          const targetPage = card.getAttribute('data-target');
          fadeOut(document.body, 600, () => {
            window.location.href = targetPage;
          });
        });
      });
    }
});

/**
 * Detect which page we are on based on an element's ID.
 */
function getCurrentPage() {
  if (document.getElementById('timeline-page'))  return 'timeline';
  if (document.getElementById('projects-page'))  return 'projects';
  // Add other pages if needed
  return 'index';
}

/**
 * Configuration of text animations by page type.
 */
const ANIMATIONS = {
  index: {
    text: "Chasing Solutions Through Data",
    elementId: "animated-text"
  },
  timeline: {
    text: "Connecting Worlds",
    elementId: "animated-text"
  },
  projects: {
    text: "Connecting People",
    elementId: "animated-text"
  }
};

/**
 * Utility function to toggle scrolling.
 */
function toggleScrolling(enable) {
    if (enable) {
        document.body.style.overflow = "auto"; // Enable scrolling
        document.documentElement.style.overflow = "auto"; // Ensure <html> also allows scrolling
    } else {
        document.body.style.overflow = "hidden"; // Disable scrolling
        document.documentElement.style.overflow = "hidden"; // Prevent <html> from scrolling
    }
}

/**
 * Setup text animation for the current page.
 */
function setupTextAnimation(pageType) {
    // If there's no matching config, do nothing
    if (!ANIMATIONS[pageType]) return;

    const config = ANIMATIONS[pageType];
    const target = document.getElementById(config.elementId);

    if (!target) return;

    // Disable scrolling during the animation
    toggleScrolling(false);

    // Clear any existing content to prevent duplication
    target.innerHTML = '';

    const words = config.text.split(" ");
    const interval = 850;

    // Function to animate each word
    const animateText = () => {
        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.className = "word";
            span.style.animationDelay = `${index * interval}ms`;
            span.textContent = word;
            target.appendChild(span);
            target.appendChild(document.createTextNode(" "));
        });
    };

    // Display the target container and start animating the words
    setTimeout(() => {
        target.style.display = "block";
        animateText();
    }, 500);

    // After the text finishes animating, fade out intro and show main content
    const totalAnimationTime = words.length * interval + 2000;
    setTimeout(() => {
        const intro = document.getElementById("intro");
        if (intro) {
            intro.style.transition = "opacity 1s ease-in-out";
            intro.style.opacity = "0";
            setTimeout(() => {
                intro.style.display = "none";
                const mainContent = document.getElementById("main-content");
                if (mainContent) {
                    mainContent.style.display = "flex";
                    setTimeout(() => {
                        mainContent.style.opacity = "1";
                        toggleScrolling(true); // Enable scrolling after the animation
                    }, 100);
                }
            }, 1000);
        }
    }, totalAnimationTime);
}


/**
 * Fade out an element over a given duration, then run callback.
 */
function fadeOut(element, duration, callback) {
  let opacity = 1;
  const interval = 50;
  const decrement = interval / duration;
  const fade = setInterval(() => {
    opacity -= decrement;
    if (opacity <= 0) {
      clearInterval(fade);
      element.style.opacity = 0;
      if (callback) callback();
    } else {
      element.style.opacity = opacity;
    }
  }, interval);
}

/**
 * Fade in an element over a given duration, then run callback.
 */
function fadeIn(element, duration, callback) {
  let opacity = 0;
  const interval = 50;
  const increment = interval / duration;
  element.style.opacity = 0;
  element.style.display = "block";
  const fade = setInterval(() => {
    opacity += increment;
    if (opacity >= 1) {
      clearInterval(fade);
      element.style.opacity = 1;
      if (callback) callback();
    } else {
      element.style.opacity = opacity;
    }
  }, interval);
}

/**
 * If the page was loaded from the bfcache,
 * re-run fadeIn logic to ensure visuals are correct.
 */
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // The page was restored from bfcache.
    fadeIn(document.body, 600);
  }
});

document.addEventListener("DOMContentLoaded", () => {
    // Select all dropdown containers
    const dropdowns = document.querySelectorAll(".dropdown");
  
    dropdowns.forEach((dropdown) => {
      // Each dropdown container has a .dropdown-button
      const button = dropdown.querySelector(".dropdown-button");
  
      button.addEventListener("click", () => {
        // Close all dropdowns except the one that was clicked
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("open");
          }
        });
  
        // Toggle the clicked dropdown open/closed
        dropdown.classList.toggle("open");
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const fullscreenButton = document.querySelector(".fullscreen-button");
    const exitFullscreenButton = document.querySelector(".exit-fullscreen-button");
    const visualisationIframe = document.querySelector(".visualisation-iframe");
  
    if (fullscreenButton && exitFullscreenButton && visualisationIframe) {
      fullscreenButton.addEventListener("click", () => {
        visualisationIframe.classList.add("fullscreen");
      });
  
      exitFullscreenButton.addEventListener("click", () => {
        visualisationIframe.classList.remove("fullscreen");
      });
    }
  });
  