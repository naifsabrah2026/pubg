import { Chart } from "@/components/ui/chart"
// Admin Panel JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize admin functionality
  initSidebar()
  initDataTables()
  initCharts()
  initModals()
  initFormValidation()
  initNotifications()
})

// Sidebar Management
function initSidebar() {
  const sidebarItems = document.querySelectorAll(".nav-item")
  const currentPath = window.location.pathname

  sidebarItems.forEach((item) => {
    const href = item.getAttribute("href")
    if (href && currentPath.includes(href)) {
      item.classList.add("active")
    }

    item.addEventListener("click", function (e) {
      // Remove active class from all items
      sidebarItems.forEach((i) => i.classList.remove("active"))
      // Add active class to clicked item
      this.classList.add("active")
    })
  })
}

// Data Tables
function initDataTables() {
  const tables = document.querySelectorAll(".data-table")

  tables.forEach((table) => {
    // Add sorting functionality
    const headers = table.querySelectorAll("th[data-sort]")
    headers.forEach((header) => {
      header.style.cursor = "pointer"
      header.addEventListener("click", () => sortTable(table, header))
    })

    // Add search functionality
    const searchInput = table.parentElement.querySelector(".table-search")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => filterTable(table, e.target.value))
    }
  })
}

function sortTable(table, header) {
  const tbody = table.querySelector("tbody")
  const rows = Array.from(tbody.querySelectorAll("tr"))
  const columnIndex = Array.from(header.parentElement.children).indexOf(header)
  const sortType = header.dataset.sort
  const isAscending = !header.classList.contains("sort-asc")

  // Remove sort classes from all headers
  table.querySelectorAll("th").forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc")
  })

  // Add sort class to current header
  header.classList.add(isAscending ? "sort-asc" : "sort-desc")

  rows.sort((a, b) => {
    const aValue = a.children[columnIndex].textContent.trim()
    const bValue = b.children[columnIndex].textContent.trim()

    let comparison = 0

    if (sortType === "number") {
      comparison = Number.parseFloat(aValue) - Number.parseFloat(bValue)
    } else if (sortType === "date") {
      comparison = new Date(aValue) - new Date(bValue)
    } else {
      comparison = aValue.localeCompare(bValue, "ar")
    }

    return isAscending ? comparison : -comparison
  })

  // Reorder rows
  rows.forEach((row) => tbody.appendChild(row))
}

function filterTable(table, searchTerm) {
  const tbody = table.querySelector("tbody")
  const rows = tbody.querySelectorAll("tr")

  rows.forEach((row) => {
    const text = row.textContent.toLowerCase()
    const matches = text.includes(searchTerm.toLowerCase())
    row.style.display = matches ? "" : "none"
  })
}

// Charts
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
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
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
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#64748b",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#64748b",
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
        labels: ["كونكر", "آيس", "كراون", "دايموند", "أخرى"],
        datasets: [
          {
            data: [30, 25, 20, 15, 10],
            backgroundColor: ["#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444"],
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
            labels: {
              color: "#e2e8f0",
              padding: 20,
            },
          },
        },
      },
    })
  }
}

// Modals
function initModals() {
  const modals = document.querySelectorAll(".modal")
  const modalTriggers = document.querySelectorAll("[data-modal]")
  const modalCloses = document.querySelectorAll(".modal-close")

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault()
      const modalId = trigger.dataset.modal
      const modal = document.getElementById(modalId)
      if (modal) {
        showModal(modal)
      }
    })
  })

  modalCloses.forEach((close) => {
    close.addEventListener("click", (e) => {
      e.preventDefault()
      const modal = close.closest(".modal")
      if (modal) {
        hideModal(modal)
      }
    })
  })

  // Close modal on backdrop click
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideModal(modal)
      }
    })
  })
}

function showModal(modal) {
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"

  // Animate in
  requestAnimationFrame(() => {
    modal.classList.add("show")
  })
}

