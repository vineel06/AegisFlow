# AegisFlow 🛡️
**Illuminating the Invisible Algorithms.**

AegisFlow is an automated AI bias detection and mitigation platform built for the Google Solution Challenge (Theme: Unbiased AI Decision). It acts as an interactive "AI Ethics Consultant" for organizations utilizing automated decision-making systems.

## 🚨 The Problem
Computer programs now make life-changing decisions about who gets a job, a bank loan, or medical care. If these systems learn from flawed historical data, they amplify discriminatory mistakes. Organizations often lack accessible tools to measure, flag, and fix this hidden unfairness.

## 💡 Our Solution
AegisFlow provides a clear, accessible dashboard to inspect datasets for hidden discrimination. Instead of just flagging mathematical anomalies, AegisFlow integrates with Google's **Gemini 2.5 Flash** to provide plain-English explanations of the bias and generate actionable, step-by-step mitigation strategies.

## ✨ Key Features
* **Secure Data Ingestion:** Upload CSV datasets (e.g., historical hiring data) directly into the browser for rapid inspection.
* **Real-Time Bias Metrics:** Instantly calculates Disparate Impact Ratios and flags high-risk demographic features.
* **Interactive Data Inspector:** A heavy, dark-themed UI to sort, filter, and export demographic data seamlessly.
* **Gemini Ethics Core:** One-click integration with Google's Gemini API to generate a comprehensive algorithmic bias vulnerability report and mitigation strategy.

## 🛠️ Technology Stack
* **Frontend:** Next.js 16 (App Router), React, Tailwind CSS
* **UI/UX:** Framer Motion (Animations), Recharts (Data Visualization), Lucide React (Icons)
* **AI Integration:** `@google/generative-ai` SDK (Gemini 2.5 Flash)
* **Deployment:** Vercel

## 🚀 Getting Started (Local Development)

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/vineel06/AegisFlow.git](https://github.com/vineel06/AegisFlow.git)
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root directory and add your Google Gemini API key:

Code snippet
GEMINI_API_KEY=your_actual_api_key_here
Run the development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

***
