import Discord from 'discord.js'
import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice'
import { ismoConnections } from '../storage'
import { handleStart, handleEnd } from './eventHandle'

export default async function (interaction: Discord.CommandInteraction<Discord.CacheType>) {
    if (!interaction.guild) return
    const subCommand = interaction.options.getSubcommand()

    const storedIsmoConnection = ismoConnections.get(interaction.guild.id)

    if (subCommand === 'lopeta') {
        storedIsmoConnection?.connection.destroy()
        storedIsmoConnection?.connection.receiver.speaking.removeAllListeners()

        ismoConnections.delete(interaction.guild.id)

        await interaction.reply({ content: 'bye-by-be-bye-bye!', ephemeral: true })
        return
    }

    const voiceChannel = (interaction.member as Discord.GuildMember).voice.channel

    if (!voiceChannel) {
        await interaction.reply({ content: 'lii-ty--ää-ni--ka-na-val-le--en-sin!', ephemeral: true })
        return
    }

    if (!voiceChannel.joinable) {
        await interaction.reply({ content: 'sin-ne--en--lii-ty!', ephemeral: true })
        return
    }

    const player = createAudioPlayer()

    const connection = joinVoiceChannel({
        guildId: voiceChannel.guild.id,
        channelId: voiceChannel.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false
    })

    connection.subscribe(player)
    const speakingMap: Map<string, boolean> = new Map()

    // Reset the ismoconnection every execution of the slash command
    storedIsmoConnection?.connection.receiver.speaking.removeAllListeners()
    ismoConnections.set(interaction.guild.id, { connection, speakingMap, player })

    const target = interaction.options.get('kohde')

    connection.receiver.speaking.on('start', (id) => {
        if (target && id !== target.user?.id) return
        handleStart(interaction, id)
    })

    connection.receiver.speaking.on('end', (id) => {
        if (target && id !== target.user?.id) return
        handleEnd(interaction, id)
    })

    await interaction.reply({ content: 'diu-da-da-diu-bau!', ephemeral: true })
}
