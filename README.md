# 🎓 Shaxzod Kalandarov - Student Portfolio

Personal portfolio website for Shaxzod Kalandarov, a Computer Science student at Inha University in Tashkent, Uzbekistan.

## 📚 About

This portfolio showcases:
- 🏫 **Schedule**: Weekly class schedule at Inha University (IUT)
- 🎌 **Favorite Anime**: Collection of anime that inspire and teach life lessons
- 👤 **About**: Educational journey and interests
- 📧 **Contact**: Ways to connect

## 🛠️ Technologies & Libraries Used

### Core Technologies
- **HTML5**: Semantic markup with modern elements
- **CSS3**: Advanced styling with:
  - CSS Variables for theming (light/dark mode)
  - CSS Grid for responsive layouts
  - CSS Flexbox for component alignment
  - CSS Animations and Transitions
  - Media Queries for responsive design (8 breakpoints)
  
- **React 18**: Component-based UI library (in `index-react.html`)
  - React Hooks (useState, useEffect)
  - Component composition
  - State management
  - Event handling
  - Conditional rendering
  
- **JavaScript ES6+**: Modern JavaScript features including:
  - Classes and Object-Oriented Programming
  - Arrow functions
  - Template literals
  - Async/await (prepared for future API calls)
  - Local Storage API for theme persistence
  - Intersection Observer API for scroll animations

### JavaScript Libraries & APIs

#### 1. **Intersection Observer API** (Native Browser API)
**Location**: `assets/js/main.js` - Lines 45-62
```javascript
observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
```
**Purpose**: Animates elements as they scroll into view
**Why Used**: Provides smooth, performance-optimized scroll animations without jQuery

#### 2. **Local Storage API** (Native Browser API)
**Location**: `assets/js/main.js` - Lines 80-95
```javascript
loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
```
**Purpose**: Persists user's theme preference across sessions
**Why Used**: Remembers if user prefers dark or light mode

#### 3. **Form Validation API** (Custom Implementation)
**Location**: `assets/js/main.js` - Lines 183-244
```javascript
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.inputs = this.form.querySelectorAll('input, textarea');
            this.init();
        }
    }
    
    validate(input) {
        const value = input.value.trim();
        const type = input.type;
        
        if (input.hasAttribute('required') && !value) {
            return 'This field is required';
        }
        
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Please enter a valid email';
            }
        }
        
        if (input.minLength > 0 && value.length < input.minLength) {
            return `Minimum ${input.minLength} characters required`;
        }
        
        return '';
    }
}
```
**Purpose**: Real-time form validation with custom error messages
**Why Used**: Provides immediate feedback to users when filling out forms

#### 4. **Project Filter System** (Custom Implementation)
**Location**: `assets/js/main.js` - Lines 246-276
```javascript
class ProjectFilter {
    constructor(gridSelector, filterSelector) {
        this.grid = document.querySelector(gridSelector);
        this.filters = document.querySelectorAll(filterSelector);
        this.init();
    }
    
    filterProjects(category) {
        const projects = this.grid.querySelectorAll('.project-item');
        
        projects.forEach(project => {
            if (category === 'all' || project.dataset.category === category) {
                project.style.display = '';
                project.classList.add('fade-in');
            } else {
                project.style.display = 'none';
            }
        });
    }
}
```
**Purpose**: Filters schedule/anime items by category
**Why Used**: Allows users to view specific days or anime genres

#### 5. **Counter Animation** (Custom Implementation)
**Location**: `assets/js/main.js` - Lines 120-143
```javascript
animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}
```
**Purpose**: Animates numbers counting up from 0
**Why Used**: Creates engaging visual effect for statistics (courses, anime count, etc.)

### React.js Implementation

#### ⚛️ React Version Available: `index-react.html`

**React 18 with CDN** - Single-page application using React Hooks
**Location**: `index-react.html`

**React Components Implemented**:
1. **Navigation Component** - Handles navigation and theme toggle
   - Uses `useState` for mobile menu and theme state
   - Uses `useEffect` for theme persistence with localStorage
   - Props: `currentPage`, `onPageChange`

