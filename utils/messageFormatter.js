// Message formatting utility with placeholder support
export function thrasherFormatMessage(message, user, guild) {
   if (!message) return null;

   let formattedMessage = message;

   if (user) {
      formattedMessage = formattedMessage.replace(/{username}/g, user.username);
      formattedMessage = formattedMessage.replace(/{mention}/g, `<@${user.id}>`);
      formattedMessage = formattedMessage.replace(/{displayName}/g, user.displayName || user.username);
   }

   if (guild) {
      formattedMessage = formattedMessage.replace(/{guild}/g, guild.name);
      formattedMessage = formattedMessage.replace(/{memberCount}/g, guild.memberCount.toString());
   }

   return formattedMessage;
}
