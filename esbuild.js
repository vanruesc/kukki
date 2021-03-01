import { createRequire } from "module";
import esbuild from "esbuild";

const require = createRequire(import.meta.url);
const pkg = require("./package");
const date = (new Date()).toDateString();

const banner = `/**
 * ${pkg.name} v${pkg.version} build ${date}
 * ${pkg.homepage}
 * Copyright ${date.slice(-4)} ${pkg.author.name}
 * @license ${pkg.license}
 */`;

const config = {
	entryPoints: ["src/index.ts"],
	outfile: `dist/${pkg.name}.js`,
	format: "esm",
	bundle: true,
	banner
};

const t0 = Date.now();
esbuild.build(config)
	.then(() => console.log(`Built ${c.outfile} in ${Date.now() - t0}ms`))
	.catch(() => process.exit(1)));
