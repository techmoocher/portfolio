/******
    _              _                                _ 
   | |            | |                              | |
 __| |___ ___  ___| |__  __ _ ___   ___   ___   ___| |__   ___  _ __
|__   __ / _ \/ __|  _ \|  _ ‘ _ \ / _ \ / _ \ / __|  _ \ / _ \/  __\
   | |_ |  __/ (__| | | | | | | | | (_) | (_) | (__| | | |  __/| |
   \_ _ /\___/\___|_| |_|_| |_| |_|\___/ \___/ \___|_| |_|\___/|_|

******/


let isMusicEnabled = false;
let musicPlayerInitialized = false;
let songModalEventsBound = false;
let devicePreference = null;
let launchOverlayTimeout = null;
let launchOverlayHideTimeout = null;

const projectsData = {
    "homelab": {
        title: "Homelab",
        overview: "Self-hosted cloud infrastructure hosting services for my family.",
        description: "I designed the homelab to help my family save money from cloud service subscriptions. The server is mainly made up of Dockerized services running on energy-efficient hardware. Moreover, I created scripts to automate system maintenance (updates, health check). Currently, I'm integrating AI agents to streamline system administration using n8n.",
        liveUrl: "https://www.youtube.com/watch?v=UzMPf7gWfvw",
        githubUrl: "https://github.com/techmoocher/homelab",
        images: [
            { src: "assets/images/projects/homelab/homelab.jpg", alt: "My homelab setup" },
            { src: "assets/images/projects/homelab/glance-dashboard.png", alt: "Glance Dashboard for basic system monitor"}
        ],
        features: [
            "Docker Compose stacks orchestrate media, storage, and collaboration apps with one command.",
            "Traefik reverse proxy secures services behind automatic HTTPS and identity-aware access.",
            "Grafana and Prometheus dashboards track uptime, resource usage, and backup health."
        ],
        challenges: [
            {
                title: "Reliable uptime on hobby hardware",
                challenge: "Running 24/7 services on single-board computers and recycled laptops risked thermal throttling and drive failures.",
                solution: "Added health checks, smartctl monitoring, and nightly rsync snapshots to a ZFS pool so components can be swapped without data loss."
            },
            {
                title: "Private access without exposing ports",
                challenge: "Residential internet lacks static IPs and makes port forwarding unreliable.",
                solution: "Tunneled ingress through Cloudflare and automated dynamic DNS updates, keeping everything reachable without opening raw ports."
            }
        ],
        impacts: [
            "Hosts photo backups, password vaults, and media streaming for the family in one place.",
            "Eliminated recurring SaaS fees for five subscription services.",
            "Provided a safe sandbox for experimenting with DevOps tooling and incident response lessons."
        ],
        techStack: ["Proxmox", "Docker", "Cloudflare Tunnel", "Grafana", "Prometheus", "Python", "Bash", "Torrent"]
    },

    "Karu-the-Fox": {
        title: "Karu the Fox",
        overview: "An interactive desktop companion that brings micro-breaks into long and hardworking days.",
        description: "The project focuses on playful animations and lightweight interactions so classmates can keep a friendly, unobtrusive pet on their screens. I refined sprite timing and mood logic so the character feels responsive without stealing attention.",
        liveUrl: "https://www.youtube.com/watch?v=LDVFWf0XFPM",
        githubUrl: "https://github.com/techmoocher/Karu-the-Fox",
        images: [
            { src: "assets/images/projects/Karu-the-Fox/techmoocher.png", alt: "Karu the Fox mascot" },
            { src: "assets/images/projects/Karu-the-Fox/preview-1.png", alt: "Karu the Fox demo (1)" },
            { src: "assets/images/projects/Karu-the-Fox/preview-2.png", alt: "Karu the Fox demo (2)" },
        ],
        features: [
            "Animation engine with idle, sleep, surprise, and celebration states.",
            "Customizable hotkeys to feed, move, or calm the companion from anywhere on the desktop.",
            "Mood tracker that nudges users to stretch or hydrate after long focus streaks."
        ],
        challenges: [
            {
                title: "Smooth animation without burning CPU",
                challenge: "Early prototypes relied on dense interval timers that spiked CPU usage during long running sessions.",
                solution: "Rebuilt the loop with requestAnimationFrame-style timing utilities so frames align with the display refresh and idle gracefully."
            },
            {
                title: "Keeping the pet out of the way",
                challenge: "Users wanted a visible companion but not one that blocked UI components or grabbed focus unexpectedly.",
                solution: "Added smart positioning rules, transparency controls, and pointer-through regions that keep clicks on the underlying window."
            }
        ],
        impacts: [
            "Gave friends an easy way to lighten intense study sessions with playful feedback.",
            "Sparked design discussions about balancing delight and productivity in desktop tools.",
            "Showcased polish in presentation demos thanks to the character driven UI."
        ],
        techStack: ["Python", "PyQt6", "Gemini API"]
    },

    "will-you-date-me": {
        title: "Will you date me?",
        overview: "Interactive microsite that playfully invited my crush on a date while teaching me front-end fundamentals.",
        description: "This was my first HTML/CSS/JS build, so I leaned into fun animations and charming copy. The page guides visitors through a series of prompts, gradually revealing the invite with delightful micro-interactions.",
        liveUrl: "https://for-her.techmoocher.com/will-you-date-me",
        githubUrl: "https://github.com/techmoocher/will-you-date-me",
        images: [
            { src: "assets/images/projects/will-you-date-me/ask-her-out.PNG", alt: "Will you date me landing page screenshot" }
        ],
        features: [
            "Responsive layout that adapts the invitation experience from phones to desktops.",
            "Playful button animations that encourage the user to say yes (and make it hard to say no).",
            "Custom illustration and typography inspired by handwritten notes."
        ],
        challenges: [
            {
                title: "Making the experience feel personal",
                challenge: "Static text felt cold and generic for something as personal as an invitation.",
                solution: "Scripted branching copy, emoji, and subtle CSS animations so every interaction feels handcrafted."
            },
            {
                title: "Keeping the UI responsive for the big reveal",
                challenge: "My first attempts used fixed positioning that broke on small screens.",
                solution: "Refactored to flexbox and relative units, then tested across devices until the layout held up."
            }
        ],
        impacts: [
            "Successfully asked someone out and captured the story in code.",
            "Kick-started my love for front-end development with immediate feedback.",
            "Motivated friends to learn the basics of HTML/CSS to build their own fun projects."
        ],
        techStack: ["HTML", "CSS", "JavaScript", "EmailJS"]
    },

    "chuoi-man-coi": {
        title: "Chuoi Man Coi",
        overview: "Interactive rosary web app that guides students through each mystery with visuals, audio, and progress cues.",
        description: "Built for my Binh Hung church students, the app combines catechesis with modern UX. Learners can track prayers, read reflections, and follow along even if they are new to the rosary.",
        liveUrl: "https://chuoi-man-coi.techmoocher.com",
        githubUrl: "https://github.com/techmoocher/Chuoi-Man-Coi",
        images: [
            { src: "assets/images/projects/Chuoi-Man-Coi/Chuoi-Man-Coi.png", alt: "Chuoi Man Coi logo" },
            { src: "assets/images/projects/Chuoi-Man-Coi/demo.jpg", alt: "Chuoi Man Coi demo" },
        ],
        features: [
            "Step-by-step rosary guide with visuals, current mystery context, and gentle audio cues.",
            "Localized content for students with notes, prayers, and progress tracking.",
            "Mobile-first interface so catechists can lead prayers directly from their phones."
        ],
        challenges: [
            {
                title: "Designing for all ages",
                challenge: "Young students needed simple affordances while catechists requested deeper explanations.",
                solution: "Introduced dual layers—concise prompts on the main screen with expandable cards for additional context."
            },
            {
                title: "Reliability in low-connectivity environments",
                challenge: "Parish halls do not always have strong Wi-Fi, so the app had to degrade gracefully.",
                solution: "Optimized assets, cached the liturgical content, and preloaded audio snippets so sessions continue offline."
            }
        ],
        impacts: [
            "Helped students memorize and appreciate the rosary structure faster.",
            "Enabled catechists to run interactive sessions without flipping through booklets.",
            "Sparked interest from nearby parishes that now reuse the content."
        ],
        techStack: ["HTML", "CSS", "JavaScript"]
    },

    "hyprland-dotfiles": {
        title: "Hyprland Dotfiles",
        overview: "Interactive rosary web app that guides students through each mystery with visuals, audio, and progress cues.",
        description: "Built for my Binh Hung church students, the app combines catechesis with modern UX. Learners can track prayers, read reflections, and follow along even if they are new to the rosary.",
        liveUrl: "https://chuoi-man-coi.techmoocher.com",
        githubUrl: "https://github.com/techmoocher/Chuoi-Man-Coi",
        images: [
            { src: "assets/images/projects/Chuoi-Man-Coi/Chuoi-Man-Coi.png", alt: "Chuoi Man Coi prayer screen" }
        ],
        features: [
            "Step-by-step rosary guide with visuals, current mystery context, and gentle audio cues.",
            "Localized content for students with notes, prayers, and progress tracking.",
            "Mobile-first interface so catechists can lead prayers directly from their phones."
        ],
        challenges: [
            {
                title: "Designing for all ages",
                challenge: "Young students needed simple affordances while catechists requested deeper explanations.",
                solution: "Introduced dual layers—concise prompts on the main screen with expandable cards for additional context."
            },
            {
                title: "Reliability in low-connectivity environments",
                challenge: "Parish halls do not always have strong Wi-Fi, so the app had to degrade gracefully.",
                solution: "Optimized assets, cached the liturgical content, and preloaded audio snippets so sessions continue offline."
            }
        ],
        impacts: [
            "Helped students memorize and appreciate the rosary structure faster.",
            "Enabled catechists to run interactive sessions without flipping through booklets.",
            "Sparked interest from nearby parishes that now reuse the content."
        ],
        techStack: ["HTML", "CSS", "JavaScript"]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createShootingStars();
    addIntermittentBlinkingStars();
    updateDateTime();
    // initCalendarWidget();

    setInterval(updateDateTime, 1000);

    const bioIcon = document.getElementById('bio-icon');
    const bioModal = document.getElementById('bio-modal');
    const miscIcon = document.getElementById('miscellaneous-icon');
    const miscModal = document.getElementById('miscellaneous-modal');
    const galleryIcon = document.getElementById('gallery-icon');
    const galleryModal = document.getElementById('gallery-modal');
    const projectsIcon = document.getElementById('projects-icon');
    const projectsModal = document.getElementById('projects-modal');
    
    setupModal(bioIcon, bioModal);

    const showPhotoBtn = document.getElementById('show-photo-btn');
    const photoModal = document.getElementById('photo-modal');
    if (showPhotoBtn && photoModal) {
        showPhotoBtn.addEventListener('click', () => {
            photoModal.classList.add('visible');
        });
        const closeBtn = photoModal.querySelector('.close-button');
        closeBtn.addEventListener('click', () => {
            photoModal.classList.remove('visible');
        });
        photoModal.addEventListener('click', (event) => {
            if (event.target === photoModal) {
                photoModal.classList.remove('visible');
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && photoModal.classList.contains('visible')) {
                photoModal.classList.remove('visible');
            }
        });
    }

    setupModal(miscIcon, miscModal);
    // setupModal(galleryIcon, galleryModal);
    setupModal(projectsIcon, projectsModal);
    
    if (miscIcon) {
        miscIcon.addEventListener('click', initImageCarousel);
    }

    initializeProjectTiles();

    document.querySelectorAll('.folder-item').forEach(folder => {
        folder.addEventListener('click', () => {
            const folderName = folder.getAttribute('data-folder');
            openGalleryFolder(folderName);
        });
    });

    initTypingAnimation();

    const contactWidget = document.getElementById('contact-widget');
    const contactCard = document.getElementById('contact-card');
    const closeContact = document.querySelector('.close-contact');
    
    contactWidget.addEventListener('click', () => {
        contactCard.classList.toggle('visible');
    });
    
    closeContact.addEventListener('click', () => {
        contactCard.classList.remove('visible');
    });

    document.querySelectorAll('.widget-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('active');

            console.log('Icon state toggled. Now show/hide the card.');
        });
    });
    
    document.addEventListener('click', (event) => {
        if (!contactCard.contains(event.target) && 
            !contactWidget.contains(event.target) && 
            contactCard.classList.contains('visible')) {
            contactCard.classList.remove('visible');
        }
    });

    initContactCopy();

    const musicWidget = document.getElementById('music-widget');
    const libraryBtn = document.getElementById('library-btn');
    const songListModal = document.getElementById('song-list-modal');

    window.songListModal = songListModal;

    if (musicWidget) {
        musicWidget.addEventListener('click', () => {
            openSongLibrary();
        });
    }

    if (libraryBtn) {
        libraryBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            openSongLibrary();
        });
    }

    const fox = document.querySelector('.fox');
    let foxAnimationInProgress = false;
    
    fox.addEventListener('click', function() {
        if (foxAnimationInProgress) return;
        
        foxAnimationInProgress = true;
        const foxImg = fox;
        
        foxImg.src = 'assets/images/fox/fox-shock-left.png';
        
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-post-trauma-left-1.png';
        }, 300);
        
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-post-trauma-left-2.png';
        }, 600);
        
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-idle-left.png';
        }, 1400);
        
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-sleeping.gif';
            foxAnimationInProgress = false;
        }, 2400);
    });

    setupFakeCursor();

    initializeDeviceSelection();
});

