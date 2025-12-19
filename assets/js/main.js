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

    // Get the first image as thumbnail
    const thumbnailPath = program.images.length > 0
        ? `${program.folder}/${program.images[0]}`
        : 'assets/images/placeholder.png';

    // Build card HTML
    card.innerHTML = `
        <div class="app-card-image">
            <img src="${thumbnailPath}" alt="${program.name}" onerror="this.src='assets/images/placeholder.png'">
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
