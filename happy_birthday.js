const welcomeBox = document.getElementById('welcomeBox');
const clickBtn = document.getElementById('clickBtn');
const giftBtn = document.getElementById('giftBtn');
const presentBox = document.getElementById('presentBox');
const messageCard = document.getElementById('messageCard');
const heroCard = document.getElementById('heroCard');
const hangPhoto = document.getElementById('hangPhoto');
const herPhoto = document.getElementById('hangPhoto-her');

const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const resetBtn = document.getElementById('resetBtn');

// Helper function to prevent transition property sticky bugs
function clearTransitions(element) {
    if (element) {
        element.classList.remove('transition-fade-in', 'transition-fade-out');
    }
}

// Photo flip card interaction
document.querySelectorAll('.photo-card').forEach(card => {
    let flipTimer = null;

    card.addEventListener('click', () => {
        const innerCard = card.querySelector('.photo-card-inner');
        if (!innerCard) return;

        const isFlipped = innerCard.classList.toggle('flipped');

        if (flipTimer) {
            clearTimeout(flipTimer);
            flipTimer = null;
        }

        if (isFlipped) {
            flipTimer = setTimeout(() => {
                innerCard.classList.remove('flipped');
            }, 5000);
        }
    });
});

// 1. Initial Welcome Click: Fade out welcomeBox -> Reveal heroCard, presentBox, and hangPhoto
clickBtn.addEventListener('click', () => {
    clearTransitions(welcomeBox);
    welcomeBox.classList.add('transition-fade-out');

    setTimeout(() => {
        welcomeBox.classList.add('hidden');
        clickBtn.classList.add('hidden');
        clearTransitions(welcomeBox);

        heroCard.classList.remove('hidden');
        presentBox.classList.remove('hidden');
        hangPhoto.classList.remove('hidden');

        clearTransitions(heroCard);
        clearTransitions(presentBox);
        clearTransitions(hangPhoto);

        heroCard.classList.add('transition-fade-in');
        presentBox.classList.add('transition-fade-in');
        hangPhoto.classList.add('transition-fade-in');

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFE2E2', '#E0BBE4', '#957DAD', '#FFDFE5']
            });
        }
    });
});

// 2. Gift Box Click: Fade out stage 2 -> Reveal messageCard, herPhoto, Confetti, and Music
giftBtn.addEventListener('click', () => {
    clearTransitions(heroCard);
    clearTransitions(presentBox);
    clearTransitions(hangPhoto);

    heroCard.classList.add('transition-fade-out');
    presentBox.classList.add('transition-fade-out');
    hangPhoto.classList.add('transition-fade-out');

    setTimeout(() => {
        heroCard.classList.add('hidden');
        presentBox.classList.add('hidden');
        hangPhoto.classList.add('hidden');

        clearTransitions(heroCard);
        clearTransitions(presentBox);
        clearTransitions(hangPhoto);

        messageCard.classList.remove('hidden');
        herPhoto.classList.remove('hidden');

        clearTransitions(messageCard);
        clearTransitions(herPhoto);

        messageCard.classList.add('transition-fade-in');
        herPhoto.classList.add('transition-fade-in');

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 250,
                spread: 180,
                startVelocity: 60,
                scalar: 1.2,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#FFE2E2', '#E0BBE4', '#957DAD', '#FFDFE5', '#B9AAFB', '#E8A598']
            });
        }

        if (bgMusic) {
            bgMusic.volume = 0.4;
            bgMusic.play().then(() => {
                if (musicToggle) musicToggle.classList.add('playing');
                if (musicIcon) musicIcon.textContent = '🎵';
            }).catch(() => {
                if (musicIcon) musicIcon.textContent = '🔇';
            });
        }
    });
});

// 3. Reset Button Click: Fade out messageCard & herPhoto -> Reset back to welcomeBox
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        clearTransitions(messageCard);
        clearTransitions(herPhoto);

        messageCard.classList.add('transition-fade-out');
        herPhoto.classList.add('transition-fade-out');

        setTimeout(() => {
            messageCard.classList.add('hidden');
            herPhoto.classList.add('hidden');

            clearTransitions(messageCard);
            clearTransitions(herPhoto);

            welcomeBox.classList.remove('hidden');
            clickBtn.classList.remove('hidden');

            clearTransitions(welcomeBox);
            clearTransitions(clickBtn);

            welcomeBox.classList.add('transition-fade-in');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Page entrance overlay fade-out
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("pageTransition");
    if (overlay) {
        overlay.classList.add("fade-out");
    }
});

// Floating music toggle handler
if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
            if (musicIcon) musicIcon.textContent = '🎵';
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            if (musicIcon) musicIcon.textContent = '🔇';
        }
    });
}

// Randomize photo lists on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
    const naturePhotos = [
        "./images/cottton-candy.jpeg",
        "./images/lavender.jpeg",
        "./images/tulip.jpeg",
        "./images/lunar.jpeg"
    ];

    const herPhotos = [
        { 
            src: "./images/KantKaw-1.png", 
            position: "top center",
            text: "20.2.2023 (Monday) <br> The last day I could see your smile."
        },
        { 
            src: "./images/KantKaw-2.png", 
            position: "top center",
            text: "20.2.2023 (Monday) <br> Those smiles which I can never forget."
        },
        { 
            src: "./images/KantKaw-3.png", 
            position: "top center",
            text: "7.2.2023 (Tuesday) <br> The last day you were beside me."
        },
        { 
            src: "./images/KantKaw-4.png", 
            position: "0% 20%",
            text: "7.2.2023 (Tuesday) <br> The last Tuesday that lived in my heart."
        },
        { 
            src: "./images/KantKaw4k.png", 
            position: "50% 20%",
            text: "7.2.2023 (Tuesday) <br> The last day I could freely talk with you."
        }
    ];

    const hangPhotoContainer = document.getElementById("hangPhoto");
    if (hangPhotoContainer) {
        const shuffledNature = [...naturePhotos].sort(() => 0.5 - Math.random());
        const natureImgs = hangPhotoContainer.querySelectorAll("img");
        natureImgs.forEach((img, index) => {
            if (shuffledNature[index]) {
                img.src = shuffledNature[index];
            }
        });
    }

    const herPhotoContainer = document.getElementById("hangPhoto-her");
    if (herPhotoContainer) {
        const shuffledHer = [...herPhotos].sort(() => 0.5 - Math.random());
        const herCards = herPhotoContainer.querySelectorAll(".photo-card-inner");

        herCards.forEach((card, index) => {
            if (shuffledHer[index]) {
                const img = card.querySelector(".photo-card-front img");
                const backText = card.querySelector(".photo-card-back .photo-back-text");

                if (img) {
                    img.src = shuffledHer[index].src;
                    img.style.objectFit = "cover";
                    img.style.objectPosition = shuffledHer[index].position;
                }
                if (backText) {
                    backText.innerHTML = shuffledHer[index].text;
                }
            }
        });
    }
});