function setupModal(iconElement, modalElement) {
    if (!iconElement || !modalElement) {
        return;
    }

    const closeButton = modalElement.querySelector('.close-button');
    if (!closeButton) {
        return;
    }
    
    iconElement.addEventListener('click', () => {
        modalElement.classList.add('visible');
    });
    
    const hideModal = () => {
        modalElement.classList.remove('visible');
    };
    
    closeButton.addEventListener('click', hideModal);
    modalElement.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            hideModal();
        }
    });
    
    const escHandler = (event) => {
        if (event.key === 'Escape' && modalElement.classList.contains('visible')) {
            const projectDetailOverlay = document.querySelector('.project-detail-overlay.visible');
            if (projectDetailOverlay) {
                return;
            }
            hideModal();
        }
    };
    
    document.addEventListener('keydown', escHandler);
}

function initContactCopy() {
    const values = document.querySelectorAll('.contact-value');
    values.forEach(valueSpan => {
        const value = valueSpan.textContent.trim();
        if (!value) {
            return;
        }

        const triggerCopy = (event) => {
            event.stopPropagation();
            copyToClipboard(value);
        };

        valueSpan.addEventListener('click', triggerCopy);
        valueSpan.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                triggerCopy(event);
            }
        });
    });
}

function copyToClipboard(text) {
    if (!text) {
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => showCopyToast('Copied to clipboard'))
        .catch(() => showCopyToast('Copy failed'));
}

