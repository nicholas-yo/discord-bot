import type { Awaitable, SlashCommandBuilder } from 'discord.js';

type Conditional<Directory, EventCase, CommandCase, NoCase> =
	Directory extends 'events'
		? EventCase
		: Directory extends 'commands'
		? CommandCase
		: NoCase;

type CommonModule = {
	default: (arg: unknown) => Awaitable<void>;
};

type CommandModule = {
	command: SlashCommandBuilder;
} & CommonModule;

type EventModule = {
	type?: 'on' | 'once';
} & CommonModule;

type Module<Directory> = Conditional<
	Directory,
	EventModule,
	CommandModule,
	unknown
>;

type Event = 'ready' | 'guildMemberAdd' | 'guildMemberRemove';

type Command = 'ping' | 'status' | 'ban' | 'test';

type File<Directory> = Conditional<Directory, Event, Command, string>;

type Modules<Directory, Module> = Map<File<Directory>, Module>;

type Iterate = (dir: string) => Promise<void>;

type GetModules = <Directory extends 'commands' | 'events' | string>(
	dir: Directory
) => Promise<Modules<Directory, Module<Directory>>>;
