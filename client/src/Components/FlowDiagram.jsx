import React, {useEffect} from "react";
import axios from 'axios';
import {FunctionalComponent} from "../visualizations/FunctionalComponent";

const FlowDiagram = ({ code }) => {
    const API_URL = 'http://localhost:9000/eval';
    const [graphData, setGraphData] = React.useState({nodes: [], links: []});

    useEffect(() => {
        const headers = {"Content-Type": "application/json"}
        axios.post(API_URL, {code: code}, { headers })
            .then(response => {
                console.log("Successfully fetched analysis data");
                console.log(response.data);
                setGraphData({
                    nodes: response.data.nodes,
                    links: response.data.links
                });
            });
    }, []);

    return ( <FunctionalComponent data = {graphData}/> );
}

export default FlowDiagram;