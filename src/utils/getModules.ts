import { readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path/posix';
import { fileURLToPath } from 'node:url';

import type {
	GetModules,
	Modules,
	Module,
	Command,
	Iterate
} from '../@types/getModules';

export { Command };

const __dirname: string = dirname(fileURLToPath(import.meta.url));

const getModules: GetModules = async dir => {
	const modules: Modules<typeof dir, Module<typeof dir>> = new Map();

	/**
	 * Maybe this is not the best name for this function
	 */
	const iterate: Iterate = async dir => {
		const dirPath: string = resolve(__dirname, 'src', dir);

		const files = await readdir(dirPath, {
			withFileTypes: true
		});

		for (const file of files)
			if (file.isDirectory()) {
				await iterate(resolve(dirPath, file.name));
			} else {
				const modulePath: string = resolve(dirPath, file.name);

				const module = (await import(modulePath)) as Module<typeof dir>;

				const filename = file.name.slice(0, -3);

				// @ts-expect-error "Argument of type string is not assignable" i don't know why this error
				modules.set(filename, module);
			}
	};

	await iterate(dir);

	return modules;
};

export default getModules;
