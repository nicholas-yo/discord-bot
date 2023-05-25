/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	SlashCommandBuilder,
	CommandInteraction,
	EmbedBuilder
} from 'discord.js';
import getData from '../utils/getData.ts';

type Interaction = CommandInteraction;

type Data = {
	online: boolean;
	ip: string;
	port: number;
	debug: {
		ping: boolean;
		query: boolean;
		srv: boolean;
		querymismatch: boolean;
		ipinsrv: boolean;
		cnameinsrv: boolean;
		animatedmotd: boolean;
		cachehit: boolean;
		cachetime: number;
		cacheexpire: number;
		apiversion: number;
	};
	motd: {
		raw: string[];
		clean: string[];
		html: string[];
	};
	players: {
		online: number;
		max: number;
		list: string[];
		uuid: Record<string, string>;
	};
	version: string;
	protocol: number;
	hostname: string;
	icon: string;
	software: string;
	map: string;
	gamemode: string;
	serverid: string;
	plugins: {
		names: string[];
		raw: string[];
	};
	mods: {
		names: string[];
		raw: string[];
	};
	info: {
		raw: string[];
		clean: string[];
		html: string[];
	};
};

type Version = 'Bedrock' | 'Java';

export default async (interaction: Interaction) => {
	await interaction.deferReply();

	const headers = new Headers({
		'cache-control': 'max-age=604800, must-revalidate'
	});

	const { value: address } = interaction.options.get('address')!;
	const { value: version } = interaction.options.get('version')!;

	const url =
		(version as Version) === 'Bedrock'
			? 'https://api.mcsrvstat.us/bedrock/2'
			: 'https://api.mcsrvstat.us/2';

	try {
		const { data, error } = await getData<Data>(`${url}/${address}`, {
			headers
		});

		if (error) throw new Error();

		const embed = new EmbedBuilder({
			author: {
				name: interaction.member!.user.username
			},
			description: data!.hostname
		});

		await interaction.editReply({ embeds: [embed] });
	} catch (error) {
		await interaction.editReply({
			content: 'An unexpected error occurred'
		});
	}
};

export const command = new SlashCommandBuilder()
	.setName('status')
	.setDescription('Get status of any minecraft server!')
	.addStringOption(option =>
		option.setName('address').setDescription('server address').setRequired(true)
	)
	.addStringOption(option =>
		option
			.setName('version')
			.setDescription('minecraft version')
			.addChoices(
				{
					value: 'Java',
					name: 'Java'
				},
				{
					value: 'Bedrock',
					name: 'Bedrock'
				}
			)
			.setRequired(true)
	);
