import { Chart } from "@/components/ui/chart"
// Admin Panel JavaScript
document.addEventListener("DOMContentLoaded", () => {
  initSidebar()
  initModals()
  initCharts()
  initNotifications()
  initDataTables()
  initFormValidation()
})

// Sidebar functionality
function initSidebar() {
  const sidebarToggle = document.querySelector(".sidebar-toggle")
  const sidebar = document.querySelector(".admin-sidebar")
  const overlay = document.createElement("div")
  overlay.className = "sidebar-overlay"

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
      document.body.appendChild(overlay)
      overlay.classList.add("active")
    })
  }

  // Close sidebar when clicking overlay
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active")
    overlay.classList.remove("active")
    document.body.removeChild(overlay)
  })

  // Active nav item
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.php")) {
      link.closest(".nav-item").classList.add("active")
    }
  })
}

// Modal functionality
function initModals() {
  const modals = document.querySelectorAll(".modal")

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id)
      }
    })
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.show")
      if (activeModal) {
        closeModal(activeModal.id)
      }
    }
  })
}

function showModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"

    // Reset form if exists
    const form = modal.querySelector("form")
    if (form) {
      form.reset()
    }
  }
}

// Charts initialization
function initCharts() {
  // Sales Chart
  const salesCtx = document.getElementById("salesChart")
  if (salesCtx) {
    new Chart(salesCtx, {
      type: "line",
      data: {
        labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
        datasets: [
          {
            label: "المبيعات",
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: "#ffc107",
            backgroundColor: "rgba(255, 193, 7, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value.toLocaleString("ar-SA") + " ريال",
            },
          },
        },
      },
    })
  }

  // Products Chart
  const productsCtx = document.getElementById("productsChart")
  if (productsCtx) {
    new Chart(productsCtx, {
      type: "doughnut",
      data: {
        labels: ["كونكر", "مميز", "متنوع"],
        datasets: [
          {
            data: [30, 45, 25],
            backgroundColor: ["#e74c3c", "#9b59b6", "#3498db"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }
}

// Notifications
function initNotifications() {
  const notificationBtn = document.querySelector(".notification-btn")

  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      showNotifications()
    })
  }
}

function showNotifications() {
  const notifications = [
    { type: "order", message: "طلب جديد من أحمد محمد", time: "منذ 5 دقائق" },
    { type: "product", message: "تم إضافة منتج جديد", time: "منذ 15 دقيقة" },
    { type: "user", message: "مستخدم جديد سجل", time: "منذ ساعة" },
  ]

  // Create notification dropdown
  const dropdown = document.createElement("div")
  dropdown.className = "notifications-dropdown"
  dropdown.innerHTML = `
        <div class="notifications-header">
            <h4>الإشعارات</h4>
            <button onclick="markAllAsRead()">تعيين الكل كمقروء</button>
        </div>
        <div class="notifications-list">
            ${notifications
              .map(
                (notif) => `
                <div class="notification-item">
                    <div class="notification-icon ${notif.type}">
                        <i class="fas fa-${getNotificationIcon(notif.type)}"></i>
                    </div>
                    <div class="notification-content">
                        <p>${notif.message}</p>
                        <span>${notif.time}</span>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
        <div class="notifications-footer">
            <a href="notifications.php">عرض جميع الإشعارات</a>
        </div>
    `

  document.body.appendChild(dropdown)

  // Position dropdown
  const btn = document.querySelector(".notification-btn")
  const rect = btn.getBoundingClientRect()
  dropdown.style.top = rect.bottom + 10 + "px"
  dropdown.style.left = rect.left - 200 + "px"

  // Close on outside click
  setTimeout(() => {
    document.addEventListener("click", function closeDropdown(e) {
      if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.remove()
        document.removeEventListener("click", closeDropdown)
      }
    })
  }, 100)
}

function getNotificationIcon(type) {
  const icons = {
    order: "shopping-cart",
    product: "box",
    user: "user",
    system: "cog",
  }
  return icons[type] || "bell"
}

// Data tables functionality
function initDataTables() {
  const tables = document.querySelectorAll(".data-table")

  tables.forEach((table) => {
    // Add sorting functionality
    const headers = table.querySelectorAll("th")
    headers.forEach((header, index) => {
      if (header.textContent.trim() && index < headers.length - 1) {
        header.style.cursor = "pointer"
        header.addEventListener("click", () => sortTable(table, index))
      }
    })
  })
}

function sortTable(table, column) {
  const tbody = table.querySelector("tbody")
  const rows = Array.from(tbody.querySelectorAll("tr"))
  const isAscending = table.dataset.sortOrder !== "asc"

  rows.sort((a, b) => {
    const aText = a.cells[column].textContent.trim()
    const bText = b.cells[column].textContent.trim()

    // Check if numeric
    const aNum = Number.parseFloat(aText.replace(/[^\d.-]/g, ""))
    const bNum = Number.parseFloat(bText.replace(/[^\d.-]/g, ""))

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return isAscending ? aNum - bNum : bNum - aNum
    }

    return isAscending ? aText.localeCompare(bText, "ar") : bText.localeCompare(aText, "ar")
  })

  rows.forEach((row) => tbody.appendChild(row))
  table.dataset.sortOrder = isAscending ? "asc" : "desc"

  // Update header indicators
  const headers = table.querySelectorAll("th")
  headers.forEach((h) => h.classList.remove("sort-asc", "sort-desc"))
  headers[column].classList.add(isAscending ? "sort-asc" : "sort-desc")
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!validateForm(form)) {
        e.preventDefault()
        return false
      }

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.classList.add("loading")
        submitBtn.disabled = true
      }
    })

    // Real-time validation
    const inputs = form.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input))
      input.addEventListener("input", () => clearFieldError(input))
    })
  })
}

function validateForm(form) {
  let isValid = true
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false
    }
  })

  return isValid
}

function validateField(field) {
  const value = field.value.trim()
  const type = field.type
  let isValid = true
  let message = ""

  // Required validation
  if (field.hasAttribute("required") && !value) {
    isValid = false
    message = "هذا الحقل مطلوب"
  }

  // Email validation
  else if (type === "email" && value && !isValidEmail(value)) {
    isValid = false
    message = "يرجى إدخال بريد إلكتروني صحيح"
  }

  // Number validation
  else if (type === "number" && value) {
    const min = field.getAttribute("min")
    const max = field.getAttribute("max")
    const numValue = Number.parseFloat(value)

    if (isNaN(numValue)) {
      isValid = false
      message = "يرجى إدخال رقم صحيح"
    } else if (min && numValue < Number.parseFloat(min)) {
      isValid = false
      message = `القيمة يجب أن تكون أكبر من ${min}`
    } else if (max && numValue > Number.parseFloat(max)) {
      isValid = false
      message = `القيمة يجب أن تكون أصغر من ${max}`
    }
  }

  // Phone validation
  else if (field.name === "phone" && value && !isValidPhone(value)) {
    isValid = false
    message = "يرجى إدخال رقم هاتف صحيح"
  }

  showFieldError(field, isValid ? "" : message)
  return isValid
}

function showFieldError(field, message) {
  clearFieldError(field)

  if (message) {
    field.classList.add("error")
    const errorDiv = document.createElement("div")
    errorDiv.className = "field-error"
    errorDiv.textContent = message
    field.parentNode.appendChild(errorDiv)
  }
}

function clearFieldError(field) {
  field.classList.remove("error")
  const existingError = field.parentNode.querySelector(".field-error")
  if (existingError) {
    existingError.remove()
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[0-9\s\-$$$$]{10,}$/
  return phoneRegex.test(phone)
}

// Product management functions
function showAddProductModal() {
  const modal = document.getElementById("productModal") || document.getElementById("addProductModal")
  const form = modal.querySelector("form")
  const title = modal.querySelector("#modalTitle") || modal.querySelector("h3")

  if (title) title.textContent = "إضافة منتج جديد"
  if (form) {
    form.reset()
    form.querySelector('input[name="action"]').value = "add"
    form.querySelector('input[name="id"]').value = ""

    const statusGroup = form.querySelector("#statusGroup")
    if (statusGroup) statusGroup.style.display = "none"
  }

  showModal(modal.id)
}

function editProduct(id) {
  // Fetch product data and populate form
  fetch(`api/get_product.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        populateProductForm(data.product, "edit")
        showModal("productModal")
      } else {
        showAlert("خطأ في جلب بيانات المنتج", "error")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      showAlert("حدث خطأ في الاتصال", "error")
    })
}

