// Birthday Website Interactive Script

// Array of balloon colors
const balloonColors = [
    'bg-pink-400',
    'bg-purple-400', 
    'bg-yellow-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-red-400',
    'bg-indigo-400',
    'bg-orange-400'
];

// Function to create balloon on click
function createBalloon(event) {
    // Only create balloons on greeting page
    if (!window.location.href.includes('greeting.html')) {
        return;
    }
    
    const balloon = document.createElement('div');
    
    // Random color selection
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    
    // Set balloon styles using Tailwind classes
    balloon.className = `balloon ${randomColor} pointer-events-none`;
    
    // Position balloon at click location
    balloon.style.left = (event.clientX - 20) + 'px';
    balloon.style.bottom = '0px';
    
    // Add balloon to body
    document.body.appendChild(balloon);
    
    // Remove balloon after animation completes
    setTimeout(() => {
        if (balloon && balloon.parentNode) {
            balloon.parentNode.removeChild(balloon);
        }
    }, 6000);
    
    // Create sparkle effect at click location
    createSparkleEffect(event.clientX, event.clientY);
}

// Function to create sparkle effect
function createSparkleEffect(x, y) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
            
            sparkle.innerHTML = randomSparkle;
            sparkle.className = 'absolute text-2xl pointer-events-none z-50';
            sparkle.style.left = (x - 12 + Math.random() * 24) + 'px';
            sparkle.style.top = (y - 12 + Math.random() * 24) + 'px';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle && sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 100);
    }
}

// Auto-generate balloons periodically on greeting page
function autoGenerateBalloons() {
    if (window.location.href.includes('greeting.html')) {
        setInterval(() => {
            const fakeEvent = {
                clientX: Math.random() * window.innerWidth,
                clientY: Math.random() * window.innerHeight
            };
            createBalloon(fakeEvent);
        }, 3000); // Create balloon every 3 seconds
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth page transitions
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Start auto balloon generation on greeting page
    autoGenerateBalloons();
    
    // Add touch support for mobile devices
    document.body.addEventListener('touchstart', function(e) {
        if (window.location.href.includes('greeting.html')) {
            e.preventDefault();
            const touch = e.touches[0];
            createBalloon({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    });
    
    // Add keyboard interaction (spacebar to create balloon)
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && window.location.href.includes('greeting.html')) {
            e.preventDefault();
            const fakeEvent = {
                clientX: Math.random() * window.innerWidth,
                clientY: Math.random() * window.innerHeight
            };
            createBalloon(fakeEvent);
        }
    });
});

// Add floating hearts effect for index page
function createFloatingHearts() {
    if (!window.location.href.includes('index.html') && !window.location.href.endsWith('/')) {
        return;
    }
    
    setInterval(() => {
        const heart = document.createElement('div');
        const hearts = ['💖', '💕', '💗', '💜', '🌸', '✨'];
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.innerHTML = randomHeart;
        heart.className = 'absolute text-2xl pointer-events-none animate-bounce opacity-70';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.animation = 'balloonFloat 8s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart && heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }, 4000);
}

// Initialize floating hearts for index page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingHearts);
} else {
    createFloatingHearts();
}

// Handle music autoplay (some browsers block this)
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('audio');
    if (audio) {
        // Try to play, handle if blocked
        audio.play().catch(function(error) {
            console.log('Audio autoplay blocked by browser');
            
            // Add click-to-play functionality
            const playButton = document.createElement('button');
            playButton.innerHTML = '🎵 Putar Musik';
            playButton.className = 'fixed top-4 right-4 bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-full shadow-lg z-50 transition-all duration-300';
            
            playButton.addEventListener('click', function() {
                audio.play();
                playButton.style.display = 'none';
            });
            
            document.body.appendChild(playButton);
        });
    }
});