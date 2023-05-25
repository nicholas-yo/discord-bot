import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

type Events = 'ready' | 'guildMemberAdd' | 'guildMemberRemove';

type Commands = 'ping' | 'status' | 'ban';

type Conditional<Path> = Path extends 'events'
	? Events
	: Path extends 'commands'
	? Commands
	: string;

type File<Path> = Conditional<Path>;

type Modules<Path, Module> = Map<Conditional<Path>, Module>;

type Paths = 'commands' | 'events';

const getModules = async <
	Module = Record<string, unknown>,
	Path extends Paths = Paths
>(
	path: Path
) => {
	const modules: Modules<Path, Module> = new Map();

	const __dirname: string = dirname(fileURLToPath(import.meta.url));

	const dir: string = resolve(__dirname, 'src', path);

	const files: string[] = await readdir(dir);

	for (const file of files) {
		const module = (await import(resolve(dir, file))) as Module;

		modules.set(file.slice(0, -3) as File<Path>, module);
	}

	return modules;
};

export default getModules;