function populateProductForm(product, action) {
  const modal = document.getElementById("productModal")
  const form = modal.querySelector("form")
  const title = modal.querySelector("#modalTitle")

  if (title) title.textContent = action === "edit" ? "تعديل المنتج" : "إضافة منتج جديد"

  // Populate form fields
  Object.keys(product).forEach((key) => {
    const field = form.querySelector(`[name="${key}"]`)
    if (field) {
      if (field.type === "checkbox") {
        field.checked = product[key]
      } else {
        field.value = product[key]
      }
    }
  })

  form.querySelector('input[name="action"]').value = action
  form.querySelector('input[name="id"]').value = product.id || ""

  const statusGroup = form.querySelector("#statusGroup")
  if (statusGroup) {
    statusGroup.style.display = action === "edit" ? "block" : "none"
  }
}

function deleteProduct(id) {
  if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
    const formData = new FormData()
    formData.append("action", "delete")
    formData.append("id", id)

    fetch("products.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then(() => {
        showAlert("تم حذف المنتج بنجاح", "success")
        setTimeout(() => location.reload(), 1500)
      })
      .catch((error) => {
        console.error("Error:", error)
        showAlert("حدث خطأ في حذف المنتج", "error")
      })
  }
}

// News management
function showAddNewsModal() {
  const modal = document.getElementById("newsModal")
  if (modal) {
    const form = modal.querySelector("form")
    if (form) form.reset()
    showModal("newsModal")
  }
}

