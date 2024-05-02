// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
    plugins: {
        "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
        parser: tseslint.parser,
      
    },
	files: ["**/*.ts"],
    rules: {
        "@typescript-eslint/indent": ["error", "tab"],
        "@typescript-eslint/quotes": "error",
		"@typescript-eslint/semi": "error",

    }
});