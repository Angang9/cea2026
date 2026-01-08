
document.addEventListener("DOMContentLoaded", () => {


  const nav    = document.getElementById("nav");
  const abrir  = document.getElementById("abrir");   // botón hamburguesa
  const cerrar = document.getElementById("cerrar");  // botón X

  if (nav && abrir && cerrar) {
    abrir.addEventListener("click", () => nav.classList.add("visible"));
    cerrar.addEventListener("click", () => nav.classList.remove("visible"));

    nav.querySelectorAll(".nav-links > li > a").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (window.innerWidth > 768) return;

      
        if (a.closest(".submenu-parent")) return;

        nav.classList.remove("visible");
      });
    });


    nav.querySelectorAll(".submenu-parent > a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();

          const parent = link.closest(".submenu-parent");
          if (parent) parent.classList.toggle("open");
        }
      });
    });

   
    nav.querySelectorAll(".submenu a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 768) nav.classList.remove("visible");
      });
    });
  }

  const formSimple = document.querySelector(".form-contacto");
  if (formSimple) {
    formSimple.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Gracias por contactarte. Te responderemos pronto.");
      formSimple.reset();
    });
  }


  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    let current = 0;
    let interval = setInterval(nextSlide, 8000);

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    function showSlide(index) {
      slides.forEach((s) => s.classList.remove("active"));
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

    if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
  }

 
  const formFetch = document.querySelector(".contacto-section form");
  const status = document.getElementById("form-status");

  if (formFetch && status) {
    formFetch.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(formFetch);
      try {
        const response = await fetch(formFetch.action, {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" },
        });

        if (response.ok) {
          status.textContent = " ✓ ¡Gracias por tu mensaje! Te responderemos pronto.";
          status.style.color = "#1ca84a";
          formFetch.reset();
        } else {
          status.textContent = " ❌ Ocurrió un error. Intenta nuevamente.";
          status.style.color = "#c32727";
        }
      } catch (error) {
        status.textContent = "⚠️ No se pudo conectar. Revisá tu conexión o intentá más tarde.";
        status.style.color = "#c32727";
      }

      setTimeout(() => (status.textContent = ""), 6000);
    });
  }

 
  const toggled = document.querySelector(".acuerdo-toggle");
  const section = document.querySelector(".acuerdo-section");

  if (toggled && section) {
    toggled.addEventListener("click", () => {
      section.classList.toggle("abierto");
    });
  }

});
