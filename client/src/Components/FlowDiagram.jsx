import React, {useEffect} from "react";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import {FunctionalComponent} from "../visualizations/FunctionalComponent";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    snackbar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FlowDiagram = ({ code, toggle }) => {
    const API_URL = 'http://localhost:9000/eval';
    const classes = useStyles();
    const [graphData, setGraphData] = React.useState({nodes: [], links: []});
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const headers = {"Content-Type": "application/json"}
        const type = toggle ? 'compact' : 'loose'
        axios.post(API_URL, {code: code, type: type}, { headers })
            .then(response => {
                console.log("Successfully fetched analysis data");

                if (response.data.error) {
                    console.log('error');
                    console.log(response.data.error);
                    setError(response.data.error);
                }
                else {
                    const nodes = response.data.nodes;
                    const links = response.data.links;

                    setGraphData(formatData(nodes, links));
                }
            }).catch(error => {
                console.error(error);
            });
    }, []);

    const formatData = (nodes, links) => {
        // set the reference for the link
        links.forEach(link => {
            link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
            link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
        });

        // Compute targetDistance for each link
        for (let i = 0; i < links.length; i++) {
            if (links[i].targetDistance === -1) {
                continue;
            }
            links[i].targetDistance = 0;
            for (let j = i + 1; j < links.length; j++) {
                if (links[j].targetDistance === -1) {
                    continue;
                }
                if (
                    links[i].target === links[j].source &&
                    links[i].source === links[j].target
                ) {
                    links[i].targetDistance = 1;
                    links[j].targetDistance = -1;
                }
            }
        }

        return {
            nodes: nodes,
            links: links
        }
    }

    if (error) {
        return (
            <div className={classes.snackbar}>
                <Alert severity="error">{error}</Alert>
            </div>
        )
    }
    else {
        return ( <FunctionalComponent data = {graphData} /> );
    }
}

export default FlowDiagram;