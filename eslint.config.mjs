import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  { files: ["./*/*.js"],
   plugins: { js }, 
   extends: ["js/recommended"], 
   rules: {
    "semi": ["error", "always"]
    }, 
   languageOptions: { globals: globals.browser } },
   [globalIgnores(["coverage/*", "./*/*.test.js", "dist/*"])]
]);
