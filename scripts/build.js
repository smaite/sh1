/**
 * Build script for Netlify deployment
 * Copies and optimizes files for production
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public');
const distDir = path.join(__dirname, '..', 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('🚀 Building for Netlify...');

// Copy all files from public to dist
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy public folder to dist
copyDir(srcDir, distDir);

console.log('✅ Build complete! Files copied to dist/');
console.log('📦 Ready for Netlify deployment');
