# Kaung Myint Myat (Piaz) — 2026 Developer Portfolio

## Project Overview
This is a rewrite of the original portfolio at `../kaungmyintmyat_portfolio`. Personal developer portfolio website showcasing projects, skills, and experience.

---

## Design Direction

### Color Theme
- **Light + Dark mode** with toggle support
- **Primary color**: make mostly use color but make change easily
- Professional color palette

### Vibe/Aesthetic
- **Professional** overall feel
- **Strategic animations** - heavy where needed, subtle elsewhere
- Not overwhelming, purposeful motion

### Layout Structure
- **Single-page scrolling** sections
- Section order:
  1. **Hero Section** - Introduce myself (heavy animation)
  2. **About Me Section** - My story (heavy animation)
  3. **My Work / Projects Section** - Showcase experience (heavy animation)
  4. **Skills & Technologies Section** - Show what I can do (include AI agent usage)
  5. **Footer Section** - Final links and credits

### Animation Style
- **Scroll-Triggered Animations** - content reveals on scroll
- **Parallax Scrolling** - depth and layer effects
- **Full-Page Scrolling** - snap between sections
- Modern GSAP-powered interactions (ScrollTrigger, ScrollSmoother)

### Reference Policy
- **Content only** (text, photos) from old portfolio
- **Fresh UI/UX design** - no copying old layout/components

### Typography
- **Headings**: Lora (serif, elegant)
- **Body/UI**: Ubuntu (sans-serif, modern)

### Responsive Design ⚠️ CRITICAL
- **100% responsive** - mobile-first approach
- Must work flawlessly on all screen sizes (mobile, tablet, desktop)
- Touch-friendly interactions on mobile
- Responsive animations (disable/reduce on mobile if needed)

## Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4 + Chakra UI v3
- **Routing**: TanStack Router
- **Animation**: GSAP
- **Icons**: Lucide React
- **Linting/Formatting**: Biome 2
- **Package Manager**: Bun

## Development Commands
```bash
bun dev          # Start development server
bun build        # Build for production (runs TypeScript check first)
bun preview      # Preview production build
bun lint         # Run Biome linter
bun lint:fix     # Run Biome linter with auto-fix
bun format       # Format code with Biome
```

## Code Conventions
- **Indentation**: Tabs
- **Quotes**: Double quotes
- **Semicolons**: Always
- **Line Width**: 100 characters
- **Imports**: Auto-organized (Biome)

## Project Structure
```
src/
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
├── index.css      # Global styles (Tailwind)
└── assets/        # Static assets (images, SVGs)
```

## Deployment
Configured for Vercel deployment (see `vercel.json`).

---

## Content Migration (from old portfolio)

Source: `../kaungmyintmyat_portfolio`

### Personal Information
- **Name**: Kaung Myint Myat
- **Nickname**: Piaz
- **Email**: kaungmyintmyat2003@gmail.com
- **Location**: Yangon, Myanmar
- **Role**: Full-Stack Developer

### Hero Section
- Greeting: "Hey, I'm Kaung Myint Myat"
- Tagline: "I'm a passionate Full-Stack Developer"
- Location: "Based in Yangon/Myanmar"

### About Me
"I'm Kaung Myint Myat, a passionate and detail-oriented Full-Stack Developer with a strong focus on crafting intuitive and efficient user interfaces. With deep expertise in JavaScript, I specialize in building dynamic and responsive web applications using React (Next.js), Vue (Nuxt.js), and Node.js. I thrive on solving complex problems and turning ideas into impactful digital experiences. Collaboration, clean code, and continuous learning are at the core of my development philosophy. Every project I work on is not just a task — it's a chance to grow, innovate, and create something meaningful. I'm excited about the limitless potential of full-stack development, from building innovative solutions to delivering seamless user experiences."

### What Sets Me Apart
"I see challenges as opportunities to innovate. My approach involves breaking down complex problems into manageable tasks, leading to efficient and scalable solutions. Technology evolves rapidly, and I am committed to staying ahead of the curve. Whether it's diving into new frameworks or refining existing skills, I believe in continuous learning. I value teamwork and thrive in collaborative environments. Working closely with designers, product managers, and fellow developers is where I believe the best ideas come to life."

### Education
- **Degree**: Diploma in Computing (NCC)
- **Image**: `ncc_png_photo.png`

### Work Experience

#### Better Ltd. (Current)
- **Position**: Frontend Web Developer
- **Type**: On-site
- **Location**: Yangon, Myanmar
- **Period**: October 2024 - Present
- **Description**: "This is my first experience in my professional career as a web developer. I have gained valuable experience and become proficient in frontend technologies and architectures."
- **Skills Gained**:
  - Vue 2, Vue 3, Nuxt 2, Nuxt 3
  - Vue and Nuxt architectures, component structure, plugins, middleware
  - Complex state management
  - Security and permission handling with Ability framework
  - Apollo and GraphQL for data fetching
  - Complex UI designs (payroll tables with conditional rendering)
  - Banking integrations
  - Real-time spreadsheet integrations

#### Yojin Company (Past)
- **Position**: Computer Technician
- **Period**: February 2022 - June 2022

### Skills

#### ES6 Specialist
"I can utilize modern JavaScript features to write clean, concise, and maintainable code, ensuring your projects are built with the best practices and latest standards."

#### MERN Stack Maestro
"I can build dynamic full-stack applications with MongoDB, Express.js, React, and Node.js, delivering seamless and powerful web experiences for your projects."

#### C# Windows Forms
"I can create dynamic and user-friendly Windows applications using C# and Windows Forms, delivering efficient and engaging desktop solutions for your projects."

### Projects

