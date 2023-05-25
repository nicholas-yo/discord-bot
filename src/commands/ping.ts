import { SlashCommandBuilder, type CommandInteraction } from 'discord.js';

type Interaction = CommandInteraction;

export default async (interaction: Interaction) => {
	const ping = Math.round(interaction.client.ws.ping);

	const content = `API latency is approximately ${ping}ms.`;

	await interaction.reply({ content });
};

export const command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Ping of bot');
