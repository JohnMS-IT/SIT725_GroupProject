// Main JavaScript file for ShoeMart website
// Client-side functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ShoeMart JavaScript loaded successfully');
    
    // Initialize all components
    initializeSearch();
    initializeProductFilters();
    initializeImageHover();
    initializeFormValidation();
});

// Search functionality
function initializeSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchQuery');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
        
        // Real-time search suggestions (optional enhancement)
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // Could implement real-time search suggestions here
                console.log('Searching for:', query);
            }
        });
    }
}

// Perform search
function performSearch() {
    const query = document.getElementById('searchQuery').value;
    if (query.trim()) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
}

// Product category filtering
function initializeProductFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            if (category) {
                window.location.href = `/shop?category=${encodeURIComponent(category)}`;
            }
        });
    });
}

// Image hover effects
function initializeImageHover() {
    const productImages = document.querySelectorAll('.product-hover');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Form validation
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateContactForm()) {
                e.preventDefault();
            }
        });
    }
}

// Validate contact form
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const topic = document.getElementById('topic');
    const message = document.getElementById('message');
    
    let isValid = true;
    const errors = [];
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate topic
    if (!topic.value.trim()) {
        showFieldError(topic, 'Topic is required');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    }
    
    if (!isValid) {
        showFormErrors(errors);
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Clear form errors
function clearFormErrors() {
    const invalidFields = document.querySelectorAll('.is-invalid');
    const errorMessages = document.querySelectorAll('.invalid-feedback');
    
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
    errorMessages.forEach(msg => msg.remove());
}

// Show form errors
function showFormErrors(errors) {
    const errorContainer = document.getElementById('formErrors');
    if (errorContainer && errors.length > 0) {
        errorContainer.innerHTML = errors.map(error => `<p class="text-danger">${error}</p>`).join('');
        errorContainer.style.display = 'block';
    }
}

// Utility function for smooth scrolling
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility function for showing loading states
function showLoading(element) {
    if (element) {
        element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
        element.disabled = true;
    }
}

// Utility function for hiding loading states
function hideLoading(element, originalText) {
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}

// Export functions for global access
window.ShoeMart = {
    performSearch,
    smoothScrollTo,
    showLoading,
    hideLoading,
    validateContactForm
};
