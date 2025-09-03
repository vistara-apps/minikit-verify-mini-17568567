/**
 * This script generates placeholder images for the Farcaster frames
 * 
 * In a real application, you would replace these with actual designed images
 * 
 * To run this script:
 * 1. Install the required packages: npm install canvas
 * 2. Run the script: node scripts/generate-images.js
 */

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Ensure the public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Frame image dimensions (1:1 aspect ratio)
const width = 1200;
const height = 1200;

// Generate welcome image
function generateWelcomeImage() {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.font = 'bold 80px Arial';
  ctx.fillStyle = '#3B82F6';
  ctx.textAlign = 'center';
  ctx.fillText('Minikit Verify', width / 2, height / 3);

  // Subtitle
  ctx.font = '40px Arial';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('Verify your identity with Base Mini App', width / 2, height / 2);

  // Button hint
  ctx.font = '30px Arial';
  ctx.fillStyle = '#8B5CF6';
  ctx.fillText('Click "Verify Now" to continue', width / 2, height * 0.7);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'welcome.png'), buffer);
  console.log('Generated welcome.png');
}

// Generate success image
function generateSuccessImage() {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // Success icon (circle with checkmark)
  ctx.beginPath();
  ctx.arc(width / 2, height / 3, 100, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();

  // Checkmark
  ctx.beginPath();
  ctx.moveTo(width / 2 - 40, height / 3);
  ctx.lineTo(width / 2, height / 3 + 40);
  ctx.lineTo(width / 2 + 60, height / 3 - 40);
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#F8FAFC';
  ctx.stroke();

  // Title
  ctx.font = 'bold 60px Arial';
  ctx.fillStyle = '#10B981';
  ctx.textAlign = 'center';
  ctx.fillText('Verification Successful!', width / 2, height / 2 + 50);

  // Subtitle
  ctx.font = '30px Arial';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('Your identity has been verified', width / 2, height / 2 + 120);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'success.png'), buffer);
  console.log('Generated success.png');
}

// Generate error image
function generateErrorImage() {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // Error icon (circle with X)
  ctx.beginPath();
  ctx.arc(width / 2, height / 3, 100, 0, Math.PI * 2);
  ctx.fillStyle = '#EF4444';
  ctx.fill();

  // X mark
  ctx.beginPath();
  ctx.moveTo(width / 2 - 40, height / 3 - 40);
  ctx.lineTo(width / 2 + 40, height / 3 + 40);
  ctx.moveTo(width / 2 + 40, height / 3 - 40);
  ctx.lineTo(width / 2 - 40, height / 3 + 40);
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#F8FAFC';
  ctx.stroke();

  // Title
  ctx.font = 'bold 60px Arial';
  ctx.fillStyle = '#EF4444';
  ctx.textAlign = 'center';
  ctx.fillText('Verification Failed', width / 2, height / 2 + 50);

  // Subtitle
  ctx.font = '30px Arial';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('Please try again', width / 2, height / 2 + 120);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'error.png'), buffer);
  console.log('Generated error.png');
}

// Generate home image
function generateHomeImage() {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.font = 'bold 80px Arial';
  ctx.fillStyle = '#3B82F6';
  ctx.textAlign = 'center';
  ctx.fillText('Minikit Verify', width / 2, height / 3);

  // Subtitle
  ctx.font = '40px Arial';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('Base Mini App', width / 2, height / 2);

  // Button hint
  ctx.font = '30px Arial';
  ctx.fillStyle = '#8B5CF6';
  ctx.fillText('Click "Start Over" to begin again', width / 2, height * 0.7);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'home.png'), buffer);
  console.log('Generated home.png');
}

// Generate OG image
function generateOgImage() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 1200, 630);

  // Title
  ctx.font = 'bold 60px Arial';
  ctx.fillStyle = '#3B82F6';
  ctx.textAlign = 'center';
  ctx.fillText('Minikit Verify', 600, 200);

  // Subtitle
  ctx.font = '30px Arial';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('Verify your identity with Base Mini App', 600, 300);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), buffer);
  console.log('Generated og-image.png');
}

// Generate all images
generateWelcomeImage();
generateSuccessImage();
generateErrorImage();
generateHomeImage();
generateOgImage();

console.log('All images generated successfully!');

