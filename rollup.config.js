import babel from "rollup-plugin-babel";
import minify from "rollup-plugin-babel-minify";
import resolve from "rollup-plugin-node-resolve";

const pkg = require("./package.json");
const date = (new Date()).toDateString();

const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date}
 * ${pkg.homepage}
 * Copyright ${date.slice(-4)} ${pkg.author.name}, ${pkg.license}
 */`;

const production = (process.env.NODE_ENV === "production");

const lib = {

	input: pkg.module,
	output: {
		file: pkg.main,
		format: "umd",
		name: pkg.name.replace(/-/g, "").toUpperCase(),
		banner: banner
	},

	plugins: [resolve()].concat(production ? [babel()] : [])

};

export default [lib].concat(production ? [

	Object.assign({}, lib, {

		output: Object.assign({}, lib.output, {
			file: pkg.main.replace(".js", ".min.js")
		}),

		plugins: [resolve(), babel(), minify({
			bannerNewLine: true,
			comments: false
		})]

	})

] : []);
