import color from 'cli-color';
import { Client } from 'discord.js';
import { log } from 'node:console';

export const type = 'once';

export default (client: Client) =>
	log(`${color.cyan('started')} - logged in as ${client.user!.tag}.`);
