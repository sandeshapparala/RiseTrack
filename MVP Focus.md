# RiseTrack MVP Feature Specification (v1)

**Project Name**: RiseTrack\
**Purpose**: A personal life management system to help Sandesh track and stay aligned with his vision, goals, time, and progress in 2025.

---

## Core Philosophy

RiseTrack is not just a task manager but a holistic personal development system. It keeps Sandesh aligned with his spiritual, professional, and personal goals by combining time tracking, goal progress, journaling, earnings management, and mission alignment — all in one system.

---

## ✅ MVP Feature Modules (v1)

### 1. **Mission & Vision Module**

- Editable 2025 Vision and Mission
- Display prominently on dashboard
- Visualize progress of key goals (Income, Goals Completed, Time Logged)
- Spiritual alignment: Prayer log + Verse of the Year

---

### 2. **Dashboard**

- Home for all daily metrics and reminders
- Widgets:
  - Today’s Focus Task
  - Time Remaining in Day / Week / Month / Year (Countdown widgets)
  - Tasks Completed Today
  - Time Worked Today and This Week (hh\:mm)
  - ₹ Earned This Month / YTD with progress toward ₹10L goal
  - Goal Progress Summary (X% to complete)
- Quick add buttons for: Task, Journal, Time log, Income log

---

### 3. **Day Planner**

- Morning / Afternoon / Evening task sections
- Set "One Mission of the Day"
- Task status toggles (✅ / ❌)
- Auto-carry forward of incomplete tasks to next day
- Daily productivity score (based on tasks completed)

---

### 4. **Smart Time Tracker**

- One task at a time timer
- Track start/stop with task name and category (Freelance, Learning, Health, etc.)
- Daily and weekly worked hour counters
- % target completed (e.g., 5h/6h = 83%)
- View and edit past time logs

---

### 5. **Earnings Tracker**

- Log: Date, Source, Type, Amount
- Filter by month, week, year
- ₹10L Annual Goal Progress Bar
- Visual Charts (bar/line): ₹ per month, source breakdown
- Earnings summary on dashboard

---

### 6. **Goals Tracker**

- Create long- and short-term goals
- Set categories: Career, Spiritual, Health, Learning, Personal
- Add sub-goals or milestones per goal
- Track completion percentage
- Visual goal cards and progress bars
- Weekly summary popup (X goals progressed, Y stalled)

---

### 7. **Reflection & Journal**

- Daily journal form:
  - 3 Wins
  - 1 Challenge
  - Gratitude box
  - Prayer entry
  - Mood selector (😊 / 😐 / 😞)
- Journal timeline view with filters by day/week/mood
- Export or backup entries (optional)

---

### 8. **Time-Based Progress Widgets**

- Countdown timers for:
  - Day Remaining
  - Week Remaining
  - Month Remaining
  - Year Remaining
- Display on dashboard and planner for urgency awareness

---

## ❌ Excluded from MVP

- Content Tracker (post pipeline, streaks)
- Outreach/Leads Tracker (lead status, follow-up reminders)

---

## Tech Stack (for MVP)

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + ShadCN
- **Database**: Firebase Firestore
- **Auth**: Firebase Auth (Google Login)
- **Charts**: Recharts or Chart.js
- **State**: Context API / Zustand
- **Animations**: Framer Motion

---

## File & Folder Structure (Planned)

```
src/
├── app/
│   ├── dashboard/
│   ├── planner/
│   ├── tracker/
│   │   ├── time/
│   │   ├── earnings/
│   │   └── goals/
│   ├── journal/
├── components/
│   ├── ui/
│   ├── widgets/
│   └── layout/
├── lib/
│   ├── firebase.ts
│   └── utils.ts
├── types/
├── styles/
│   └── utility.css
```

---

## Phase 1 Goals

- Set up project and Firebase
- Build core screens: Dashboard, Planner, Time Tracker, Earnings Tracker
- Launch internal daily use for habit building and consistency

---

## Vision Statement (App Purpose)

> RiseTrack empowers Sandesh to build his best life through structure, focus, discipline, and spiritual alignment. It tracks what matters daily, so no purpose is forgotten, no hour is wasted, and no dream is left behind.

---

