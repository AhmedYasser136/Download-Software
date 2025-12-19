// List of application data files
const appDataFiles = [
    'data/electronics-management.json',
    'data/gym-management.json'
];

// Store carousel intervals
const carouselIntervals = [];

// Function to load all applications
async function loadApplications() {
    const appsGrid = document.getElementById('apps-grid');

    try {
        // Load all app data files
        const appPromises = appDataFiles.map(file =>
            fetch(file).then(response => response.json())
        );

        const apps = await Promise.all(appPromises);

        // Generate cards for each application
        apps.forEach((app, index) => {
            const card = createAppCard(app, index);
            appsGrid.appendChild(card);
            // Start carousel for this card - detects image count automatically
            initializeCardCarousel(index);
        });

    } catch (error) {
        console.error('Error loading applications:', error);
        appsGrid.innerHTML = '<p class="error-message">حدث خطأ في تحميل التطبيقات</p>';
    }
}

// Function to create an app card with carousel
function createAppCard(app, cardIndex) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.dataset.cardIndex = cardIndex;

    // Create carousel HTML for images
    const carouselHTML = `
        <div class="card-carousel" data-carousel="${cardIndex}">
            ${app.images.map((image, imgIndex) => `
                <div class="card-slide ${imgIndex === 0 ? 'active' : ''}" data-slide="${imgIndex}">
                    <img src="${image}" alt="${app.name} - صورة ${imgIndex + 1}" loading="lazy">
                </div>
            `).join('')}
            ${app.images.length > 1 ? `
                <div class="card-carousel-dots">
                    ${app.images.map((_, imgIndex) => `
                        <span class="card-dot ${imgIndex === 0 ? 'active' : ''}" data-dot="${imgIndex}"></span>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;

    card.innerHTML = `
        <div class="app-card-image">
            ${carouselHTML}
        </div>
        <div class="app-card-content">
            <h3 class="app-card-title">${app.name}</h3>
            <p class="app-card-description">${app.shortDescription}</p>
            <p class="app-card-version">الإصدار: ${app.version}</p>
            <div class="app-card-actions">
                <a href="pages/app-detail.html?id=${app.id}" class="btn btn-primary">عرض التفاصيل</a>
                <a href="${app.downloadLink}" class="btn btn-download" download>
                    <span>تحميل</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </a>
            </div>
        </div>
    `;

    return card;
}

// Function to initialize carousel for a specific card
function initializeCardCarousel(cardIndex) {
    const carousel = document.querySelector(`[data-carousel="${cardIndex}"]`);
    if (!carousel) return;

    // Dynamically detect the number of images from the actual DOM
    const slides = carousel.querySelectorAll('.card-slide');
    const imageCount = slides.length;

    if (imageCount <= 1) return; // Don't start carousel if only one image

    let currentIndex = 0;

    const interval = setInterval(() => {
        // Re-query in case DOM changed
        const currentSlides = carousel.querySelectorAll('.card-slide');
        const currentDots = carousel.querySelectorAll('.card-dot');
        const currentImageCount = currentSlides.length;

        if (currentImageCount === 0) {
            clearInterval(interval);
            return;
        }

        // Remove active class from current
        if (currentSlides[currentIndex]) {
            currentSlides[currentIndex].classList.remove('active');
        }
        if (currentDots[currentIndex]) {
            currentDots[currentIndex].classList.remove('active');
        }

        // Move to next slide (loop back to 0 if we exceed the count)
        currentIndex = (currentIndex + 1) % currentImageCount;

        // Add active class to new slide
        if (currentSlides[currentIndex]) {
            currentSlides[currentIndex].classList.add('active');
        }
        if (currentDots[currentIndex]) {
            currentDots[currentIndex].classList.add('active');
        }

    }, 3000); // Change image every 3 seconds

    carouselIntervals.push(interval);
}

// Load applications when page loads
document.addEventListener('DOMContentLoaded', loadApplications);
