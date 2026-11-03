// 1. Dark mode: one button adds or removes the class "dark" on body.
// The colours themselves are in css/style.css (body.dark).
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  // The button shows what a click will switch to: moon for dark, sun for light.
  themeBtn.textContent = isDark ? "☀️" : "🌙";
});

// Skip the cursor effects for people who prefer less motion.
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scroll reveal: when an element with class "reveal" enters the screen,
// add the class "visible". The fade and slide are done in the CSS.
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);  // reveal only once
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(function (item) {
  revealObserver.observe(item);
});

if (!calm) {
  // 2. Small dot: tell the CSS where the mouse is.
  document.addEventListener("mousemove", function (event) {
    document.body.style.setProperty("--cursor", "1");
    document.body.style.setProperty("--mx", event.clientX + "px");
    document.body.style.setProperty("--my", event.clientY + "px");
  });

  // The dot disappears when the mouse leaves the window.
  document.documentElement.addEventListener("mouseleave", function () {
    document.body.style.setProperty("--cursor", "0");
  });

  // 3. Cards: tilt toward the cursor and move the glow under it.
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      const box = card.getBoundingClientRect();
      const x = event.clientX - box.left;   // cursor position inside the card
      const y = event.clientY - box.top;
      const tiltX = (y / box.height - 0.5) * -10;  // up to 5 degrees
      const tiltY = (x / box.width - 0.5) * 10;

      card.style.setProperty("--rx", tiltX + "deg");
      card.style.setProperty("--ry", tiltY + "deg");
      card.style.setProperty("--gx", x + "px");
      card.style.setProperty("--gy", y + "px");
    });

    card.addEventListener("mouseleave", function () {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  // 4. Buttons: lean a little toward the cursor when it is close.
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("mousemove", function (event) {
      const box = btn.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);

      btn.style.setProperty("--bx", dx * 0.2 + "px");
      btn.style.setProperty("--by", dy * 0.3 + "px");
    });

    btn.addEventListener("mouseleave", function () {
      btn.style.setProperty("--bx", "0px");
      btn.style.setProperty("--by", "0px");
    });
  });
}
