import ColorPicker from 'material-ui-color-picker'
import React from 'react';
import Enums from "../constants/enums";


const MUIColorPicker = ({ value, onChange, name }) => {

    return (
        <ColorPicker
            name={name}
            style={{ background: "#000", width: "100px", }}
            defaultValue={"Change Color"}
            value={value || Enums.COLORS.orange}
            onChange={(color) => onChange(name, color)}
        />
    )
}

export default MUIColorPicker;