import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default [
  {
    input: "lib/index.ts",
    output: {
      name: "KeycloakJsMock",
      exports: 'named',
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: false
    },
    external: ['jose'],
    plugins: [
      json(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser({
        output: {
          comments: false
        }
      }),
    ],
  }
];
