// Message storage utilities
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, '..', 'data');
const messageFile = join(dataDir, 'message.json');

let storedMessage = null;

async function ensureDataDir() {
   if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
   }
}

export async function fluLoadMessage() {
   try {
      await ensureDataDir();

      if (!existsSync(messageFile)) {
         storedMessage = null;
         return null;
      }

      const fileContent = await readFile(messageFile, 'utf-8');
      const data = JSON.parse(fileContent);
      storedMessage = data.message || null;

      return storedMessage;
   } catch (error) {
      console.error('Error loading message from file:', error);
      storedMessage = null;
      return null;
   }
}

export async function fluStoreMessage(message) {
   storedMessage = message;

   try {
      await ensureDataDir();

      const data = { message: message };
      await writeFile(messageFile, JSON.stringify(data, null, 2), 'utf-8');
   } catch (error) {
      console.error('Error saving message to file:', error);
   }
}

export function fluGetMessage() {
   return storedMessage;
}
