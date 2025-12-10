document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const letterContent = document.getElementById("letterContent");
  const agreeButton = document.getElementById("agreeButton");

  if (envelope) {
    envelope.addEventListener("click", () => {
      // Animate the envelope away
      envelope.classList.add("opened");

      // Reveal the letter content
      if (letterContent) {
        letterContent.classList.add("visible");
        letterContent.setAttribute("aria-hidden", "false");
      }
    });
  }

  if (agreeButton) {
    agreeButton.addEventListener("click", () => {
      // Go to the song page
      window.location.href = "song.html";
    });
  }
});
