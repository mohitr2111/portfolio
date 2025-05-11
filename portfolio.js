// DOM Elements
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('.section');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Navigation and Section Display
function showSection(sectionId) {
    // Hide all sections and remove active class
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to corresponding nav link
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Initialize default section
function initializePage() {
    // Check if there's a hash in the URL
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    } else {
        showSection('home');
    }
}

// Navigation click events
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        history.pushState(null, null, `#${sectionId}`);
        showSection(sectionId);
    });
});

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    initializePage();
});

// Theme toggle functionality
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = this.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form inputs
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just log it to console and show an alert
        console.log('Form submission:', { name, email, subject, message });
        
        // Clear form
        this.reset();
        
        // Show confirmation (in a real app, use a better UI approach)
        alert('Thanks for your message! I\'ll get back to you soon.');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Handle navigation links separately
        if (this.classList.contains('nav-menu')) return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Show section first if needed
            showSection(targetId);
            
            // Then smooth scroll
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    checkTheme();
});