function showCopyToast(message) {
    const existing = document.querySelector('.copy-toast');
    if (existing) {
        existing.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('visible');
    });

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
        }, 250);
    }, 2500);
}

function initializeProjectTiles() {
    const tiles = document.querySelectorAll('.project-tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const projectId = tile.dataset.projectId;
            openProjectDetails(projectId);
        });

        tile.querySelectorAll('.project-action').forEach(action => {
            action.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    });
}

function initImageCarousel() {
    const images = [
        { src: 'assets/images/misc/my-zoo.png', caption: 'tech zoo' },
        { src: 'assets/images/misc/arghhh.jpg', caption: 'arghhhhhhh!!!' },
        { src: 'assets/images/misc/home.jpg', caption: 'coding vibe 👨‍💻' },
        { src: 'assets/images/misc/old-thingy.jpg', caption: 'didn\'t know what this is at first glance, am I too young?' },
        { src: 'assets/images/misc/with-her.png', caption: 'with her 🥰' },
        { src: 'assets/images/misc/thinkpad-collection.jpg', caption: '3 ThinkPads (and still counting).' },
        { src: 'assets/images/misc/hkico-2025-with-hphong.jpg', caption: 'HKICO 2025 with fav friend.' },
        { src: 'assets/images/misc/piano.jpg', caption: '🎹🎼🎶' },
        { src: 'assets/images/misc/labour.jpg', caption: '😅😵‍💫' },
        { src: 'assets/images/misc/statue-of-liberty.jpg', caption: '🗽' },
        { src: 'assets/images/misc/gambling.jpg', caption: 'Wanna do some blackjack? ♠️♦️' },
        { src: 'assets/images/misc/church-moments/im-the-pope.jpg', caption: 'I\'m the Pope! (hehe)' },
        { src: 'assets/images/misc/church-moments/secret-meeting.jpg', caption: 'Shhh...This is a secret meeting!' },
        { src: 'assets/images/misc/church-moments/singing.jpg', caption: '🎤🎶' },
        { src: 'assets/images/misc/church-moments/santa.jpg', caption: 'Ho Ho Ho! 🎅' },
        { src: 'assets/images/misc/camp-moments/cit-25.jpg', caption: 'CIT 2025!!! 🔥🕯️' },
        { src: 'assets/images/misc/camp-moments/hehe.jpg', caption: '😂😂😂' },
        { src: 'assets/images/misc/camp-moments/with-ignacio-and-javier.jpg', caption: 'best mirror selfie ever 😎'},
        { src: 'assets/images/misc/camp-moments/shark-tank.jpg', caption: 'Shark Tank 🦈💼' },
    ];
    
    const carouselInner = document.querySelector('.carousel-inner');
    const captionElement = document.querySelector('.carousel-caption');
    const currentPhotoElement = document.getElementById('current-photo');
    const totalPhotosElement = document.getElementById('total-photos');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    totalPhotosElement.textContent = images.length;
    
    carouselInner.innerHTML = '';
    
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) item.classList.add('active');
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        
        item.appendChild(img);
        carouselInner.appendChild(item);
    });
    
    if (images.length > 0) {
        captionElement.textContent = images[0].caption;
    }
    
    let currentIndex = 0;
    let rotationInterval;
    
    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => item.classList.remove('active'));
        
        items[currentIndex].classList.add('active');
        
        captionElement.textContent = images[currentIndex].caption;
        currentPhotoElement.textContent = currentIndex + 1;
    }
    
    function rotateImages() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        clearInterval(rotationInterval);
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
        startRotation();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(rotationInterval);
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
        startRotation();
    });
    
    function startRotation() {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(rotateImages, 8000);
    }

    startRotation();
}

function updateDateTime() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    document.getElementById('datetime').textContent = `${dateString} @ ${timeString}`;
}

