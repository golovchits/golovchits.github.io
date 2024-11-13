const textContainer = document.getElementById("textContainer");

// Array of text strings to display in order
const textArray = [
  "Heyyyy!",
  "I'm still working on this :)",
  "Hi!",
  "Feel the vibe?",
];

let textIndex = 0;

// Function to show text with fade in/out effect
function showTextInOrder() {
  // Set the text to the current item in the array
  textContainer.textContent = textArray[textIndex];
  
  // Fade in
  textContainer.style.opacity = 1;
  
  // Wait and then fade out
  setTimeout(() => {
    textContainer.style.opacity = 0;
  }, 3000);
  
  // Move to the next text, looping back to the start if at the end
  textIndex = (textIndex + 1) % textArray.length;
}

// Show text immediately, then repeat every 4 seconds
showTextInOrder();  // Show first text immediately
setInterval(showTextInOrder, 4000);  // Repeat every 4 seconds
