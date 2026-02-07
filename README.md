# 🚀 ErrandMaster: Advanced Multimodal Logistics Agent

**ErrandMaster** is an ultra-optimized logistics orchestrator built with the **Gemini 3 SDK**. It transforms messy, multimodal inputs—like handwritten lists, photos of receipts, voice memos, or plain text—into high-efficiency errand routes that minimize time, cost, and carbon footprints.

---

## 🌟 Vision
In the future of logistics, data isn't just text. It's visual, spatial, and noisy. ErrandMaster leverages **Gemini 3's advanced multimodal reasoning** to "see" and "think" through complex errand sequences, providing users with professional-grade route optimization at home.

---

## ✨ Cutting-Edge Features

### 🖼️ Multimodal Core
- **Handwritten List Analysis**: Snap a photo of your fridge list—Gemini 3 identifies items and store names automatically.
- **Receipt Processing**: Extract missing items from store receipts for return errands.
- **Contextual Reasoning**: Gemini 3 understands that a post office next to your favorite grocery store means you should bundle those errands.

### 🗺️ Route Intelligence
- **Spatial Pathing**: Uses Gemini 3's logic to calculate the most efficient path between multiple locations.
- **Smart Bundling**: Proactively suggests "Saving Tips" (e.g., "Since you're at Target, the Dry Cleaners is 2 mins away").
- **Real-time Awareness**: Logic-driven store hours validation (Aware today is Feb 7, 2026).

### 📊 Impact Metrics
- **Time Saved**: Calculated minutes reclaimed from travel efficiency.
- **Money Saved**: Estimated fuel and logistical cost reduction.
- **Carbon Reduction**: Real-time environmental impact percentage.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Brain** | Google Gemini 3 SDK (`gemini-3-flash`) |
| **Frontend** | React 18, Vite |
| **Styling** | Custom Tailwind CSS (Glassmorphism & Gradients) |
| **Icons** | Lucide React |
| **Deployment** | Vercel Ready |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A Google Gemini API Key from [AI Studio](https://aistudio.google.com/app/apikey)

### 2. Installation
```bash
git clone https://github.com/ar48code-dev/errandmaster.git
cd errandmaster
npm install
```

### 3. Launch
```bash
npm run dev
```

### 4. Configuration
Open the app and click the **Settings (Key icon)** to add your Gemini API key. This key is stored locally in your browser for privacy and judge convenience.

---

## 🤖 AI Logic & Prompt Engineering

ErrandMaster uses a highly refined **System Instruction** architecture to ensure structured JSON output and professional logistics reasoning. 

**Response Schema:**
```json
{
  "summary": "1-sentence overview",
  "errands_detected": [{"location": "", "task": "", "priority": ""}],
  "optimized_route": [{"step": 1, "action": "", "location": "", "tip": ""}],
  "stats": {"time_saved_mins": 0, "money_saved_usd": 0, "carbon_reduction": "0%"},
  "logic_trace": "Explanation of optimization choices"
}
```

---

## 🏆 Hackathon Highlights
- **No Placeholders**: The app is 100% functional with real API calls.
- **Multimodal**: Handles both text and images seamlessly.
- **Production UI**: Premium glassmorphism design with responsive accessibility.
- **Agentic**: Proactively suggests actions instead of just listing facts.

---

## 🔗 Repository & Links
- **GitHub**: [https://github.com/ar48code-dev](https://github.com/ar48code-dev)
- **Built for**: Gemini 3 Hackathon 2026

---

*“Turning chaos into routes—one errand at a time.”*
