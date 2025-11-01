document.addEventListener('DOMContentLoaded', () => {
    // Fade in the entire body
    fadeIn(document.body, 600);

    // Setup the intro text animation
    setupTextAnimation();

    // Setup navigation
    setupNavigation();

    // Setup skill filters
    setupSkillFilters();

    // Setup mobile navigation
    setupMobileNavigation();

    // Setup custom cursor
    setupCustomCursor();

});

/**
 * Utility function to toggle scrolling.
 */
function toggleScrolling(enable) {
    if (enable) {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
    } else {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
    }
}

/**
 * Setup text animation for the intro.
 */
function setupTextAnimation() {
    const target = document.getElementById("animated-text");
    if (!target) return;

    // Disable scrolling during the animation
    toggleScrolling(false);

    const text = "Chasing Solutions Through Data";
    const words = text.split(" ");
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

    // After animation completes, transition to main content
    const totalAnimationTime = words.length * interval + 2000;
    setTimeout(() => {
        transitionToMainContent();
    }, totalAnimationTime);
}

/**
 * Transition from intro to main content.
 */
function transitionToMainContent() {
    const intro = document.getElementById("intro");
    const mainContent = document.getElementById("main-content");

    // Check if we need to handle URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hasUrlParams = urlParams.has('section') || urlParams.has('project');

    // Fade out intro
    intro.style.transition = "opacity 1s ease-in-out";
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";

        // Show main content (but keep it invisible if we have URL params)
        mainContent.style.display = "block";

        // If we have URL params, switch section/expand project first, then make visible
        if (hasUrlParams) {
            const sectionId = urlParams.get('section');
            const projectId = urlParams.get('project');

            // Switch to the section immediately
            if (sectionId) {
                const sections = document.querySelectorAll('.content-section');
                const navLinks = document.querySelectorAll('.nav-link');

                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }

            // Expand project if specified
            if (projectId) {
                const projectMain = document.querySelector(`.project-main[data-project="${projectId}"]`);
                const projectDetails = document.getElementById('project-' + projectId);

                if (projectMain && projectDetails) {
                    projectMain.classList.add('active');
                    projectDetails.classList.add('expanded');
                }
            }

            // Now make content visible and scroll
            setTimeout(() => {
                mainContent.style.opacity = "1";
                toggleScrolling(true);

                // Scroll to the project or section with longer delay
                setTimeout(() => {
                    if (projectId) {
                        const projectMain = document.querySelector(`.project-main[data-project="${projectId}"]`);
                        const projectItem = projectMain?.closest('.project-item');
                        if (projectItem) {
                            // Use scrollIntoView instead of manual calculation
                            projectItem.scrollIntoView({ behavior: 'smooth', block: 'start' });

                            // Then adjust slightly upward after scroll completes
                            setTimeout(() => {
                                window.scrollBy({
                                    top: -20,
                                    behavior: 'smooth'
                                });
                            }, 600);
                        } else {
                            console.log('Project item not found for:', projectId);
                        }
                    } else if (sectionId) {
                        const section = document.getElementById(sectionId);
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }, 600);
            }, 50);
        } else {
            // No URL params, just fade in normally
            setTimeout(() => {
                mainContent.style.opacity = "1";
                toggleScrolling(true);
            }, 50);
        }
    }, 1000);
}

/**
 * Setup navigation between sections.
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSection = link.getAttribute('data-section');

            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Setup expand/collapse for research projects
    setupProjectExpansion();

    // Setup replay animation button
    setupReplayAnimation();

    // Handle URL hash for direct section/project links
    handleUrlHash();
}

/**
 * Setup expand/collapse functionality for research projects.
 */
function setupProjectExpansion() {
    const projectMains = document.querySelectorAll('.project-main');

    projectMains.forEach(main => {
        const projectId = main.getAttribute('data-project');
        const details = document.getElementById('project-' + projectId);

        // Auto-expand the experience section on load
        if (projectId === 'exp-1' && details.classList.contains('expanded')) {
            main.classList.add('active');
        }

        main.addEventListener('click', () => {
            // Toggle active state
            const isActive = main.classList.contains('active');

            if (isActive) {
                main.classList.remove('active');
                details.classList.remove('expanded');
            } else {
                main.classList.add('active');
                details.classList.add('expanded');
            }
        });
    });
}

/**
 * Setup replay animation functionality.
 */
