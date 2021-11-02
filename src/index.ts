import Discord, { Intents } from 'discord.js'
import functionality from './command/functionality'
import { register } from './command/slash-register'
import { TOKEN } from './config'

const intents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES])
const client = new Discord.Client({ intents })

register()

client.on('ready', () => console.info('Client ready'))

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) return
    const { commandName } = interaction

    if (commandName === 'ismo') {
        functionality(interaction)
    }
})

client.login(TOKEN)
