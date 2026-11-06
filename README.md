# Careerly — Job Portal Frontend

A responsive job portal frontend built with **React JSX** and **Material UI**. It uses Create React App (`react-scripts`) and does not use Vite. No backend is included.

## Features
- Responsive job-seeker dashboard
- Search by job title, skill, company, or location
- Filter by category and employment type
- Save and unsave jobs
- Application dialog with basic client-side validation
- Saved jobs, applications placeholder, and editable profile views
- Local sample job data; no API or server required

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000.

## Production build
```bash
npm run build
```

## Notes
This is a frontend-only demo. Job listings are sample data in `src/App.jsx`. Application submission and profile saving show local demo feedback only; they do not send data to a server or persist it after refresh.
