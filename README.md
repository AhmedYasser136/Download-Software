# Download Software - Dynamic Program Showcase

A fully dynamic, auto-updating software download page built with pure HTML, CSS, and JavaScript.

## 🚀 Features

- **100% Automatic** - Scans folders and generates program data automatically
- **No Manual Updates** - Add/remove files, run one command, done!
- **Pure Frontend** - No backend or database required
- **Responsive Design** - Works on all devices
- **Image Gallery** - Lightbox viewer with keyboard navigation
- **RTL Support** - Arabic language ready

## 📁 Project Structure

```
Download-Software/
├── index.html                 # Main page
├── program-details.html       # Program details page
├── assets/
│   ├── css/
│   │   └── styles.css         # All styles
│   └── js/
│       ├── data.js            # AUTO-GENERATED - Don't edit manually!
│       ├── main.js            # Main page logic
│       └── details.js         # Details page logic
├── Program Folder 1/          # Your program folders
│   ├── image1.png
│   ├── image2.jpg
│   └── program.exe
├── Program Folder 2/
│   └── ...
├── generate-data.js           # Auto-generate script
├── watch-and-generate.js      # Optional file watcher
└── package.json
```

## 🎯 Quick Start

### Option 1: Manual Generation (Recommended)

1. **Organize your programs**
   ```
   Download-Software/
   ├── My Program/
   │   ├── screenshot1.png
   │   ├── screenshot2.png
   │   └── My Program Setup 1.0.0.exe
   └── Another Program/
       ├── image.jpg
       └── Another Program.exe
   ```

2. **Generate data.js**
   ```bash
   node generate-data.js
   ```

   Or using npm:
   ```bash
   npm run generate
   ```

3. **Open index.html in your browser**

4. **That's it!** Every time you add/remove/modify files, just run the command again.

### Option 2: Automatic Watch Mode (Advanced)

Keep the script running to auto-regenerate on file changes:

```bash
npm run watch
```

The script will monitor your program folders and automatically regenerate data.js whenever you:
- Add new images
- Delete images
- Rename files
- Add new executables

## 📝 How to Add a New Program

1. **Create a new folder** in the root directory with your program name
   ```
   My New Program/
   ```

2. **Add files** to the folder:
   - Images (JPG, PNG, GIF, WebP, BMP, SVG)
   - Videos (MP4, WebM, OGG, MOV)
   - One .exe file (for download)
   - *Optional*: Add an image named `default.png` (or .jpg, .jpeg, etc.) to use as the card thumbnail

3. **Run the generator**:
   ```bash
   npm run generate
   ```

4. **Refresh your browser** - The new program appears automatically!

## 🔄 Updating Existing Programs

### Adding/Removing Images
1. Add or delete image files in the program folder
2. Run: `npm run generate`
3. Refresh browser

### Changing the Executable
1. Replace the .exe file
2. Run: `npm run generate`
3. The download button updates automatically

### Preserving Custom Descriptions
If you've edited program descriptions in data.js and want to keep them:

```bash
npm run generate-preserve
```

This preserves your custom descriptions while updating everything else.

## 🎨 Customizing Descriptions

After generating data.js, you can edit descriptions:

```javascript
{
    id: "my-program",
    name: "My Program",
    description: "نظام إدارة متكامل",  // Edit this!
    // ...
}
```

Next time you regenerate, use:
```bash
npm run generate-preserve
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `node generate-data.js` | Generate data.js from folders |
| `npm run generate` | Same as above (shortcut) |
| `npm run generate-preserve` | Generate while keeping custom descriptions |
| `npm run watch` | Auto-regenerate on file changes |

## 🖼️ Media Support

### Images
Supported image formats:
- JPG/JPEG
- PNG
- GIF (animated GIFs supported!)
- WebP
- BMP
- SVG

Images are automatically:
- Detected and listed
- Sorted alphabetically
- Displayed in gallery
- Shown in lightbox viewer

### Videos
Supported video formats:
- MP4
- WebM
- OGG
- MOV

Videos are automatically:
- Detected and listed
- Sorted alphabetically
- Displayed with HTML5 video player
- Playable directly in the details page

**Card Thumbnail Selection:**
- If a file named `default.png` (or .jpg, .jpeg, etc.) exists, it will be used as the card thumbnail
- Otherwise, the first image (alphabetically) is used as the thumbnail
- Videos are NOT used as thumbnails (images only)
- This allows you to control which image appears on the program card

## 💾 Executable Files

- Only `.exe` files are detected as executables
- The first `.exe` found in a folder becomes the download file
- Version numbers are auto-extracted from filename
  - Example: `Program Setup 1.2.3.exe` → Version: 1.2.3
  - If no version found, defaults to 1.0.0

## 🔧 Advanced Configuration

Edit `generate-data.js` to customize:

```javascript
const CONFIG = {
    excludeDirs: ['assets', 'node_modules', '.git'],  // Folders to ignore
    imageExtensions: ['.jpg', '.png', '.gif'],        // Supported images
    exeExtension: '.exe'                              // Executable extension
};
```

## 🌐 Browser Requirements

- Modern browsers (Chrome, Firefox, Edge, Safari)
- JavaScript enabled
- No special permissions needed

## 📱 Responsive Design

- Desktop: Grid layout with multiple columns
- Tablet: Adjusted grid
- Mobile: Single column layout

## 🎹 Keyboard Shortcuts (Details Page)

- `ESC` - Close lightbox
- `←` / `→` - Navigate images (in lightbox)

## 🚫 What's Excluded

The generator automatically ignores:
- `assets/` folder
- `node_modules/`
- `.git/`
- `.vscode/`
- Any folder starting with `.`
- Files like `index.html`, `package.json`, etc.

## 💡 Tips

1. **Naming Convention**: Use descriptive folder names - they become program titles
2. **Custom Thumbnail**: Add a file named `default.png` (or .jpg) to set a custom card thumbnail
3. **First Image**: If no `default` image exists, the first image (alphabetically) becomes the thumbnail
4. **Version Numbers**: Include version in .exe filename for auto-detection
5. **Image Order**: Rename images with numbers to control order (01-image.png, 02-image.png)
6. **Testing**: After generating, always refresh your browser to see changes

## 🐛 Troubleshooting

### "No program folders found"
- Make sure you have folders (not just files) in the root directory
- Check that folders aren't in the exclude list

### Images not showing
- Verify image file extensions are supported
- Check file permissions
- Look for typos in filenames (case-sensitive on some systems)

### Download not working
- Ensure the .exe file exists in the folder
- Check browser security settings (may block .exe downloads)
- Try a different browser

### Changes not appearing
- Did you run `npm run generate`?
- Did you refresh your browser (Ctrl+F5 for hard refresh)?
- Check browser console for errors (F12)

## 📦 No Installation Required

This is a static site - no web server needed! Just:
1. Run the generator script
2. Open index.html in any browser
3. Done!

For deployment, upload all files to any web host (GitHub Pages, Netlify, etc.)

## 🔐 Security Note

When sharing online, be aware that .exe files may be flagged by browsers as potentially unsafe. Consider:
- Using zip files instead
- Hosting executables on a trusted platform
- Adding virus scan badges/certificates

## 📄 License

MIT - Free to use and modify

---

**Need Help?** Check the script output for detailed information about what was scanned and generated.