function hideModal(modal) {
  modal.classList.remove("show")

  setTimeout(() => {
    modal.style.display = "none"
    document.body.style.overflow = ""
  }, 300)
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll(".admin-form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!validateForm(form)) {
        e.preventDefault()
      }
    })

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input))
      input.addEventListener("input", () => clearFieldError(input))
    })
  })
}

function validateForm(form) {
  let isValid = true
  const inputs = form.querySelectorAll("input[required], textarea[required], select[required]")

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
  if (type === "email" && value && !isValidEmail(value)) {
    isValid = false
    message = "يرجى إدخال بريد إلكتروني صحيح"
  }

  // Number validation
  if (type === "number" && value && isNaN(value)) {
    isValid = false
    message = "يرجى إدخال رقم صحيح"
  }

  // URL validation
  if (type === "url" && value && !isValidURL(value)) {
    isValid = false
    message = "يرجى إدخال رابط صحيح"
  }

  if (isValid) {
    clearFieldError(field)
  } else {
    showFieldError(field, message)
  }

  return isValid
}

function showFieldError(field, message) {
  clearFieldError(field)

  field.classList.add("error")

  const errorDiv = document.createElement("div")
  errorDiv.className = "field-error"
  errorDiv.textContent = message

  field.parentNode.appendChild(errorDiv)
}

function clearFieldError(field) {
  field.classList.remove("error")

  const errorDiv = field.parentNode.querySelector(".field-error")
  if (errorDiv) {
    errorDiv.remove()
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidURL(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Notifications
function initNotifications() {
  // Auto-hide notifications
  const notifications = document.querySelectorAll(".notification")
  notifications.forEach((notification) => {
    setTimeout(() => {
      hideNotification(notification)
    }, 5000)

    const closeBtn = notification.querySelector(".notification-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", () => hideNotification(notification))
    }
  })
}

function showNotification(message, type = "info", duration = 5000) {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const icon = getNotificationIcon(type)

  notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `

  document.body.appendChild(notification)

  // Animate in
  requestAnimationFrame(() => {
    notification.classList.add("show")
  })

  // Auto-hide
  setTimeout(() => {
    hideNotification(notification)
  }, duration)

  // Close button
  notification.querySelector(".notification-close").addEventListener("click", () => {
    hideNotification(notification)
  })
}

function hideNotification(notification) {
  notification.classList.remove("show")

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 300)
}

function getNotificationIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  return icons[type] || icons.info
}

// Utility Functions
function formatPrice(price) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
  }).format(price)
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
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

// AJAX Functions
function makeRequest(url, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  }

  const finalOptions = { ...defaultOptions, ...options }

  return fetch(url, finalOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Request failed:", error)
      showNotification("حدث خطأ في الطلب", "error")
      throw error
    })
}

// Export functions for global use
window.AdminJS = {
  showModal,
  hideModal,
  showNotification,
  hideNotification,
  validateForm,
  formatPrice,
  formatDate,
  makeRequest,
}

// Add CSS for notifications and form validation
const style = document.createElement("style")
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
        color: #155724;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
        color: #721c24;
    }
    
    .notification-warning {
        border-left: 4px solid #ffc107;
        color: #856404;
    }
    
    .notification-info {
        border-left: 4px solid #17a2b8;
        color: #0c5460;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.3s;
    }
    
    .notification-close:hover {
        background: #f8f9fa;
        color: #666;
    }
    
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 4px;
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .sort-asc::after {
        content: ' ↑';
        color: #f59e0b;
    }
    
    .sort-desc::after {
        content: ' ↓';
        color: #f59e0b;
    }
`
document.head.appendChild(style)

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

  showModal(modal)
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
        showNotification("خطأ في جلب بيانات المنتج", "error")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      showNotification("حدث خطأ في الاتصال", "error")
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
        showNotification("تم حذف المنتج بنجاح", "success")
        setTimeout(() => location.reload(), 1500)
      })
      .catch((error) => {
        console.error("Error:", error)
        showNotification("حدث خطأ في حذف المنتج", "error")
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
