import color from 'cli-color';
import { log } from 'node:console';
import { REST, Routes, Client } from 'discord.js';

import getModules from './utils/getModules.ts';

const startSlashCommands = async (client: Client) => {
	const modules = await getModules<Module, 'commands'>('commands');

	const rest: REST = new REST().setToken(process.env.TOKEN!);

	try {
		log(`${color.magenta('event')} - refreshing application (/) commands.`);

		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID!,
				process.env.GUILD_ID!
			),
			{
				body: [...modules.values()].map(({ command }) => command!.toJSON())
			}
		);

		log(
			`${color.magenta(
				'event'
			)} - successfully reloaded application (/) commands.`
		);

		client.on('interactionCreate', async interaction => {
			if (!interaction.isChatInputCommand()) return;
			if (!interaction.isCommand()) return;

			const { commandName } = interaction;

			const { default: execute } = modules.get(commandName as 'ping')!;

			await execute(interaction);
		});
	} catch (err) {
		const { message } = err as Error;

		log(`${color.red('error')} - ${message}`);
	}
};

export default startSlashCommands;
