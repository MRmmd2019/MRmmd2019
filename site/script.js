// تغییر تم تاریک/روشن
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// انیمیشن هنگام اسکرول
const animatedItems = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

animatedItems.forEach((item) => observer.observe(item));

// منوی همبرگری موبایل
const burgerMenu = document.getElementById("burgerMenu");
const navLinks = document.getElementById("navLinks");

burgerMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
