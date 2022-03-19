const requiredEntries = {} as any;

export default function tempRequire(partition, path) {
	if (!requiredEntries[partition]) {
		requiredEntries[partition] = [];
	}

	requiredEntries[partition].push(path);

	// eslint-disable-next-line import/no-dynamic-require, global-require
	return require(path);
}

export function clearTempRequireCache(partition) {
	requiredEntries[partition].forEach((p) => {
		delete require.cache[require.resolve(p)];
	});

	requiredEntries[partition] = [];
}
