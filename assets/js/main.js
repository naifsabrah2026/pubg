// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initNavigation()
  initScrollEffects()
  initProductCards()
  initNewsticker()
  initMobileMenu()
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
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      navMenu.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })
  }
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(price)
}

function showToast(message, type = "success") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        </div>
    `

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight - 20

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

// Add ripple effect to buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
    const button = e.target.classList.contains("btn") ? e.target : e.target.closest(".btn")
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple-effect")

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
})
