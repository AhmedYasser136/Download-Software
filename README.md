# Download Software - Desktop Applications Showcase

A dynamic website platform for showcasing and distributing desktop applications with an automatic card generation system and image carousel.

## Features

✨ **Dynamic Application Cards** - Automatically generated from JSON data files
🖼️ **Auto Image Carousel** - Smooth slideshow on both index and detail pages
🔄 **Continuous Auto-Play** - Images cycle automatically every 3 seconds
📱 **Responsive Design** - Works perfectly on all devices
🔧 **Easy to Maintain** - Add new apps without touching existing code
🎨 **Professional UI** - Modern, clean design with Arabic RTL support
🎯 **Independent Carousels** - Each app card has its own auto-playing slideshow

## Project Structure

```
Download-Software/
├── index.html                          # Main landing page
├── data/                               # Application data files (JSON)
│   ├── electronics-management.json
│   └── gym-management.json
├── pages/                              # Individual app pages
│   └── app-detail.html                 # Reusable detail page
├── assets/
│   ├── css/
│   │   └── styles.css                  # All styling
│   └── js/
│       ├── main.js                     # Index page logic
│       └── app-detail.js               # Detail page & slider logic
├── Electronics Management System/       # App 1 folder
│   ├── Electronics Management System Setup 1.0.0.exe
│   └── [screenshots...]
└── Gym Management System/               # App 2 folder
    ├── Gym Management System Setup 3.1.0.exe
    └── [screenshots...]
```

## How to Add a New Application

Follow these simple steps to add a new desktop application:

### Step 1: Prepare Your Application Folder

1. Create a new folder with your application name (e.g., `My New App/`)
2. Place your `.exe` installer file in this folder
3. Add all application screenshots/images to this folder

### Step 2: Create a Data File

Create a new JSON file in the `data/` folder (e.g., `data/my-new-app.json`):

```json
{
  "id": "my-new-app",
  "name": "My Application Name",
  "shortDescription": "Short description for the card (1-2 lines)",
  "fullDescription": "Detailed description for the detail page",
  "version": "1.0.0",
  "coverImage": "My New App/cover-screenshot.png",
  "downloadLink": "My New App/My App Setup 1.0.0.exe",
  "images": [
    "My New App/screenshot1.png",
    "My New App/screenshot2.png",
    "My New App/screenshot3.png"
  ],
  "features": [
    {
      "title": "Feature 1",
      "description": "Description of feature 1"
    },
    {
      "title": "Feature 2",
      "description": "Description of feature 2"
    }
  ]
}
```

**Important JSON Fields:**
- `id`: Unique identifier (use lowercase with hyphens)
- `coverImage`: The main image shown on the card
- `downloadLink`: Path to the .exe file
- `images`: Array of all screenshots (will appear in the carousel)
- `features`: Optional array of features (can be empty)

### Step 3: Register the Data File

Open `assets/js/main.js` and add your new data file to the `appDataFiles` array:

```javascript
const appDataFiles = [
    'data/electronics-management.json',
    'data/gym-management.json',
    'data/my-new-app.json'  // Add this line
];
```

### Step 4: Register in Detail Page

Open `assets/js/app-detail.js` and add your app to the `appDataMap`:

```javascript
const appDataMap = {
    'electronics-management': '../data/electronics-management.json',
    'gym-management': '../data/gym-management.json',
    'my-new-app': '../data/my-new-app.json'  // Add this line
};
```

### Step 5: Done!

That's it! Your new application will now:
- ✅ Appear automatically on the index page as a card with auto-playing carousel
- ✅ Have its own detail page with full-size image carousel
- ✅ Include download button
- ✅ Show all screenshots in smooth, continuous slideshows

## Image Carousel Features

### Index Page Card Carousels
Each app card on the main page includes:
- 🔄 **Auto-play**: Changes images every 3 seconds automatically
- ♾️ **Infinite Loop**: Continuously cycles through all images
- 🔘 **Dot Indicators**: Shows which image is currently displayed
- 🖼️ **Dynamic**: Works with any number of images (1 to unlimited)
- 🎯 **Independent**: Each card runs its own carousel independently

### Detail Page Carousel
The detail page carousel includes all features above plus:
- ⏸️ **Pause on Hover**: Stops when mouse is over the slider (detail page only)
- ⬅️➡️ **Navigation Buttons**: Previous/Next buttons to manually control
- 🔘 **Clickable Dots**: Jump to any specific image by clicking dots
- 🔄 **Auto-play**: Changes slides every 4 seconds
- 📐 **Responsive**: Adjusts size based on screen size

## Customization

### Change Slideshow Speed

**For Index Page Cards** - Edit `assets/js/main.js`, line 112:

```javascript
}, 3000); // Change this number (milliseconds) - currently 3 seconds
```

**For Detail Page** - Edit `assets/js/app-detail.js`, line with `setInterval`:

```javascript
slideInterval = setInterval(() => {
    changeSlide(1);
}, 4000); // Change this number (milliseconds) - currently 4 seconds
```

### Change Colors

Edit `assets/css/styles.css`, the `:root` section:

```css
:root {
    --primary-color: #667eea;     /* Main theme color */
    --primary-dark: #5568d3;      /* Darker shade */
    --secondary-color: #764ba2;   /* Secondary color */
    /* ... */
}
```

### Modify Card Layout

In `assets/css/styles.css`, adjust the grid:

```css
.apps-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
}
```

## Testing Your Changes

1. Open `index.html` in a web browser
2. Verify your new app card appears
3. Click "عرض التفاصيل" to open the detail page
4. Check that all images appear in the carousel
5. Test the download button

## Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Important Notes

⚠️ **File Paths**: Make sure all file paths in JSON are relative to the root folder
⚠️ **Image Format**: Supported formats: PNG, JPG, JPEG, GIF
⚠️ **File Names**: Avoid special characters in folder/file names
⚠️ **JSON Syntax**: Validate your JSON files (use a JSON validator online)

## Troubleshooting

**App card not appearing?**
- Check that the JSON file path is correct in `main.js`
- Validate your JSON syntax
- Check browser console for errors (F12)

**Images not loading?**
- Verify image paths in JSON are correct
- Check that image files exist in the folder
- Make sure file extensions match (case-sensitive on some systems)

**Carousel not working?**
- Ensure app ID matches in both JS files
- Check that images array is not empty
- Look for JavaScript errors in browser console

## License

© 2025 Download Software - All Rights Reserved

---

**Need Help?** Check the browser console (F12) for error messages that can help diagnose issues.
