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
    notification.classList.remove('show');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
