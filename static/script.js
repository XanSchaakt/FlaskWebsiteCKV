let aantalAfbeeldingen = 2;
let onderdelen = ["Heads", "Bodys", "Legs"];

window.addEventListener('load', () => {
  if (window.innerWidth < 768) { // ongeveer telefoonbreedte
    document.body.innerHTML = `
      <div style="padding: 2em; font-size: 1.2em; text-align: center;">
        Deze website is alleen geschikt voor computerschermen.
      </div>
    `;
  }
});

document.getElementById('info-toggle').addEventListener('click', function() {
  const infoBox = document.getElementById('info-box');
  const overlay = document.getElementById('overlay');
  
  // Toggle info box visibility
  if (infoBox.style.display === 'none' || infoBox.style.display === '') {
    infoBox.style.display = 'block';
    overlay.style.display = 'block';
    // Trigger the animation
    setTimeout(() => {
      infoBox.classList.add('slide-in');
      overlay.classList.add('fade-in');
    }, 10);
  } else {
    // Slide and fade out
    infoBox.classList.remove('slide-in');
    overlay.classList.remove('fade-in');
    infoBox.classList.add('slide-out');
    overlay.classList.add('fade-out');
    
    // Reset after animation ends (remove display after animation ends)
    setTimeout(() => {
      infoBox.style.display = 'none';
      overlay.style.display = 'none';
      infoBox.classList.remove('slide-out');
      overlay.classList.remove('fade-out');
    }, 300); // Match the duration of the animation
  }
});

// Close info box if the overlay is clicked
document.getElementById('overlay').addEventListener('click', function() {
  const infoBox = document.getElementById('info-box');
  const overlay = document.getElementById('overlay');
  
  // Slide and fade out
  infoBox.classList.remove('slide-in');
  overlay.classList.remove('fade-in');
  infoBox.classList.add('slide-out');
  overlay.classList.add('fade-out');
  
  // Reset after animation ends (remove display after animation ends)
  setTimeout(() => {
    infoBox.style.display = 'none';
    overlay.style.display = 'none';
    infoBox.classList.remove('slide-out');
    overlay.classList.remove('fade-out');
  }, 300); // Match the duration of the animation
});

let preloadedImages = [];

function preloadImages() {  
  for (let i = 1; i <= aantalAfbeeldingen; i++) {
    for (const onderdeel of onderdelen) {
      const img = new Image();
      const naam = String(i);
      img.src = `/static/tekeningen/${onderdeel}/${naam}.png`;
      
      // Store the image in the preloadedImages array, keyed by part type and index
      if (!preloadedImages[onderdeel]) {
        preloadedImages[onderdeel] = [];
      }
      preloadedImages[onderdeel][i] = img;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Laad de JSON-data in
  fetch('static/images.json')
    .then(response => response.json())
    .then(data => {
      // Functie om de afbeelding te veranderen en de infotekst bij te werken
      window.changeImage = function(type, direction) {
        const imageElement = document.getElementById(type.toLowerCase());
        let currentIndex = parseInt(imageElement.src.split('/').pop().split('.')[0]);
        let newIndex = currentIndex + direction;

        // Zorg ervoor dat de index binnen de grenzen blijft
        const maxIndex = aantalAfbeeldingen;  // Aantal afbeeldingen, update dit naar je daadwerkelijke aantal
        const minIndex = 1;

        if (newIndex > maxIndex) newIndex = minIndex;
        if (newIndex < minIndex) newIndex = maxIndex;

        // Get the preloaded image from the array
        const newImage = preloadedImages[type][newIndex];
        
        // Update the image element with the preloaded image
        imageElement.src = newImage.src;

        // Update the group and author text
        const currentImageData = data[newIndex];
        const groupText = currentImageData.group;
        const authorText = currentImageData.author;

        // Update the infotekst naast de afbeelding
        const infoText = `Groep: ${groupText}<br>Kunstenaar: ${authorText}`;
        const infoContainer = document.getElementById(`${type.toLowerCase()}-info`);
        infoContainer.innerHTML = infoText;
      };

      // Initializeer de infotekst voor de eerste afbeelding
      ['Heads', 'Bodys', 'Legs'].forEach(type => {
        const firstImageData = data[1];  // Gebruik de eerste afbeelding als default
        const groupText = firstImageData.group;
        const authorText = firstImageData.author;
        const infoText = `Groep: ${groupText}<br>Kunstenaar: ${authorText}`;
        const infoContainer = document.getElementById(`${type.toLowerCase()}-info`);
        infoContainer.innerHTML = infoText;
      });
    });
});

// Zorg ervoor dat de preloadImages functie wordt aangeroepen wanneer de pagina is geladen
window.addEventListener('load', preloadImages);