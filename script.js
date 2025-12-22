// ===========================
// AUDIO SETUP
// ===========================
const audio = document.getElementById('bg-audio');
const playButton = document.getElementById('play-audio');

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
function startLeafAnimation(maxLeaves = 30, interval = 600) {
    setInterval(() => {
        if (leafContainer.children.length < maxLeaves) {
            createLeaf();
        }
    }, interval);
}

// ===========================
// PLAY BUTTON CLICK EVENT
// ===========================
playButton.addEventListener('click', () => {
    audio.volume = 0.3;
    audio.play();
    playButton.style.display = 'none'; // hide button after click
    startLeafAnimation(10, 800); // start leaf animation with 10 max leaves
});