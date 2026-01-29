import type { ButtonProps } from "../../types/actionButton.types";
import { styled } from "goober";
import { getButtonURL } from "./ActionButton.const";

const Icon = styled('img')`
    width: 32px;
    height: 32px;
`
const Button = styled('button')`
    padding: 0;
    border-radius: 50%;
    background: none;
    
    &:hover ${Icon} {
        cursor: pointer;
    }

`;


export const ActionButton = ({type, onCLick}: ButtonProps) => {

    return  <Button onClick={onCLick}>
        <Icon src={getButtonURL(type)}/>
    </Button>
}