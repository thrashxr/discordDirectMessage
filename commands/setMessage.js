import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } from 'discord.js';

export default {
   data: new SlashCommandBuilder()
      .setName('setmessage')
      .setDescription('Mesaj içeriğini ayarla (modal veya direkt olarak)')
      .addStringOption((option) => option.setName('message').setDescription('Gönderilecek mesaj içeriği (opsiyonel - modal açmak için boş bırakın)').setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

   async execute(interaction, { fluStoreMessage }) {
      const messageOption = interaction.options.getString('message');

      if (messageOption) {
         await fluStoreMessage(messageOption);
         await interaction.reply({
            content: 'Mesaj başarıyla kaydedildi!',
            ephemeral: true,
         });
         return;
      }

      const modal = new ModalBuilder().setCustomId('setmessage_modal').setTitle('Mesaj İçeriğini Ayarla');

      const messageInput = new TextInputBuilder()
         .setCustomId('message_content')
         .setLabel('Mesaj İçeriği')
         .setStyle(TextInputStyle.Paragraph)
         .setPlaceholder("Mesajınızı buraya yazın. Placeholder'lar: {username}, {mention}, {guild}, {memberCount}")
         .setRequired(true)
         .setMaxLength(2000);

      const actionRow = new ActionRowBuilder().addComponents(messageInput);
      modal.addComponents(actionRow);

      await interaction.showModal(modal);
   },

   async handleModal(interaction, { fluStoreMessage }) {
      if (interaction.customId === 'setmessage_modal') {
         const messageContent = interaction.fields.getTextInputValue('message_content');

         await fluStoreMessage(messageContent);

         await interaction.reply({
            content: 'Mesaj başarıyla kaydedildi!',
            ephemeral: true,
         });
      }
   },
};
