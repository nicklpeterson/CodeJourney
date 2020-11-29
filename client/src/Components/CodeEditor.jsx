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
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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
        float: 'left'
    },
    toggle: {
        float: 'left',
        margin: 10
    }
}));

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const CodeEditor = () => {
    const initialCode = `function add(a, b) {\n     return a + b;\n}\nadd(5,5);`;
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

    return (
        <div className={classes.root}>
            <h1>Welcome to the Javascript control flow generator</h1>
            <p>Enter your javascript code in the editor and we will generate a control flow diagram.</p>
            <p>Hover over each node to see a tool tip containing information specific to each function call</p>
            <Button variant="contained" color="primary" onClick={handleEvalCode} className={classes.button}>
                Evaluate
            </Button>
            <Typography component="div" className={classes.toggle}>
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Compact</Grid>
                    <Grid item>
                        <AntSwitch checked={toggle} onChange={handleChangeToggle} name="checkedC" />
                    </Grid>
                    <Grid item>Loose</Grid>
                </Grid>
            </Typography>
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
