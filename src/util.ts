import { IsmoSpeakingMap } from './types'

export const anySpeaking = (speakingMap: IsmoSpeakingMap): boolean => {
    for (let speaking of speakingMap.values()) {
        if (speaking) {
            return true
        }
    }
    return false
}
