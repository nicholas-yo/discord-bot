import type { Awaitable, SlashCommandBuilder } from 'discord.js';

declare global {
	type Module = {
		default: (arg: unknown) => Awaitable<void>;
		command?: SlashCommandBuilder;
		type?: 'on' | 'once';
	};
}

export {};
