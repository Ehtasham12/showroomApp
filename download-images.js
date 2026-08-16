const https = require('https');
const fs = require('fs');
const path = require('path');

const imageUrls = [
  { name: 'honda-civic.jpg', url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b' },
  { name: 'toyota-corolla.jpg', url: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1' },
  { name: 'suzuki-swift.jpg', url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891' },
  { name: 'hyundai-elantra.jpg', url: 'https://images.unsplash.com/photo-1494976388531-d1058bb78471' },
  { name: 'kia-picanto.jpg', url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1' },
  { name: 'toyota-fortuner.jpg', url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891' },
  { name: 'honda-city.jpg', url: 'https://images.unsplash.com/photo-1533473359331-35a27dc5f4c2' },
  { name: 'mazda-3.jpg', url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891' },
  { name: 'nissan-xtrail.jpg', url: 'https://images.unsplash.com/photo-1507950547519-052be6079646' },
  { name: 'mitsubishi-attrage.jpg', url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891' },
  { name: 'volkswagen-jetta.jpg', url: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1' },
  { name: 'chevrolet-cruze.jpg', url: 'https://images.unsplash.com/photo-1507399589159-5f1bfc64e2b7' },
];

const imagesDir = path.join(__dirname, 'apps/web/public/images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

let downloaded = 0;
let failed = 0;

imageUrls.forEach((item) => {
  const filePath = path.join(imagesDir, item.name);

  https.get(item.url, (response) => {
    // Follow redirects
    if (response.statusCode === 301 || response.statusCode === 302) {
      const redirectUrl = response.headers.location;
      https.get(redirectUrl, (res) => {
        const file = fs.createWriteStream(filePath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          downloaded++;
          console.log(`✅ Downloaded: ${item.name}`);
          if (downloaded + failed === imageUrls.length) {
            console.log(`\n🎉 Download complete! ${downloaded} success, ${failed} failed`);
          }
        });
      });
    } else if (response.statusCode === 200) {
      const file = fs.createWriteStream(filePath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        downloaded++;
        console.log(`✅ Downloaded: ${item.name}`);
        if (downloaded + failed === imageUrls.length) {
          console.log(`\n🎉 Download complete! ${downloaded} success, ${failed} failed`);
        }
      });
    } else {
      failed++;
      console.log(`⚠️  Failed to download ${item.name} - Status: ${response.statusCode}`);
      if (downloaded + failed === imageUrls.length) {
        console.log(`\n🎉 Download complete! ${downloaded} success, ${failed} failed`);
      }
    }
  }).on('error', (err) => {
    failed++;
    fs.unlink(filePath, () => {});
    console.error(`❌ Error downloading ${item.name}: ${err.message}`);
    if (downloaded + failed === imageUrls.length) {
      console.log(`\n🎉 Download complete! ${downloaded} success, ${failed} failed`);
    }
  });
});
