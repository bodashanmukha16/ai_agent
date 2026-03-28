import fs from "node:fs/promises";
import path from "node:path";
import { pythonCourseBlueprint, buildVideoPlan } from "./pythonCurriculum.js";

function parseOutputDir() {
  const outputFlagIndex = process.argv.indexOf("--output");
  if (outputFlagIndex !== -1 && process.argv[outputFlagIndex + 1]) {
    return process.argv[outputFlagIndex + 1];
  }
  return "output";
}

function createPrompt(blueprint, videos) {
  return `You are an expert curriculum designer and video producer.
Create a BEAUTIFUL Python programming course plan.

Course title: ${blueprint.courseTitle}
Modules: ${blueprint.modules.length}
Videos: ${videos.length}

Return markdown with:
1) Course vision
2) Weekly roadmap
3) Video production style guide
4) Assessment strategy
5) Career pathways after this course

Be structured, practical, and motivating.`;
}

async function generateEnhancedNarrative(blueprint, videos) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "_AI narrative skipped: set OPENAI_API_KEY to generate enhanced storytelling section._";
  }

  let OpenAI;
  try {
    ({ default: OpenAI } = await import("openai"));
  } catch {
    return "_AI narrative skipped: install the 'openai' npm package to enable enrichment._";
  }

  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: createPrompt(blueprint, videos),
    temperature: 0.5
  });

  return response.output_text?.trim() || "_No AI narrative generated._";
}

function renderMarkdown(blueprint, videos, narrative) {
  const totalDuration = videos.reduce((sum, v) => sum + v.suggestedDurationMin, 0);

  const moduleSections = blueprint.modules
    .map((module) => {
      const moduleVideos = videos.filter((v) => v.moduleId === module.id);
      const rows = moduleVideos
        .map(
          (v) =>
            `| ${v.sequence} | ${v.videoTitle} | ${v.suggestedDurationMin} min | ${v.objectives.join("<br>")} |`
        )
        .join("\n");

      return `## ${module.id}: ${module.title}\n\n| # | Video | Duration | Learning Objectives |\n|---:|---|---:|---|\n${rows}`;
    })
    .join("\n\n");

  return `# ${blueprint.courseTitle}

## 🎯 Audience
${blueprint.targetAudience.map((item) => `- ${item}`).join("\n")}

## 🚀 Outcomes
${blueprint.courseOutcomes.map((item) => `- ${item}`).join("\n")}

## 📊 Course Stats
- Total modules: **${blueprint.modules.length}**
- Total videos: **${videos.length}**
- Approx total duration: **${Math.round(totalDuration / 60)} hours ${totalDuration % 60} minutes**

${moduleSections}

---

## ✨ AI Enhanced Teaching Narrative
${narrative}
`;
}

async function run() {
  const outputDir = parseOutputDir();
  const blueprint = pythonCourseBlueprint;
  const videos = buildVideoPlan(blueprint);
  const narrative = await generateEnhancedNarrative(blueprint, videos);

  await fs.mkdir(outputDir, { recursive: true });

  const markdown = renderMarkdown(blueprint, videos, narrative);
  const json = {
    generatedAt: new Date().toISOString(),
    blueprint,
    videos,
    aiNarrative: narrative
  };

  await Promise.all([
    fs.writeFile(path.join(outputDir, "python-course-plan.md"), markdown, "utf-8"),
    fs.writeFile(path.join(outputDir, "python-course-plan.json"), JSON.stringify(json, null, 2), "utf-8")
  ]);

  console.log(`✅ Course assets generated in: ${outputDir}`);
  console.log("- python-course-plan.md");
  console.log("- python-course-plan.json");
}

run().catch((error) => {
  console.error("❌ Agent failed:", error.message);
  process.exit(1);
});
