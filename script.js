document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createShootingStars();
    addIntermittentBlinkingStars();
    updateDateTime();

    setInterval(updateDateTime, 1000);

    const bioIcon = document.getElementById('bio-icon');
    const bioModal = document.getElementById('bio-modal');
    const miscIcon = document.getElementById('miscellaneous-icon');
    const miscModal = document.getElementById('miscellaneous-modal');
    
    // Setup modals
    setupModal(bioIcon, bioModal);
    setupModal(miscIcon, miscModal);
    
    // Initialize the image carousel when the miscellaneous icon is clicked
    miscIcon.addEventListener('click', initImageCarousel);

    // Initialize typing animation
    initTypingAnimation();

    // Contact widget functionality
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

    // Music widget functionality
    const musicWidget = document.getElementById('music-widget');
    const songListModal = document.getElementById('song-list-modal');
    
    musicWidget.addEventListener('click', () => {
        showSongList();
        songListModal.classList.add('visible');
    });
    
    // Setup modal for song list
    setupModal(musicWidget, songListModal);

    // Fox animation
    const fox = document.querySelector('.fox');
    let foxAnimationInProgress = false;
    
    fox.addEventListener('click', function() {
        if (foxAnimationInProgress) return;
        
        foxAnimationInProgress = true;
        const foxImg = fox;
        
        // Shock state
        foxImg.src = 'assets/images/fox/fox-shock-left.png';
        
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-post-trauma-left-1.png';
        }, 300);
        
        // Second post-trauma state after 0.6s (0.3s + 0.3s)
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-post-trauma-left-2.png';
        }, 600);
        
        // Idle state after 1.4s (0.3s + 0.3s + 0.8s)
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-idle-left.png';
        }, 1400);
        
        // Back to sleep after 2.4s (0.2s + 0.3s + 0.8s + 1s)
        setTimeout(() => {
            foxImg.src = 'assets/images/fox/fox-sleeping.gif';
            foxAnimationInProgress = false;
        }, 2400);
    });

    setupFakeCursor();

    initMusicPlayer();
});

function setupModal(iconElement, modalElement) {
    const closeButton = modalElement.querySelector('.close-button');
    
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
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalElement.classList.contains('visible')) {
            hideModal();
        }
    });
}

// Image carousel functionality
function initImageCarousel() {
    const images = [
        { src: 'assets/images/misc/arghhh.jpg', caption: 'Arghhhhhhh!!!' },
        { src: 'assets/images/misc/my-zoo.png', caption: 'Explore the tech animals!' },
        { src: 'assets/images/misc/home.jpg', caption: 'Coding vibe 👨‍💻' },
        { src: 'assets/images/misc/old-thingy.jpg', caption: 'Didn\'t know what this is, am I too young?' },
        { src: 'assets/images/misc/thinkpad-collection.jpg', caption: '3 ThinkPads (and still counting).' },
        { src: 'assets/images/misc/hkico-2025-with-hphong.jpg', caption: 'HKICO 2025 with fav friend.' },
        { src: 'assets/images/misc/morning.jpg', caption: 'Morning in Da Lat.' },
        { src: 'assets/images/misc/piano.jpg', caption: '🎹🎼🎶' },
        { src: 'assets/images/misc/labour.jpg', caption: 'Oops... 😅😵‍💫' },
        { src: 'assets/images/misc/with-einstein.jpg', caption: 'Hi Einstein! 👋' },
        { src: 'assets/images/misc/too-short.jpg', caption: 'Is it too short or am I too tall?' },
        { src: 'assets/images/misc/too-little.jpg', caption: 'Too little! 🥱' },
        { src: 'assets/images/misc/statue-of-liberty.jpg', caption: '🗽' },
        { src: 'assets/images/misc/gambling.jpg', caption: 'Wanna do some blackjack? ♠️♦️' },
    ];
    
    const carouselInner = document.querySelector('.carousel-inner');
    const captionElement = document.querySelector('.carousel-caption');
    const currentPhotoElement = document.getElementById('current-photo');
    const totalPhotosElement = document.getElementById('total-photos');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Set total photos count
    totalPhotosElement.textContent = images.length;
    
    // Clear previous content
    carouselInner.innerHTML = '';
    
    // Create carousel items
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
    
    // Set initial caption
    if (images.length > 0) {
        captionElement.textContent = images[0].caption;
    }
    
    // Start rotation
    let currentIndex = 0;
    let rotationInterval;
    
    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        items.forEach(item => item.classList.remove('active'));
        
        items[currentIndex].classList.add('active');
        
        // Update caption and counter
        captionElement.textContent = images[currentIndex].caption;
        currentPhotoElement.textContent = currentIndex + 1;
    }
    
    function rotateImages() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }
    
    // Navigation handlers
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
        // Rotate every 5 seconds
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
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const timeString = `${hours}:${minutes} ${ampm}`;
    
    document.getElementById('datetime').textContent = `${dateString} @ ${timeString}`;
}

