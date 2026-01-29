const START = 'BUTTON_START'
const PAUSE = 'BUTTON_PAUSE'
const COMPLETE = 'BUTTON_COMPLETE'
const RESTART = 'BUTTON_RESTART'

export const BUTTON_TYPE :Record<string, ButtonType> = {
    START: START,
    PAUSE: PAUSE,
    COMPLETE: COMPLETE,
    RESTART: RESTART,
} as const

export type ButtonType = typeof START | typeof PAUSE | typeof COMPLETE | typeof RESTART
export type ButtonProps = {
    type: ButtonType
    onCLick: Function
}
