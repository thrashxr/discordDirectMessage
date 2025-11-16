import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { thrasherFormatMessage } from '../utils/messageFormatter.js';

export default {
   data: new SlashCommandBuilder().setName('sendtoall').setDescription('Sunucudaki tüm üyelere özel mesaj gönder').setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

   async execute(interaction, { fluGetMessage }) {
      await interaction.deferReply({ ephemeral: true });

      const message = fluGetMessage();

      if (!message) {
         await interaction.editReply({
            content: 'Önce bir mesaj ayarlamanız gerekiyor! `/setmessage` komutunu kullanın.',
         });
         return;
      }

      const guild = interaction.guild;

      if (!guild) {
         await interaction.editReply({
            content: 'Bu komut sadece sunucularda kullanılabilir.',
         });
         return;
      }

      let members;
      try {
         members = await guild.members.fetch();
      } catch (error) {
         console.error('Error fetching members:', error);
         await interaction.editReply({
            content: 'Üyeler alınırken bir hata oluştu.',
         });
         return;
      }

      const membersToMessage = members.filter((member) => !member.user.bot && member.id !== interaction.client.user.id);

      let successCount = 0;
      let failCount = 0;
      const failedUsers = [];

      await interaction.editReply({
         content: `${membersToMessage.size} üyeye mesaj gönderiliyor...`,
      });

      for (const member of membersToMessage.values()) {
         try {
            const formattedMessage = thrasherFormatMessage(message, member.user, guild);

            await member.send(formattedMessage);
            successCount++;

            await new Promise((resolve) => setTimeout(resolve, 1000));
         } catch (error) {
            failCount++;
            failedUsers.push(member.user.tag);
            console.error(`Failed to send DM to ${member.user.tag}:`, error.message);
         }
      }

      let resultMessage = `Mesaj gönderimi tamamlandı!\n`;
      resultMessage += `✅ Başarılı: ${successCount}\n`;
      resultMessage += `❌ Başarısız: ${failCount}`;

      if (failedUsers.length > 0 && failedUsers.length <= 10) {
         resultMessage += `\n\nBaşarısız kullanıcılar: ${failedUsers.join(', ')}`;
      } else if (failedUsers.length > 10) {
         resultMessage += `\n\nİlk 10 başarısız kullanıcı: ${failedUsers.slice(0, 10).join(', ')}...`;
      }

      await interaction.editReply({
         content: resultMessage,
      });
   },
};
