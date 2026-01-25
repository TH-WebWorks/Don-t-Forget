# Don’t Forget – Project Guidelines

This repo builds **Don’t Forget**, a calm, text-first daily clarity app.

The app is designed to ship **web-first as a Progressive Web App (PWA)** and later expand to **iOS and Android** with a shared code and design philosophy.

Core promise:
- One focus
- One optional next step (when helpful)
- One boundary

The app exists to reduce cognitive load, not create more of it.

---

## Product vision

### What this app is
- A daily clarity check-in
- A short pause to orient before the day takes over
- A single-screen experience you open, read, lightly interact with, and close

### What this app is not
- Not a to-do list
- Not a habit tracker
- Not a planner
- Not a productivity optimizer
- Not a dashboard
- No streaks, scores, charts, gamification, or performance metrics

### Success definition
If a user opens the app on a bad or overwhelming day, they should feel:
- less pressure
- more clarity
- more permission to do less, intentionally

---

## Platform strategy

### Current phase
- **Web-first**
- Deployed on `dontforget.com`
- Installable via **Add to Home Screen** (PWA)
- Fullscreen, app-like experience

### Future phase
- iOS and Android apps built with **React Native**
- Shared logic, copy, and behavior
- Platform-specific UI layers

### Design implication
Anything built for the web **must be portable in concept** to mobile.

Avoid relying on:
- browser-only UI patterns
- hover-based interactions
- dense layouts that assume large screens
- web-only component libraries where not necessary

---

## Core interaction model

### One primary screen
The **Daily Orientation screen** is the center of gravity.

All other screens exist only to support:
- understanding today
- adjusting today
- reflecting briefly

Avoid adding navigation, tabs, or sections unless unavoidable.

### One action per screen
Each screen should have:
- one dominant action
- secondary actions must be quiet and optional

### Short sessions
- Designed for 30–90 seconds per use
- The app should never feel like something to manage

### Defaults
- Read mode by default
- Editing is optional
- Skipping is allowed
- Exiting at any time has no consequence

---

## UX and behavior rules

### Daily Orientation structure
The main screen is oriented around:
What matters today
What is enough
What can be let go of
Not all prompts appear every day.

Implemented as:
- Focus (singular)
- Next Step (small and concrete)
- Boundary (protective, pressure-reducing)

### Editing philosophy
- Most days, users do not edit
- Adjusting should be lightweight and reversible
- No “edit mode” that feels heavy or technical

---

## Tone and copy guidelines

### Voice
- Calm
- Direct
- Grounded
- Non-judgmental
- Quietly supportive

### Avoid
- Hustle language
- Optimization framing
- “Crush your day” tone
- Moralizing productivity
- Excessive enthusiasm or punctuation

### Prefer
- Permission: “One sentence is enough.”
- Orientation: “Here’s one way to hold today.”
- Boundaries: “You don’t need to solve everything today.”

### Copy rules
- Prompts under 15 words where possible
- No stacked instructions
- No jargon
- Sentence case for most UI text
- Headings are short and functional

---

## Design system rules

### Visual identity
- Text-first
- Editorial
- Calm and minimal
- Generous whitespace
- Low visual noise

### Layout
- Mobile-first
- Comfortable reading width
- Consistent vertical rhythm
- No dense UI clusters

### Components
- Prefer simple HTML elements styled with Tailwind
- Introduce component libraries only when they add clear accessibility value
- Avoid overusing web-only primitives that will not translate to mobile

### Buttons
- One primary button per screen
- Secondary actions as text buttons
- No floating action buttons
- No visual urgency

### Forms and inputs
- One input per step when possible
- No required long answers
- No intimidating validation
- Always provide reassurance (“One sentence is enough”)

### Color
- Neutral palette (warm off-white, soft gray, charcoal)
- Accent colors used sparingly
- No bright or saturated UI colors

### Typography
- Prioritize readability above style
- Clear hierarchy
- Comfortable line height
- Avoid overly thin font weights

### Motion
- Subtle and supportive only
- No playful or bouncy animations
- Prefer fades and gentle transitions
- Respect reduced-motion preferences

---

## Accessibility principles

- Maintain sufficient text contrast
- All interactive elements must have visible focus states
- All actions reachable via keyboard
- Tap targets sized for mobile
- Never rely on color alone to convey meaning

---

## Engineering guidelines

### Stack (do not change casually)
- React + TypeScript
- Vite
- Tailwind CSS
- PWA configuration
- Minimal use of Radix
- Minimal use of Framer Motion

### Code philosophy
- Favor clarity over cleverness
- Keep components small and focused
- Avoid premature abstraction
- UI components should be thin shells over logic

### State management
- Keep state local unless clearly shared
- Avoid global state libraries early
- The app should function with mock data first

### Data and persistence
- Start with local persistence (localStorage or IndexedDB)
- Do not block usage behind accounts
- Cloud sync comes later

---

## AI behavior guidelines (future)

When generating a daily orientation:
- Prefer short, concrete language
- Avoid long plans or explanations
- Reduce activation energy
- Always include a boundary
- Never shame or imply failure

If input is vague:
- Ask at most one follow-up question
- Otherwise propose a reasonable draft and allow adjustment

---

## Guardrails against product drift

Before adding a feature, ask:
1. Does this reduce cognitive load?
2. Does this add management or maintenance?
3. Can the user benefit without commitment?

If the feature introduces:
- tracking
- metrics
- lists
- dashboards
- gamification

It is likely out of scope.

---

## Definition of Done (UI)

A screen is considered done when:
- it feels calm and readable
- the primary action is obvious
- skipping or exiting is allowed
- it asks for only one meaningful decision
- it works cleanly on mobile sizes
