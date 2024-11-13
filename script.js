const textContainer = document.getElementById("textContainer");

// Array of random text strings
const textArray = [
  "Welcome to our site!",
  "Experience the magic of gradients",
  "Creativity has no limits",
  "Innovate, Design, Inspire",
  "Embrace the randomness",
  "Feel the fade",
];

// Function to show random text with fade in/out effect
function showRandomText() {
  const randomText = textArray[Math.floor(Math.random() * textArray.length)];
  textContainer.textContent = randomText;
  
  // Fade in
  textContainer.style.opacity = 1;
  
  // Wait and then fade out
  setTimeout(() => {
    textContainer.style.opacity = 0;
  }, 3000);
}

// Change text every 4 seconds
setInterval(showRandomText, 4000);
