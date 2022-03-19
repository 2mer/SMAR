import path from 'path';

const Module = require('module');

const originalRequire = Module.prototype.require;

export function unrequire(specifier) {
	delete require.cache[require.resolve(specifier)];
}

// this might be used to also uncache main process modules, they should still have object references but it might be weird
Module.prototype.require = function middlemanRequire(
	specifier,
	{ defaultBehavior = false } = {}
) {
	if (this.smar) {
		const relativeSpecifier = path.resolve(this.path, specifier);

		const requiredData = originalRequire.apply(this, [relativeSpecifier]);

		if (!defaultBehavior) {
			unrequire(relativeSpecifier);
		}

		return requiredData;
	}

	return originalRequire.apply(this, [specifier]);
};
