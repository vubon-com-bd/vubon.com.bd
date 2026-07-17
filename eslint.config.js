{
  "$schema": "https://json.schemastore.org/eslintrc",

  "root": true,

  "env": {
    "node": true,
    "es2022": true,
    "jest": true
  },

  "parser": "@typescript-eslint/parser",

  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },

  "plugins": [
    "@typescript-eslint",
    "import",
    "prettier",
    "jest"
  ],

  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],

  "ignorePatterns": [
    "**/node_modules/**",
    "**/dist/**",
    "**/coverage/**",
    "**/.turbo/**",
    "**/.next/**",
    "**/generated/**",
    "**/*.js",
    "**/*.d.ts"
  ],

  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  },

  "rules": {
    "prettier/prettier": "error",

    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],

    "prefer-const": "error",
    "eqeqeq": [
      "error",
      "always"
    ],

    "@typescript-eslint/no-explicit-any": "warn",

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],

    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        "prefer": "type-imports"
      }
    ],

    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],

        "newlines-between": "always",

        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },

  "overrides": [
    {
      "files": [
        "*.spec.ts",
        "*.test.ts"
      ],

      "env": {
        "jest": true
      },

      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
