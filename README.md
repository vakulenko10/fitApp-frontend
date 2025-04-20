# 🏋️‍♂️ FitApp – Your Personal Fitness Companion

FitApp is a sleek, modern web application built to help users manage their fitness goals with ease. Whether you're aiming to lose weight, maintain, or bulk up — this app has you covered. It calculates your daily calorie intake, generates recipes based on your preferences and goals, tracks your weight over time, and keeps a history of your meal plans.

---

## 🚀 Live Demo

🔗 [https://fit-app-frontend.vercel.app](https://fit-app-frontend.vercel.app) – hosted on **Vercel**

---

## 👨‍💻 Contributors
- [@VladyslavNz](https://github.com/VladyslavNz) – Full Stack Developer, UI/UX Designer
- [@scarfacegrizl](https://github.com/scarfacegrizl) – Frontend Developer, UI/UX Designer
- [@Makc240305](https://github.com/Makc240305) – Frontend Developer, Database Engineer
- [@vakulenko10](https://github.com/vakulenko10) – Full Stack Developer, QA, Project Manager
- [@AsakuraAv](https://github.com/AsakuraAv) – Frontend Developer
- [@Bohdan-Sandovenko](https://github.com/Bohdan-Sandovenko) – Frontend Developer
- [@akaAIBOT](https://github.com/akaAIBOT) – Backend Developer, Database Engineer
- [@MakxsL](https://github.com/MakxsL) – Backend Developer

---

## 🧠 Key Features

- ⚖️ **Calorie Intake Calculator** – Calculates your optimal daily calorie intake based on your goals and body parameters.
- 🍱 **AI-Powered Recipe Generator** – Suggests meal recipes that match your calorie goals and food preferences.
- 📈 **Weight Tracking Charts** – Visualize your weight progress with dynamic Recharts.
- 📜 **Meal Plan History** – Keep a detailed history of your daily or weekly meal plans.

---

## 🔧 Tech Stack

### 🧩 Framework & Core Libraries on Front-end

- **React 19** – Core UI library
- **Vite** – Superfast frontend build tool
- **Tailwind CSS** – Utility-first CSS framework
- **Redux Toolkit** – Global state management
- **React Router v7** – Routing
- **Zod** – Schema validation
- **Framer Motion** – Smooth UI animations
- **Recharts** – Data visualizations for weight tracking
- **Shadcn UI** – Accessible and beautiful UI components

### 🧪 Testing

- **Vitest** – Unit testing framework
- **Testing Library** – For DOM testing
- **jsdom** – Simulated DOM for testing

### ⚙️ Backend Stack

- **Express** – Server framework for building RESTful APIs
- **Prisma ORM** – Type-safe database access layer
- **PostgreSQL** – Main relational database (hosted via Supabase)
- **JWT with Google-Auth** – User authentication and session handling
- **bcryptjs** – Password hashing and security
- **dotenv** – Environment variable management
- **axios** – For handling external API requests

- [Backend repository link](https://github.com/vakulenko10/fitApp-backend) – Backend deployed with render.com
> Postman was also used to test out the API created by backend developers.

---

## 🔄 Agile Development Methodology

Our team followed the **Agile Development Methodology** to ensure continuous improvement, adaptive planning, and fast delivery. Agile helped us stay flexible and focused on delivering value to users at every stage of development.

### 🧩 Key Agile Principles We Followed

- **👥 Individuals and interactions** over processes and tools  
- **💡 Working software** over comprehensive documentation  
- **⚡ Responding to change** over following a fixed plan  

### 🛠 How We Applied Agile in Practice

- **Sprints**: We worked in short development cycles, typically lasting 1–2 weeks, with clear goals for each sprint.
- **Daily Standups**: Regular team sync-ups helped keep everyone aligned and aware of progress and blockers.
- **Backlog Management**: Features and improvements were prioritized and tracked using a dynamic product backlog.
- **Task Management**: We used **Trello** to plan, assign, and track development tasks in a Kanban-style workflow.
- **Documentation & Collaboration**: All project documentation, meeting notes, and planning materials were organized in **Notion** for easy access and team coordination.
- **Code Reviews & Testing**: Every feature was peer-reviewed, tested, and deployed iteratively.
- **Retrospectives**: After each sprint, we discussed what went well, what could be improved, and how to enhance our process.

### ✅ Benefits We Experienced

- **Faster feedback loops**
- **Greater flexibility and adaptability**  
- **Improved collaboration and communication**  
- **Higher code quality and better user-focused design**

> Agile allowed us to build FitApp as a flexible, collaborative, and user-centered application — delivering working features continuously while staying open to changes and improvements.

## ⚙️ Local Setup Guide

To run FitApp locally, set up both the **backend** and the **frontend**:
- [Backend repository link](https://github.com/vakulenko10/fitApp-backend) – Backend setup steps you will find in that repository
---
**🌐 Frontend Setup**

> Prerequisites: [Node.js](https://nodejs.org/) installed on your local machine

1. **Clone the frontend repository**  
   ```bash
   git clone https://github.com/vakulenko10/fitApp-frontend .
2. **Install project dependencies**
   ```bash
   npm install
3. **Create a .env file in the root directory of the project and add the following:**
   ```bash
   VITE_BACKEND_API_URL=http://localhost:5000 //or any other port, on which your backend is running
4.  **Run the project**
    ```bash
    npm run dev
    
## 📬 Contact

If you have questions, ideas, or want to collaborate — feel free to reach out to any of the contributors via GitHub.
