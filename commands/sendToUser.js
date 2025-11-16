import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { thrasherFormatMessage } from '../utils/messageFormatter.js';

export default {
   data: new SlashCommandBuilder()
      .setName('sendtouser')
      .setDescription('Belirli bir kullanıcıya özel mesaj gönder')
      .addUserOption((option) => option.setName('user').setDescription('Mesaj gönderilecek kullanıcı').setRequired(true))
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

   async execute(interaction, { fluGetMessage }) {
      await interaction.deferReply({ ephemeral: true });

      const message = fluGetMessage();

      if (!message) {
         await interaction.editReply({
            content: 'Önce bir mesaj ayarlamanız gerekiyor! `/setmessage` komutunu kullanın.',
         });
         return;
      }

      const targetUser = interaction.options.getUser('user');
      const guild = interaction.guild;

      if (!targetUser) {
         await interaction.editReply({
            content: 'Geçerli bir kullanıcı seçilmedi.',
         });
         return;
      }

      if (targetUser.bot) {
         await interaction.editReply({
            content: 'Botlara mesaj gönderilemez.',
         });
         return;
      }

      try {
         const formattedMessage = thrasherFormatMessage(message, targetUser, guild);
         await targetUser.send(formattedMessage);

         await interaction.editReply({
            content: `✅ Mesaj ${targetUser.tag} kullanıcısına başarıyla gönderildi!`,
         });
      } catch (error) {
         console.error(`Failed to send DM to ${targetUser.tag}:`, error);

         let errorMessage = `❌ ${targetUser.tag} kullanıcısına mesaj gönderilemedi.`;

         if (error.code === 50007) {
            errorMessage += " (Kullanıcı DM'leri kapalı veya botu engellemiş olabilir)";
         } else {
            errorMessage += ` Hata: ${error.message}`;
         }

         await interaction.editReply({
            content: errorMessage,
         });
      }
   },
};
