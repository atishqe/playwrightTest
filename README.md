# 🧪 Playwright Automation Suite (TypeScript)

This repository contains automated end-to-end tests for the [SauceDemo](https://www.saucedemo.com/) application using [Playwright](https://playwright.dev/) and **TypeScript**.

## 📋 Scenarios Covered

- ✅ Verify the sorting order Z-A on the “All Items” page.
- ✅ Verify the price order (high to low) on the “All Items” page.
- ✅ Add multiple items to the cart and validate the checkout journey.
- 🌟 Bonus Tests:
  - 📷 Visual Testing for All Items and Checkout pages
  - ♿ Accessibility Testing using `@axe-core/playwright`

---

## ⚙️ Prerequisites

- Node.js (>= v16.x)
- npm or yarn
- Git
- Chrome/Edge/Firefox (browsers will be installed by Playwright)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

## Install Dependencies
npm install
npx playwright test

## Run All Tests in Headed Mode (with browser UI)

npx playwright test --headed

## ♿ Accessibility Testing (Bonus)
install - npm install @axe-core/playwright

##Project Structure
.
├── tests/                   # All test specs
│   ├── sort.spec.ts
│   ├── price.spec.ts
│   └── checkout.spec.ts
├── utils/                   # Custom helpers
├── screenshots/             # Visual testing assets
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript config
├── package.json             # Scripts & dependencies
└── README.md






