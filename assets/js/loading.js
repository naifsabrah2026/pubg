// Loading functionality
document.addEventListener("DOMContentLoaded", () => {
  initPageLoader()
  initSectionLoaders()
  initButtonLoaders()
  createLoadingParticles()
})

// Page loader functionality
function initPageLoader() {
  const pageLoader = document.getElementById("pageLoader")
  const progressFill = pageLoader.querySelector(".progress-fill")

  let progress = 0
  const loadingMessages = [
    "جاري تحميل الموقع...",
    "تحضير المحتوى...",
    "تحميل المنتجات...",
    "تقريباً انتهينا...",
    "مرحباً بك!",
  ]

  const loaderText = pageLoader.querySelector(".loader-text")
  let messageIndex = 0

  // Simulate loading progress
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5

    if (progress >= 100) {
      progress = 100
      clearInterval(progressInterval)

      setTimeout(() => {
        pageLoader.classList.add("hidden")
        document.body.style.overflow = "auto"

        // Show products grid with animation
        const productsLoader = document.getElementById("productsLoader")
        const productsGrid = document.getElementById("productsGrid")

        if (productsLoader && productsGrid) {
          setTimeout(() => {
            productsLoader.style.display = "none"
            productsGrid.style.display = "grid"
            animateProductCards()
          }, 500)
        }
      }, 500)
    }

    progressFill.style.width = progress + "%"

    // Change loading message
    if (progress > messageIndex * 20 && messageIndex < loadingMessages.length - 1) {
      messageIndex++
      loaderText.textContent = loadingMessages[messageIndex]
    }
  }, 150)

  // Hide body overflow during loading
  document.body.style.overflow = "hidden"
}

// Section loaders functionality
function initSectionLoaders() {
  const sectionLoaders = document.querySelectorAll(".section-loader")

  sectionLoaders.forEach((loader) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          simulateSectionLoading(entry.target)
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(loader)
  })
}

function simulateSectionLoading(loader) {
  setTimeout(
    () => {
      loader.style.opacity = "0"
      loader.style.transform = "scale(0.9)"

      setTimeout(() => {
        loader.style.display = "none"

        // Show actual content
        const nextElement = loader.nextElementSibling
        if (nextElement) {
          nextElement.style.display = "block"
          nextElement.style.opacity = "0"
          nextElement.style.transform = "translateY(20px)"

          setTimeout(() => {
            nextElement.style.transition = "all 0.5s ease"
            nextElement.style.opacity = "1"
            nextElement.style.transform = "translateY(0)"
          }, 50)
        }
      }, 300)
    },
    Math.random() * 1000 + 1000,
  )
}

// Button loading functionality
function initButtonLoaders() {
  const loadingButtons = document.querySelectorAll(".btn-loading")

  loadingButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.classList.contains("loading")) {
        e.preventDefault()
        return
      }

      // Don't add loading state for navigation links
      if (this.getAttribute("href") && !this.getAttribute("href").startsWith("#")) {
        return
      }

      this.classList.add("loading")

      // Simulate async operation
      setTimeout(() => {
        this.classList.remove("loading")
      }, 2000)
    })
  })
}

// Animate product cards
function animateProductCards() {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px) scale(0.9)"

    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      card.style.opacity = "1"
      card.style.transform = "translateY(0) scale(1)"
    }, index * 100)
  })
}

// Create loading particles
function createLoadingParticles() {
  const pageLoader = document.getElementById("pageLoader")
  if (!pageLoader) return

  const particlesContainer = document.createElement("div")
  particlesContainer.className = "loading-particles"

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 3 + "s"
    particlesContainer.appendChild(particle)
  }

  pageLoader.appendChild(particlesContainer)
}

// Show skeleton loading for cards
function showSkeletonCards(container, count = 6) {
  container.innerHTML = ""

  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement("div")
    skeletonCard.className = "skeleton-card"
    skeletonCard.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-line long"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
            </div>
        `
    container.appendChild(skeletonCard)
  }
}

// Loading state management
const LoadingManager = {
  show: (element, message = "جاري التحميل...") => {
    if (typeof element === "string") {
      element = document.querySelector(element)
    }

    if (!element) return

    const loader = document.createElement("div")
    loader.className = "loading-overlay"
    loader.innerHTML = `
            <div class="loading-content">
                <div class="loader-spinner"></div>
                <p>${message}</p>
            </div>
        `

    element.style.position = "relative"
    element.appendChild(loader)
  },

  hide: (element) => {
    if (typeof element === "string") {
      element = document.querySelector(element)
    }

    if (!element) return

    const loader = element.querySelector(".loading-overlay")
    if (loader) {
      loader.remove()
    }
  },
}

// Export for use in other scripts
window.LoadingManager = LoadingManager
