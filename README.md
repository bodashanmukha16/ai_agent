# Python Course Builder Agent (Node.js)

This repository contains a Node.js AI agent that prepares a **beautiful, production-ready Python programming course structure** and a **video-by-video plan** for all major Python topics.

## What this agent does

- Builds a complete Python course blueprint (beginner to advanced).
- Generates a detailed video plan for every topic.
- Exports:
  - `output/python-course-plan.md` (human-friendly curriculum)
  - `output/python-course-plan.json` (machine-friendly data)
- Optionally enriches the course with an AI-generated teaching narrative when `OPENAI_API_KEY` is set.

## Quick start

```bash
npm install
npm run generate
```

Optional AI enhancement:

```bash
export OPENAI_API_KEY="your_api_key"
npm run generate
```

## Project structure

- `src/pythonCurriculum.js` – full Python curriculum + automatic video plan generation.
- `src/agent.js` – orchestrator that creates final markdown/json assets.
- `output/` – generated files.

## Customization ideas

- Add your own module topics in `pythonCourseBlueprint`.
- Adjust video durations and objectives in `buildVideoPlan`.
- Update prompting logic in `createPrompt()` for your training style.

## Result

After running the agent, you get a polished Python course plan suitable for:
- YouTube playlists
- LMS uploads
- Bootcamp content planning
- Corporate training programs
