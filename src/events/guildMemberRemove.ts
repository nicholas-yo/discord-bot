import type {
	GuildBasedChannel,
	GuildMember,
	PartialGuildMember,
	PartialTextBasedChannelFields
} from 'discord.js';

type Channel = GuildBasedChannel & PartialTextBasedChannelFields;

export default (member: GuildMember | PartialGuildMember) => {
	if (member.user.bot) return;

	const channel = member.guild.channels.cache.get(
		process.env.NOTIFICATION_CHANNEL_ID!
	) as Channel;

	void channel.send(`${member.user.username} saiu do servidor.`);
};
