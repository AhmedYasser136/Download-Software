// Get app ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const appId = urlParams.get('id');

// Map app IDs to their data files
const appDataMap = {
    'electronics-management': '../data/electronics-management.json',
    'gym-management': '../data/gym-management.json'
};

let currentSlideIndex = 0;
let slideInterval;

// Function to load app details
async function loadAppDetails() {
    const container = document.getElementById('app-detail-container');

    if (!appId || !appDataMap[appId]) {
        container.innerHTML = '<p class="error-message">التطبيق غير موجود</p>';
        return;
    }

    try {
        const response = await fetch(appDataMap[appId]);
        const app = await response.json();

        // Update page title
        document.title = `${app.name} - Download Software`;

        // Render app details
        container.innerHTML = `
            <div class="app-detail">
                <div class="app-header">
                    <h1>${app.name}</h1>
                    <p class="app-version">الإصدار: ${app.version}</p>
                </div>

                <div class="app-description">
                    <p class="main-description">${app.fullDescription}</p>
                </div>

                <div class="image-slider-container">
                    <div class="slider-wrapper">
                        <button class="slider-btn slider-btn-prev" onclick="changeSlide(-1)" aria-label="Previous">
                            ❮
                        </button>
                        <div class="image-slider" id="imageSlider">
                            ${app.images.map((image, index) => `
                                <div class="slide ${index === 0 ? 'active' : ''}">
                                    <img src="../${image}" alt="${app.name} Screenshot ${index + 1}" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                        <button class="slider-btn slider-btn-next" onclick="changeSlide(1)" aria-label="Next">
                            ❯
                        </button>
                    </div>
                    <div class="slider-dots" id="sliderDots">
                        ${app.images.map((_, index) => `
                            <span class="dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
                        `).join('')}
                    </div>
                </div>

                ${app.features && app.features.length > 0 ? `
                    <div class="app-features">
                        <h2>المميزات</h2>
                        <div class="features-grid">
                            ${app.features.map(feature => `
                                <div class="feature-item">
                                    <h3>${feature.title}</h3>
                                    <p>${feature.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="app-download-section">
                    <a href="../${app.downloadLink}" class="btn-download-large" download>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>تحميل التطبيق الآن</span>
                    </a>
                    <p class="download-info">متوافق مع Windows | الإصدار ${app.version}</p>
                </div>
            </div>
        `;

        // Start automatic slideshow
        startSlideshow();

    } catch (error) {
        console.error('Error loading app details:', error);
        container.innerHTML = '<p class="error-message">حدث خطأ في تحميل تفاصيل التطبيق</p>';
    }
}

// Function to change slide
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    // Calculate new index
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');

    // Reset slideshow timer
    resetSlideshow();
}

// Function to go to specific slide
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) return;

    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    // Set new index
    currentSlideIndex = index;

    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');

    // Reset slideshow timer
    resetSlideshow();
}

// Function to start automatic slideshow
function startSlideshow() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Function to reset slideshow timer
function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

// Pause slideshow on hover
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('imageSlider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        slider.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
});

// Load app details when page loads
document.addEventListener('DOMContentLoaded', loadAppDetails);
