# Discord Direct Message Bot

A bot that lets you send mass or individual direct messages to members in your Discord server.

## Features

* **Mass messaging:** Send a message to all server members at once
* **Individual messaging:** Send a message to a specific user
* **Placeholder support:** Personalize your messages with dynamic fields
* **Persistent message storage:** Saved messages remain even after bot restarts
* **Modal & input support:** Configure messages using either command inputs or modals
* **Rate limiting:** Automatic delay for safe mass messaging

## Requirements

* Node.js 20.0.0 or higher
* Discord Bot Token
* Discord Application Client ID

## Installation

1. Clone or download the project:

```bash
git clone https://github.com/thrashxr/discordDirectMessage.git
cd discordDirect
```

2. Install dependencies:

```bash
npm install
```

3. Create the `.env` file:

```bash
cp .env.example .env
```

4. Edit the `.env` file and add your bot details:

```
BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

5. Start the bot:

```bash
npm start
```

## Commands

### `/setmessage`

Sets the message content to be sent. Can be used in two ways:

* **With input:** Provide the message directly as a command parameter
* **With modal:** Leave the parameter empty to open a modal window

**Permission:** Administrator

### `/sendtoall`

Sends the configured message to all members in the server (excluding bots and the bot itself).

**Permission:** Administrator
**Note:** Includes a 1-second delay between messages (rate limiting).

### `/sendtouser`

Sends the configured message to a specific user.

**Permission:** Administrator

### `/help`

Shows information about placeholders and available commands.

**Permission:** Everyone

## Placeholders

You can use the following placeholders in your messages:

* `{username}` – User’s username
* `{mention}` – Mentions the user
* `{displayName}` – User’s server-specific display name
* `{guild}` – Server name
* `{memberCount}` – Total number of members in the server

### Example Usage

```
Hello {mention}!
Welcome to {guild}!
We currently have {memberCount} members.
```

When sent, it becomes:

```
Hello @User!
Welcome to Discord Server!
We currently have 150 members.
```

## Project Structure

```
discordDirect/
├── commands/          # Slash commands
│   ├── help.js
│   ├── sendToAll.js
│   ├── sendToUser.js
│   └── setMessage.js
├── utils/             # Utility functions
│   ├── messageFormatter.js
│   └── messageStorage.js
├── data/              # Message storage (auto-generated)
│   └── message.json
├── index.js           # Main bot file
├── package.json
└── .env               # Bot token and client ID (must be created)
```

## Notes

* Messages are stored in `data/message.json`
* The `.env` file is not committed to git (for security)
* The `data/` folder is not committed to git
* Messages persist after bot restarts

## Error Handling

The bot automatically handles:

* Users with closed DMs
* Being blocked by users
* Network errors

It reports the number of successful and failed deliveries.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you want to change.

## Support

Use GitHub Issues for problems or questions.
