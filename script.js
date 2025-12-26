const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===========================
// FADE TRANSITION NAVIGATION
// ===========================

// Create overlay for fade effect
const fadeOverlay = document.createElement('div');
fadeOverlay.style.position = 'fixed';
fadeOverlay.style.top = '0';
fadeOverlay.style.left = '0';
fadeOverlay.style.width = '100%';
fadeOverlay.style.height = '100%';
fadeOverlay.style.backgroundColor = 'black';
fadeOverlay.style.opacity = '0';
fadeOverlay.style.pointerEvents = 'none';
fadeOverlay.style.transition = 'opacity 0.5s ease';
fadeOverlay.style.zIndex = '2000';
document.body.appendChild(fadeOverlay);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default jump

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Start fade out
        fadeOverlay.style.opacity = '1';
        fadeOverlay.style.pointerEvents = 'all';

        setTimeout(() => {
            // Scroll to the section after fade out
            targetSection.scrollIntoView({ behavior: 'instant', block: 'start' });

            // Fade back in
            fadeOverlay.style.opacity = '0';
            fadeOverlay.style.pointerEvents = 'none';
        }, 500); // match transition duration
    });
});

// ===========================
// AUDIO SETUP
// ===========================
const audio = document.getElementById('bg-audio');
const playButton = document.getElementById('play-audio');

let leafAnimationStarted = false;

// ===========================
// LEAF CONTAINER SETUP
// ===========================
const leafContainer = document.createElement('div');
leafContainer.id = 'leaf-container';
leafContainer.style.position = 'fixed';
leafContainer.style.top = '0';
leafContainer.style.left = '0';
leafContainer.style.width = '100%';
leafContainer.style.height = '100%';
leafContainer.style.pointerEvents = 'none';
leafContainer.style.overflow = 'hidden';
leafContainer.style.zIndex = '500';
document.body.appendChild(leafContainer);

// ===========================
// FUNCTION: CREATE SINGLE LEAF
// ===========================
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.textContent = '𝄞'; // You can change this to any leaf emoji or image
    leaf.style.position = 'absolute';
    leaf.style.fontSize = `${Math.random() * 20 + 20}px`; // 20px to 40px
    leaf.style.left = `${Math.random() * window.innerWidth}px`;
    leaf.style.top = '-50px';
    leaf.style.opacity = Math.random() * 0.5 + 0.5;
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Animate leaf falling
    const duration = Math.random() * 5 + 5; // 5s to 10s
    leaf.animate(
        [
            { transform: `translateY(0px) rotate(0deg)`, opacity: leaf.style.opacity },
            { transform: `translateY(${window.innerHeight + 50}px) rotate(360deg)`, opacity: 0.8 }
        ],
        { duration: duration * 1000, iterations: 1 }
    );

    // Remove leaf after animation
    setTimeout(() => leaf.remove(), duration * 1000);
    leafContainer.appendChild(leaf);
}

// ===========================
// FUNCTION: START LEAF ANIMATION
// ===========================
function startLeafAnimation(maxLeaves = 50, interval = 600) {
    setInterval(() => {
        if (leafContainer.children.length < maxLeaves) {
            createLeaf();
        }
    }, interval);
}

// ===========================
// PLAY/PAUSE BUTTON TOGGLE
// ===========================
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.volume = 0.3;
        audio.play();
        playButton.textContent = '⏸ Pause Music';

        // Start leaf animation only once
        if (!leafAnimationStarted) {
            startLeafAnimation(50, 600);
            leafAnimationStarted = true;
        }
    } else {
        audio.pause();
        playButton.textContent = '▶ Play Music';
    }
});