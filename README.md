

🎯 Features

Career Goal Input - Select target role and add current skills

Skill Gap Analyzer -  Analysis comparing user skills against role requirements (Fixed - as per assignments requirement)

Career Roadmap Generator - 3-phase learning roadmap for each role (Fixed - as per assignments requirement)

HackerNews Integration - Real-time latest tech stories

Combined Dashboard - Clean layout displaying all information

LocalStorage Persistence - Saves user inputs and analysis 

🛠️ Tech Stack

Frontend:

React 

Axios (API calls)

Daisyui for styling

LocalStorage (data persistence)

Backend:

Node.js

Express.js

node-fetch (HackerNews API integration)

CORS


File struct
```
career-guidance-platform/
├── backend/
│   ├── controllers/
│   │   ├── skillGapController.js    # Skill gap analysis logic
│   │   ├── roadmapController.js     # Roadmap generation logic
│   │   └── newsController.js        # HackerNews integration
│   ├── routes/
│   │   ├── skillGap.js             # /api/skill-gap route
│   │   ├── roadmap.js              # /api/roadmap route
│   │   └── news.js                 # /api/news route
│   ├── sample_data/
│   │   ├── skills_roles.json         # Predefined role requirements
│   │   └── mock_roadmap.json     # Career learning paths
│   ├── server.js                   # Express server
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CareerInput.jsx      # Input form component
│   │   │   ├── SkillGapCard.jsx     # Analysis results display
│   │   │   ├── RoadmapCard.jsx      # Roadmap display
│   │   │   └── NewsSection.jsx      # HackerNews feed
│   │   ├── api_services/
│   │   │   ├──new.js
│   │   │   ├──roadmap.js
│   │   │   └──skillgap.js               # API service layer
│   │   ├── lib
│   │   │   └──axios.js
│   │   ├── App.jsx                  # Main app component
│   │   ├── index.css                  # Styling
│   │   └── main.jsx                 # Entry point
│   └── package.json
│
├── package.json 
│
└── README.md
```
🚀 Setup Instructions


Prerequisites
Node.js

.env in backend has 

PORT=3000
NODE_ENV=production

while production / testing 
from root run
```
npm run build
npm run start
```


for development


Backend Setup
Navigate to backend directory:

```bash
cd backend
Install dependencies:
```

```
bash
npm install
```

Create .env file:

text
PORT=3000
NODE_ENV=development

Start the server:

```bash
npm start
```
Server runs on: http://localhost:3000

Frontend Setup
Navigate to frontend directory:

```bash
cd frontend
```
Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Frontend runs on: http://localhost:5173

📡 API Endpoints
1. Skill Gap Analysis
Endpoint: POST /api/getskill_gap

Request:

```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Java", "Git", "SQL"]
}
```

Response:

```json
{
 
  "matchedSkills": ["Java", "Git", "SQL"],
  "missingSkills": ["Spring Boot", "APIs", "Node.js", "Database Design"],
  "requiredSkills": [...],
  "recommendations": "Good foundation! You have several key skills..."

}
```
2. Career Roadmap
Endpoint: POST /api/getroadmap

Request:

```json
{
  "targetRole": "Backend Developer"
}
```
Response:

```json
{
  "role": "Backend Developer",
  "roadmap": [
    {
      "phase": "Phase 1 (1-2 months): Java Foundations",
      "skills": "Java basics, OOP principles...",
      "description": "Build strong programming fundamentals..."
    },
    ...
  ],
  "totalPhases": 3
}
```

3. Latest News
Endpoint: GET /api/getnews

Response:

```json
{
    "count": 5,
    "stories": [
        {
            "by": "smusamashah",
            "descendants": 44,
            "id": 46018380,
            "score": 107,
            "time": 1763846424,
            "title": "WorldGen – Text to Immersive 3D Worlds",
            "type": "story",
            "url": "https://www.meta.com/en-gb/blog/worldgen-3d-world-generation-reality-labs-generative-ai-research/"
        },
    ...
  ],
  "timestamp": "2024-11-22T..."
}
```


📝 Design Decisions
Backend Architecture

Mock AI Logic: Predefined roadmaps simulate AI recommendations (as per requirements)



Frontend Architecture
Component-based: Reusable React components for maintainability



API Design
RESTful conventions: POST for data submission

Consistent responses: All endpoints return JSON 

Validation: Input validation with clear error messages

🔧 Assumptions Made
No Database: Requirements stated "optional database", so JSON files are used

Mock AI: Roadmap generation uses predefined data (not dynamic AI)

Top Stories: HackerNews integration fetches "top stories" (most popular)

5 News Items: Limited to 5 for performance and UX clarity

LocalStorage: Used for persistence 

