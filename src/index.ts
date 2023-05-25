import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TOKEN) throw new Error('missing token');

import client from './client.ts';
import getModules from './utils/getModules.ts';
import startSlashCommands from './startSlashCommands.ts';

await startSlashCommands(client);

const modules = await getModules<Module, 'events'>('events');

for (const [event, module] of modules)
	client[module.type ?? 'on'](event as string, module.default);

void client.login(process.env.TOKEN);
