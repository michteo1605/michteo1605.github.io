const popupContainer = document.getElementById('popup-container');
const popupMessage = document.getElementById('popup-message');
const popupGif = document.getElementById('popup-gif');
const popupCloseBtn = document.getElementById('popup-close-btn');

function showPopup(message, gifUrl) {
  popupMessage.textContent = message;
  popupGif.src = gifUrl;
  popupContainer.classList.add('active');
}

function closePopup() {
  popupContainer.classList.remove('active');
}

popupCloseBtn.addEventListener('click', closePopup);
popupContainer.addEventListener('click', function(e) {
  if (e.target === popupContainer) {
    closePopup();
  }
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const contactBtn = document.getElementById("btn-contact");
if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  });
}

const fadeElements = document.querySelectorAll(".about, .projects, .contact");

function fadeInOnScroll() {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    if (isVisible) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

const typedText = document.querySelector("h1 span");
const words = ["Michelle", "Mahasiswa Jurusan Arsitektur", "Desainer"];
let wordIndex = 0;
let charIndex = 0;
let typing = true;

function typeAnimation() {
  const currentWord = words[wordIndex];

  if (typing) {
    typedText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length + 5) {
      typing = false;
    }
  } else {
    typedText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeAnimation, typing ? 120 : 60);
}

window.addEventListener("load", typeAnimation);

document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("clicked");
    setTimeout(() => icon.classList.remove("clicked"), 300);
  });
});

const canvas = document.getElementById("starfield");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let stars = [];
  const numStars = 150;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random(),
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      // #6D4C5A)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      star.y += star.speed;

      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawStars);
  }

  drawStars();
}

const contactFormElement = document.querySelector(".contact-form");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactFormElement);
    const submitBtn = contactFormElement.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactFormElement.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showPopup(
          "✅ Pesan kamu sudah dikirim! Terima kasih telah menghubungi saya.",
          "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzRhOXJzanA1ZGplMnB0bjV5MnVub3piYmwxZHZlZzNhN21hYWswaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xsaLjLVqVXr3tS/giphy.gif" // GIF Kucing Sukses
        );
        contactFormElement.reset();
      } else {
        showPopup(
          "❌ Gagal mengirim pesan. Silakan coba lagi nanti.",
          "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHppeWhkajZ2NmlieWV5cTN0dzRjbXNlYmZxNzRvNTBta2k4dWlzYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NqZn5kPN8VVrW/giphy.gif" // GIF Kucing Gagal/Sedih
        );
      }
    } catch (error) {
      showPopup(
        "⚠️ Terjadi kesalahan jaringan. Pastikan kamu terhubung ke internet.",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHppeWhkajZ2NmlieWV5cTN0dzRjbXNlYmZxNzRvNTBta2k4dWlzYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NqZn5kPN8VVrW/giphy.gif" // GIF Kucing Gagal/Sedih
      );
      console.error("Error:", error);
    } finally {

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    //#FFF7F3)
    header.style.background = "rgba(255, 247, 243, 0.98)";
    header.style.boxShadow = "0 4px 30px rgba(109, 76, 90, 0.1)";
  } else {
    //#FFF7F3)
    header.style.background = "rgba(255, 247, 243, 0.95)";
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.05)";
  }
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }
});

(function() {
  const heroElement = document.querySelector(".hero");
  if (!heroElement) return;

  const backgroundImages = [
    "assets/hero-image-1.jpg", 
    "assets/hero-image-2.jpg", 
    "assets/hero-image-3.jpg" 
  ];

  const slideIntervalTime = 5000;
  let currentIndex = 0;
  let autoSlideTimer;
  const numSlides = backgroundImages.length;

  const sliderTrack = document.querySelector('.hero-slider-track');
  const prevButton = document.querySelector('.hero-nav.prev');
  const nextButton = document.querySelector('.hero-nav.next');
  const dotsContainer = document.querySelector('.hero-dots');

  function initializeSlider() {
    sliderTrack.style.width = `${numSlides * 100}%`;

    backgroundImages.forEach((imgSrc, index) => {
      const slide = document.createElement('div');
      slide.classList.add('hero-slide');
      slide.style.backgroundImage = `url('${imgSrc}')`;
      slide.style.width = `${100 / numSlides}%`;
      sliderTrack.appendChild(slide);

      const dot = document.createElement('div');
      dot.classList.add('hero-dot');
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
  }

  const allDots = dotsContainer.children;

  function showSlide(index) {
    currentIndex = (index + numSlides) % numSlides;

    Array.from(sliderTrack.children).forEach(slide => slide.classList.remove('active'));
    const transformPercentage = -(currentIndex * (100 / numSlides));
    sliderTrack.style.transform = `translateX(${transformPercentage}%)`;
    sliderTrack.children[currentIndex].classList.add('active');

    Array.from(allDots).forEach(dot => dot.classList.remove('active'));

    Array.from(allDots).forEach(dot => dot.classList.remove('active'));
    allDots[currentIndex].classList.add('active');
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideIntervalTime);
  }

  function resetAutoSlideTimer() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoSlideTimer();
  });

  prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoSlideTimer();
  });

  Array.from(allDots).forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlideTimer(); 
    });
  });

  initializeSlider(); 
  showSlide(0);     
  startAutoSlide();    

})();

window.addEventListener('click', function(e) {

  if (e.target.closest('.hero-nav') || e.target.closest('.hero-dot')) {
    return;
  }
  const flowerCount = 5;

  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement('img');

    flower.src = 'assets/sakura-click.png'; 
    flower.classList.add('sakura-click-effect');
    document.body.appendChild(flower);

    const randomXOffset = (Math.random() - 0.5) * 40;
    const randomYOffset = (Math.random() - 0.5) * 40;
    
    flower.style.left = (e.pageX + randomXOffset) + 'px';
    flower.style.top = (e.pageY + randomYOffset) + 'px';

    const randomDelay = Math.random() * 0.2;
    flower.style.animationDelay = `${randomDelay}s`;

    setTimeout(() => {
      flower.remove();
    }, 1200); 
  }
});