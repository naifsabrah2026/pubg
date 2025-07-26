// Product page functionality
document.addEventListener("DOMContentLoaded", () => {
  initImageGallery()
  initProductActions()
  initFavoriteToggle()
  initShareFunction()
})

// Image gallery functionality
function initImageGallery() {
  const mainImage = document.getElementById("mainImage")
  const thumbnails = document.querySelectorAll(".thumbnail")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))

      // Add active class to clicked thumbnail
      this.classList.add("active")

      // Change main image with fade effect
      mainImage.style.opacity = "0"

      setTimeout(() => {
        mainImage.src = this.src
        mainImage.style.opacity = "1"
      }, 200)
    })
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const activeThumbnail = document.querySelector(".thumbnail.active")
    const thumbnailsArray = Array.from(thumbnails)
    const currentIndex = thumbnailsArray.indexOf(activeThumbnail)

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      thumbnailsArray[currentIndex - 1].click()
    } else if (e.key === "ArrowRight" && currentIndex < thumbnailsArray.length - 1) {
      thumbnailsArray[currentIndex + 1].click()
    }
  })
}

// Product actions functionality
function initProductActions() {
  // WhatsApp contact button
  window.contactWhatsApp = () => {
    const button = event.target.closest(".btn-whatsapp")
    button.classList.add("loading")

    setTimeout(() => {
      const message = `مرحباً، أريد شراء الحساب: ${window.productData.title} - السعر: ${window.productData.price}`
      const whatsappUrl = `https://wa.me/${window.productData.whatsapp}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      button.classList.remove("loading")
      showToast("تم فتح واتساب بنجاح!", "success")
    }, 1500)
  }

  // Buy now button
  window.buyNow = () => {
    const button = event.target.closest(".btn-buy")
    button.classList.add("loading")

    setTimeout(() => {
      button.classList.remove("loading")
      showPurchaseModal()
    }, 2000)
  }
}

// Favorite toggle functionality
function initFavoriteToggle() {
  const favoriteIcon = document.getElementById("favoriteIcon")
  let isFavorite = localStorage.getItem(`favorite_${window.productData.id}`) === "true"

  updateFavoriteIcon(isFavorite)

  window.toggleFavorite = () => {
    isFavorite = !isFavorite
    localStorage.setItem(`favorite_${window.productData.id}`, isFavorite)
    updateFavoriteIcon(isFavorite)

    const message = isFavorite ? "تم إضافة المنتج للمفضلة" : "تم إزالة المنتج من المفضلة"
    showToast(message, "success")
  }

  function updateFavoriteIcon(favorite) {
    const button = favoriteIcon.closest(".btn-icon")
    if (favorite) {
      favoriteIcon.style.color = "#ff4757"
      button.classList.add("active")
    } else {
      favoriteIcon.style.color = "#ffc107"
      button.classList.remove("active")
    }
  }
}

// Share functionality
function initShareFunction() {
  window.shareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: window.productData.title,
          text: `تحقق من هذا الحساب المميز: ${window.productData.title}`,
          url: window.location.href,
        })
        .then(() => {
          showToast("تم مشاركة المنتج بنجاح!", "success")
        })
        .catch((error) => {
          console.log("Error sharing:", error)
          fallbackShare()
        })
    } else {
      fallbackShare()
    }
  }

  function fallbackShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        showToast("تم نسخ رابط المنتج!", "success")
      })
      .catch(() => {
        showToast("فشل في نسخ الرابط", "error")
      })
  }
}

// Change main image function (called from PHP)
function changeMainImage(imageSrc, thumbnail) {
  const mainImage = document.getElementById("mainImage")
  const thumbnails = document.querySelectorAll(".thumbnail")

  // Remove active class from all thumbnails
  thumbnails.forEach((thumb) => thumb.classList.remove("active"))

  // Add active class to clicked thumbnail
  thumbnail.classList.add("active")

  // Change main image with fade effect
  mainImage.style.opacity = "0"

  setTimeout(() => {
    mainImage.src = imageSrc
    mainImage.style.opacity = "1"
  }, 200)
}

// Show purchase modal
function showPurchaseModal() {
  const modal = document.createElement("div")
  modal.className = "purchase-modal"
  modal.innerHTML = `
        <div class="modal-overlay" onclick="closePurchaseModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>شراء المنتج</h3>
                <button class="modal-close" onclick="closePurchaseModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="product-summary">
                    <img src="${document.getElementById("mainImage").src}" alt="${window.productData.title}">
                    <div>
                        <h4>${window.productData.title}</h4>
                        <p class="price">${window.productData.price}</p>
                    </div>
                </div>
                <form class="purchase-form" onsubmit="submitPurchase(event)">
                    <div class="form-group">
                        <label>الاسم الكامل</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>رقم الهاتف</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" name="email">
                    </div>
                    <div class="form-group">
                        <label>ملاحظات إضافية</label>
                        <textarea name="notes" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-loading">
                        <span class="btn-text">
                            <i class="fas fa-shopping-cart"></i>
                            تأكيد الطلب
                        </span>
                        <span class="btn-loader">
                            <i class="fas fa-spinner fa-spin"></i>
                            جاري المعالجة...
                        </span>
                    </button>
                </form>
            </div>
        </div>
    `

  document.body.appendChild(modal)
  document.body.style.overflow = "hidden"

  setTimeout(() => {
    modal.classList.add("show")
  }, 10)
}

// Close purchase modal
function closePurchaseModal() {
  const modal = document.querySelector(".purchase-modal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"

    setTimeout(() => {
      document.body.removeChild(modal)
    }, 300)
  }
}

// Submit purchase form
function submitPurchase(event) {
  event.preventDefault()

  const button = event.target.querySelector('button[type="submit"]')
  button.classList.add("loading")

  const formData = new FormData(event.target)
  formData.append("product_id", window.productData.id)

  // Simulate form submission
  setTimeout(() => {
    button.classList.remove("loading")
    closePurchaseModal()
    showToast("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.", "success")

    // Redirect to WhatsApp as backup
    setTimeout(() => {
      const message = `طلب شراء جديد:\nالمنتج: ${window.productData.title}\nالاسم: ${formData.get("name")}\nالهاتف: ${formData.get("phone")}`
      const whatsappUrl = `https://wa.me/${window.productData.whatsapp}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    }, 2000)
  }, 2000)
}

// Toast notification function
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
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Declare productData variable
window.productData = {
  title: "Sample Product",
  price: "100",
  whatsapp: "123456789",
}
