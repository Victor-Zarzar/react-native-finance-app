<h1 align="center" id="header">
  React Native Finance App
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo">
  <img src="https://img.shields.io/badge/Expo_SDK-55-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 55">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Expo_Router-000000?style=for-the-badge&logo=expo&logoColor=white" alt="Expo Router">
  <img src="https://img.shields.io/badge/NativeWind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="NativeWind">
  <img src="https://img.shields.io/badge/DrizzleORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun">
  <img src="https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions">
</p>

<p align="center">
    A personal finance mobile app built with Expo Router, NativeWind, Drizzle ORM, and SQLite. Track your expenses, income, and financial goals — all offline-first.
</p>

---

<h2 id="stack">Tech Stack</h2>

<p>
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/React-Dark.svg" width="48" title="React Native">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TypeScript.svg" width="48" title="TypeScript">
<img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TailwindCSS-Dark.svg" width="48" title="NativeWind">
</p>

---

<h2 id="quick-start">Quick Start</h2>

### Using Bun (Recommended)

```bash
git clone https://github.com/Victor-Zarzar/react-native-finance-app
cd react-native-finance-app
bun install
bun run dev
```

### Using npm

```bash
git clone https://github.com/Victor-Zarzar/react-native-finance-app
cd react-native-finance-app
npm install
npm run dev
```

---

### Core Technologies

- **React Native** – Cross-platform mobile framework
- **Expo SDK 55** – Development platform and tooling
- **Expo Router** – File-based routing
- **TypeScript** – Type-safe development
- **NativeWind** – Tailwind CSS for React Native
- **Drizzle ORM** – Type-safe SQL ORM with local SQLite support
- **Expo SQLite** – Local database for offline-first data persistence
- **React Hook Form + Zod** – Form handling and validation
- **i18next + react-i18next** – Internationalization (i18n)
- **react-native-gifted-charts** – Financial charts and data visualization
- **React Native Reusables** – Accessible UI component system

---

<h2 id="features">Key Features</h2>

- Offline-first with local SQLite database via Drizzle ORM
- Financial charts and data visualization
- Form validation with React Hook Form and Zod
- Internationalization (i18n) with i18next
- File-based routing with Expo Router
- Dark mode support
- Reusable component system preconfigured
- Edge-to-edge support
- New Architecture enabled (Fabric + TurboModules)
- Cross-platform (iOS, Android, Web)
- Code quality enforced with Biome (lint + format)
- Export support via `expo-print` and `expo-sharing`

---

<h2 id="prerequisites">Prerequisites</h2>

Before starting, ensure you have:

- Node.js (v24+)
- npm or Bun
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Git

---

<h2 id="project-structure">Project Structure</h2>

```
react-native-finance-app/
├── app/                     # Expo Router routes
│   ├── (tabs)/              # Tab navigation
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Home screen
├── shared/
│   ├── components/          # Reusable UI components
│   │   └── ui/              # React Native Reusables
│   ├── constants/           # Constants and configs
│   ├── lib/                 # Utilities
│   └── global.css           # NativeWind global styles
├── db/                      # Drizzle ORM schema and migrations
├── assets/                  # Images and fonts
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tailwind.config.js       # NativeWind config
├── tsconfig.json            # TypeScript config
├── biome.json               # Biome lint/format config
└── babel.config.js          # Babel config
```

---

<h2 id="usage">Usage</h2>

Start the development server:

```bash
bun run dev
```

Open the app:

- Press `i` → iOS Simulator
- Press `a` → Android Emulator
- Press `w` → Web

Or scan the QR Code using Expo Go on your device.

---

<h2 id="database">Database</h2>

This app uses Drizzle ORM with Expo SQLite for local, offline-first data storage.

Generate migrations after schema changes:

```bash
bun run db:generate
```

Open Drizzle Studio to inspect the database:

```bash
bun run db:studio
```

---

<h2 id="code-quality">Code Quality</h2>

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

```bash
# Check for issues
bun run lint

# Auto-fix issues
bun run lint:fix

# Format code
bun run format

# Type check
bun run typecheck
```

---

<h2 id="adding-components">Adding Components</h2>

```bash
npx react-native-reusables/cli@latest add input textarea
```

Install all components:

```bash
npx react-native-reusables/cli@latest add --all
```

---

<h2 id="deployment">Deployment</h2>

### Using EAS (Recommended)

```bash
npm install -g eas-cli
eas login
eas build
```

Documentation: https://docs.expo.dev/eas/

---

<h2 id="contributing">Contributing</h2>

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

Report issues at: https://github.com/Victor-Zarzar/react-native-finance-app/issues

---

<h2 id="license">License</h2>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<h2 id="author">Author</h2>

Victor Zarzar - [@Victor-Zarzar](https://github.com/Victor-Zarzar)

Project Link: [https://github.com/Victor-Zarzar/react-native-finance-app](https://github.com/Victor-Zarzar/react-native-finance-app)

---
