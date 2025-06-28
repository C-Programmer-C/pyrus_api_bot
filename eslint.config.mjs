import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, import: importPlugin},
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node},
    rules: { "import/no-unused-modules": ["warn", { unusedExports: true }],
  },
]);

