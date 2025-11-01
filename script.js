// ===============================
// Smooth Scroll Navigation
// ===============================
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===============================
// Tombol "Hubungi Saya" Scroll ke Kontak
// ===============================
const contactBtn = document.getElementById("btn-contact");
if (contactBtn) {
  contactBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  });
}

// ===============================
// Efek Fade-In saat Scroll
// ===============================
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

// ===============================
// Typing Effect (Nama Otomatis)
// ===============================
const typedText = document.querySelector("h1 span");
// NAMA DIGANTI DI SINI
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

// ===============================
// Animasi Klik Ikon Sosial Media
// ===============================
document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.add("clicked");
    setTimeout(() => icon.classList.remove("clicked"), 300);
  });
});

// ===============================
// ANIMASI BINTANG BERJATUHAN ✨
// ===============================
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

  // Inisialisasi bintang
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random(),
    });
  }

// Animasi bintang
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      // GANTI WARNA BINTANG (ke Teks Utama #6D4C5A)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // <-- BARIS BARU
      ctx.fill();

      // Gerakan jatuh + muncul ulang di atas
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

// ===============================
// Kirim Form Lewat Formspree (Masuk ke Email)
// ===============================
const contactFormElement = document.querySelector(".contact-form");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactFormElement);
    const submitBtn = contactFormElement.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Tampilkan loading
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
        alert(
          "✅ Pesan kamu sudah dikirim! Terima kasih telah menghubungi saya."
        );
        contactFormElement.reset();
      } else {
        alert("❌ Gagal mengirim pesan. Silakan coba lagi nanti.");
      }
    } catch (error) {
      alert(
        "⚠️ Terjadi kesalahan jaringan. Pastikan kamu terhubung ke internet."
      );
      console.error("Error:", error);
    } finally {
      // Kembalikan tombol ke kondisi semula
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ===============================
// Navbar Background saat Scroll
// ===============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // GANTI WARNA NAVBAR SCROLL (ke BG Utama #FFF7F3)
    header.style.background = "rgba(255, 247, 243, 0.98)"; // <-- BARIS BARU
    header.style.boxShadow = "0 4px 30px rgba(109, 76, 90, 0.1)"; // <-- BARIS BARU
  } else {
    // GANTI WARNA NAVBAR DEFAULT (ke BG Utama #FFF7F3)
    header.style.background = "rgba(255, 247, 243, 0.95)"; // <-- BARIS BARU
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.05)"; // <-- BARIS BARU
  }
});

// ===============================
// Animasi Parallax untuk Hero
// ===============================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");

  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }
});

