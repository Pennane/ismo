import { REST } from '@discordjs/rest'
import { SlashCommandBuilder } from '@discordjs/builders'
import { Routes } from 'discord-api-types/v9'
import { clientId, guildId, TOKEN } from '../config'
const rest = new REST({ version: '9' }).setToken(TOKEN)

const slashCommand = new SlashCommandBuilder()
    .setName('ismo')
    .setDescription('ismoile menee')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('kohde')
            .setDescription('ismoilun kohde')
            .addUserOption((option) => option.setName('kohde').setDescription('Käyttäjä').setRequired(true))
    )
    .addSubcommand((subcommand) => subcommand.setName('lopeta').setDescription('lopettaa ismoilun'))
    .toJSON()

export const register = async () => {
    console.info('Started refreshing application (/) commands.')
    try {
        // await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [slashCommand] })
        await rest.put(Routes.applicationCommands(clientId), { body: [slashCommand] })
    } catch (e) {
        console.error(e)
        return
    }

    console.info('Successfully reloaded application (/) commands.')
}
