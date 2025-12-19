// Main JavaScript file for Download Software
// Dynamically generates program cards from data.js

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const appsGrid = document.getElementById('apps-grid');

    if (!appsGrid) {
        console.error('Apps grid container not found');
        return;
    }

    // Generate cards for all programs
    generateProgramCards(appsGrid);
}

function generateProgramCards(container) {
    // Clear existing content
    container.innerHTML = '';

    // Generate a card for each program
    programsData.programs.forEach(program => {
        const card = createProgramCard(program);
        container.appendChild(card);
    });
}

function createProgramCard(program) {
    // Create card element
    const card = document.createElement('div');
    card.className = 'app-card';
    card.setAttribute('data-program-id', program.id);

    // Get thumbnail image: prioritize 'default' image, otherwise use first image
    const hasImages = program.images && program.images.length > 0;
    let thumbnailImage = '';

    if (hasImages) {
        // Look for an image named 'default' (with any extension)
        const defaultImage = program.images.find(img =>
            img.toLowerCase().startsWith('default.')
        );

        // Use default image if found, otherwise use first image
        thumbnailImage = defaultImage || program.images[0];
    }

    const thumbnailPath = thumbnailImage ? `${program.folder}/${thumbnailImage}` : '';

    // Build card HTML
    const imageHTML = hasImages
        ? `<img src="${thumbnailPath}" alt="${program.name}" onerror="handleImageError(this)">`
        : `<div class="no-image-placeholder">
               <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <rect width="64" height="64" rx="8" fill="#e2e8f0"/>
                   <path d="M32 20C29.8 20 28 21.8 28 24C28 26.2 29.8 28 32 28C34.2 28 36 26.2 36 24C36 21.8 34.2 20 32 20ZM20 40V44H44V36L36 28L28 36L24 32L20 40Z" fill="#94a3b8"/>
               </svg>
               <p>لا توجد صور</p>
           </div>`;

    card.innerHTML = `
        <div class="app-card-image ${!hasImages ? 'no-image' : ''}">
            ${imageHTML}
            <div class="image-count">${program.images.length} صور</div>
        </div>
        <div class="app-card-content">
            <h3 class="app-title">${program.name}</h3>
            <p class="app-description">${program.description}</p>
            <div class="app-meta">
                <span class="version">الإصدار ${program.version}</span>
            </div>
            <div class="app-actions">
                <button class="btn btn-primary btn-view" onclick="viewProgramDetails('${program.id}')">
                    عرض التفاصيل
                </button>
                <button class="btn btn-download" onclick="downloadProgram('${program.id}')">
                    <span>تحميل</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12L3 7L4.4 5.6L7 8.2V0H9V8.2L11.6 5.6L13 7L8 12Z" fill="currentColor"/>
                        <path d="M0 14H16V16H0V14Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    return card;
}

function handleImageError(img) {
    // If image fails to load, hide it and show a placeholder
    const cardImage = img.closest('.app-card-image');
    if (cardImage) {
        img.style.display = 'none';
        cardImage.classList.add('no-image');
        cardImage.insertAdjacentHTML('afterbegin', `
            <div class="no-image-placeholder">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="8" fill="#e2e8f0"/>
                    <path d="M32 20C29.8 20 28 21.8 28 24C28 26.2 29.8 28 32 28C34.2 28 36 26.2 36 24C36 21.8 34.2 20 32 20ZM20 40V44H44V36L36 28L28 36L24 32L20 40Z" fill="#94a3b8"/>
                </svg>
                <p>الصورة غير متاحة</p>
            </div>
        `);
    }
}

function viewProgramDetails(programId) {
    // Store the program ID in sessionStorage for the details page
    sessionStorage.setItem('currentProgramId', programId);

    // Navigate to details page
    window.location.href = 'program-details.html';
}

function downloadProgram(programId) {
    const program = programsData.programs.find(p => p.id === programId);

    if (!program) {
        alert('البرنامج غير موجود');
        return;
    }

    const downloadPath = `${program.folder}/${program.exe}`;

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = downloadPath;
    link.download = program.exe;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
