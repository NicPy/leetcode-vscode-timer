import { styled } from 'goober';
import { ActionButton } from "./ActionButton/ActionButton";
import { BUTTON_TYPE } from "../types/actionButton.types.tsx";
import { formatTime } from '../utils/time.utils.ts';


const ItemContainer = styled('div')`
    display: flex;
`
type TaskItemProps = {
    id: number,
    name: string,
    goalTime: number,
    timeConsumed: number,
    status: 'in_progress' | 'completed'
}

const GoalTime = styled('span')`
    background: #1e1e1e;
`
export const TaskItem = (props: TaskItemProps) => {
    const { name, goalTime, timeConsumed, status } = props;

    return <ItemContainer>
        {name} {formatTime(timeConsumed)}/ <GoalTime>{formatTime(goalTime)}</GoalTime>
        <div>{ }</div>
        <ActionButton type={BUTTON_TYPE.START} onCLick={() => { }} ></ActionButton>
        <ActionButton type={BUTTON_TYPE.PAUSE} onCLick={() => { }} ></ActionButton>

    </ItemContainer>

}