export type IsmoSpeakingMap = Map<string, boolean>

export interface IsmoConnection {
    connection: VoiceConnection
    speakingMap: IsmoSpeakingMap
    player: AudioPlayer
    target?: string
}
