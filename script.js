// Theme Management
const themeToggle = document.getElementById("theme-toggle")
const soundToggle = document.getElementById("sound-toggle")
const body = document.body

// Initialize theme
let currentTheme = localStorage.getItem("theme") || "light"
let soundEnabled = localStorage.getItem("sound") !== "false"

// Apply saved theme
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark")
}

// Update sound button
updateSoundButton()

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light"

  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark")
  } else {
    body.removeAttribute("data-theme")
  }

  localStorage.setItem("theme", currentTheme)
  playSound("click")
})

// Sound toggle functionality
soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled
  localStorage.setItem("sound", soundEnabled)
  updateSoundButton()
  playSound("click")
})

function updateSoundButton() {
  soundToggle.textContent = soundEnabled ? "🔊" : "🔇"
}

// Navigation Management
const navButtons = document.querySelectorAll(".nav-btn")
const backButtons = document.querySelectorAll(".back-btn")
const pages = document.querySelectorAll(".page")

// Navigation event listeners
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetPage = button.getAttribute("data-page")
    navigateToPage(targetPage)
    playSound("navigate")
  })
})

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetPage = button.getAttribute("data-page")
    navigateToPage(targetPage)
    playSound("back")
  })
})

function navigateToPage(pageId) {
  // Hide all pages
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Show target page
  const targetPage = document.getElementById(pageId)
  if (targetPage) {
    targetPage.classList.add("active")
  }

  // Add page transition effect
  const mainContent = document.getElementById("main-content")
  mainContent.style.opacity = "0"

  setTimeout(() => {
    mainContent.style.opacity = "1"
  }, 150)
}

// Sound Effects
function playSound(type) {
  if (!soundEnabled) return

  // Create audio context for sound effects
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const sounds = {
    click: { frequency: 800, duration: 100 },
    navigate: { frequency: 600, duration: 150 },
    back: { frequency: 400, duration: 120 },
    hover: { frequency: 1000, duration: 50 },
  }

  const sound = sounds[type]
  if (!sound) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime)
  oscillator.type = "sine"

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + sound.duration / 1000)
}

// Add hover sound effects
document.querySelectorAll(".nav-btn, .social-link, .back-btn, .theme-btn, .sound-btn").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    playSound("hover")
  })
})

// Contact Form Handling
// const contactForm = document.querySelector(".contact-form")
// if (contactForm) {
//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault()

//     // Get form data
//     const formData = new FormData(contactForm)
//     const name = contactForm.querySelector('input[type="text"]').value
//     const email = contactForm.querySelector('input[type="email"]').value
//     const message = contactForm.querySelector("textarea").value

//     // Simple validation
//     if (!name || !email || !message) {
//       alert("Please fill in all fields")
//       return
//     }

//     // Simulate form submission
//     const submitButton = contactForm.querySelector("button")
//     const originalText = submitButton.textContent

//     submitButton.textContent = "Sending..."
//     submitButton.disabled = true

//     setTimeout(() => {
//       alert("Thank you for your message! I'll get back to you soon.")
//       contactForm.reset()
//       submitButton.textContent = originalText
//       submitButton.disabled = false
//       playSound("navigate")
//     }, 2000)

//     playSound("click")
//   })
// }

// Parallax Effect for Background Elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".cloud, .celestial-body")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add floating animation to cards
const cards = document.querySelectorAll(".card")
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`
})

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll(".project, .social-link").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(element)
})

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add("ripple")

  const ripple = button.getElementsByClassName("ripple")[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .nav-btn, .social-link, .back-btn, .theme-btn, .sound-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Add ripple effect to interactive elements
document.querySelectorAll(".nav-btn, .social-link, .back-btn, .theme-btn, .sound-btn").forEach((button) => {
  button.addEventListener("click", createRipple)
})

// Dynamic greeting based on time
function updateGreeting() {
  const hour = new Date().getHours()
  const greetingElement = document.querySelector("h1")

  if (greetingElement && greetingElement.textContent.includes("Hi!")) {
    let greeting = "Hi!"

    if (hour < 12) {
      greeting = "Good Morning!"
    } else if (hour < 18) {
      greeting = "Good Afternoon!"
    } else {
      greeting = "Good Evening!"
    }

    greetingElement.innerHTML = `${greeting} <span class="highlight">I'm Van</span>`
  }
}

// Update greeting on page load
updateGreeting()

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  const currentPage = document.querySelector(".page.active")
  const currentPageId = currentPage ? currentPage.id : "home"

  switch (e.key) {
    case "Escape":
      if (currentPageId !== "home") {
        navigateToPage("home")
        playSound("back")
      }
      break
    case "1":
      navigateToPage("about")
      playSound("navigate")
      break
    case "2":
      navigateToPage("links")
      playSound("navigate")
      break
    case "3":
      navigateToPage("work")
      playSound("navigate")
      break
    case "4":
      navigateToPage("contact")
      playSound("navigate")
      break
    case "t":
    case "T":
      themeToggle.click()
      break
    case "s":
    case "S":
      soundToggle.click()
      break
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.1s")
}

// Add touch gestures for mobile
let touchStartX = 0
let touchStartY = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
})

document.addEventListener("touchend", (e) => {
  if (!touchStartX || !touchStartY) return

  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const diffX = touchStartX - touchEndX
  const diffY = touchStartY - touchEndY

  // Swipe detection
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    const currentPage = document.querySelector(".page.active")
    const currentPageId = currentPage ? currentPage.id : "home"

    if (diffX > 0) {
      // Swipe left - next page
      const pages = ["home", "about", "links", "work", "contact"]
      const currentIndex = pages.indexOf(currentPageId)
      const nextIndex = (currentIndex + 1) % pages.length
      navigateToPage(pages[nextIndex])
      playSound("navigate")
    } else {
      // Swipe right - previous page
      const pages = ["home", "about", "links", "work", "contact"]
      const currentIndex = pages.indexOf(currentPageId)
      const prevIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1
      navigateToPage(pages[prevIndex])
      playSound("back")
    }
  }

  touchStartX = 0
  touchStartY = 0
})

console.log("🌟 Van's Portfolio loaded successfully!")
console.log("💡 Keyboard shortcuts:")
console.log("  - ESC: Go to home")
console.log("  - 1-4: Navigate to pages")
console.log("  - T: Toggle theme")
console.log("  - S: Toggle sound")
console.log("📱 Mobile: Swipe left/right to navigate")
