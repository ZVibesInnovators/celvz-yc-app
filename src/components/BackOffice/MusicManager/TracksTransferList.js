import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import Enums from "../../../constants/enums";
import { AlertContext } from "../../../contexts/AlertContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";
import API from "../../../services/api";

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.map(c => (c._id)).indexOf(value?._id) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

const TracksTransferList = forwardRef((props, ref) => {
    const { artist } = props;
    const { authData } = useContext(AuthContext)
    const { showError } = useContext(AlertContext)
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    useEffect(() => {
        setLeft([])
        setRight([])
        if (authData && artist) {
            const api = new API(authData.token);
            api.request("get", `songs?$or=artiste:${artist._id}&$include=media&$include=artiste&$include=songArt&$limit=${Math.pow(10, 5)}`)
                .then(({ data }) => {
                    setLeft(data)
                    setRight([])
                }).catch(error => {
                    showError(error.message)
                })
        }
    }, [artist, authData])

    useImperativeHandle(ref, () => ({
        tracks: right
    }))

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
                <CustomList
                    title={'Artist\'s Songs'}
                    items={left}
                    handleToggleAll={handleToggleAll}
                    numberOfChecked={numberOfChecked}
                    handleToggle={handleToggle}
                    checked={checked}
                />
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <CustomList
                    title={'Album Tracks'}
                    items={right}
                    handleToggleAll={handleToggleAll}
                    numberOfChecked={numberOfChecked}
                    handleToggle={handleToggle}
                    checked={checked}
                />
            </Grid>
        </Grid>
    );
})

export default TracksTransferList;


const CustomList = ({ title, items, handleToggleAll, numberOfChecked, handleToggle, checked }) => (
    <Card>
        <CardHeader
            sx={{ px: 2, py: 1 }}
            avatar={
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={
                        numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                    }
                    disabled={items.length === 0}
                    inputProps={{
                        'aria-label': 'all items selected',
                    }}
                />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List
            sx={{
                width: 200,
                height: 230,
                bgcolor: Enums.COLORS.grey_500,
                overflow: 'auto',
            }}
            dense
            component="div"
            role="list"
        >
            {items.map((value) => {
                const labelId = `transfer-list-all-item-${value}-label`;

                return (
                    <ListItem
                        key={value}
                        role="listitem"
                        button
                        onClick={handleToggle(value)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "#FFF" }} id={labelId} primary={value.title} />
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    </Card>
);