// Export functionality
function exportData() {
  const exportOptions = [
    { label: "تصدير المنتجات", action: "products" },
    { label: "تصدير الطلبات", action: "orders" },
    { label: "تصدير المستخدمين", action: "users" },
    { label: "تصدير التقرير الشامل", action: "full_report" },
  ]

  const modal = document.createElement("div")
  modal.className = "modal show"
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تصدير البيانات</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-form">
                <p>اختر نوع البيانات المراد تصديرها:</p>
                <div class="export-options">
                    ${exportOptions
                      .map(
                        (option) => `
                        <button class="btn btn-secondary export-btn" data-action="${option.action}">
                            <i class="fas fa-download"></i>
                            ${option.label}
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `

  document.body.appendChild(modal)

  // Add event listeners
  modal.querySelectorAll(".export-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.dataset.action
      window.open(`api/export.php?type=${action}`, "_blank")
      modal.remove()
    })
  })
}

// Alert system
function showAlert(message, type = "info") {
  const alert = document.createElement("div")
  alert.className = `alert alert-${type} alert-floating`
  alert.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  document.body.appendChild(alert)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.remove()
    }
  }, 5000)
}

function getAlertIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }
  return icons[type] || "info-circle"
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
  }).format(price)
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Search functionality
const searchInput = document.querySelector('input[name="search"]')
if (searchInput) {
  searchInput.addEventListener(
    "input",
    debounce(function () {
      const searchTerm = this.value.toLowerCase()
      const rows = document.querySelectorAll(".data-table tbody tr")

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        row.style.display = text.includes(searchTerm) ? "" : "none"
      })
    }, 300),
  )
}

// Auto-save functionality for forms
function initAutoSave() {
  const forms = document.querySelectorAll("form[data-autosave]")

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, select, textarea")
    const formId = form.id || "form_" + Date.now()

    // Load saved data
    const savedData = localStorage.getItem(`autosave_${formId}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      Object.keys(data).forEach((key) => {
        const field = form.querySelector(`[name="${key}"]`)
        if (field && field.type !== "password") {
          field.value = data[key]
        }
      })
    }

    // Save on input
    inputs.forEach((input) => {
      input.addEventListener(
        "input",
        debounce(() => {
          const formData = new FormData(form)
          const data = {}
          for (const [key, value] of formData.entries()) {
            if (key !== "password") {
              data[key] = value
            }
          }
          localStorage.setItem(`autosave_${formId}`, JSON.stringify(data))
        }, 1000),
      )
    })

    // Clear on successful submit
    form.addEventListener("submit", () => {
      localStorage.removeItem(`autosave_${formId}`)
    })
  })
}

// Initialize auto-save
initAutoSave()

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + S to save form
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault()
    const activeForm = document.querySelector("form:focus-within")
    if (activeForm) {
      const submitBtn = activeForm.querySelector('button[type="submit"]')
      if (submitBtn) submitBtn.click()
    }
  }

  // Ctrl/Cmd + N to add new item
  if ((e.ctrlKey || e.metaKey) && e.key === "n") {
    e.preventDefault()
    const addBtn = document.querySelector('[onclick*="showAdd"], [onclick*="Add"]')
    if (addBtn) addBtn.click()
  }
})

// Performance monitoring
function initPerformanceMonitoring() {
  // Monitor page load time
  window.addEventListener("load", () => {
    const loadTime = performance.now()
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`)

    // Send to analytics if needed
    if (loadTime > 3000) {
      console.warn("Slow page load detected")
    }
  })

  // Monitor memory usage
  if ("memory" in performance) {
    setInterval(() => {
      const memory = performance.memory
      if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
        // 50MB
        console.warn("High memory usage detected")
      }
    }, 30000)
  }
}

initPerformanceMonitoring()
