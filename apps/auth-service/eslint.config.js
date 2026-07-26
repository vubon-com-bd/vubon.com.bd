import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores - must be first
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.js",
      "prisma/**",
      "src/generated/**",
      "src/generated/**/*",
      ".eslintrc.js",
      "eslint.config.js",
    ],
  },
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Custom rules
  {
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "off",
    },
  }
);
