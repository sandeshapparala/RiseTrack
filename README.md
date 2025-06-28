# RiseTrack OS - Personal Life Management System

> A holistic personal development system to help you track and stay aligned with your vision, goals, time, and progress in 2025.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Project Overview

RiseTrack OS is a comprehensive personal life management application designed specifically for tracking and achieving life goals through:

- **Mission & Vision Alignment** - Keep your 2025 vision front and center
- **Smart Time Tracking** - Focus on one task at a time with productive tracking  
- **Goal Management** - Break down and track progress on all life goals
- **Daily Planning** - Organized morning/afternoon/evening task scheduling
- **Earnings Tracking** - Monitor progress toward financial goals
- **Reflection & Journaling** - Daily wins, challenges, and spiritual growth
- **Progress Analytics** - Visual insights into your personal development

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (planned)
- **Database**: Firebase Firestore (planned)
- **Authentication**: Firebase Auth (planned)
- **Charts**: Recharts (planned)
- **Icons**: Heroicons (SVG)

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## 🎯 Development Phases

### ✅ Phase 1: Foundation (Current)
- [x] Project setup with Next.js & TypeScript
- [x] Tailwind CSS configuration
- [x] Basic project structure
- [x] Initial landing page
- [ ] ShadCN UI setup
- [ ] Firebase configuration

### 📅 Phase 2: Core Modules (Weeks 3-8)
- [ ] Mission & Vision Module
- [ ] Dashboard with widgets
- [ ] Day Planner
- [ ] Smart Time Tracker
- [ ] Earnings Tracker  
- [ ] Goals Tracker

### 📅 Phase 3: Advanced Features (Weeks 9-12)
- [ ] Reflection & Journal Module
- [ ] Analytics & Insights
- [ ] Data export/backup
- [ ] Performance optimization

### 📅 Phase 4: Polish & Launch (Weeks 13-16)
- [ ] Testing & QA
- [ ] Mobile responsiveness
- [ ] Deployment setup
- [ ] User documentation

## 🔧 Development Guidelines

### Code Standards
- Use TypeScript strict mode
- Follow ESLint configuration
- Write self-documenting code
- Use semantic HTML and proper accessibility

### File Naming
- Components: PascalCase (`TaskCard.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE
- Types: PascalCase with interface prefix

### Git Workflow
```bash
# Feature development
git checkout -b feature/dashboard-widgets
git commit -m "feat: add countdown timer widget"
git push origin feature/dashboard-widgets
```

## 📖 Documentation

- [Development Plan](./Development%20Plan.md) - Complete 16-week roadmap
- [MVP Focus](./MVP%20Focus.md) - Core features for MVP
- [RiseTrack OS](./RiseTrack%20OS.md) - Full project specification

## 🎨 Design System

### Colors
- Primary: Blue (`#2563eb`)
- Secondary: Slate (`#64748b`) 
- Accent: Emerald (`#10b981`)
- Background: White/Dark (`#ffffff`/`#0a0a0a`)

### Typography
- Headings: Inter font family
- Body: System font stack
- Responsive sizing with Tailwind classes

## 🚀 Getting Started with Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd risetrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Firebase configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Next Steps

1. Install ShadCN UI components
2. Set up Firebase project and authentication
3. Create basic layout components (Header, Sidebar)
4. Implement routing structure
5. Begin Mission & Vision module development

## 🤝 Contributing

This is a personal project, but following best practices for potential future collaboration:

1. Create feature branches
2. Write descriptive commit messages
3. Test thoroughly before committing
4. Update documentation as needed

---

**Built with ❤️ for personal growth and 2025 success** 🚀

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
