const textContainer = document.getElementById("textContainer");

// Array of random text strings
const textArray = [
  "Heyyyy!",
  "I'm still working on this :)",
  "Hi!",
  "hello",
  "Feel the vibe?",
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
  
  // Show text immediately, then repeat every 4 seconds
  showRandomText();  // Show first text immediately
  setInterval(showRandomText, 4000);  // Repeat every 4 seconds
