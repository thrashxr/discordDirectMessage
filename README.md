# Discord Direct Message Bot

**Mass-DM & broadcast tool for Discord servers — personalized, safe, and easy to use.**

[![Node.js CI](https://img.shields.io/badge/Node-v20%2B-brightgreen)]()  
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)]()

---

## 🚀 What is this?

discordDirectMessage is a simple yet powerful Discord bot that helps server owners and admins send **custom direct messages (DMs)** to:

- All server members at once (mass broadcast)  
- A specific user individually  

This solves the classic problem: public announcements get lost, @everyone pings get ignored, and moderators spend too much time messaging manually.

Perfect for community announcements, onboarding new members, announcements, reminders and more.

---

## ✅ Features

- **Mass messaging** (send the same DM to all members)  
- **Individual messaging** (send DM to a specific user)  
- **Dynamic placeholders** for personalization:  
  - `{username}` — user’s username  
  - `{displayName}` — user’s nickname in the server  
  - `{mention}` — mention the user  
  - `{guild}` — server name  
  - `{memberCount}` — server member count  
- **Persistent storage** — message content is saved even if the bot restarts  
- **Modal & input support** — set message via slash command or modal dialog  
- **Rate-limited safe mass messaging** (delay between messages to avoid spam/rate-limit issues)  
- **Admin-only permissions** for mass/individual messaging (security)  
- Simple setup & zero-dependency complexity beyond Node.js & Discord bot essentials  

---

## 🧰 Requirements

- Node.js 20 or higher  
- A valid Discord Bot Token + Client ID  
- Permissions: ADMINISTRATOR (or manage roles/permissions to allow bot commands)  

---

## 📦 Installation & Setup

```bash
git clone https://github.com/thrashxr/discordDirectMessage.git  
cd discordDirectMessage  
npm install  

# Copy .env example and configure
cp .env.example .env  

# Edit .env to add:
# BOT_TOKEN=<your_discord_bot_token>
# CLIENT_ID=<your_discord_application_client_id>

npm start
````

That’s it — bot is ready and will register slash commands automatically.

---

## 📝 Commands

| Command                 | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `/setmessage <message>` | Save your broadcast message (accepts direct input)                                  |
| `/setmessage`           | (no arg) — opens a modal to type the message content                                |
| `/sendtoall`            | Send the saved message to all server members (excluding bots & self) — rate-limited |
| `/sendtouser <@user>`   | Send the saved message to a specific user                                           |
| `/help`                 | Show available placeholders and command help                                        |

---

## 🎯 Use Cases – Who This Helps

* Server admins needing to broadcast announcements, updates, or onboarding messages
* Community managers wanting personalized DMs instead of public pings
* Educational servers, gaming clans, events, giveaways — wherever direct member reach out is needed
* Anyone needing a simple, ready-to-use, self-hosted Discord DM tool

---

## 📄 License

This project is licensed under the **ISC License**. See [LICENSE](LICENSE) for details.

---

## 👍 Want a Custom Solution?

Need more than basic mass-messaging? I also build customized Discord bots: dashboards, automation pipelines, database integrations, moderation tools, APIs — tailored to your server’s needs.
Feel free to open an issue or reach out via GitHub / email.

---
