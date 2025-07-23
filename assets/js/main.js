// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation()
  initScrollEffects()
  initProductCards()
  initNewsticker()
  initMobileMenu()
  initHeroSlider()
  initSmoothScrolling()
  initLoadingAnimations()
})

// Navigation functionality
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")
  const currentPage = window.location.pathname.split("/").pop() || "index.php"

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.php")) {
      link.classList.add("active")
    }

    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        showNavigationLoader()
      }
    })
  })
}

// Show navigation loader
function showNavigationLoader() {
  const navLoader = document.getElementById("navLoader")
  const navProgress = navLoader.querySelector(".nav-progress")

  navLoader.classList.add("active")
  navProgress.style.width = "0%"

  // Simulate loading progress
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 30
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      setTimeout(() => {
        navLoader.classList.remove("active")
      }, 200)
    }
    navProgress.style.width = progress + "%"
  }, 100)
}

// Scroll effects
function initScrollEffects() {
  const header = document.querySelector(".header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    // Header background opacity
    if (currentScrollY > 50) {
      header.style.background = "rgba(17, 17, 17, 0.98)"
      header.style.backdropFilter = "blur(15px)"
    } else {
      header.style.background = "rgba(17, 17, 17, 0.95)"
      header.style.backdropFilter = "blur(10px)"
    }

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  // Parallax effect for hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * 0.5
      hero.style.transform = `translateY(${parallax}px)`
    })
  }
}

// Product cards functionality
function initProductCards() {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    // Add hover effects
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    // Add click animation
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".btn")) {
        const ripple = document.createElement("div")
        ripple.classList.add("ripple")
        this.appendChild(ripple)

        setTimeout(() => {
          ripple.remove()
        }, 600)
      }
    })
  })
}

// News ticker functionality
function initNewsticker() {
  const ticker = document.querySelector(".ticker-text")
  if (ticker) {
    // Clone ticker content for seamless loop
    const tickerContent = ticker.innerHTML
    ticker.innerHTML = tickerContent + tickerContent

    // Pause animation on hover
    ticker.addEventListener("mouseenter", () => {
      ticker.style.animationPlayState = "paused"
    })

    ticker.addEventListener("mouseleave", () => {
      ticker.style.animationPlayState = "running"
    })
  }
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")

  if (!mobileMenuBtn || !mobileNav) return

  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")
  })

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll(".mobile-nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    }
  })
}

// Hero Slider
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  const indicators = document.querySelectorAll(".hero-indicators .indicator")
  let currentSlide = 0

  if (slides.length === 0) return

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index)
    })

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index)
    })
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  // Auto-advance slides
  setInterval(nextSlide, 5000)

  // Manual navigation
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentSlide = index
      showSlide(currentSlide)
    })
  })
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href")
      if (href === "#") return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Loading Animations
function initLoadingAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements with fade-in class
  const fadeElements = document.querySelectorAll('[data-aos="fade-up"]')
  fadeElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Utility Functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

function formatPrice(price) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
  }).format(price)
}

function timeAgo(date) {
  const now = new Date()
  const diff = now - new Date(date)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `منذ ${days} يوم`
  if (hours > 0) return `منذ ${hours} ساعة`
  if (minutes > 0) return `منذ ${minutes} دقيقة`
  return "منذ لحظات"
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
