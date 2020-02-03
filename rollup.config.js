import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");
const date = (new Date()).toDateString();

const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date}
 * ${pkg.homepage}
 * Copyright ${date.slice(-4)} ${pkg.author.name}
 * @license ${pkg.license}
 */`;

const production = (process.env.NODE_ENV === "production");

const lib = {

	module: {
		input: "src/index.js",
		plugins: [resolve()],
		output: [{
			file: pkg.module,
			format: "esm",
			banner
		}, {
			file: pkg.main,
			format: "esm"
		}].concat(production ? [{
			file: pkg.main.replace(".js", ".min.js"),
			format: "esm"
		}] : [])
	},

	main: {
		input: production ? pkg.main : "src/index.js",
		plugins: production ? [babel()] : [resolve()],
		output: {
			file: pkg.main,
			format: "umd",
			name: pkg.name.replace(/-/g, "").toUpperCase(),
			banner
		}
	},

	min: {
		input: pkg.main.replace(".js", ".min.js"),
		plugins: [terser(), babel()],
		output: {
			file: pkg.main.replace(".js", ".min.js"),
			format: "umd",
			name: pkg.name.replace(/-/g, "").toUpperCase(),
			banner
		}
	}

};

export default (production ? [lib.module, lib.main, lib.min] : [lib.main]);
