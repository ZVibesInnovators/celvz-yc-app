import { width } from "@mui/system";
import styled from "styled-components";
import Enums from "../../constants/enums";

export const LargeHeroButton = styled.button`
    color:${Enums.COLORS.white} !important;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-transform: capitalize;
    width: 250px;
    font-size: 22px;
    border: 3px solid ${({outline}) => outline ? Enums.COLORS.orange : "transparent"};
    background-color: ${({outline}) => outline ? "transparent" : Enums.COLORS.orange};
    padding: 6px;
    border-radius: 5px;

    @media only screen and (max-width: 300px) {
     width: 180px  !important;
    }
`

