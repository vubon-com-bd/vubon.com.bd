import js from "@eslint/js";
import globals from "globals";

import tseslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";
import securityPlugin from "eslint-plugin-security";

export default [

  {
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/.next/**",
      "**/build/**",
      "**/*.js"
    ]
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  prettierConfig,

  {

    files: ["**/*.ts"],

    languageOptions: {

      parser: tseslint.parser,

      parserOptions: {

        project: true,

        tsconfigRootDir: import.meta.dirname

      },

      globals: {
        ...globals.node,
        ...globals.es2024,
        ...globals.jest
      }

    },

    plugins: {

      "@typescript-eslint": tseslint.plugin,

      import: importPlugin,

      prettier: prettierPlugin,

      jest: jestPlugin,

      security: securityPlugin

    },

    settings: {

      "import/resolver": {

        typescript: true

      }

    },

    rules: {

      "prettier/prettier": "error",

      "prefer-const": "error",

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ],

      "eqeqeq": ["error", "always"],

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      "@typescript-eslint/consistent-type-imports": "error",

      "@typescript-eslint/no-floating-promises": "error",

      "@typescript-eslint/no-misused-promises": "error",

      "@typescript-eslint/await-thenable": "error"

    }

  },

  {

    files: [
      "**/*.spec.ts",
      "**/*.test.ts"
    ],

    plugins: {
      jest: jestPlugin
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }

  }

];
