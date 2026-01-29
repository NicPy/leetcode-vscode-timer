import type { ButtonProps } from "../../types/actionButton.types";
import { styled } from "goober";
import { getButtonURL } from "./ActionButton.const";

const Icon = styled('img')`
    width: 32px;
    heignt: 32px;
`
const Button = styled('button')`
    
    &:hover ${Icon} {
        background: #a5abb0;
        border-radius: 50%;
    }

`;


export const ActionButton = ({type, onCLick}: ButtonProps) => {

    return  <Button onClick={onCLick}>
        <Icon src={getButtonURL(type)}/>
    </Button>
}