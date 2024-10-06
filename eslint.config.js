import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
export default [
  {
      plugins: {
        pluginReact,
        pluginPrettier,
      },
      rules: {
          semi: "error",
          "prefer-const": "error"
      }
  }
];