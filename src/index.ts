import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TOKEN) throw new Error('missing token');

import client from './client.ts';
import getModules from './utils/getModules.ts';
import startSlashCommands from './startSlashCommands.ts';

await startSlashCommands(client);

const modules = await getModules('events');

for (const [event, { default: listener, type }] of modules)
	client[type ?? 'on'](event, listener);

await client.login(process.env.TOKEN);
