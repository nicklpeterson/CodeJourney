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

                // var nodes = response.data.nodes;
                // var links = response.data.links;

                var links = [
                { source: 0, target: 1, value: 1 , polarity: 1, targetDistance: 1, type: "call", typeParam: "1" },
                { source: 1, target: 1, value: 1 , polarity: 1, targetDistance: 1, type: "recursion", typeParam: "10" },
            ];
    
            var nodes = [
                { name: "Main", group: 1, id: 0, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
                { name: "Recursion", group: 1, id: 1, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
            ];

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

                setGraphData({
                    nodes: nodes,
                    links: links
                });
            });
    }, []);

    return ( <FunctionalComponent data = {graphData}/> );
}

export default FlowDiagram;