function createStars() {
    const nightSky = document.querySelector('.night-sky');

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const sizeClass = Math.random() < 0.6 ? 'small' : (Math.random() < 0.8 ? 'medium' : 'large');
        star.classList.add(sizeClass);
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
        const colors = ['#ffffff', '#fffae0', '#FFE87C', '#e0e8ff', '#e0f0ff', '#d1d1ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = randomColor;
        
        const baseOpacity = Math.random() * 0.5 + 0.3;
        star.style.opacity = baseOpacity;
        
        if (Math.random() > 0.7) {
            star.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px ${randomColor}`;
        }
        
        if (Math.random() > 0.5) {
            star.classList.add('blink');
            
            const duration = 2 + Math.random() * 6;
            const delay = Math.random() * 7;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
        } else {
            const duration = 3 + Math.random() * 4;
            star.style.animation = `twinkle ${duration}s infinite ${Math.random() * 5}s`;
        }
        
        nightSky.appendChild(star);
    }
    
    setInterval(() => {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            if (Math.random() > 0.95) {
                star.style.opacity = Math.random() * 0.5 + 0.3;
            }
        });
    }, 3000);
}

function createShootingStars() {
    const nightSky = document.querySelector('.night-sky');

    const existingStars = document.querySelectorAll('.shooting-star');
    existingStars.forEach(star => star.remove());

    for (let i = 0; i < 6; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        const width = Math.random() * 150 + 50;
        shootingStar.style.width = `${width}px`;
        
        const startX = Math.random() * -100;
        const startY = Math.random() * window.innerHeight;
        
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        
        const delay = Math.random() * 15;
        const duration = Math.random() * 2 + 2;
        
        shootingStar.style.animationDelay = `${delay}s`;
        shootingStar.style.animationDuration = `${duration}s`;
        
        nightSky.appendChild(shootingStar);
    }
    
    setTimeout(() => {
        createShootingStars();
    }, 8000);
}

function addIntermittentBlinkingStars() {
    const nightSky = document.querySelector('.night-sky');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const brightStar = document.createElement('div');
            brightStar.classList.add('star', 'large');
            
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            brightStar.style.left = `${posX}%`;
            brightStar.style.top = `${posY}%`;
            brightStar.style.backgroundColor = '#ffffff';
            brightStar.style.boxShadow = '0 0 8px 2px rgba(255, 255, 255, 0.8)';
            
            nightSky.appendChild(brightStar);
            
            setTimeout(() => {
                brightStar.style.animation = 'blink 1s 3';
                setTimeout(() => {
                    brightStar.remove();
                }, 3000);
            }, 100);
        }
    }, 2000);
}

function initTypingAnimation() {
    if (devicePreference === 'mobile' || document.body.getAttribute('data-device-mode') === 'mobile') {
        toggleTypingVisibility('mobile');
        return;
    }

    const textElement = document.getElementById('typing-text');
    const plainText = "Welcome to ";
    const highlightText = "techmoocher's portfolio";
    const exclamation = "!";
    
    const fullText = plainText + highlightText + exclamation;
    const fullHtml = `${plainText}<span class="tech-highlight">${highlightText}</span>${exclamation}`;
    
    let index = 0;
    let isTyping = true;
    let typingSpeed = 90;
    let erasingSpeed = 30;
    let pauseTime = 1500;
    
    function updateText() {
        if (isTyping) {
            index++;
            
            if (index <= plainText.length) {
                textElement.innerHTML = fullText.substring(0, index);
            }
            else if (index <= plainText.length + highlightText.length) {
                const highlightPart = highlightText.substring(0, index - plainText.length);
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightPart}</span>`;
            }
            else {
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightText}</span>${fullText.substring(plainText.length + highlightText.length, index)}`;
            }
            
            if (index >= fullText.length) {
                isTyping = false;
                setTimeout(updateText, pauseTime);
                return;
            }
            
            setTimeout(updateText, typingSpeed);
        } else {
            index--;
            
            if (index > plainText.length + highlightText.length) {
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightText}</span>${fullText.substring(plainText.length + highlightText.length, index)}`;
            }
            else if (index > plainText.length) {
                const highlightPart = highlightText.substring(0, index - plainText.length);
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightPart}</span>`;
            }
            else {
                textElement.innerHTML = fullText.substring(0, index);
            }
            
            if (index === 0) {
                isTyping = true;
                setTimeout(updateText, pauseTime);
                return;
            }
            
            setTimeout(updateText, erasingSpeed);
        }
    }
    
    setTimeout(updateText, pauseTime);
}

function toggleTypingVisibility(mode) {
    const typingContainer = document.querySelector('.typing-container');
    if (!typingContainer) {
        return;
    }

    if (mode === 'mobile') {
        typingContainer.classList.add('typing-hidden');
    } else {
        typingContainer.classList.remove('typing-hidden');
    }
}

function setupFakeCursor() {
    const fakeCursor = document.createElement('div');
    fakeCursor.classList.add('fake-cursor');
    document.body.appendChild(fakeCursor);

    const fox = document.querySelector('.fox');
    const foxRect = fox.getBoundingClientRect();
    
    function showCursorHint() {
        const updatedFoxRect = fox.getBoundingClientRect();
        
        const cursorX = updatedFoxRect.left + updatedFoxRect.width * 0.6;
        const cursorY = updatedFoxRect.top + updatedFoxRect.height * 0.4;
        
        fakeCursor.style.left = `${cursorX}px`;
        fakeCursor.style.top = `${cursorY}px`;
        
        fakeCursor.classList.add('visible');
        
        setTimeout(() => {
            fakeCursor.classList.add('clicking');
            
            setTimeout(() => {
                fakeCursor.classList.remove('clicking');
                
                setTimeout(() => {
                    fakeCursor.classList.remove('visible');
                }, 1000);
            }, 300);
        }, 800);
    }
    
    setInterval(showCursorHint, 10000);
    
    setTimeout(showCursorHint, 5000);
}

function initMusicPlayer() {
    const audioPlayer = document.getElementById('audio-player');
    const coverArt = document.getElementById('cover-art');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeContainer = document.querySelector('.volume-container');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeProgress = document.querySelector('.volume-progress');
    const volumeHandle = document.querySelector('.volume-handle');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    
    // Music library
    const songs = [
        { title: 'Interstellar Main Theme', artist: 'Hans Zimmer' },
        { title: 'Nang Tho', artist: 'Hoang Dung' },
        { title: 'Perfect', artist: 'Ed Sheeran' },
        { title: 'Someone You Loved', artist: 'Lewis Capaldi' },
        { title: 'Something Just Like This', artist: 'The Chainsmokers & Coldplay' },
        { title: 'Welcome to America', artist: 'Lecrae' },
        { title: 'Your Way\'s Better', artist: 'Forrest Frank' },
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffle = true;
    let playedSongs = [];
    let isDraggingVolume = false;
    
    window.songs = songs;
    window.currentSongIndex = currentSongIndex;
    window.tryLoadImage = tryLoadImage;
    window.songListModal = document.getElementById('song-list-modal');
    
    function initPlayer() {
        // Start with a random song
        currentSongIndex = Math.floor(Math.random() * songs.length);
        playedSongs.push(currentSongIndex);
        
        window.currentSongIndex = currentSongIndex;
        
        loadSong(songs[currentSongIndex]);
        
        audioPlayer.volume = 1.0;
        updateVolumeUI();
        
        shuffleBtn.classList.add('active');
        
        // Don't autoplay - user must click play button
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.title = "Play";
        isPlaying = false;
    }
    
    function loadSong(song) {
        const folderName = song.title.replace(/\s+/g, '-').replace(/'/g, '');
        const fileName = `${song.title.replace(/\s+/g, '-').replace(/'/g, '')}_${song.artist.replace(/\s+/g, '-').replace(/'/g, '')}.mp3`;
        
        const basePath = `assets/music/${folderName}`;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        
        audioPlayer.src = `${basePath}/${fileName}`;
        
        tryLoadImage(`${basePath}/thumbnail.jpg`)
            .catch(() => tryLoadImage(`${basePath}/thumbnail.png`))
            .catch(() => tryLoadImage(`${basePath}/thumbnail.jpeg`))
            .catch(() => coverArt.src = 'assets/images/techmoocher.png')
            .then(src => {
                if (src) coverArt.src = src;
            });

        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        if (isPlaying) {
            playBtn.title = "Pause";
        } else {
            playBtn.title = "Play";
        }
    }

    function tryLoadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject();
            img.src = src;
        });
    }
    
    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.title = "Pause";
            isPlaying = true;
        } else {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.title = "Play";
            isPlaying = false;
        }
    }

    function nextSong() {
        if (isShuffle) {
            if (playedSongs.length >= songs.length) {
                playedSongs = [];
            }
            
            const unplayedSongs = songs.filter((song, index) => !playedSongs.includes(index));
            
            if (unplayedSongs.length > 0) {
                const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
                const nextSongIndex = songs.findIndex((song, i) => 
                    song.title === unplayedSongs[randomIndex].title && 
                    song.artist === unplayedSongs[randomIndex].artist
                );
                
                currentSongIndex = nextSongIndex;
                playedSongs.push(currentSongIndex);
            } else {
                currentSongIndex = Math.floor(Math.random() * songs.length);
                playedSongs = [currentSongIndex];
            }
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            audioPlayer.play().then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
        }
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        if (isPlaying) {
            audioPlayer.play().then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
        }
    }

    function toggleShuffle() {
        isShuffle = !isShuffle;
        if (isShuffle) {
            shuffleBtn.classList.add('active');
            shuffleBtn.title = "Shuffle: On";
        } else {
            shuffleBtn.classList.remove('active');
            shuffleBtn.title = "Shuffle: Off";
        }
    }

    function toggleVolumeControls() {
        if (audioPlayer.volume > 0) {
            volumeBtn.dataset.previousVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
        } else {
            const previousVolume = parseFloat(volumeBtn.dataset.previousVolume) || 1.0;
            audioPlayer.volume = previousVolume;
        }
        updateVolumeUI();
    }
    
    function updateVolumeUI() {
        volumeProgress.style.width = `${audioPlayer.volume * 100}%`;
        volumeHandle.style.left = `${audioPlayer.volume * 100}%`;

        if (audioPlayer.volume > 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeBtn.title = "Volume: High";
        } else if (audioPlayer.volume > 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
            volumeBtn.title = "Volume: Low";
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeBtn.title = "Volume: Mute";
        }
    }

    function setVolume(e) {
        const rect = volumeSlider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        let volumePercent = clickX / rect.width;
        
        volumePercent = Math.max(0, Math.min(1, volumePercent));
        audioPlayer.volume = volumePercent;
        
        updateVolumeUI();
    }
    
    function startVolumeHandleDrag(e) {
        e.preventDefault();
        isDraggingVolume = true;
        volumeHandle.classList.add('active');
        volumeContainer.classList.add('active');

        document.addEventListener('mousemove', handleVolumeDrag);
        document.addEventListener('touchmove', handleVolumeDrag, { passive: false });
        document.addEventListener('mouseup', stopVolumeHandleDrag);
        document.addEventListener('touchend', stopVolumeHandleDrag);
    }

    // Handle volume dragging
    function handleVolumeDrag(e) {
        if (isDraggingVolume) {
            const clientX = e.type.includes('touch') ? 
                e.touches[0].clientX : e.clientX;
            
            const rect = volumeSlider.getBoundingClientRect();
            const dragX = clientX - rect.left;
            let volumePercent = dragX / rect.width;
            
            volumePercent = Math.max(0, Math.min(1, volumePercent));
            audioPlayer.volume = volumePercent;
            
            updateVolumeUI();
            
            if (e.cancelable) e.preventDefault();
        }
    }
    
    function stopVolumeHandleDrag() {
        isDraggingVolume = false;
        volumeHandle.classList.remove('active');

        document.removeEventListener('mousemove', handleVolumeDrag);
        document.removeEventListener('touchmove', handleVolumeDrag);
        document.removeEventListener('mouseup', stopVolumeHandleDrag);
        document.removeEventListener('touchend', stopVolumeHandleDrag);
        
        setTimeout(() => {
            if (!volumeContainer.matches(':hover')) {
                volumeContainer.classList.remove('active');
            }
        }, 1500);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setProgress(e) {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }

    function updateProgress() {
        const { duration, currentTime } = audioPlayer;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }
    }

    function startVolumeHandleDrag(e) {
        e.preventDefault();
        isDraggingVolume = true;
        volumeHandle.classList.add('active');
        volumeContainer.classList.add('active');
        
        document.addEventListener('mousemove', handleVolumeDrag);
        document.addEventListener('touchmove', handleVolumeDrag, { passive: false });
        document.addEventListener('mouseup', stopVolumeHandleDrag);
        document.addEventListener('touchend', stopVolumeHandleDrag);
    }

    function handleVolumeDrag(e) {
        if (isDraggingVolume) {
            const clientX = e.type.includes('touch') ? 
                e.touches[0].clientX : e.clientX;
            
            const rect = volumeSlider.getBoundingClientRect();
            const dragX = clientX - rect.left;
            let volumePercent = dragX / rect.width;
            
            volumePercent = Math.max(0, Math.min(1, volumePercent));
            audioPlayer.volume = volumePercent;
            
            updateVolumeUI();
            
            if (e.cancelable) e.preventDefault();
        }
    }

    function stopVolumeHandleDrag() {
        isDraggingVolume = false;
        volumeHandle.classList.remove('active');

        document.removeEventListener('mousemove', handleVolumeDrag);
        document.removeEventListener('touchmove', handleVolumeDrag);
        document.removeEventListener('mouseup', stopVolumeHandleDrag);
        document.removeEventListener('touchend', stopVolumeHandleDrag);
        
        setTimeout(() => {
            if (!volumeContainer.matches(':hover')) {
                volumeContainer.classList.remove('active');
            }
        }, 1500);
    }

    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    volumeBtn.addEventListener('click', toggleVolumeControls);
    volumeSlider.addEventListener('click', setVolume);
    volumeHandle.addEventListener('mousedown', startVolumeHandleDrag);
    volumeHandle.addEventListener('touchstart', startVolumeHandleDrag, { passive: false });
    progressBar.addEventListener('click', setProgress);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);

    document.addEventListener('click', (e) => {
        if (volumeContainer.classList.contains('active') && 
            !volumeContainer.contains(e.target) && 
            e.target !== volumeBtn) {
            volumeContainer.classList.remove('active');
        }
    });
    
    audioPlayer.volume = 1.0;
    
    shuffleBtn.title = "Shuffle: On";

    initPlayer();
}

// Show the song list in a modal
function showSongList() {
    const songListContainer = document.querySelector('.song-list');
    if (!songListContainer) {
        console.error("Song list container not found!");
        return;
    }
    
    songListContainer.innerHTML = '';
    
    if (!window.songs || !Array.isArray(window.songs)) {
        console.error("Songs array not available!");
        return;
    }
    
    const currentPlayingSongIndex = window.currentSongIndex !== undefined ? 
        window.currentSongIndex : 0;
    
    const sortedSongs = [...window.songs].sort((a, b) => 
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'song-search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search songs...';
    searchInput.className = 'song-search-input';
    
    searchContainer.appendChild(searchInput);
    songListContainer.appendChild(searchContainer);
    
    const songListWrapper = document.createElement('div');
    songListWrapper.className = 'song-list-wrapper';
    songListContainer.appendChild(songListWrapper);
    
    sortedSongs.forEach((song, index) => {
        const folderName = song.title.replace(/\s+/g, '-').replace(/'/g, '');
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        
        const isCurrentlyPlaying = (
            song.title === window.songs[currentPlayingSongIndex].title && 
            song.artist === window.songs[currentPlayingSongIndex].artist
        );
        
        if (isCurrentlyPlaying) {
            songItem.classList.add('active');
        }
        
        const basePath = `assets/music/${folderName}`;
        
        const thumbnail = document.createElement('img');
        thumbnail.classList.add('song-thumbnail');
        thumbnail.src = 'assets/images/techmoocher.png';
        
        window.tryLoadImage(`${basePath}/thumbnail.jpg`)
            .catch(() => window.tryLoadImage(`${basePath}/thumbnail.png`))
            .catch(() => window.tryLoadImage(`${basePath}/thumbnail.jpeg`))
            .then(src => {
                if (src) thumbnail.src = src;
            });
        
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('song-info-container');
        
        const titleEl = document.createElement('div');
        titleEl.classList.add('song-item-title');
        titleEl.textContent = song.title;
        
        const artistEl = document.createElement('div');
        artistEl.classList.add('song-item-artist');
        artistEl.textContent = song.artist;
        
        infoContainer.appendChild(titleEl);
        infoContainer.appendChild(artistEl);
        
        const playBtn = document.createElement('button');
        playBtn.classList.add('song-item-play');
        playBtn.innerHTML = isCurrentlyPlaying ? 
            '<i class="fas fa-volume-up"></i>' : 
            '<i class="fas fa-play"></i>';
        playBtn.setAttribute('aria-label', `Play ${song.title}`);
        
        songItem.appendChild(thumbnail);
        songItem.appendChild(infoContainer);
        songItem.appendChild(playBtn);
        
        songItem.addEventListener('click', () => {
            playSongFromLibrary(song);
        });
        
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSongFromLibrary(song);
        });
        
        songListWrapper.appendChild(songItem);
    });
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        document.querySelectorAll('.song-item').forEach(item => {
            const title = item.querySelector('.song-item-title').textContent.toLowerCase();
            const artist = item.querySelector('.song-item-artist').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    setTimeout(() => searchInput.focus(), 300);
}

// Play a song from the library
function playSongFromLibrary(song) {
    const audioPlayer = document.getElementById('audio-player');
    if (!audioPlayer) {
        console.error("Audio player element not found!");
        return;
    }
    
    const songIndex = window.songs.findIndex(s => 
        s.title === song.title && s.artist === song.artist
    );
    
    if (songIndex !== -1) {
        window.currentSongIndex = songIndex;
        
        const folderName = song.title.replace(/\s+/g, '-').replace(/'/g, '');
        const fileName = `${song.title.replace(/\s+/g, '-').replace(/'/g, '')}_${song.artist.replace(/\s+/g, '-').replace(/'/g, '')}.mp3`;
        const basePath = `assets/music/${folderName}`;
        
        document.getElementById('song-title').textContent = song.title;
        document.getElementById('song-artist').textContent = song.artist;
        audioPlayer.src = `${basePath}/${fileName}`;
        
        window.tryLoadImage(`${basePath}/thumbnail.jpg`)
            .catch(() => window.tryLoadImage(`${basePath}/thumbnail.png`))
            .catch(() => window.tryLoadImage(`${basePath}/thumbnail.jpeg`))
            .catch(() => document.getElementById('cover-art').src = 'assets/images/techmoocher.png')
            .then(src => {
                if (src) document.getElementById('cover-art').src = src;
            });
        
        audioPlayer.play().then(() => {
            document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('play-btn').title = "Pause";
            window.isPlaying = true;
            
            const songItems = document.querySelectorAll('.song-item');
            songItems.forEach(item => {
                item.classList.remove('active');
                const playButton = item.querySelector('.song-item-play');
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            songItems.forEach(item => {
                const titleEl = item.querySelector('.song-item-title');
                if (titleEl.textContent === song.title) {
                    item.classList.add('active');
                    const playButton = item.querySelector('.song-item-play');
                    playButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            });
            
        }).catch(error => {
            console.error("Error playing audio:", error);
        });
        
        window.songListModal.classList.remove('visible');
    }
}

function openSongLibrary() {
    if (!isMusicEnabled) {
        return;
    }

    const modal = window.songListModal || document.getElementById('song-list-modal');
    if (!modal) {
        console.error("Song list modal not found!");
        return;
    }

    bindSongListModalEvents();
    showSongList();
    modal.classList.add('visible');
}

function bindSongListModalEvents() {
    if (songModalEventsBound) {
        return;
    }

    const modal = document.getElementById('song-list-modal');
    if (!modal) {
        return;
    }

    const closeButton = modal.querySelector('.close-button');
    const hideModal = () => {
        modal.classList.remove('visible');
    };

    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', handleSongListKeydown);
    songModalEventsBound = true;
}

function handleSongListKeydown(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('song-list-modal');
        if (modal && modal.classList.contains('visible')) {
            modal.classList.remove('visible');
        }
    }
}

function initializeDeviceSelection() {
    const deviceModal = document.getElementById('device-selection-modal');

    devicePreference = null;
    document.body.removeAttribute('data-device-mode');
    hideLaunchOverlay(true);
    disableMusicFeature();

    if (!deviceModal) {
        console.error('Device selection modal not found!');
        return;
    }

    // Don't highlight anything - let user choose without any suggestion
    const options = deviceModal.querySelectorAll('.device-option');
    options.forEach(option => {
        option.classList.remove('active');
    });

    if (!deviceModal.dataset.bound) {
        options.forEach(option => {
            option.addEventListener('click', (event) => {
                const device = option.dataset.device || 'desktop';
                applyDevicePreference(device);
            });
        });
        deviceModal.dataset.bound = 'true';
    }

    deviceModal.style.display = 'flex';
    deviceModal.style.opacity = '1';
    deviceModal.style.pointerEvents = 'auto';
    
    deviceModal.classList.add('visible');
    
    console.log('Device modal initialized and should be visible');
    console.log('Modal parent:', deviceModal.parentElement?.tagName, deviceModal.parentElement?.id);
}

function applyDevicePreference(device) {
    const normalizedDevice = device === 'mobile' ? 'mobile' : 'desktop';
    devicePreference = normalizedDevice;

    document.body.setAttribute('data-device-mode', normalizedDevice);
    highlightDeviceOption(normalizedDevice);
    toggleTypingVisibility(normalizedDevice);

    if (normalizedDevice === 'desktop') {
        enableMusicFeature();
    } else {
        disableMusicFeature();
    }

    hideDeviceSelectionModal();
    const launchMessage = normalizedDevice === 'desktop' ? 'Launching desktop experience...' : 'Launching mobile experience...';
    showLaunchOverlay(launchMessage);
}

function enableMusicFeature() {
    const libraryBtn = document.getElementById('library-btn');
    const musicWidget = document.getElementById('music-widget');

    document.body.classList.remove('music-disabled');

    if (libraryBtn) {
        libraryBtn.disabled = false;
        libraryBtn.removeAttribute('aria-hidden');
    }

    if (musicWidget) {
        musicWidget.removeAttribute('aria-hidden');
        musicWidget.removeAttribute('aria-disabled');
    }

    bindSongListModalEvents();

    if (!musicPlayerInitialized) {
        initMusicPlayer();
        musicPlayerInitialized = true;
    }

    isMusicEnabled = true;
}

function disableMusicFeature() {
    const audioPlayer = document.getElementById('audio-player');
    const libraryBtn = document.getElementById('library-btn');
    const musicWidget = document.getElementById('music-widget');
    const songListModal = document.getElementById('song-list-modal');

    document.body.classList.add('music-disabled');

    if (libraryBtn) {
        libraryBtn.disabled = true;
        libraryBtn.setAttribute('aria-hidden', 'true');
    }

    if (musicWidget) {
        musicWidget.setAttribute('aria-hidden', 'true');
        musicWidget.setAttribute('aria-disabled', 'true');
        musicWidget.classList.remove('active');
    }

    if (songListModal) {
        songListModal.classList.remove('visible');
    }

    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }

    isMusicEnabled = false;
}

function highlightDeviceOption(device) {
    const deviceModal = document.getElementById('device-selection-modal');
    if (!deviceModal) {
        return;
    }

    const options = deviceModal.querySelectorAll('.device-option');
    options.forEach(option => {
        if (option.dataset.device === device) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function hideDeviceSelectionModal() {
    const deviceModal = document.getElementById('device-selection-modal');
    if (deviceModal) {
        deviceModal.classList.remove('visible');
        deviceModal.style.display = '';
        deviceModal.style.opacity = '';
        deviceModal.style.pointerEvents = '';
    }
}

function showLaunchOverlay(message = 'Launching...') {
    const overlay = document.getElementById('launch-overlay');
    if (!overlay) {
        return;
    }

    const textElement = overlay.querySelector('.launch-text');
    if (textElement) {
        textElement.textContent = message;
    }

    clearTimeout(launchOverlayHideTimeout);
    launchOverlayHideTimeout = null;
    overlay.removeAttribute('hidden');
    requestAnimationFrame(() => {
        overlay.classList.add('visible');
    });

    clearTimeout(launchOverlayTimeout);
    launchOverlayTimeout = setTimeout(() => {
        hideLaunchOverlay();
    }, 1400);
}

function hideLaunchOverlay(immediate = false) {
    const overlay = document.getElementById('launch-overlay');
    if (!overlay) {
        return;
    }

    clearTimeout(launchOverlayTimeout);
    launchOverlayTimeout = null;

    if (immediate) {
        overlay.classList.remove('visible');
        overlay.setAttribute('hidden', '');
        clearTimeout(launchOverlayHideTimeout);
        launchOverlayHideTimeout = null;
        return;
    }

    if (!overlay.classList.contains('visible')) {
        overlay.setAttribute('hidden', '');
        clearTimeout(launchOverlayHideTimeout);
        launchOverlayHideTimeout = null;
        return;
    }

    overlay.classList.remove('visible');

    const handleTransitionEnd = () => {
        overlay.setAttribute('hidden', '');
        overlay.removeEventListener('transitionend', handleTransitionEnd);
        clearTimeout(launchOverlayHideTimeout);
        launchOverlayHideTimeout = null;
    };

    overlay.addEventListener('transitionend', handleTransitionEnd);

    clearTimeout(launchOverlayHideTimeout);
    launchOverlayHideTimeout = setTimeout(() => {
        overlay.setAttribute('hidden', '');
        launchOverlayHideTimeout = null;
    }, 500);
}

function openProjectDetails(projectId) {
    if (!projectId) {
        console.warn('Project id missing for detail view.');
        return;
    }

    const data = projectsData[projectId];
    if (!data) {
        console.warn(`Project data not found for ${projectId}`);
        return;
    }

    const existingOverlay = document.querySelector('.project-detail-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay', 'project-detail-overlay', 'visible');

    const detailTitleId = `project-detail-title-${projectId}`;
    const detailOverviewId = data.overview ? `project-detail-overview-${projectId}` : '';
    const detailDescriptionId = data.description ? `project-detail-description-${projectId}` : '';
    const describedByIds = [detailOverviewId, detailDescriptionId].filter(Boolean).join(' ');
    const ariaDescribedByAttr = describedByIds ? ` aria-describedby="${describedByIds}"` : '';

    const overviewMarkup = data.overview
        ? `<p class="project-detail-overview" id="${detailOverviewId}">${data.overview}</p>`
        : '';

    const galleryMarkup = Array.isArray(data.images) && data.images.length > 0
        ? `
            <section class="project-detail-section">
                <h3>Images</h3>
                <div class="project-detail-gallery">
                    ${data.images.map(image => `
                        <figure class="project-detail-figure">
                            <img src="${image.src}" alt="${image.alt || data.title} image">
                            <figcaption class="project-detail-caption">${image.alt || data.title}</figcaption>
                        </figure>
                    `).join('')}
                </div>
            </section>
        `
        : '';

    const descriptionMarkup = data.description
        ? `
            <section class="project-detail-section">
                <h3>Project Description</h3>
                <p id="${detailDescriptionId}">${data.description}</p>
            </section>
        `
        : '';

    const featuresMarkup = Array.isArray(data.features) && data.features.length > 0
        ? `
            <section class="project-detail-section">
                <h3>Key Features</h3>
                <ul>
                    ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </section>
        `
        : '';

    const challengesMarkup = Array.isArray(data.challenges) && data.challenges.length > 0
        ? `
            <section class="project-detail-section">
                <h3>Challenges &amp; Solutions</h3>
                <div class="project-detail-challenges">
                    ${data.challenges.map(challenge => `
                        <div class="project-detail-challenge">
                            <h4>${challenge.title}</h4>
                            <p><strong>Challenge:</strong> ${challenge.challenge}</p>
                            <p><strong>Solution:</strong> ${challenge.solution}</p>
                        </div>
                    `).join('')}
                </div>
            </section>
        `
        : '';

    const impactsMarkup = Array.isArray(data.impacts) && data.impacts.length > 0
        ? `
            <section class="project-detail-section">
                <h3>Impacts &amp; Results</h3>
                <ul>
                    ${data.impacts.map(impact => `<li>${impact}</li>`).join('')}
                </ul>
            </section>
        `
        : '';

    const techStackMarkup = Array.isArray(data.techStack) && data.techStack.length > 0
        ? `
            <section class="project-detail-section">
                <h3>Technology Stack</h3>
                <div class="project-detail-tags">
                    ${data.techStack.map(tool => `<span class="project-detail-tag">${tool}</span>`).join('')}
                </div>
            </section>
        `
        : '';

    const detailSections = [
        galleryMarkup,
        descriptionMarkup,
        featuresMarkup,
        challengesMarkup,
        impactsMarkup,
        techStackMarkup
    ].filter(Boolean).join('');

    const liveAction = data.liveUrl
        ? `<a href="${data.liveUrl}" class="project-action project-visit" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square"></i><span>View Demo</span></a>`
        : '';

    const githubAction = data.githubUrl
        ? `<a href="${data.githubUrl}" class="project-action project-github" target="_blank" rel="noopener"><i class="fab fa-github"></i> <span>View Repo</span></a>`
        : '';

    overlay.innerHTML = `
        <div class="modal-content project-detail-content" role="dialog" aria-modal="true" aria-labelledby="${detailTitleId}"${ariaDescribedByAttr} tabindex="-1">
            <span class="close-button" aria-label="Close project details">&times;</span>
            <div class="project-detail-header">
                <div class="project-detail-heading">
                    <h2 class="project-detail-title" id="${detailTitleId}">${data.title}</h2>
                    ${overviewMarkup}
                </div>
                <div class="project-detail-actions">
                    ${liveAction || ''}
                    ${githubAction || ''}
                </div>
            </div>
            <div class="project-detail-body">
                ${detailSections}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeButton = overlay.querySelector('.close-button');
    const dialogContent = overlay.querySelector('.project-detail-content');

    const closeOverlay = () => {
        overlay.classList.remove('visible');
        document.removeEventListener('keydown', escHandler);
        setTimeout(() => {
            overlay.remove();
        }, 250);
    };

    const escHandler = (event) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
            closeOverlay();
        }
    };

    if (closeButton) {
        closeButton.addEventListener('click', closeOverlay);
    }

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', escHandler);

    if (dialogContent) {
        dialogContent.focus({ preventScroll: false });
    }
}

window.resetDevicePreference = function() {
    initializeDeviceSelection();
};

function openGalleryFolder(folderName) {
    console.log(`Opening folder: ${folderName}`);

    const folderModal = document.createElement('div');
    folderModal.classList.add('modal-overlay');
    folderModal.classList.add('visible');
    
    folderModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 class="modal-title">${folderName.charAt(0).toUpperCase() + folderName.slice(1)}</h2>
            <div class="image-counter"><span id="folder-current-photo">1</span> of <span id="folder-total-photos">0</span> photos</div>
            <div class="image-carousel">
                <div class="carousel-container">
                    <button class="carousel-nav prev-btn">&lt;</button>
                    <div class="carousel-inner folder-carousel"></div>
                    <button class="carousel-nav next-btn">&gt;</button>
                </div>
                <div class="carousel-caption"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(folderModal);
    
    const folderImages = {
        'camp': [
            { src: 'assets/images/misc/camp-moments/staff-2025.jpg', caption: 'First time on staff - CIT\'25' },
            { src: 'assets/images/misc/camp-moments/staff-bio-2025.jpg', caption: 'First Staff bio - CIT\'25' },
            { src: 'assets/images/misc/camp-moments/cabin-2-2024.jpg', caption: 'Cabin 2 - LIT\'24' },
            { src: 'assets/images/misc/camp-moments/cabin-3-2025.jpg', caption: 'Cabin 3 - CIT\'25' },
            { src: 'assets/images/misc/camp-moments/cabin-slime-war.jpg', caption: 'Slimey-est cabin!' },
            { src: 'assets/images/misc/camp-moments/lit-game.jpg', caption: 'LIT\'24 was LIT! 🕯️' },
            { src: 'assets/images/misc/camp-moments/cit-25.jpg', caption: 'CIT\'25 was 🔥' },
            { src: 'assets/images/misc/camp-moments/fav-pic.jpg', caption: 'Fav pic w/ my fav camper!' },
            { src: 'assets/images/misc/camp-moments/fav-lits.jpg', caption: 'With my fav LIT\'24 peers.' },
            { src: 'assets/images/misc/camp-moments/in-the-pines.jpg', caption: 'In the Pines building forts.'},
            { src: 'assets/images/misc/camp-moments/with-javier.jpg', caption: 'Swim accross the lake w/ Javier.'},
            { src: 'assets/images/misc/camp-moments/with-ignacio-and-javier.jpg', caption: 'Will visit Spain one day to meet these guys!' },
            { src: 'assets/images/misc/camp-moments/with-patrycius.jpg', caption: 'Best bunkmate!' },
            { src: 'assets/images/misc/camp-moments/after-the-dance.jpg', caption: 'Us after the dance (never sweated as much as this).' },
            { src: 'assets/images/misc/camp-moments/shark-tank.jpg', caption: 'Shark Tank - CIT\'25' }
        ],
        'church': [
            { src: 'assets/images/misc/church-moments/im-the-pope.jpg', caption: '(hehe) 😁😁😁' },
            { src: 'assets/images/misc/church-moments/santa.jpg', caption: 'Santa\'s little helper!' },
            { src: 'assets/images/misc/church-moments/church-choir.jpg', caption: 'my favorite people! 💖' },
            { src: 'assets/images/misc/church-moments/singing.jpg', caption: 'One day I started singing and I found I\'m not that bad 🎤'},
            { src: 'assets/images/misc/church-moments/xmas-2024.jpg', caption: 'Make some noise!' },
            { src: 'assets/images/misc/church-moments/secret-meeting.jpg', caption: 'Secret council 😶‍🌫️'},
            { src: 'assets/images/misc/church-moments/fav-people.jpg', caption: 'My favorite crew!' }
        ]
    };
    
    const images = folderImages[folderName] || [];
    const carouselInner = folderModal.querySelector('.folder-carousel');
    const captionElement = folderModal.querySelector('.carousel-caption');
    const currentPhotoElement = folderModal.querySelector('#folder-current-photo');
    const totalPhotosElement = folderModal.querySelector('#folder-total-photos');
    
    totalPhotosElement.textContent = images.length;
    
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) item.classList.add('active');
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        
        item.appendChild(img);
        carouselInner.appendChild(item);
    });
    
    if (images.length > 0) {
        captionElement.textContent = images[0].caption;
    }
    
    let currentIndex = 0;
    const prevBtn = folderModal.querySelector('.prev-btn');
    const nextBtn = folderModal.querySelector('.next-btn');
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });
    
    function updateCarousel() {
        const items = folderModal.querySelectorAll('.carousel-item');
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        captionElement.textContent = images[currentIndex].caption;
        currentPhotoElement.textContent = currentIndex + 1;
    }
    
    const closeButton = folderModal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        folderModal.classList.remove('visible');
        setTimeout(() => {
            folderModal.remove();
        }, 300);
    });
    
    folderModal.addEventListener('click', (event) => {
        if (event.target === folderModal) {
            folderModal.classList.remove('visible');
            setTimeout(() => {
                folderModal.remove();
            }, 300);
        }
    });
    
    document.addEventListener('keydown', function escCloseHandler(event) {
        if (event.key === 'Escape' && folderModal.classList.contains('visible')) {
            folderModal.classList.remove('visible');
            setTimeout(() => {
                folderModal.remove();
            }, 300);
            document.removeEventListener('keydown', escCloseHandler);
        }
    });
}
