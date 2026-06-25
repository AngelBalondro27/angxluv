// Play button functionality for Favorite Singer Section
let isPlaying = false;
let audioElement = null;
let currentSongIndex = -1;

// Songs data with audio URLs (using sample audio - replace with actual Lauv songs)
const songs = [
  { 
    title: "I Like Me Better", 
    plays: "250M+",
    audioUrl: './Lauv - I Like Me Better [Official Video].mp3'
  },
  { 
    title: "Tattoos Together", 
    plays: "180M+",
    audioUrl: './Lauv - Tattoos Together [Official Video].mp3'
  },
  { 
    title: "Mean It", 
    plays: "150M+",
    audioUrl: 'Lauv & LANY - Mean It [Official Video].mp3'
  },
  { 
    title: "Modern Loneliness", 
    plays: "120M+",
    audioUrl: './Lauv - Modern Loneliness [Official Video].mp3'
  }
];

function playSong(songIndex = 0) {
  const playBtn = document.querySelector('.singer-actions .play-btn');
  
  if (!playBtn) return;
  
  // If clicking the same song that's playing, pause it
  if (isPlaying && currentSongIndex === songIndex) {
    pauseSong();
    return;
  }
  
  // Update current song index
  currentSongIndex = songIndex;
  
  // Update song list highlighting
  updateSongListHighlight(songIndex);
  
  // Stop current playback if any
  if (audioElement) {
    audioElement.pause();
    audioElement = null;
  }
  
  // Create new audio element for the selected song
  isPlaying = false;
  
  // Create audio element with the specific song URL
  audioElement = new Audio(songs[songIndex].audioUrl);
  
  // Handle audio events
  audioElement.addEventListener('ended', function() {
    isPlaying = false;
    updatePlayButtonState(playBtn);
    clearSongListHighlight();
    currentSongIndex = -1;
  });
  
  audioElement.addEventListener('error', function() {
    console.log('Audio could not be loaded for:', songs[songIndex].title);
    isPlaying = false;
    updatePlayButtonState(playBtn);
    clearSongListHighlight();
  });
  
  // Play the audio
  audioElement.play().then(() => {
    isPlaying = true;
    updatePlayButtonState(playBtn);
  }).catch(error => {
    console.log('Playback failed:', error);
  });
}

function pauseSong() {
  const playBtn = document.querySelector('.singer-actions .play-btn');
  
  if (audioElement) {
    audioElement.pause();
  }
  
  isPlaying = false;
  currentSongIndex = -1;
  
  if (playBtn) {
    updatePlayButtonState(playBtn);
  }
  clearSongListHighlight();
}

function updatePlayButtonState(btn) {
  if (isPlaying) {
    btn.innerHTML = '<ion-icon name="pause"></ion-icon> Pause';
    btn.classList.add('playing');
  } else {
    btn.innerHTML = '<ion-icon name="play"></ion-icon> Play';
    btn.classList.remove('playing');
  }
}

function updateSongListHighlight(index) {
  // Remove highlight from all songs and update play icons
  document.querySelectorAll('.song-item').forEach((item, i) => {
    const playIcon = item.querySelector('.song-play-icon');
    
    if (i === index) {
      item.style.background = '#ede5f7';
      item.classList.add('active-song');
      // Change icon to pause if playing
      if (isPlaying) {
        playIcon.setAttribute('name', 'pause');
      }
    } else {
      item.style.background = '#f8f7ff';
      item.classList.remove('active-song');
      // Reset icon to play-circle
      playIcon.setAttribute('name', 'play-circle');
    }
  });
}

function clearSongListHighlight() {
  document.querySelectorAll('.song-item').forEach(item => {
    item.style.background = '#f8f7ff';
    item.classList.remove('active-song');
    // Reset icon to play-circle
    const playIcon = item.querySelector('.song-play-icon');
    if (playIcon) {
      playIcon.setAttribute('name', 'play-circle');
    }
  });
}

// Photo album click to enlarge (simple lightbox effect)
document.querySelectorAll('.album-photo').forEach(photo => {
  photo.addEventListener('click', function() {
    // Create modal for enlarged view
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <img src="${this.src}" alt="Enlarged photo" class="modal-content">
    `;
    
    // Add modal styles
    modal.style.cssText = `
      display: flex;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.9);
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `;
    
    const modalImg = modal.querySelector('.modal-content');
    modalImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 10px;
      object-fit: contain;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 35px;
      color: #f1f1f1;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
    `;
    
    // Close modal on click
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target === closeBtn) {
        document.body.removeChild(modal);
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', closeOnEscape);
      }
    });
    
    document.body.appendChild(modal);
  });
});

// Skill badges hover animation
document.querySelectorAll('.skill').forEach(skill => {
  skill.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.05)';
  });
  
  skill.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-2px) scale(1)';
  });
});

// Follow button functionality
function toggleFollow() {
  const followBtn = document.querySelector('.follow-btn');
  const icon = followBtn.querySelector('ion-icon');
  
  if (followBtn.classList.contains('following')) {
    followBtn.classList.remove('following');
    icon.setAttribute('name', 'person-add');
    followBtn.innerHTML = '<ion-icon name="person-add"></ion-icon> Follow';
  } else {
    followBtn.classList.add('following');
    icon.setAttribute('name', 'checkmark');
    followBtn.innerHTML = '<ion-icon name="checkmark"></ion-icon> Following';
  }
}

// Song list item click to play
document.querySelectorAll('.song-item').forEach((item, index) => {
  item.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
    playSong(index);
  });
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Add touch feedback for mobile play button
  const playBtn = document.querySelector('.singer-actions .play-btn');
  if (playBtn) {
    playBtn.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    playBtn.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  }
  
  // Add follow button touch feedback
  const followBtn = document.querySelector('.follow-btn');
  if (followBtn) {
    followBtn.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    followBtn.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  }
});
