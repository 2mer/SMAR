module.exports = {
	parameters: [
		[
			'execution:row',
			{ id: 'amount', type: 'number' },
			{ id: 'messageInterval', type: 'number' },
		],
		[
			'messaging:column',
			{ id: 'doubleEnter', type: 'boolean' },
			[
				':column',
				{ id: 'messages', type: 'array' },
				{ id: 'randomMessage', type: 'boolean' },
			],
		],
	],

	script: async (
		api,
		{
			amount = -1,
			messageInterval = 0,
			messages = [],
			randomMessage = false,
			doubleEnter = false,
		}
	) => {
		for (let i = 0; i < amount; i++) {
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
