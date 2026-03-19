// ========================================
// Navigation Between Pages
// ========================================

/**
 * Navigate to a different page
 * @param {string} pageId - The ID of the page to navigate to
 */
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ========================================
// Reveal Hidden Message
// ========================================

/**
 * Reveal the hidden message with animation and effects
 */
function revealMessage() {
    const hiddenMessage = document.getElementById('hiddenMessage');
    const loveBtn = document.getElementById('loveBtn');

    // Toggle the hidden message visibility
    hiddenMessage.classList.add('show');

    // Disable the button after clicking
    loveBtn.disabled = true;
    loveBtn.style.opacity = '0.6';
    loveBtn.style.cursor = 'not-allowed';

    // Add heart burst effect
    createHeartBurst();

    // Optional: Change button text
    loveBtn.textContent = '💕 I love you too! 💕';
}

// ========================================
// Heart Burst Animation
// ========================================

/**
 * Create a burst of hearts when the love button is clicked
 */
function createHeartBurst() {
    const button = document.getElementById('loveBtn');
    const buttonRect = button.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    // Create 12 hearts bursting out
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';

        document.body.appendChild(heart);

        // Calculate burst direction
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        // Animate the heart
        let x = centerX;
        let y = centerY;
        let opacity = 1;

        const animate = () => {
            x += vx;
            y += vy;
            opacity -= 0.02;

            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };

        animate();
    }
}

// ========================================
// Page Load Initialization
// ========================================

/**
 * Initialize the website on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Set the home page as active by default
    navigateTo('home');

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            const currentPage = document.querySelector('.page.active');
            if (currentPage.id === 'home') {
                navigateTo('memories');
            } else if (currentPage.id === 'memories') {
                navigateTo('final');
            }
        } else if (event.key === 'ArrowLeft') {
            const currentPage = document.querySelector('.page.active');
            if (currentPage.id === 'final') {
                navigateTo('memories');
            } else if (currentPage.id === 'memories') {
                navigateTo('home');
            }
        }
    });

    // Log initialization
    console.log('❤️ Apology website loaded successfully!');
});

// ========================================
// Optional: Add Sound Effect (Optional)
// ========================================

/**
 * Optional: Play a subtle sound when transitioning pages
 */
function playTransitionSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 528; // Love frequency 😊
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}