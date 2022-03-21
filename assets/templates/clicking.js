module.exports = {
	version: 'v1',
	parameters: [
		[
			'execution:row',
			{ id: 'amount', type: 'number' },
			{ id: 'messageInterval', type: 'number' },
		],
	],

	script: async (
		api,
		{ amount = -1, messageInterval = 0, initialDelay = 0 }
	) => {
		await api.sleep(initialDelay);

		for (let i = 0; i < amount && api.running; i++) {
			api.click();

			await api.sleep(messageInterval);
		}
	},
};