function setupReplayAnimation() {
    const replayButton = document.getElementById('replay-animation');

    if (replayButton) {
        replayButton.addEventListener('click', () => {
            const mainContent = document.getElementById('main-content');
            const intro = document.getElementById('intro');

            // Hide main content
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.display = 'none';

                // Show and reset intro
                intro.style.display = 'flex';
                intro.style.opacity = '1';

                // Clear previous animation
                const animatedText = document.getElementById('animated-text');
                animatedText.innerHTML = '';
                animatedText.style.display = 'none';

                // Disable scrolling
                toggleScrolling(false);

                // Restart animation
                const text = "Chasing Solutions Through Data";
                const words = text.split(" ");
                const interval = 850;

                setTimeout(() => {
                    animatedText.style.display = "block";
                    words.forEach((word, index) => {
                        const span = document.createElement("span");
                        span.className = "word";
                        span.style.animationDelay = `${index * interval}ms`;
                        span.textContent = word;
                        animatedText.appendChild(span);
                        animatedText.appendChild(document.createTextNode(" "));
                    });
                }, 500);

                // After animation completes, transition back to main content
                const totalAnimationTime = words.length * interval + 2000;
                setTimeout(() => {
                    transitionToMainContent();
                }, totalAnimationTime);
            }, 1000);
        });
    }
}

/**
 * Fade in an element over a given duration.
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
 * Handle page restoration from bfcache.
 */
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        fadeIn(document.body, 600);
    }
});

/**
 * Setup skill filters for research projects.
 */
function setupSkillFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Only get project items within the research section
    const researchSection = document.getElementById('research');
    const projectItems = researchSection ? researchSection.querySelectorAll('.project-item') : [];

    if (!filterButtons.length || !projectItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectItems.forEach(project => {
                const projectSkills = project.getAttribute('data-skills') || '';
                const isUpcoming = project.classList.contains('upcoming-project');

                if (filter === 'all') {
                    // Show all except upcoming projects
                    if (isUpcoming) {
                        project.classList.add('hidden');
                    } else {
                        project.classList.remove('hidden');
                    }
                } else if (filter === 'upcoming') {
                    // Only show upcoming projects
                    if (isUpcoming) {
                        project.classList.remove('hidden');
                    } else {
                        project.classList.add('hidden');
                    }
                } else {
                    // Regular filter logic - hide upcoming projects
                    if (isUpcoming) {
                        project.classList.add('hidden');
                    } else if (projectSkills.includes(filter)) {
                        project.classList.remove('hidden');
                    } else {
                        project.classList.add('hidden');
                    }
                }
            });
        });
    });
}
  

/**
 * Setup mobile navigation (hamburger menu).
 */
function setupMobileNavigation() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileReplayBtn = document.getElementById('mobile-replay-animation');

    if (!hamburgerBtn || !mobileMenuOverlay) return;

    // Toggle menu
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');

            // Close menu
            hamburgerBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');

            // Update active state
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show the section (same logic as desktop navigation)
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });

            // Also update desktop nav active state if visible
            const desktopNavLinks = document.querySelectorAll('.nav-link');
            desktopNavLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('data-section') === targetSection) {
                    navLink.classList.add('active');
                }
            });
        });
    });

    // Mobile replay animation
    if (mobileReplayBtn) {
        mobileReplayBtn.addEventListener('click', () => {
            // Close menu
            hamburgerBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            
            // Trigger the existing replay animation function
            const mainContent = document.getElementById('main-content');
            const intro = document.getElementById('intro');

            // Hide main content
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.display = 'none';

                // Show and reset intro
                intro.style.display = 'flex';
                intro.style.opacity = '1';

                // Clear previous animation
                const animatedText = document.getElementById('animated-text');
                animatedText.innerHTML = '';
                animatedText.style.display = 'none';

                // Disable scrolling
                toggleScrolling(false);

                // Restart animation
                setupTextAnimation();
            }, 600);
        });
    }

    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            hamburgerBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
        }
    });
}

/**
 * Setup custom cursor with ball design.
 */
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        const speed = 0.15;
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Add hover effect for clickable elements
    const hoverElements = document.querySelectorAll('a, button, .project-main, .filter-btn, .nav-link, .mobile-nav-link');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

/**
 * Custom smooth scroll function with configurable duration.
 */
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth deceleration
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

/**
 * Handle URL query parameters for direct links to sections and projects.
 * Supports: ?section=name and ?section=name&project=id
 * Examples: ?section=research, ?section=research&project=1, ?section=experience&project=exp-1
 */
function handleUrlHash() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionId = urlParams.get('section');
    const projectId = urlParams.get('project');

    if (!sectionId) return;

    // Switch to the section
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
        // Open the specific project if specified
        if (projectId) {
            const projectMain = document.querySelector(`.project-main[data-project="${projectId}"]`);
            const projectDetails = document.getElementById('project-' + projectId);

            if (projectMain && projectDetails) {
                // Expand the project first
                projectMain.classList.add('active');
                projectDetails.classList.add('expanded');

                // Scroll after expansion animation starts
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        // Get the project-item parent (which has the border)
                        const projectItem = projectMain.closest('.project-item');
                        if (projectItem) {
                            // Scroll to the project-item to align with the separator line
                            const rect = projectItem.getBoundingClientRect();
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            const targetPosition = rect.top + scrollTop - 20;

                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                });
            }
        } else if (sectionId) {
            // If only section is specified (no project), scroll to the section
            const section = document.getElementById(sectionId);
            if (section) {
                requestAnimationFrame(() => {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }
    });
}
