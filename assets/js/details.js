// Details page JavaScript
// Handles program details display and image gallery

let currentProgram = null;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadProgramDetails();
});

function loadProgramDetails() {
    // Get program ID from sessionStorage
    const programId = sessionStorage.getItem('currentProgramId');

    if (!programId) {
        alert('لم يتم العثور على البرنامج');
        window.location.href = 'index.html';
        return;
    }

    // Find the program in data
    currentProgram = programsData.programs.find(p => p.id === programId);

    if (!currentProgram) {
        alert('البرنامج غير موجود');
        window.location.href = 'index.html';
        return;
    }

    // Render program details
    renderProgramHeader();
    renderProgramImages();
    setupDownloadButton();
}

function renderProgramHeader() {
    const headerContainer = document.getElementById('program-header');

    const totalImages = currentProgram.images ? currentProgram.images.length : 0;
    const totalVideos = currentProgram.videos ? currentProgram.videos.length : 0;
    const totalMedia = totalImages + totalVideos;

    headerContainer.innerHTML = `
        <h2 class="program-title">${currentProgram.name}</h2>
        <p class="program-description">${currentProgram.description}</p>
        <div class="program-meta">
            <span class="version-badge">الإصدار ${currentProgram.version}</span>
            ${totalImages > 0 ? `<span class="images-count">${totalImages} صورة</span>` : ''}
            ${totalVideos > 0 ? `<span class="videos-count">${totalVideos} فيديو</span>` : ''}
            ${totalMedia > 0 ? `<span class="media-count">${totalMedia} ملف</span>` : ''}
        </div>
    `;
}

function renderProgramImages() {
    const imagesContainer = document.getElementById('program-images');
    imagesContainer.innerHTML = '';

    const hasImages = currentProgram.images && currentProgram.images.length > 0;
    const hasVideos = currentProgram.videos && currentProgram.videos.length > 0;

    if (!hasImages && !hasVideos) {
        imagesContainer.innerHTML = '<p class="no-images">لا توجد ملفات متاحة</p>';
        return;
    }

    // Render Images Section
    if (hasImages) {
        imagesContainer.innerHTML += '<h3 class="section-title">معرض الصور</h3>';

        const imageGallery = document.createElement('div');
        imageGallery.className = 'image-gallery';

        currentProgram.images.forEach((image, index) => {
            const imagePath = `${currentProgram.folder}/${image}`;
            const imageItem = document.createElement('div');
            imageItem.className = 'gallery-item';
            imageItem.onclick = () => openLightbox(index);

            imageItem.innerHTML = `
                <img src="${imagePath}" alt="${currentProgram.name} - صورة ${index + 1}" loading="lazy" onerror="this.parentElement.style.display='none'">
                <div class="gallery-overlay">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L27 27M3 14C3 14.9193 3.18106 15.8295 3.53284 16.6788C3.88463 17.5281 4.40024 18.2997 5.05025 18.9497C5.70026 19.5998 6.47194 20.1154 7.32122 20.4672C8.1705 20.8189 9.08075 21 10 21C10.9193 21 11.8295 20.8189 12.6788 20.4672C13.5281 20.1154 14.2997 19.5998 14.9497 18.9497C15.5998 18.2997 16.1154 17.5281 16.4672 16.6788C16.8189 15.8295 17 14.9193 17 14C17 13.0807 16.8189 12.1705 16.4672 11.3212C16.1154 10.4719 15.5998 9.70026 14.9497 9.05025C14.2997 8.40024 13.5281 7.88463 12.6788 7.53284C11.8295 7.18106 10.9193 7 10 7C9.08075 7 8.1705 7.18106 7.32122 7.53284C6.47194 7.88463 5.70026 8.40024 5.05025 9.05025C4.40024 9.70026 3.88463 10.4719 3.53284 11.3212C3.18106 12.1705 3 13.0807 3 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;

            imageGallery.appendChild(imageItem);
        });

        imagesContainer.appendChild(imageGallery);
    }

    // Render Videos Section
    if (hasVideos) {
        const videoTitle = document.createElement('h3');
        videoTitle.className = 'section-title';
        videoTitle.style.marginTop = hasImages ? '2rem' : '0';
        videoTitle.textContent = 'مقاطع الفيديو';
        imagesContainer.appendChild(videoTitle);

        const videoGallery = document.createElement('div');
        videoGallery.className = 'video-gallery';

        currentProgram.videos.forEach((video, index) => {
            const videoPath = `${currentProgram.folder}/${video}`;
            const videoItem = document.createElement('div');
            videoItem.className = 'gallery-item video-item';

            videoItem.innerHTML = `
                <video controls preload="metadata" loading="lazy">
                    <source src="${videoPath}" type="video/${video.split('.').pop()}">
                    المتصفح لا يدعم عرض الفيديو
                </video>
                <div class="video-overlay">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="20" fill="white" opacity="0.9"/>
                        <path d="M18 14L34 24L18 34V14Z" fill="#2563eb"/>
                    </svg>
                </div>
            `;

            videoGallery.appendChild(videoItem);
        });

        imagesContainer.appendChild(videoGallery);
    }
}

function setupDownloadButton() {
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.onclick = () => {
        const downloadPath = `${currentProgram.folder}/${currentProgram.exe}`;
        const link = document.createElement('a');
        link.href = downloadPath;
        link.download = currentProgram.exe;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
}

// Lightbox functionality
function openLightbox(imageIndex) {
    currentImageIndex = imageIndex;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const imagePath = `${currentProgram.folder}/${currentProgram.images[imageIndex]}`;

    lightboxImg.src = imagePath;
    lightboxCaption.textContent = `${currentProgram.name} - صورة ${imageIndex + 1} من ${currentProgram.images.length}`;
    lightbox.style.display = 'flex';

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentImageIndex += direction;

    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = currentProgram.images.length - 1;
    } else if (currentImageIndex >= currentProgram.images.length) {
        currentImageIndex = 0;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const imagePath = `${currentProgram.folder}/${currentProgram.images[currentImageIndex]}`;

    lightboxImg.src = imagePath;
    lightboxCaption.textContent = `${currentProgram.name} - صورة ${currentImageIndex + 1} من ${currentProgram.images.length}`;
}

// Close lightbox on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        changeLightboxImage(1);
    } else if (e.key === 'ArrowRight') {
        changeLightboxImage(-1);
    }
});

// Close lightbox when clicking outside the image
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

function goBack() {
    window.location.href = 'index.html';
}
