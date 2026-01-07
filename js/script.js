//menu//
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

//menu celular//
document.querySelectorAll(".submenu-parent > a").forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const submenu = link.nextElementSibling;
      submenu?.classList.toggle("open");
    }
  });
});

//form//
const form = document.querySelector(".form-contacto"); // corregido el selector
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Gracias por contactarte. Te responderemos pronto.");
    form.reset();
  });
}

//carrusel//
const slides = document.querySelectorAll(".slide");
if (slides.length > 0) {
  let current = 0;
  let interval = setInterval(nextSlide, 9000);

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    if (slides[index]) slides[index].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
}

//hambuerguesa/
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const abrir = document.getElementById("abrir");
  const cerrar = document.getElementById("cerrar");

  if (!nav || !abrir || !cerrar) {
    console.warn("⚠️ Hamburguesa: faltan elementos #nav, #abrir o #cerrar en este HTML");
    return;
  }

  abrir.addEventListener("click", () => nav.classList.add("visible"));
  cerrar.addEventListener("click", () => nav.classList.remove("visible"));
});







document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contacto-section form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        status.textContent = " ✓ ¡Gracias por tu mensaje! Te responderemos pronto.";
        status.style.color = "#1ca84a";
        form.reset();
      } else {
        status.textContent =  " ❌ Ocurrió un error. Intenta nuevamente.";
        status.style.color = "#c32727";
      }
    } catch (error) {
      status.textContent = "⚠️ No se pudo conectar. Revisá tu conexión o intentá más tarde.";
      status.style.color = "#c32727";
    }
    setTimeout(() => (status.textContent = ""), 6000);
  });
});