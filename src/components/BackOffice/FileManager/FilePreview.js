import { Box, Drawer, useTheme } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Enums from "../../../constants/enums";

const FilePreview = forwardRef((props, ref) => {
    const [file, setFile] = useState(null)
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        setFile: (v) => setFile(v)
    }))

    return (
        <Drawer
            anchor={"bottom"}
            open={file}
            onClose={() => setFile(null)}
            sx={{
                position: "absolute",
                zIndex: 2000
            }}
            PaperProps={{
                sx: {
                    background: "transparent",

                    [`${theme.breakpoints.up("md")}`]: {
                        marginX: 20
                    }
                }
            }}
        >
            <Box
                sx={{
                    background: Enums.COLORS.grey_500,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: "20px",
                }}>
                {
                    file && <Box>
                        <h2>{file.filename}</h2>
                    </Box>
                }
            </Box>
        </Drawer>
    )
})

export default FilePreview;