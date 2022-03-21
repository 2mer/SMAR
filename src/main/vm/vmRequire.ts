import { readFileSync } from 'fs';
import path from 'path';
import vm from 'vm';
import axios from 'axios';

export function loadModule(p, context) {
	const fileData = readFileSync(p, 'utf8');

	const compiledContext = vm.createContext(context);

	const script = new vm.Script(fileData);

	script.runInContext(compiledContext);

	return compiledContext.module.exports;
}

export default function vmRequire(this: any, p, isChild = false) {
	// eslint-disable-next-line no-underscore-dangle
	let resolvedPath = path.resolve((isChild ? this?.__dirname : '') || '', p);

	if (!resolvedPath.endsWith('.js')) {
		resolvedPath += '.js';
	}

	const moduleContext = {
		__dirname: path.dirname(resolvedPath),
		module: {
			exports: {},
		},
		axios,
	} as any;

	const boundRequire = vmRequire.bind(moduleContext);

	function childRequire(req: any) {
		return boundRequire(req, true);
	}

	moduleContext.require = childRequire;

	return loadModule(resolvedPath, moduleContext);
}
