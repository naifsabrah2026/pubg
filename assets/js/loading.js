// Loading Screen Management
class LoadingManager {
  constructor() {
    this.loadingScreen = null
    this.progressBar = null
    this.loadingText = null
    this.currentProgress = 0
    this.targetProgress = 0
    this.isLoading = false

    this.init()
  }

  init() {
    this.loadingScreen = document.getElementById("loading-screen")
    if (this.loadingScreen) {
      this.progressBar = this.loadingScreen.querySelector(".progress-fill")
      this.loadingText = this.loadingScreen.querySelector(".loading-text")
    }

    // Show loading screen on page load
    this.show()

    // Simulate loading progress
    this.simulateProgress()

    // Hide loading screen when page is fully loaded
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hide()
      }, 1000)
    })
  }

  show(message = "جاري التحميل...") {
    if (!this.loadingScreen) return

    this.isLoading = true
    this.loadingScreen.style.display = "flex"

    if (this.loadingText) {
      this.loadingText.textContent = message
    }

    // Reset progress
    this.currentProgress = 0
    this.targetProgress = 0
    this.updateProgress()
  }

  hide() {
    if (!this.loadingScreen || !this.isLoading) return

    this.isLoading = false

    // Complete progress
    this.setProgress(100)

    setTimeout(() => {
      this.loadingScreen.style.opacity = "0"
      setTimeout(() => {
        this.loadingScreen.style.display = "none"
        this.loadingScreen.style.opacity = "1"
      }, 500)
    }, 500)
  }

  setProgress(progress) {
    this.targetProgress = Math.min(100, Math.max(0, progress))
    this.animateProgress()
  }

  animateProgress() {
    if (Math.abs(this.currentProgress - this.targetProgress) < 0.1) {
      this.currentProgress = this.targetProgress
      this.updateProgress()
      return
    }

    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.1
    this.updateProgress()

    requestAnimationFrame(() => this.animateProgress())
  }

  updateProgress() {
    if (this.progressBar) {
      this.progressBar.style.width = `${this.currentProgress}%`
    }
  }

  simulateProgress() {
    if (!this.isLoading) return

    const increment = Math.random() * 15 + 5
    const newProgress = Math.min(90, this.targetProgress + increment)

    this.setProgress(newProgress)

    if (newProgress < 90) {
      setTimeout(() => this.simulateProgress(), 200 + Math.random() * 300)
    }
  }

  updateMessage(message) {
    if (this.loadingText) {
      this.loadingText.textContent = message
    }
  }
}

// Button Loading States
class ButtonLoader {
  static show(button, loadingText = "جاري التحميل...") {
    if (!button) return

    button.classList.add("loading")
    button.disabled = true

    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (btnText) btnText.style.display = "none"
    if (btnLoading) {
      btnLoading.style.display = "inline-flex"
      btnLoading.textContent = loadingText
    }
  }

  static hide(button) {
    if (!button) return

    button.classList.remove("loading")
    button.disabled = false

    const btnText = button.querySelector(".btn-text")
    const btnLoading = button.querySelector(".btn-loading")

    if (btnText) btnText.style.display = "inline"
    if (btnLoading) btnLoading.style.display = "none"
  }
}

// Page Transition Effects
class PageTransition {
  static fadeOut(callback) {
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.3s ease"

    setTimeout(() => {
      if (callback) callback()
    }, 300)
  }

  static fadeIn() {
    document.body.style.opacity = "1"
  }
}

// Skeleton Loading
class SkeletonLoader {
  static show(container) {
    if (!container) return

    const skeletons = container.querySelectorAll(".loading-skeletons")
    const content = container.querySelectorAll(".products-container, .accounts-container")

    skeletons.forEach((skeleton) => (skeleton.style.display = "grid"))
    content.forEach((item) => (item.style.display = "none"))
  }

  static hide(container) {
    if (!container) return

    const skeletons = container.querySelectorAll(".loading-skeletons")
    const content = container.querySelectorAll(".products-container, .accounts-container")

    skeletons.forEach((skeleton) => (skeleton.style.display = "none"))
    content.forEach((item) => (item.style.display = "grid"))
  }
}

// Initialize loading manager
const loadingManager = new LoadingManager()

// Export for global use
window.LoadingManager = LoadingManager
window.ButtonLoader = ButtonLoader
window.PageTransition = PageTransition
window.SkeletonLoader = SkeletonLoader
window.loadingManager = loadingManager

// Navigation Loading
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(
    'a[href]:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])',
  )

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's the current page
      if (href === window.location.pathname) return

      e.preventDefault()

      loadingManager.show("جاري التنقل...")

      setTimeout(() => {
        window.location.href = href
      }, 500)
    })
  })
})

// Form Loading States
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const submitBtn = this.querySelector('button[type="submit"]')
      if (submitBtn) {
        ButtonLoader.show(submitBtn, "جاري الإرسال...")
      }
    })
  })
})
