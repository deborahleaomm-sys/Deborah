const bubblesContainer = document.getElementById("bubbles");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

function createBubble() {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");

  const size = Math.random() * 60 + 20;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
  bubble.style.animationDelay = `${Math.random() * 3}s`;

  bubblesContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 22000);
}

setInterval(createBubble, 400);

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1500);
});

/* MODAL DOS CERTIFICADOS */
const certificados = document.querySelectorAll(".certificado");
const modal = document.getElementById("modal-certificado");
const modalImg = document.getElementById("img-modal");
const fechar = document.querySelector(".fechar");

if (certificados.length && modal && modalImg && fechar) {
  certificados.forEach(card => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-img");
      modalImg.src = imgSrc;
      modal.classList.add("ativo");
    });
  });

  fechar.addEventListener("click", () => {
    modal.classList.remove("ativo");
    setTimeout(() => {
      modalImg.src = "";
    }, 300);
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("ativo");
      setTimeout(() => {
        modalImg.src = "";
      }, 300);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ativo")) {
      modal.classList.remove("ativo");
      setTimeout(() => {
        modalImg.src = "";
      }, 300);
    }
  });
}