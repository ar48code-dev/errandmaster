# 🚀 ErrandMaster: Advanced Gemini 3 Multimodal Logistics Agent

**ErrandMaster** is a cutting-edge logistics orchestrator built specifically for the **Gemini 3 Hackathon**. It transforms messy, multimodal inputs—handwritten lists, photos of receipts, voice memos, video scans, or plain text—into ultra-optimized errand routes that minimize time, cost, and environmental impact.

---

## 🌟 The ErrandMaster Logic
ErrandMaster isn't just a list-maker; it's a **Logistics Orchestrator**. Powered by Gemini 3's latest vision and reasoning engines, it "sees" and "hears" your chaos and provides a professional-grade route plan in seconds.

### 🤖 ROLE: AI Logistics Agent
Every analysis is governed by a strict **Master Prompt** to ensure high-energy efficiency:
- **Tone**: Professional, high-energy, and ultra-efficient.
- **Context Awareness**: Aware of the exact date (**February 7, 2026**).
- **Agentic Action**: Proactively suggests "Bundling" to save time.
- **Negative Constraint**: Strictly focused on the specific errands provided—no general advice.

---

## ✨ Multimodal Capabilities

| Input Type | Gemini 3 Analysis Logic |
| :--- | :--- |
| **🖼️ Photos** | Recognizes store names, items, and priority markers from handwritten lists or receipts. |
| **🎙️ Voice Memos** | Extracts intents and tasks from audio recordings with high fidelity. |
| **📹 Video Scans** | Processes video walkthroughs of your fridge, pantry, or store aisles to detect needs. |
| **✍️ Text Input** | Optimized parsing of messy, unstructured errand lists. |

### 🛠️ Key AI Tools
1. **Multimodal Analysis**: Native vision and audio processing using Gemini 3 Flash.
2. **Spatial Reasoning**: Complex path optimization to find the shortest, most efficient route.
3. **Smart Bundling**: Identifies errands that are physically close to each other (e.g., "Post Office is next door to Target").
4. **Search Grounding**: Utilizes real-time knowledge for store hours and traffic validation.

---

## 📊 Response Architecture

Every errand is processed into a strict **UI-Ready JSON Schema** for maximum precision:
```json
{
  "summary": "Short 1-sentence overview",
  "errands_detected": [{"location": "Store Name", "task": "Task", "priority": "high/med/low"}],
  "optimized_route": [{"step": 1, "action": "Action", "location": "Location", "tip": "AI Tip"}],
  "stats": {
    "time_saved_mins": 0,
    "money_saved_usd": 0,
    "carbon_reduction": "0%"
  },
  "logic_trace": "Brief explanation of optimization path."
}
```

---

## 🛠️ Technology Stack
- **AI Core**: Google Gemini 3 SDK (`gemini-3-flash`)
- **Frontend**: React 18, Vite
- **Styling**: Premium Tailwind CSS (Glassmorphism, High-Energy Gradients)
- **Icons**: Lucide React
- **Hosting**: Vercel/Netlify Ready

---

## 🚀 Installation & Local Run

### 1. Requirements
- Node.js 18+
- A Google Gemini API Key from [AI Studio](https://aistudio.google.com/app/apikey)

### 2. Setup
```bash
git clone https://github.com/ar48code-dev/errandmaster.git
cd errandmaster
npm install
npm run dev
```

### 3. Usage
1. Open the app and click the **Key icon** (top right) to add your API key.
2. Upload a list, voice memo, or type your errands.
3. Click **"Generate Optimized Route"**.

---

## 🔗 Project Links
- **GitHub Repository**: [https://github.com/ar48code-dev](https://github.com/ar48code-dev)
- **Built for**: Gemini 3 Multimodal Hackathon (2026)

---

*“Turning multimodal chaos into ultra-optimized routes.”*
