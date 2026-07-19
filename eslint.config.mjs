import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";
import securityPlugin from "eslint-plugin-security";

export default [
  // --------------------------------------------------------------------------
  // ১. ফাইল এবং ফোল্ডার ইগনোর রুলস (গ্লোবাল ইগনোর)
  // --------------------------------------------------------------------------
  {
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/.next/**",
      "**/build/**",
      "**/*.js",
      "apps/auth-service/src/module/domain/entities/user.entity.ts"
    ]
  },

  // --------------------------------------------------------------------------
  // ২. বেস কনফিগ এবং রেকমেন্ডেড রুলস লোড করা
  // --------------------------------------------------------------------------
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettierConfig, // প্রিজমার সাথে কনফ্লিক্ট এড়াতে রুলস ওভাররাইড করে

  // --------------------------------------------------------------------------
  // ৩. মূল টাইপস্ক্রিপ্ট অ্যাপ্লিকেশন রুলস
  // --------------------------------------------------------------------------
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
        ...globals.es2024
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      // ESLint 9 কম্প্যাটিবল ম্যাপিং
      "import": importPlugin,
      "prettier": prettierPlugin,
      "security": securityPlugin
    },
    settings: {
      "import/resolver": {
        typescript: true
      }
    },
    rules: {
      // প্রিটিয়ার এবং ফরম্যাটিং রুলস
      "prettier/prettier": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      
      // কনসোল লগ ব্যবহারের সতর্কতা
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ],

      // ইম্পোর্ট সাজানোর নিয়ম
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

      // টাইপস্ক্রিপ্ট স্পেসিফিক কঠোর নিয়মাবলী
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
      "@typescript-eslint/await-thenable": "error",

      // সিকিউরিটি রুলস (eslint-plugin-security এর রুলসগুলো এনাবল করা)
      ...securityPlugin.configs.recommended.rules
    }
  },

  // --------------------------------------------------------------------------
  // ৪. টেস্ট ফাইলের জন্য স্পেসিফিক রুলস (Jest)
  // --------------------------------------------------------------------------
  {
    files: [
      "**/*.spec.ts",
      "**/*.test.ts"
    ],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    },
    plugins: {
      jest: jestPlugin
    },
    // jestPlugin-এর রেকমেন্ডেড রুলস এবং কাস্টম ওভাররাইড যুক্ত করা হলো
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off" // টেস্ট ফাইলের সুবিধার জন্য any রিল্যাক্স করা হলো
    }
  }
];
