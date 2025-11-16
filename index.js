import { Client, GatewayIntentBits, Collection, REST, Routes, Events } from 'discord.js';
import { config } from 'dotenv';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { fluStoreMessage, fluGetMessage, fluLoadMessage } from './utils/messageStorage.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();

async function loadCommands() {
   const commandsPath = join(__dirname, 'commands');
   const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

   for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = await import(`file://${filePath}`);
      if ('data' in command.default && 'execute' in command.default) {
         client.commands.set(command.default.data.name, command.default);
      } else {
         console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
   }
}

async function registerCommands() {
   const commandsPath = join(__dirname, 'commands');
   const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

   const commands = [];
   for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command = await import(`file://${filePath}`);
      if ('data' in command.default) {
         commands.push(command.default.data.toJSON());
      }
   }

   const rest = new REST().setToken(process.env.BOT_TOKEN);

   try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
   } catch (error) {
      console.error(error);
   }
}

await fluLoadMessage();
await loadCommands();
await registerCommands();

client.once(Events.ClientReady, () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
   if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
         console.error(`No command matching ${interaction.commandName} was found.`);
         return;
      }

      try {
         await command.execute(interaction, { fluGetMessage, fluStoreMessage });
      } catch (error) {
         console.error(`Error executing ${interaction.commandName}`);
         console.error(error);

         const errorMessage = { content: 'There was an error while executing this command!', ephemeral: true };
         if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
         } else {
            await interaction.reply(errorMessage);
         }
      }
   } else if (interaction.isModalSubmit()) {
      const command = client.commands.get(interaction.customId.split('_')[0]);

      if (command && command.handleModal) {
         try {
            await command.handleModal(interaction, { fluGetMessage, fluStoreMessage });
         } catch (error) {
            console.error(`Error handling modal for ${interaction.customId}`);
            console.error(error);

            const errorMessage = { content: 'There was an error while processing the modal!', ephemeral: true };
            if (interaction.replied || interaction.deferred) {
               await interaction.followUp(errorMessage);
            } else {
               await interaction.reply(errorMessage);
            }
         }
      }
   }
});

client.login(process.env.BOT_TOKEN);
