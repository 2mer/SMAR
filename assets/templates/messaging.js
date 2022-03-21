module.exports = {
	version: 'v1',
	parameters: [
		[
			'execution:row',
			{ id: 'amount', type: 'number' },
			{ id: 'messageInterval', type: 'number' },
			{ id: 'initialDelay', type: 'number' },
		],
		[
			'messaging:column',
			[
				':row',
				{ id: 'doubleEnter', type: 'boolean' },
				{ id: 'randomMessage', type: 'boolean' },
			],
			{ id: 'messages', type: 'array' },
		],
	],

	script: async (
		api,
		{
			amount = -1,
			messageInterval = 0,
			initialDelay = 0,
			messages = [],
			randomMessage = false,
			doubleEnter = false,
		}
	) => {
		await api.sleep(initialDelay);

		for (let i = 0; i < amount && api.running; i++) {
			const messageIndex = randomMessage
				? Math.round(Math.random() * messages.length)
				: i % messages.length;

			if (doubleEnter) {
				api.keyTap('enter');
			}

			api.sendMessage(messages[messageIndex]);

			await api.sleep(messageInterval);
		}
	},
};
