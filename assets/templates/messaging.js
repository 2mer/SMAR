module.exports = {
	version: 'v1',
	parameters: [
		[
			'execution:row',
			{ id: 'amount', type: 'number' },
			{ id: 'messageInterval', type: 'number' },
		],
		[
			'messaging:column',
			[
				':row',
				{ id: 'doubleEnter', type: 'boolean' },
				{ id: 'randomMessage', type: 'boolean' },
				{ id: 'allChat', type: 'boolean' },
			],
			{ id: 'headerMessages', type: 'array' },
			{ id: 'messages', type: 'array' },
			{ id: 'footerMessages', type: 'array' },
		],
	],

	script: async (
		api,
		{
			amount = -1,
			messageInterval = 0,
			initialDelay = 0,
			headerMessages = [],
			messages = [],
			footerMessages = [],
			randomMessage = false,
			doubleEnter = false,
			allChat = false,
		}
	) => {
		async function fetchUUIDS() {
			return axios.get(
				'https://www.uuidtools.com/api/generate/v4/count/10'
			);
		}

		const { data: generatedUUIDS } = await fetchUUIDS();

		function getUUID(index) {
			return generatedUUIDS[index % generatedUUIDS.length];
		}

		await api.sleep(initialDelay);

		const makeMessage = async (msg, i) => {
			const timestamp = new Date().toUTCString();
			const generatedUuid = getUUID(i);

			if (doubleEnter) {
				api.keyTap('enter', allChat ? ['shift'] : []);
			}

			let message = msg;
			const additionalEnter = +(
				message.match(/\$enter:(\d+)/)?.[1] || '0'
			);

			message = message.replace(/\$ts/g, timestamp);
			message = message.replace(/\$uuid/g, generatedUuid);
			message = message.replace(/\enter/g, '');

			api.sendMessage(message);

			for (let j = 0; j < additionalEnter; j++) {
				api.keyTap('enter');
			}

			await api.sleep(messageInterval);
		};

		let i = 0;
		for (const headerMessage of headerMessages) {
			await makeMessage(headerMessage.value, i);
			i++;
		}

		i = 0;
		while ((amount === -1 || i < amount) && api.running) {
			const messageIndex = randomMessage
				? Math.round(Math.random() * messages.length)
				: i % messages.length;

			const msg = messages[messageIndex];

			await makeMessage(msg.value, i);

			i++;
		}

		i = 0;
		for (const footerMessage of footerMessages) {
			await makeMessage(footerMessage.value, i);
			i++;
		}
	},
};
