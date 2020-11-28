import React, {Component} from "react";
import CodeEditor from "./Components/CodeEditor";

export default class MainUI extends Component {

   // constructor(props) {
   //     super(props)
//
   //     this.state = {
   //         // graphData: {
   //         //     // links: [],
   //         //     // nodes: [],
   //         //     // links: links,
   //         //     // nodes: nodes,
   //         // },
   //         links: [],
   //         nodes: [],
   //     };
   //
   //     this.getVisualizationData = this.getVisualizationData.bind(this);
   // }
//
   // getVisualizationData = (code) => {
//
   //     axios.post(`http://localhost:9000/eval`)
   //     .then(res => {
   //         const graphData = res.data;
//
   //         var links = [
   //             { source: 0, target: 1, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 1, target: 2, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 1, target: 3, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //
   //             { source: 3, target: 4, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 4, target: 5, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 3, target: 6, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 3, target: 7, value: 1 , polarity: 1, targetDistance: 1, type: "exception" },
   //             { source: 3, target: 8, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //
   //             { source: 8, target: 9, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 9, target: 10, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 9, target: 11, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 9, target: 12, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 12, target: 13, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //             { source: 12, target: 14, value: 1 , polarity: 1, targetDistance: 1, type: "call" },
   //         ];
   //
   //         var nodes = [
   //             { name: "Main", group: 1, id: 0, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
   //             { name: "AbstractGhostMover", group: 1, id: 1, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
   //             { name: "RandomGhostMover", group: 1, id: 2, data:{ key1: "What", key2: "the", key3: {key4: "fxxk", key5: "???"}}  },
   //             { name: "DefaultGameFactory", group: 1, id: 3, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "PointManager", group: 1, id: 4, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "IPointInspector", group: 1, id: 5, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "IGameFactory", group: 1, id: 6, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "FactoryException", group: 1, id: 7, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "MapParser", group: 1, id: 8, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "Board", group: 1, id: 9, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "Direction", group: 1, id: 10, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "IBoardInspector", group: 1, id: 11, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "Game", group: 1, id: 12, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "Food", group: 1, id: 13, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "Ghost", group: 1, id: 14, data:{ key1: "What", key2: "the", key3: "fxxk?"} },
   //             { name: "Test1", group: 1, id: 15, data:{ key1: "What", key2: "the", key3: "test3", key4: "test4",
   //                 key5: "test5", key6: "test6", key7: "test7", key8: "test8", key9: "test3",
   //                 key10: "test3", key11: "test3", key12: "test3"  }},
   //         ];
//
   //         links.forEach(link => {
   //             link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
   //             link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
   //         });
   //         console.log("Node Data from API:   \n" + JSON.stringify(graphData.nodes));
   //         console.log("Node Data from source   \n" + JSON.stringify(nodes));
//
   //         console.log("Link Data from API:   \n" + JSON.stringify(graphData.links));
   //         console.log("Link Data from source   \n" + JSON.stringify(links));
//
   //         // this.state = {
   //         //     graphData: {
   //         //         nodes: nodes,
   //         //         links: links,
   //         //     }
   //         // }
//
   //
   //         const temp1 = JSON.parse('[{"source":{"name":"Main","group":1,"id":0,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},"target":{"name":"AbstractGhostMover","group":1,"id":1,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"AbstractGhostMover","group":1,"id":1,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},"target":{"name":"RandomGhostMover","group":1,"id":2,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"AbstractGhostMover","group":1,"id":1,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},"target":{"name":"DefaultGameFactory","group":1,"id":3,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"DefaultGameFactory","group":1,"id":3,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"PointManager","group":1,"id":4,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"PointManager","group":1,"id":4,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"IPointInspector","group":1,"id":5,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"DefaultGameFactory","group":1,"id":3,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"IGameFactory","group":1,"id":6,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"DefaultGameFactory","group":1,"id":3,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"FactoryException","group":1,"id":7,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"exception"},{"source":{"name":"DefaultGameFactory","group":1,"id":3,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"MapParser","group":1,"id":8,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"MapParser","group":1,"id":8,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"Board","group":1,"id":9,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"Board","group":1,"id":9,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"Direction","group":1,"id":10,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"Board","group":1,"id":9,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"IBoardInspector","group":1,"id":11,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"Board","group":1,"id":9,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"Game","group":1,"id":12,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"Game","group":1,"id":12,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"Food","group":1,"id":13,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"},{"source":{"name":"Game","group":1,"id":12,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"target":{"name":"Ghost","group":1,"id":14,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},"value":1,"polarity":1,"targetDistance":1,"type":"call"}]');
   //         const temp2 = JSON.parse('[{"name":"Main","group":1,"id":0,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},{"name":"AbstractGhostMover","group":1,"id":1,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},{"name":"RandomGhostMover","group":1,"id":2,"data":{"key1":"What","key2":"the","key3":{"key4":"fxxk","key5":"???"}}},{"name":"DefaultGameFactory","group":1,"id":3,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"PointManager","group":1,"id":4,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"IPointInspector","group":1,"id":5,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"IGameFactory","group":1,"id":6,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"FactoryException","group":1,"id":7,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"MapParser","group":1,"id":8,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"Board","group":1,"id":9,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"Direction","group":1,"id":10,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"IBoardInspector","group":1,"id":11,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"Game","group":1,"id":12,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"Food","group":1,"id":13,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"Ghost","group":1,"id":14,"data":{"key1":"What","key2":"the","key3":"fxxk?"}},{"name":"Test1","group":1,"id":15,"data":{"key1":"What","key2":"the","key3":"test3","key4":"test4","key5":"test5","key6":"test6","key7":"test7","key8":"test8","key9":"test3","key10":"test3","key11":"test3","key12":"test3"}}]');
   //         const temp3 = JSON.parse(JSON.stringify(links, null, '  '));
   //         const temp4 = JSON.parse(JSON.stringify(nodes, null, '  '));
//
   //         this.setState({
   //             // graphData: temp,
   //             graphData: {
   //                 // links: links,
   //                 // nodes: nodes,
   //                 links: graphData.links,
   //                 nodes: graphData.nodes,
   //                 // links: JSON.parse(JSON.stringify(links)),
   //                 // nodes: JSON.parse(JSON.stringify(nodes)),
   //             },
//
   //             // links: graphData.links,
   //             // nodes: graphData.nodes,
   //         });
//
   //         // window.open(<FunctionalComponent data={graphData} />);
   //     });
   // }
    


    render() {
        return (
            <CodeEditor onCodeUpdate={this.getVisualizationData}/>
        );
    }
}
