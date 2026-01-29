import {styled} from 'goober';
import {ActionButton} from "./ActionButton/ActionButton";
import {BUTTON_TYPE} from "../types/actionButton.types.tsx";
import {formatTime} from '../utils/time.utils.ts';

type TaskItemProps = {
    id: number,
    name: string,
    goalTime: number,
    timeConsumed: number,
    status: 'in_progress' | 'completed'
}

const ItemContainer = styled('div')`
    display: flex;
    background: white;
    align-items: center;
    justify-content: space-between;
    gap: ${(props) => props.theme.spacing(1)};
    color: ${(props) => props.theme.palette.primary};
    font-weight: 700;
    border-radius: 16px;
    padding: ${(props) => props.theme.spacing(1)};
`

const ControlsContainer = styled('div')`
    display: flex;
    align-items: center;
    gap: 16px;
`
const InfoContainer = styled('div')``
const ConsumedTime = styled('span')`
    font-size: 26px;
`
const GoalTime = styled('span')`
    color: ${({theme}) => theme.palette.grey};
    font-size: 12px;
`

const Name = styled('h3')`
    color: ${({theme}) => theme.palette.black};
`
export const TaskItem = (props: TaskItemProps) => {
    const {name, goalTime, timeConsumed, status} = props;

    return <ItemContainer>
        <InfoContainer>
            <Name> {name}</Name>
            <ConsumedTime>{formatTime(timeConsumed)}</ConsumedTime>
            <GoalTime>{formatTime(goalTime)}</GoalTime>
        </InfoContainer>
        <ControlsContainer>
            {status === 'in_progress' && (
                <>
                    <ActionButton type={BUTTON_TYPE.START} onCLick={() => {
                    }}></ActionButton>
                    <ActionButton type={BUTTON_TYPE.PAUSE} onCLick={() => {
                    }}></ActionButton>
                </>
            )
            }
        </ControlsContainer>


    </ItemContainer>

}