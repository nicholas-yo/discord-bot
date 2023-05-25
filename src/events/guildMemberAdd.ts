import type {
	GuildBasedChannel,
	GuildMember,
	PartialTextBasedChannelFields
} from 'discord.js';

type Channel = GuildBasedChannel & PartialTextBasedChannelFields;

export default (member: GuildMember) => {
	if (member.user.bot) return;

	const channel = member.guild.channels.cache.get(
		process.env.NOTIFICATION_CHANNEL_ID!
	) as Channel;

	void channel.send(`Seja bem-vindo(a) ao servidor, <@${member.user.id}>!`);
};
