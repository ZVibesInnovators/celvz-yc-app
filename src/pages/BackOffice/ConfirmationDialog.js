import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const ConfirmationDialog = forwardRef((props, ref) => {
    const [contents, setContents] = useState({})
    const [showConfirm, toggleConfirm] = useState(false)

    useImperativeHandle(ref, () => ({
        open: (data) => {
            setContents(data)
            toggleConfirm(true)
        },
        close: dismiss
    }))

    const dismiss = () => {
        toggleConfirm(false)
        setContents({})
    }

    return (
        <Dialog onClose={dismiss} open={showConfirm}>
            <DialogTitle sx={{ textAlign: "center" }}>
                {contents?.title}
                <Typography>{contents?.description}</Typography>
            </DialogTitle>
            <DialogActions>
                <Button onClick={dismiss}>Cancel</Button>
                <Button onClick={contents.confirm}>{contents.submitText}</Button>
            </DialogActions>
        </Dialog>
    )
})

export default ConfirmationDialog;