2. **HomePage Component** - Main landing page
   - Displays courses, stats, and featured anime
   - Dynamic rendering with `.map()`
   - Props: `onPageChange`

3. **AboutPage Component** - About section
   - Simple informational component

4. **SchedulePage Component** - Weekly schedule
   - Maps through schedule data array
   - Shows class times and descriptions

5. **AnimePage Component** - Anime collection
   - Lists all favorite anime with details
   - Dynamic tags rendering

6. **ContactPage Component** - Contact form
   - Uses `useState` for form data management
   - Handles form submission
   - Real-time form state updates with `onChange`

7. **Footer Component** - Reusable footer

8. **App Component** - Main container
   - Uses `useState` for page routing
   - Uses `useEffect` to scroll to top on page change
   - Renders different pages based on state

**React Features Used**:
- ✅ React Hooks (`useState`, `useEffect`)
- ✅ Component composition
- ✅ Props and prop drilling
- ✅ Event handlers
- ✅ Conditional rendering
- ✅ List rendering with `.map()`
- ✅ Form handling with controlled components
- ✅ Local storage integration

**How to use**:
```bash
# Open the React version
open index-react.html
# or
Start-Process "d:\git\Shoha-ops.github.io\sh\index-react.html"
```

### Potential Future Enhancements

#### Node.js Backend (Suggested)
**Where it would be used**:
- Express.js server for handling contact form submissions
- RESTful API endpoints for schedule/anime data
- Email service integration (Nodemailer)
- Database integration (MongoDB/PostgreSQL)

**Example API structure**:
```javascript
// server.js
const express = require('express');
const app = express();

app.post('/api/contact', async (req, res) => {
    // Handle form submission
    // Send email notification
    // Store in database
});

app.get('/api/schedule', async (req, res) => {
    // Return schedule data
});
```

## 📁 Project Structure

```
sh/
├── index.html              # Home page - Vanilla JavaScript version
├── index-react.html        # Home page - React version (Single Page App)
├── pages/
│   ├── about.html         # Educational background and interests
│   ├── schedule.html      # Weekly IUT class schedule
│   ├── anime.html         # Favorite anime collection
│   └── contact.html       # Contact information and form
├── assets/
│   ├── css/
│   │   └── main.css       # Global styles with CSS variables
│   └── js/
│       └── main.js        # JavaScript functionality (Portfolio class)
├── index.old.html         # Original backup file
└── README.md              # This file
```

## 🎨 Design Features

- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between themes with persistence
- **Smooth Animations**: Fade-in effects and transitions
- **Modern UI**: Clean, minimalist design with gradients
- **Accessibility**: Semantic HTML and ARIA labels

## 🚀 How to Run

### Vanilla JavaScript Version
1. Open `index.html` in a web browser
2. All pages work independently

### React Version
1. Open `index-react.html` in a web browser
2. Single Page Application with client-side routing
3. All content in one file

### Using a Local Server (Optional)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PowerShell
Start-Process "d:\git\Shoha-ops.github.io\sh\index-react.html"
```
Navigate to `http://localhost:8000`

## 👤 About the Student

**Shaxzod Kalandarov**
- 🎓 Computer Science Student at Inha University in Tashkent
- 📚 Studying: Object-Oriented Programming, Calculus, Physics, Academic English
- 🎌 Anime Enthusiast
- 🌿 Nature Lover
- 💭 Philosophy Thinker

## 📞 Contact

- 📧 Email: s.kalandarov@student.inha.uz
- 💬 Telegram: @Roicaluste
- 🐙 GitHub: Roicalus
- 📍 Location: Tashkent, Uzbekistan 🇺🇿

## 📄 License

Personal portfolio - © 2024 Shaxzod Kalandarov

---

**Note**: This portfolio is built with vanilla JavaScript and modern CSS. React and Node.js suggestions are for potential future enhancements to make the codebase more scalable and maintainable as the project grows.
