import React from "react";
import FlowDiagram from "./FlowDiagram";
import {UnControlled as CodeMirror} from 'react-codemirror2'
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import 'codemirror/lib/codemirror.css';
import '../App.css';
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    editor: {
        height: 1000
    },
    button: {
        margin: 5,
        float: 'left'
    },
    toggle: {
        marginLeft: 20,
        marginBottom: 10
    }
}));

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border-color']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

const CodeEditor = () => {
    const initialCode = `function factorial(a) {\n` +
                        `   if (a <= 1) return 1;\n` +
                        `   return a * factorial(a - 1);\n` +
                        `}\n` +
                        `factorial(6);`;
    const classes = useStyles();
    const [evalCode, setEvalCode] = React.useState(false);
    const [inputCode, setInputCode] = React.useState(initialCode);
    const [toggle, setToggle] = React.useState(false)

    const handleEvalCode = () => {
        console.log(inputCode);
        setEvalCode(true);
    }

    const handleChangeToggle = (event) => {
        setToggle(event.target.checked);
        setEvalCode(false);
    }

    const handleReset = (event) => {
        setEvalCode(false);
    }

    return (
        <div className={classes.root}>
            <h1>Welcome to the Javascript control flow generator</h1>
            <p>Enter your javascript code in the editor and we will generate a control flow diagram.</p>
            <p>Hover over each node to see a tool tip containing information specific to each function call</p>
            <Button variant="contained" color="primary" onClick={handleEvalCode} className={classes.button}>
                Evaluate
            </Button>
            <Button variant="contained" color="primary" onClick={handleReset} className={classes.button}>
                Reset
            </Button>
            <FormControlLabel
                className={classes.toggle}
                control={
                    <IOSSwitch
                        checked={toggle}
                        onChange={handleChangeToggle}
                        name="checkedB"
                    />
                }
                label="Compact"
            />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <CodeMirror
                        value={inputCode}
                        autoCursor={false}
                        options={{
                            mode: 'xml',
                            theme: 'material',
                            lineNumbers: true
                        }}
                        onChange={(editor, data, value) => {
                            setInputCode(value);
                            setEvalCode(false);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Paper className={classes.paper}>
                        {evalCode && <FlowDiagram code={inputCode} toggle={toggle}/>}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default CodeEditor;
