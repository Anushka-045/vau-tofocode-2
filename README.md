# Interactive Recipe Card – Chocolate Lava Cake

A single-page interactive recipe card built with HTML, CSS, and vanilla JavaScript.

## Features

### 1. Recipe Card Layout
- Recipe title, dish illustration, ingredients list, step-by-step instructions
- Preparation time, servings, and calories in the header
- Box model used throughout for consistent spacing

### 2. CSS Animations & Transitions
- Card slide-up animation on load
- Ingredient cards lift on hover with shadow
- Animated floating cake illustration
- Animated progress bar with shimmer effect
- Step highlight pulse animation
- Timer countdown ring animation
- Section collapse/expand with smooth transition

### 3. JavaScript Interactivity
- **Toggle Ingredients / Instructions** – click the section header or Hide/Show button
- **Ingredient checkboxes** – click any ingredient to mark it as done (keyboard accessible)
- **Start Cooking** – highlights Step 1 and starts the countdown timer
- **Next Step** – advances through steps one at a time with visual highlighting
- **Progress bar** – updates as steps are completed
- **Finish** – celebrates completion with a confetti burst
- **Stop Timer** – hides the countdown ring

### 4. Responsive Design
- Mobile (< 380px): stacked meta items, larger touch targets
- Tablet (< 640px): single-column ingredients, simplified step layout
- Desktop: two-column ingredient grid, full layout

### 5. Bonus Features (Implemented)
- ✅ Countdown timer (25 min) with animated SVG ring
- ✅ Print-friendly layout (hides buttons & timer, preserves content)

## How to Run

Just open `index.html` in any modern browser — no server or build step needed.

## File Structure

```
recipe-card/
├── index.html   ← structure & content
├── style.css    ← all styles, animations, media queries
├── script.js    ← interactivity & timer logic
└── README.md
```

## To Add a Real Photo

Replace the `.card__image-placeholder` section in `index.html` with:
```html
<img src="images/your-photo.jpg" alt="Chocolate Lava Cake" style="width:100%;display:block;" />
```