// ===============================
// TAMBAHAN: Carousel Hero Interaktif (Versi Slide)
// ===============================
(function() {
  const heroElement = document.querySelector(".hero");
  if (!heroElement) return;

  // --- GANTI NAMA GAMBAR DI BAWAH INI ---
  const backgroundImages = [
    "assets/hero-image-1.jpg", // Gambar pertama
    "assets/hero-image-2.jpg", // Gambar kedua
    "assets/hero-image-3.jpg"  // Gambar ketiga
  ];

  const slideIntervalTime = 5000; // Interval 5 detik
  let currentIndex = 0;
  let autoSlideTimer;
  const numSlides = backgroundImages.length;

  // Ambil elemen-elemen baru dari HTML
  const sliderTrack = document.querySelector('.hero-slider-track');
  const prevButton = document.querySelector('.hero-nav.prev');
  const nextButton = document.querySelector('.hero-nav.next');
  const dotsContainer = document.querySelector('.hero-dots');

  // 1. Setup Awal: Buat slide dan dots
  function initializeSlider() {
    // Atur lebar track (misal: 3 gambar = 300%)
    sliderTrack.style.width = `${numSlides * 100}%`;

    backgroundImages.forEach((imgSrc, index) => {
      // Buat elemen slide
      const slide = document.createElement('div');
      slide.classList.add('hero-slide');
      slide.style.backgroundImage = `url('${imgSrc}')`;
      // Atur lebar tiap slide (misal: 3 gambar = 33.333%)
      slide.style.width = `${100 / numSlides}%`;
      sliderTrack.appendChild(slide);

      // Buat elemen dot (garis)
      const dot = document.createElement('div');
      dot.classList.add('hero-dot');
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
  }

  // Simpan semua dots
  const allDots = dotsContainer.children;

// 2. Fungsi utama untuk menampilkan slide
  function showSlide(index) {
    // Pastikan indeks selalu valid (looping)
    currentIndex = (index + numSlides) % numSlides;

    // Hapus kelas 'active' dari SEMUA slide sebelum menambahkannya ke yang baru
    Array.from(sliderTrack.children).forEach(slide => slide.classList.remove('active'));

    // Hitung persentase pergeseran
    const transformPercentage = -(currentIndex * (100 / numSlides));
    
    // Terapkan pergeseran pada LINTASAN (track)
    sliderTrack.style.transform = `translateX(${transformPercentage}%)`;

    // Tambahkan kelas 'active' ke slide yang sedang ditampilkan
    sliderTrack.children[currentIndex].classList.add('active');

    // Update dot yang aktif
    Array.from(allDots).forEach(dot => dot.classList.remove('active'));

    // Update dot yang aktif
    Array.from(allDots).forEach(dot => dot.classList.remove('active'));
    allDots[currentIndex].classList.add('active');
  }

  // 3. Fungsi untuk slideshow otomatis
  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      showSlide(currentIndex + 1); // Pindah ke slide berikutnya
    }, slideIntervalTime);
  }

  // 4. Fungsi untuk mereset timer saat user klik manual
  function resetAutoSlideTimer() {
    clearInterval(autoSlideTimer); // Hentikan timer
    startAutoSlide(); // Mulai lagi dari awal
  }

  // 5. Tambahkan Event Listeners untuk panah
  nextButton.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoSlideTimer(); // Reset timer saat diklik
  });

  prevButton.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoSlideTimer(); // Reset timer saat diklik
  });

  // 6. Tambahkan Event Listeners untuk titik/garis
  Array.from(allDots).forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetAutoSlideTimer(); // Reset timer saat diklik
    });
  });

  // 7. Mulai semuanya
  initializeSlider(); // Buat slide dan dots
  showSlide(0);      // Tampilkan slide pertama
  startAutoSlide();    // Mulai slideshow otomatis

})();

// ===============================
// EFEK KLIK BUNGA SAKURA (Versi Burst)
// ===============================
window.addEventListener('click', function(e) {
  // Hanya jalankan jika yang diklik bukan panah/dots
  if (e.target.closest('.hero-nav') || e.target.closest('.hero-dot')) {
    return;
  }

  // --- UBAH ANGKA INI UNTUK JUMLAH BUNGA ---
  const flowerCount = 5; // Misalnya, 5 bunga sekaligus

  for (let i = 0; i < flowerCount; i++) {
    // Buat elemen <img> baru di dalam loop
    const flower = document.createElement('img');
    
    // Pastikan path gambar ini benar (sakura atau paw)
    flower.src = 'assets/sakura-click.png'; 
    flower.classList.add('sakura-click-effect');
    document.body.appendChild(flower);

    // 1. Posisi Acak (muncul di sekitar kursor)
    // Angka acak antara -20px dan +20px dari titik klik
    const randomXOffset = (Math.random() - 0.5) * 40;
    const randomYOffset = (Math.random() - 0.5) * 40;
    
    flower.style.left = (e.pageX + randomXOffset) + 'px';
    flower.style.top = (e.pageY + randomYOffset) + 'px';

    // 2. Penundaan Animasi Acak (agar tidak bergerak bersamaan)
    // Angka acak antara 0 dan 0.2 detik
    const randomDelay = Math.random() * 0.2;
    flower.style.animationDelay = `${randomDelay}s`;
    
    // 3. Hapus bunga setelah animasi selesai
    // Animasi berlangsung 1s (1000ms) + delay maksimal 0.2s (200ms)
    setTimeout(() => {
      flower.remove();
    }, 1200); 
  }
});