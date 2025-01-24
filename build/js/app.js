document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  resaltarEnlace();
  scrollNav();
  carousel();
  mostrarTarjetas();
  sandwich()
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const imagen = document.querySelector(".imagen");
 

  window.addEventListener("scroll", function () {
    if (imagen.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
      
    } else {
      header.classList.remove("fixed");
      


      
    }
  });
}
function resaltarEnlace() {
  document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");

    let actual = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual)
        link.classList.add("active");
    });
  });
}
function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
function carousel() {
  const carouselImages = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-images img");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  let currentIndex = 0;

  function updateCarousel() {
    const width = images[0].clientWidth;
    carouselImages.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }, 3000);
}
function mostrarTarjetas() {
  const servicios = document.querySelectorAll(".servicio");

  servicios.forEach((servicio) => {
    servicio.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.id)

      // Asegurarse de que no haya otro modal abierto
      if (document.querySelector(".modal")) {
        return; // Salir si ya hay un modal abierto
      }

      // Crear el modal al hacer clic
      const modal = document.createElement("DIV");
      modal.classList.add("modal");

      // Construir el contenido del modal dinámicamente
      const servicioHeader = servicio.querySelector(".servicio-header").innerHTML;
      const servicioBody = servicio.querySelector(".servicio-body").innerHTML;

      modal.innerHTML = `
              <div class="modal-contenido">
                  <header class="modal-header">${servicioHeader}</header>
                  <div class="modal-body">${servicioBody}</div>
                  <button class="cerrar-modal">Cerrar</button>
              </div>
          `;

      const body = document.querySelector("BODY");
      body.classList.add("overflow-hidden");
      body.appendChild(modal);

      // Seleccionar el botón dentro del modal creado
      const boton = modal.querySelector(".cerrar-modal");

      boton.onclick = function () {
        modal.classList.add('fade-out'); // Agregar clase para la animación de salida
        setTimeout(() => {
          modal.remove(); // Eliminar el modal después de la animación
          body.classList.remove("overflow-hidden");
        }, 500); // Asegurarse de que el tiempo coincida con la duración de la animación CSS
      };

      // Cerrar el modal si el usuario hace clic fuera del contenido
      /*modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });*/
    });
  });
}

function sandwich() {
  const nav = document.querySelector("#nav");
  const abrir = document.querySelector("#abrir");
  const cerrar = document.querySelector("#cerrar");
  const body = document.body;
  const menuOptions = nav.querySelectorAll("a"); // Selecciona las opciones del menú

  if (!nav || !abrir || !cerrar) {
      console.error("Uno o más elementos no existen en el DOM.");
      return;
  }

  abrir.addEventListener("click", () => {
      nav.classList.add("visible");
      body.classList.add("overflow-hidden");
  });

  cerrar.addEventListener("click", () => {
      nav.classList.remove("visible");
      body.classList.remove("overflow-hidden");
  });

  // Cierra el menú al hacer clic en una opción
  menuOptions.forEach(option => {
      option.addEventListener("click", () => {
          nav.classList.remove("visible");
          body.classList.remove("overflow-hidden");
      });
  });
}
