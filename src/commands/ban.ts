/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	SlashCommandBuilder,
	CommandInteraction,
	PermissionFlagsBits
} from 'discord.js';

type Interaction = CommandInteraction;

export default async (interaction: Interaction) => {
	const target = interaction.options.getUser('target')!;
	const { value: reason } = interaction.options.get('reason')!;

	await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
	await interaction.guild?.members.ban(target);
};

export const command = new SlashCommandBuilder()
	.setName('ban')
	.setDescription('Ban a member')
	.setName('ban')
	.setDescription('Select a member and ban them.')
	.addUserOption(option =>
		option
			.setName('target')
			.setDescription('The member to ban')
			.setRequired(true)
	)
	.addStringOption(option =>
		option
			.setName('reason')
			.setDescription('The reason for banning')
			.setRequired(true)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
	.setDMPermission(false);
