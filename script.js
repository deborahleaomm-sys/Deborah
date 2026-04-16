const bubblesContainer = document.getElementById("bubbles");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const scrollProgress = document.getElementById("scroll-progress");

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
    const revealPoint = 100;

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

document.querySelectorAll(".nav-links a").forEach((link) => {
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

/* SCROLL PROGRESS BAR */
function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

/* REVEAL MAIS REFINADO */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.06}s`;
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

reveals.forEach((item) => observer.observe(item));

/* TILT NOS CARDS */
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.boxShadow = `0 18px 40px rgba(255, 20, 147, 0.18)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

/* CONTADOR DOS STATS */
const statNumbers = document.querySelectorAll(".stat-card h3[data-target]");

function animateCounter(element) {
  const target = Number(element.getAttribute("data-target"));
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 40));

  const counter = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(counter);
    }

    if (target === 6) {
      element.textContent = `${current}+`;
    } else {
      element.textContent = current;
    }
  }, 35);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

statNumbers.forEach((stat) => statsObserver.observe(stat));

/* MODAL DOS CERTIFICADOS */
const certificados = document.querySelectorAll(".certificado");
const modal = document.getElementById("modal-certificado");
const modalImg = document.getElementById("img-modal");
const fechar = document.querySelector(".fechar");

if (certificados.length && modal && modalImg && fechar) {
  certificados.forEach((card) => {
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

/* EMAILJS */
(function () {
  emailjs.init({
    publicKey: "Zh7H3AHwljte5IVQy",
  });
})();

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Enviando mensagem...";

    emailjs
      .sendForm(
        "service_iuxgof6",
        "template_nyy4rrr",
        contactForm,
        {
          publicKey: "Zh7H3AHwljte5IVQy",
        }
      )
      .then(() => {
        formStatus.textContent = "Mensagem enviada com sucesso!";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS error completo:", error);
        formStatus.textContent =
          `Erro ao enviar: ${error?.text || error?.message || "tente novamente"}`;
      });
  });
}