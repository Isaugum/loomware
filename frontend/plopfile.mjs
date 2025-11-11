import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Normalize and create a PascalCase component/page name */
function toPascalCase(input) {
  const words = String(input)
    .replace(/[/\\]/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/);
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

/** Normalize a route like "dashboard/settings" */
function normalizeRoute(route) {
  return String(route)
    .replace(/^\/+|\/+$/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export default function (plop) {
  // Helpers
  plop.setHelper("pascalCase", (txt) => toPascalCase(txt));
  plop.setHelper("kebabCase", (txt) =>
    String(txt)
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .replace(/_+/g, "-")
      .toLowerCase()
  );

  // Component generator
  plop.setGenerator("component", {
    description: "Create a UI component (atom/molecule/module)",
    prompts: [
      {
        type: "list",
        name: "layer",
        message: "Component layer?",
        choices: ["atoms", "molecules", "modules"],
        default: "atoms",
      },
      {
        type: "input",
        name: "name",
        message: "Component name (e.g. Button, UserCard):",
        validate: (v) => (!!v ? true : "Name is required"),
      },
    ],
    actions: (data) => {
      const name = toPascalCase(data.name);
      const base = path.join("src/components", data.layer, name);
      return [
        {
          type: "add",
          path: `${base}/${name}.tsx`,
          templateFile: path.join(
            __dirname,
            "plop-templates",
            "component",
            "Component.tsx.hbs"
          ),
        },
        {
          type: "add",
          path: `${base}/index.ts`,
          templateFile: path.join(
            __dirname,
            "plop-templates",
            "component",
            "index.ts.hbs"
          ),
        },
      ];
    },
  });

  // Page generator (Next.js App Router)
  plop.setGenerator("page", {
    description: "Create a Next.js app route page (app/<route>/page.tsx)",
    prompts: [
      {
        type: "input",
        name: "route",
        message: "Route path (e.g. dashboard/settings):",
        validate: (v) => (!!v ? true : "Route path is required"),
      },
      {
        type: "input",
        name: "title",
        message: "Page title (optional):",
      },
    ],
    actions: (data) => {
      const route = normalizeRoute(data.route);
      return [
        {
          type: "add",
          path: `app/${route}/page.tsx`,
          templateFile: path.join(
            __dirname,
            "plop-templates",
            "page",
            "page.tsx.hbs"
          ),
        },
      ];
    },
  });

  // Layout generator (Next.js App Router)
  plop.setGenerator("layout", {
    description: "Create a Next.js layout (app/<route>/layout.tsx)",
    prompts: [
      {
        type: "input",
        name: "route",
        message: "Route path for layout (e.g. dashboard):",
        validate: (v) => (!!v ? true : "Route path is required"),
      },
    ],
    actions: (data) => {
      const route = normalizeRoute(data.route);
      return [
        {
          type: "add",
          path: `app/${route}/layout.tsx`,
          templateFile: path.join(
            __dirname,
            "plop-templates",
            "layout",
            "layout.tsx.hbs"
          ),
        },
      ];
    },
  });
}
