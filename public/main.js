document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Scroll animations
    const header = document.querySelector('header');
    const scrollElements = document.querySelectorAll('.section-title h2, .dashboard-title h1, .dashboard-title p, .dashboard-actions, .about-image, .about-text, .tag-item, .social-links a, .tab, .overview-card, .skill-categories, .skill-row, .education-card, .certification-card, .experience-card, .page-title h1, .page-title p, .info-card, .contact-form-container, .quote-banner, .map-container');
    const progressBars = document.querySelectorAll('.progress-fill');

    // Add scroll class to header when scrolled
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Animate elements when scrolled into view
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });

        // Animate progress bars when in viewport
        progressBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.classList.contains('animate')) {
                setTimeout(() => {
                    bar.classList.add('animate');
                }, 300);
            }
        });
    });

    // Trigger initial scroll to show elements in viewport on load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);

    // Set progress bar widths from data attributes
    progressBars.forEach(bar => {
        const width = bar.parentElement.dataset.progress || '0';
        bar.style.setProperty('--progress-width', width + '%');
    });

    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Trigger scroll event to animate newly visible elements
            setTimeout(() => {
                window.dispatchEvent(new Event('scroll'));
            }, 100);
        });
    });

    // Skill filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillRows = document.querySelectorAll('.skill-row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the filter value
            const filter = this.getAttribute('data-filter');

            // Show/hide rows based on filter
            skillRows.forEach(row => {
                if (filter === 'all' || row.getAttribute('data-category') === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Experience modal functionality
    const modalOverlay = document.getElementById('modal-overlay');
    const modalHeader = document.getElementById('modal-header');
    const modalLogo = document.getElementById('modal-logo');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    // Function to open modal
    function openModal(id) {
        const experience = experienceData[id];

        if (!experience) {
            console.error("No experience data found for id:", id);
            return;
        }

        // Set background image for modal header
        modalHeader.style.backgroundImage = `url('${experience.bgImage}')`;

        // Set other modal content
        modalLogo.src = experience.logo;
        modalLogo.alt = `${experience.company} Logo`;
        modalTitle.textContent = experience.title;
        modalSubtitle.textContent = experience.company;
        modalDate.textContent = experience.date;

        // Generate modal body content
        let bodyContent = `
      <div class="modal-section">
        <h4 class="modal-section-title">Overview</h4>
        <p class="modal-description">${experience.description}</p>
      </div>
      
      <div class="modal-section">
        <h4 class="modal-section-title">Key Responsibilities</h4>
        <ul class="responsibilities-list">
          ${experience.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
        </ul>
      </div>
    `;

        modalBody.innerHTML = bodyContent;

        // Show modal with animation
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Add event listeners to all SEE MORE buttons
    document.querySelectorAll('.see-more-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const card = this.closest('.experience-card');
            if (card) {
                const id = card.dataset.id;
                openModal(id);
            }
        });
    });

    // Add click events to cards (excluding buttons)
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.see-more-btn')) {
                const id = this.dataset.id;
                openModal(id);
            }
        });
    });

    // Add close event to modal close button
    if (modalClose) {
        modalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }

    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Add animation class to button
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // In a real application, you would send the form data to a server
                alert('Your message has been sent successfully! This is a demonstration - in a real application, the form would be submitted to a server.');
                contactForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';

                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Check for system preference
    if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

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

                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Highlight active section based on scroll position
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Add parallax effect to hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
            }
        });
    }

    // Add hover effects to cards
    document.querySelectorAll('.overview-card, .education-card, .certification-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        setTimeout(typeWriter, 1000);
    }
});