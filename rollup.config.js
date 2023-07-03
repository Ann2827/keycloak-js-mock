import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "lib/index.ts",
    output: {
      exports: 'named',
      file: "dist/index.modern.js",
      format: "es",
      sourcemap: false,
    },
    external: ['jose'],
    plugins: [
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser({
        output: {
          comments: false
        }
      }),
    ],
  },
  {
    input: "lib/index.ts",
    output: {
      exports: 'named',
      file: "dist/index.js",
      format: "cjs",
      sourcemap: false,
    },
    external: ['jose'],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      terser({
        output: {
          comments: false
        }
      }),
    ],
  }
];
