export const pythonCourseBlueprint = {
  courseTitle: "Python Programming Mastery: Beginner to Advanced",
  targetAudience: [
    "Absolute beginners",
    "Students preparing for software roles",
    "Working professionals transitioning to Python",
    "Data/automation enthusiasts"
  ],
  courseOutcomes: [
    "Write clean, production-ready Python code",
    "Understand core CS concepts using Python",
    "Build CLI tools, APIs, data workflows, and tests",
    "Package and deploy Python projects"
  ],
  modules: [
    {
      id: "M1",
      title: "Orientation & Setup",
      topics: [
        "What is Python and where it is used",
        "Install Python, VS Code, and extensions",
        "Virtual environments and pip basics",
        "Running scripts, REPL, notebooks"
      ]
    },
    {
      id: "M2",
      title: "Python Fundamentals",
      topics: [
        "Syntax, variables, comments",
        "Data types: int, float, str, bool, None",
        "Input/output and formatting",
        "Type conversion and operators"
      ]
    },
    {
      id: "M3",
      title: "Control Flow",
      topics: [
        "if/elif/else and logical conditions",
        "for and while loops",
        "break, continue, pass",
        "match-case pattern matching"
      ]
    },
    {
      id: "M4",
      title: "Collections & Comprehensions",
      topics: [
        "Lists, tuples, sets, dictionaries",
        "Indexing, slicing, iteration",
        "List/dict/set comprehensions",
        "Nested data structures"
      ]
    },
    {
      id: "M5",
      title: "Functions and Scope",
      topics: [
        "Defining and calling functions",
        "Parameters, args, kwargs",
        "Return values and multiple returns",
        "Scope, closures, lambda functions"
      ]
    },
    {
      id: "M6",
      title: "Strings, Files, and Error Handling",
      topics: [
        "String methods and regex intro",
        "Reading/writing files",
        "Working with CSV and JSON",
        "Exceptions and custom exceptions"
      ]
    },
    {
      id: "M7",
      title: "Object-Oriented Programming",
      topics: [
        "Classes, objects, attributes, methods",
        "Inheritance, polymorphism, composition",
        "Dunder methods (__init__, __str__, etc.)",
        "Dataclasses and type hints"
      ]
    },
    {
      id: "M8",
      title: "Modules, Packages, and Environments",
      topics: [
        "Creating modules and importing patterns",
        "Package structure and __init__.py",
        "Dependency management with pip",
        "Project layout best practices"
      ]
    },
    {
      id: "M9",
      title: "Testing, Debugging, and Quality",
      topics: [
        "Debugging with print and pdb",
        "Unit tests with unittest/pytest",
        "Linting and formatting (ruff/black)",
        "Logging and error reporting"
      ]
    },
    {
      id: "M10",
      title: "Advanced Python",
      topics: [
        "Iterators, generators, decorators",
        "Context managers",
        "Concurrency: threading, multiprocessing, asyncio",
        "Performance basics and profiling"
      ]
    },
    {
      id: "M11",
      title: "Databases, APIs, and Automation",
      topics: [
        "SQLite/PostgreSQL basics with Python",
        "REST API consumption with requests/httpx",
        "Build API with FastAPI/Flask",
        "Automation scripts and scheduling"
      ]
    },
    {
      id: "M12",
      title: "Data, AI, and Capstone",
      topics: [
        "NumPy and pandas essentials",
        "Visualization with matplotlib/seaborn",
        "Intro to ML workflow with scikit-learn",
        "Capstone planning, implementation, deployment"
      ]
    }
  ]
};

export function buildVideoPlan(blueprint) {
  const videos = [];

  blueprint.modules.forEach((module, moduleIndex) => {
    module.topics.forEach((topic, topicIndex) => {
      const sequence = videos.length + 1;
      videos.push({
        sequence,
        moduleId: module.id,
        moduleTitle: module.title,
        topic,
        videoTitle: `${module.id}.${topicIndex + 1} ${topic}`,
        suggestedDurationMin: 12 + ((moduleIndex + topicIndex) % 4) * 4,
        objectives: [
          `Understand ${topic.toLowerCase()} with real examples.`,
          "Implement one guided coding walkthrough.",
          "Complete one mini-practice challenge."
        ],
        assets: [
          "Slides",
          "Code demo",
          "Quiz",
          "Assignment"
        ]
      });
    });
  });

  return videos;
}