function createStars() {
    const nightSky = document.querySelector('.night-sky');

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Randomize star size
        const sizeClass = Math.random() < 0.6 ? 'small' : (Math.random() < 0.8 ? 'medium' : 'large');
        star.classList.add(sizeClass);
        
        // Randomize position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
        // Updated star colors
        const colors = ['#ffffff', '#fffae0', '#FFE87C', '#e0e8ff', '#e0f0ff', '#d1d1ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = randomColor;
        
        // Randomize opacity
        const baseOpacity = Math.random() * 0.5 + 0.3;
        star.style.opacity = baseOpacity;
        
        // Add glow effect to some stars
        if (Math.random() > 0.7) {
            star.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px ${randomColor}`;
        }
        
        // Add blinking effect to some stars
        if (Math.random() > 0.5) {
            star.classList.add('blink');
            
            // Randomize animation duration and delay
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
    
    // Add subtle movement to stars to enhance the effect
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
        
        // Random position and size
        const width = Math.random() * 150 + 50;
        shootingStar.style.width = `${width}px`;
        
        const startX = Math.random() * -100;
        const startY = Math.random() * window.innerHeight;
        
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        
        // Random animation delay and duration
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
            
            // Animate the star blinking and then remove it
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
    const textElement = document.getElementById('typing-text');
    const plainText = "Welcome to ";
    const highlightText = "techmoocher's portfolio";
    const exclamation = "!"; // Fixed the syntax error here (removed extra parenthesis)
    
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
                // Typing the plain part
                textElement.innerHTML = fullText.substring(0, index);
            } else if (index <= plainText.length + highlightText.length) {
                // Typing the highlight part
                const highlightPart = highlightText.substring(0, index - plainText.length);
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightPart}</span>`;
            } else {
                // Typing the exclamation
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
                // Erasing the exclamation
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightText}</span>${fullText.substring(plainText.length + highlightText.length, index)}`;
            } else if (index > plainText.length) {
                // Erasing the highlight part
                const highlightPart = highlightText.substring(0, index - plainText.length);
                textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightPart}</span>`;
            } else {
                // Erasing the plain part
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

function setupFakeCursor() {
    // Create fake cursor element
    const fakeCursor = document.createElement('div');
    fakeCursor.classList.add('fake-cursor');
    document.body.appendChild(fakeCursor);
    
    // Get fox element position
    const fox = document.querySelector('.fox');
    const foxRect = fox.getBoundingClientRect();
    
    // Function to show cursor hint
    function showCursorHint() {
        const updatedFoxRect = fox.getBoundingClientRect();
        
        // Position cursor over the fox
        const cursorX = updatedFoxRect.left + updatedFoxRect.width * 0.6;
        const cursorY = updatedFoxRect.top + updatedFoxRect.height * 0.4;
        
        fakeCursor.style.left = `${cursorX}px`;
        fakeCursor.style.top = `${cursorY}px`;
        
        fakeCursor.classList.add('visible');
        
        setTimeout(() => {
            fakeCursor.classList.add('clicking');
            
            // Remove clicking class after animation
            setTimeout(() => {
                fakeCursor.classList.remove('clicking');
                
                // Hide cursor after a delay
                setTimeout(() => {
                    fakeCursor.classList.remove('visible');
                }, 1000);
            }, 300);
        }, 800);
    }
    
    // Show hint periodically (every 15 seconds)
    setInterval(showCursorHint, 10000);
    
    // Also show hint soon after page load
    setTimeout(showCursorHint, 5000);
}

function initMusicPlayer() {
    // Music player elements
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
    let isShuffle = true; // Default to shuffle mode
    let playedSongs = []; // Keep track of played songs to avoid repeats
    let isDraggingVolume = false; // Track if volume is being dragged
    
    // Make songs variable available globally
    window.songs = songs;
    window.currentSongIndex = currentSongIndex;
    window.tryLoadImage = tryLoadImage;
    window.songListModal = document.getElementById('song-list-modal');
    
    function initPlayer() {
        // Start with a random song
        currentSongIndex = Math.floor(Math.random() * songs.length);
        playedSongs.push(currentSongIndex); // Add initial song to played list
        
        // Store the current song index in the window object to ensure it's available globally
        window.currentSongIndex = currentSongIndex;
        
        loadSong(songs[currentSongIndex]);
        
        audioPlayer.volume = 1.0;
        updateVolumeUI();
        
        shuffleBtn.classList.add('active');
        
        audioPlayer.play().then(() => {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.title = "Pause";
            isPlaying = true;
        }).catch(error => {
            console.log("Autoplay prevented:", error);
        });
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
            .catch(() => coverArt.src = 'assets/images/default-cover.jpg')
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
        // Instead of showing/hiding, this now mutes/unmutes
        if (audioPlayer.volume > 0) {
            // Store current volume before muting
            volumeBtn.dataset.previousVolume = audioPlayer.volume;
            audioPlayer.volume = 0;
        } else {
            // Restore previous volume or set to max
            const previousVolume = parseFloat(volumeBtn.dataset.previousVolume) || 1.0;
            audioPlayer.volume = previousVolume;
        }
        updateVolumeUI();
    }
    
    function updateVolumeUI() {
        // Update for horizontal volume bar
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
        // Updated for horizontal volume bar
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
        volumeContainer.classList.add('active'); // Keep container visible
        
        // Add both mouse and touch event listeners
        document.addEventListener('mousemove', handleVolumeDrag);
        document.addEventListener('touchmove', handleVolumeDrag, { passive: false });
        document.addEventListener('mouseup', stopVolumeHandleDrag);
        document.addEventListener('touchend', stopVolumeHandleDrag);
    }

    function handleVolumeDrag(e) {
        if (isDraggingVolume) {
            // Get X position from either mouse or touch event
            const clientX = e.type.includes('touch') ? 
                e.touches[0].clientX : e.clientX;
            
            const rect = volumeSlider.getBoundingClientRect();
            const dragX = clientX - rect.left;
            let volumePercent = dragX / rect.width;
            
            // Clamp volume between 0 and 1
            volumePercent = Math.max(0, Math.min(1, volumePercent));
            audioPlayer.volume = volumePercent;
            
            updateVolumeUI();
            
            // Prevent default to avoid scrolling on mobile
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
        thumbnail.src = 'assets/images/default-cover.jpg';
        
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
    
    // Focus the search input when the modal opens
    setTimeout(() => searchInput.focus(), 300);
}

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
        // Store the currentSongIndex in the window object to share with main player
        window.currentSongIndex = songIndex;
        
        // Use the same loadSong function with necessary parameters
        const folderName = song.title.replace(/\s+/g, '-').replace(/'/g, '');
        const fileName = `${song.title.replace(/\s+/g, '-').replace(/'/g, '')}_${song.artist.replace(/\s+/g, '-').replace(/'/g, '')}.mp3`;
        const basePath = `assets/music/${folderName}`;
        
        // Update UI elements
        document.getElementById('song-title').textContent = song.title;
        document.getElementById('song-artist').textContent = song.artist;
        audioPlayer.src = `${basePath}/${fileName}`;
        
        window.tryLoadImage(`${basePath}/thumbnail.jpg`)
            .catch(() => window.tryLoadImage(`${basePath}/thumbnail.png`))
            .catch(() => window.tryLoadImage(`${basePath}/thumbnail.jpeg`))
            .catch(() => document.getElementById('cover-art').src = 'assets/images/default-cover.jpg')
            .then(src => {
                if (src) document.getElementById('cover-art').src = src;
            });
        
        // Play the selected song
        audioPlayer.play().then(() => {
            document.getElementById('play-btn').innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('play-btn').title = "Pause";
            window.isPlaying = true;
            
            // Update active song in list
            const songItems = document.querySelectorAll('.song-item');
            songItems.forEach(item => {
                item.classList.remove('active');
                const playButton = item.querySelector('.song-item-play');
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            });
            
            // Find the clicked song item and mark as active
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
        
        // Hide the modal
        window.songListModal.classList.remove('visible');
    }
}

// Add event listeners for volume handle touch events
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
volumeBtn.addEventListener('click', toggleVolumeControls);
volumeSlider.addEventListener('click', setVolume);
volumeHandle.addEventListener('mousedown', startVolumeHandleDrag);
volumeHandle.addEventListener('touchstart', startVolumeHandleDrag, { passive: false });
progressBar.addEventListener('click', setProgress);