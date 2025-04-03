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


function changeImage(type, direction) {
  const imageElement = document.getElementById(type.toLowerCase());
  let currentIndex = parseInt(imageElement.src.split('/').pop().split('.')[0]);
  let newIndex = currentIndex + direction;
  
  // Prevent out of bounds
  const maxIndex = 5;  // Update this to the actual number of images available
  const minIndex = 1;
  
  if (newIndex > maxIndex) newIndex = minIndex;
  if (newIndex < minIndex) newIndex = maxIndex;
  
  imageElement.src = `static/tekeningen/${type}/${newIndex}.png`;
}
