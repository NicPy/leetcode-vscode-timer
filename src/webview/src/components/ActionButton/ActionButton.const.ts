import { BUTTON_TYPE, type ButtonType } from "../../types/actionButton.types";

const BUTTON_ICONS_MAP = {
    [BUTTON_TYPE.START]: './start.svg',
    [BUTTON_TYPE.PAUSE]: './pause.svg',
    [BUTTON_TYPE.RESTART]: './restart.svg',
    [BUTTON_TYPE.COMPLETE]: './complete.svg',
}

export const getButtonURL = (type: ButtonType) => {
    return BUTTON_ICONS_MAP[type];
};