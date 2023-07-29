"use strict";

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import clear from "rollup-plugin-clear";
import screeps from "rollup-plugin-screeps";
import typescript from "rollup-plugin-typescript2";

let config;
const dest = process.env.DEST;

if (!dest) {
	console.log("No destination specified - code will be compiled but not uploaded");
} else {
	const environmentConfig = process.env.SCREEPS_CONFIG;
	if (environmentConfig) {
		config = JSON.parse(environmentConfig)[dest];
	} else {
		config = require("./screeps.json")[dest];
	}

	if (config == null) {
		throw new Error("Invalid upload destination");
	}
}

export default {
	input: "src/main.ts",
	output: {
		file: "dist/main.js",
		format: "cjs",
		sourcemap: true,
	},

	plugins: [
		clear({ targets: ["dist"] }),
		resolve({ rootDir: "src" }),
		commonjs(),
		typescript({ tsconfig: "./tsconfig.json" }),
		screeps({ config: config, dryRun: config == null }),
	],
};
