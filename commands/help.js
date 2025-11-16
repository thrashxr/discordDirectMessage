import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
   data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('Placeholder kullanımı ve komutlar hakkında bilgi gösterir'),

   async execute(interaction) {
      const embed = new EmbedBuilder()
         .setTitle('📚 Bot Komutları ve Placeholder Kullanımı')
         .setColor(0x5865f2)
         .setDescription('Bu bot ile sunucu üyelerine özel mesaj gönderebilirsiniz.')
         .addFields(
            {
               name: '🔧 Komutlar',
               value:
                  '`/setmessage` - Mesaj içeriğini ayarla\n' +
                  '`/sendtoall` - Tüm üyelere mesaj gönder\n' +
                  '`/sendtouser` - Belirli bir kullanıcıya mesaj gönder',
               inline: false,
            },
            {
               name: '📝 Placeholder\'lar',
               value:
                  'Mesajınızda aşağıdaki placeholder\'ları kullanabilirsiniz:\n\n' +
                  '• `{username}` - Kullanıcının kullanıcı adı\n' +
                  '• `{mention}` - Kullanıcıyı mention et\n' +
                  '• `{displayName}` - Kullanıcının görünen adı\n' +
                  '• `{guild}` - Sunucu adı\n' +
                  '• `{memberCount}` - Sunucudaki toplam üye sayısı',
               inline: false,
            },
            {
               name: '💡 Örnek Kullanım',
               value:
                  '```\n' +
                  'Merhaba {mention}!\n' +
                  '{guild} sunucusuna hoş geldin!\n' +
                  'Şu anda {memberCount} üyemiz var.\n' +
                  '```\n\n' +
                  '**Gönderilecek mesaj:**\n' +
                  'Merhaba @Kullanıcı!\n' +
                  'Discord Sunucusu sunucusuna hoş geldin!\n' +
                  'Şu anda 150 üyemiz var.',
               inline: false,
            }
         )
         .setFooter({ text: 'Placeholder\'lar mesaj gönderilirken otomatik olarak değiştirilir.' })
         .setTimestamp();

      await interaction.reply({
         embeds: [embed],
         ephemeral: true,
      });
   },
};

