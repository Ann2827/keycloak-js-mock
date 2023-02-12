import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import { terser } from "rollup-plugin-terser";

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
    plugins: [
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: true }),
      // terser({
      //   output: {
      //     comments: false
      //   }
      // }),
    ],
  }
];