#### 1. Elektronisk - Ecommerce Mobile Store
- **Tech**: Next.js, TypeScript, HeadlessUI, Axios, Stripe, Tailwind
- **Link**: https://elektronisk.vercel.app/
- **Repo**: https://github.com/KMM2019503/elektronisk.git
- **Description**: "Elektronisk is a dynamic ecommerce application designed to provide users with a seamless and enjoyable shopping experience."
- **Key Features**:
  - Browse a wide range of products
  - Filter products by color
  - Different billboards for various brands
  - Add to cart functionality
  - Check out with Stripe
  - Beautiful preview product model
  - Individual product cards
  - Responsive UI design

#### 2. Elektronisk CMS Dashboard
- **Tech**: Next.js, TypeScript, Prisma, MySQL, Axios, react-hook-form, Zod, Zustand, Rechart, Next Cloudinary, Shadcn/ui
- **Link**: https://elektronisk-admin.vercel.app/
- **Repo**: https://github.com/KMM2019503/elektronisk-admin.git
- **Description**: "Elektronisk Admin dashboard is a comprehensive CMS platform designed to give store owners complete control over their ecommerce operations."
- **Key Features**:
  - Full Stack Development using Next.js and Prisma
  - Users can manage their entire store functionality
  - Fully responsive design using Tailwind
  - API endpoints using Next API with Prisma
  - Form validation with React Hook Form and Zod
  - Data visualization with bar graphs and pie charts
  - Image upload with Next Cloudinary
  - Tables and cards with Shadcn UI

#### 3. YoGo - Hospital Booking System
- **Tech**: Next.js, TypeScript, Appwrite, react-hook-form, Zod, Tailwind, Shadcn
- **Repo**: https://github.com/KMM2019503/yogo
- **Description**: "YoGo is a comprehensive hospital booking system designed to streamline the process of scheduling medical appointments."
- **Key Features**:
  - Full Stack Development using Next.js and Appwrite
  - Admin can manage entire appointment functionality
  - Form validation with React Hook Form and Zod
  - Data visualization with charts
  - Tables and cards with Shadcn UI

#### 4. TarDar - Real-time Messaging Application
- **Tech**: MongoDB, Express.js, React, Node.js, Socket.io, Zustand, React Router, JWT, DaisyUI
- **Repo**: https://github.com/TarDarChatAppOrg/Tar-Dar.git
- **Description**: "TarDar is an excellent real-time messaging application made to give users a smooth and effective platform for communication."
- **Key Features**:
  - Full Stack Development using MERN Stack
  - Instant message delivery using Socket.io
  - State management with Zustand
  - Secure authentication with JWT tokens
  - Designed with DaisyUI and Tailwind

#### 5. Standing Desk Compound (SDC)
- **Tech**: HTML, CSS, JavaScript
- **Repo**: https://github.com/KMM2019503/DDW-assignment-KMM.git
- **Description**: "Standing Desk Compound (SDC) is a website showcasing a range of standing desks. Built using only HTML, CSS, and pure JavaScript."
- **Key Features**:
  - Beautiful Landing Page
  - Clean and contemporary layout
  - Responsive design
  - Dynamic product showcases
  - Mobile navigation

### Social Links
- **GitHub**: https://github.com/KMM2019503?tab=repositories
- **LinkedIn**: https://www.linkedin.com/in/kaung-myint-myat-921273282/
- **Facebook**: https://www.facebook.com/kaung.m.myat.332?mibextid=ZbWKwL
- **Resume**: https://drive.google.com/file/d/1XW9yeee0fN64HLe9Ara_e2-HZTqPveAV/view?usp=sharing

---

## Images to Migrate

Copy from `../kaungmyintmyat_portfolio/public/images/`:

### Profile & Personal
- `main-profile.jpg` - Main profile photo (3D card showcase)
- `ncc_png_photo.png` - NCC Diploma photo
- `experiences_pt.jpg` - Past experience photo
- `betterhr.png` - BetterHR company
- `betterhrBackground.jpg` - BetterHR background

### Project Mockups
- `elektronisk-client-web-mockup.png` - Elektronisk store
- `elektronisk-admin-web-mockup.png` - Elektronisk admin
- `yogo-web-mockup.png` - YoGo hospital system
- `TarDarWebMockups.png` - TarDar chat app
- `SDC-web-Mockups.png` - Standing desk website
- `FitnessAppMockups.jpg` - Fitness Windows app (commented out)

### Tech Stack Logos
- `nextLogo.png`, `tsLogo.png`, `reactLogo.png`, `nodeJsLogo.jpg`
- `tailwind-logo.png`, `shadcn-logo.png`, `headlessuiLogo.jpg`
- `prismaLogo.png`, `mysqlLogo.png`, `mongoLogo.png`
- `appwrite-logo.jpg`, `axiosLogo.png`, `stripeLogo.png`
- `zustand.jpg`, `zodLogo.jpg`, `daisyUI.png`
- `expressJsLogo.png`, `JWT.png`
- `CShapLogo.png`, `gunaLogo.png`
- `html-logo.png`, `css-logo.png`, `js-logo.jpg`

### Skill Backgrounds
- `jsBg.jpg` - JavaScript background
- `MERN_Stack.jpg` - MERN stack background
- `vue-bg.jpg` - Vue.js background
- `nuxt_bg.png` - Nuxt background
- `graphqlBg.png` - GraphQL background
- `DatabasePhoto.jpg` - Database skills
- `RestApi.png` - REST API

### Favicons
- `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`

---

## Notes
- This is a fresh project setup with modern React 19 and Vite 7
- Uses Chakra UI v3 (latest version with new API)
- Tailwind CSS 4 with Vite plugin integration
- Copyright notice: "Copyright © 2024 Piniaz" (update year for 2026)
