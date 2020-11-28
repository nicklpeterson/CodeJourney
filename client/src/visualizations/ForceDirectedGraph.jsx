import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import ReactJson from 'react-json-view'
import './ForceDirectedGraph.css';

class ForceDirectedGraph extends Component {

    constructor(props){
        super(props)

        this.state = {
            links: this.props.data.links,
            nodes: this.props.data.nodes,
            // links: links,
            // nodes: nodes,
            data: this.props.data,
            // links: this.props.links,
            // nodes: this.props.nodes,
            // simulation: null,
        };
        console.log("constructor set states");

    }

    componentDidMount() {
        // render the chart
        this.renderChart();

        console.log("componentDidMount");
    } 

    // componentDidUpdate() {
    //     // render the chart
    //     this.componentDidMount();
    // } 

    componentWillReceiveProps(nextProps) {

        // this.setState({ 
        //     links: nextProps.data.links,
        //     nodes: nextProps.data.nodes,
        //     data: nextProps.data,
        // }, () => { 
        //     console.log("updated states:  data: " +JSON.stringify(this.state.data));
        //     // this.forceUpdate();
        //     // var simulation = this.state.simulation;
        //     // simulation.stop();
        //     this.removeChart();
        //     // this.renderChart();
        //     this.componentDidMount();

        // });

    }

    removeChart(){
        // d3.select(".chart-container").remove();
        // d3.select(".chart-container").remove();
        d3.select(".graph").remove();
        d3.select(".tooltip").remove();
        // d3.selectAll("svg").remove();
        // d3.selectAll("div").remove();
    }

    renderChart() {
    
        // set the size of the svg
        const width = window.innerWidth - 10;
        const height = window.innerHeight - 10;

        // styles
        const nodeRadius = 20;
        const forcePadding = nodeRadius + 10;
        const targetDistanceUnitLength = nodeRadius / 4;

        // var links = this.state.links;
        // var nodes = this.state.nodes;
        var links = this.state.data.links;
        var nodes = this.state.data.nodes;

        // console.log("links:  " + links);
        // console.log("nodes:  " + nodes);
        console.log("example target:  " + JSON.stringify(nodes[0].target));

        // apply the d3's force simulation to initialize a force directed graph
        var simulation = d3
            .forceSimulation()
            .force(
                "link",
                d3
                    .forceLink()
                    .id(d => d.name)
                    .distance(100)
                    .links(this.state.data.links)
            )
            .force(
                "collide",
                d3
                    .forceCollide()
                    .radius(nodeRadius + 0.5)
                    .iterations(4)
            )
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked)
            .nodes(d3.values(this.state.data.nodes))
            ;

        // this.setState({ 
        //     simulation: simulation,
        // });

        // Use elliptical arc path segments to doubly-encode directionality.
        function ticked() {
            linkPath
                .attr(
                    "d",
                    d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`
                )
                .attr("transform", d => {
                const translation = calcTranslation(
                    d.targetDistance * targetDistanceUnitLength,
                    d.source,
                    d.target
                );
                    d.offsetX = translation.dx;
                    d.offsetY = translation.dy;
                    if(d.offsetX && d.offsetY){
                        return `translate (${d.offsetX}, ${d.offsetY})`;
                    }
                });
            linkLabel.attr("transform", d => {
                if (d.target.x < d.source.x) {
                    return (
                        "rotate(180," +
                        ((d.source.x + d.target.x) / 2 + d.offsetX) +
                        "," +
                        ((d.source.y + d.target.y) / 2 + d.offsetY) +
                        ")"
                );
                } else {
                    return "rotate(0)";
                }
            });
            nodeCircle.attr("transform", transform);
            nodeLabel.attr("transform", transform);
        }
      
        function transform(d) {
            d.x =
                d.x <= forcePadding
                    ? forcePadding
                    : d.x >= width - forcePadding
                        ? width - forcePadding
                        : d.x;
            d.y =
                d.y <= forcePadding
                    ? forcePadding
                    : d.y >= height - forcePadding
                        ? height - forcePadding
                        : d.y;

            if(d.x && d.y){
                return "translate(" + d.x + "," + d.y + ")";
            }
        }
      
        // drag start event
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
      
        // on drag event
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            tooltip.style('display', 'none');
        }
      
        // drag end event
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // initialize a chart container

        const chartContainer = d3.select(".top-container");
      
        // // initialize the svg
        // const chartContainer = topContainer
        // .append("div")
        // .attr("class", "chart-container");

        // const topContainer = d3.select(".top-container");
      
        // // initialize the svg
        // const chartContainer = topContainer
        // .append("div")
        // .attr("class", "chart-container");

        // initialize the svg
        const svg = chartContainer
            .append("svg")
            .attr("class", "graph")
            .attr("width", width)
            .attr("height", height);
      
        // initialize the edge and add to the graph containter
        var tooltip = chartContainer
        .append("div")
        .style("position", "absolute")
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("height", "200px")
        .style("width", "250px")
        .on("mouseover", extendNodeTooltip)
        .on("mouseout", removeNodeTooltip)
        ;

        // setup the svg
        svg
            .append("defs")
            .selectAll("marker")
            .data(["call", "exception", "recursion"])
            .enter()
            .append("marker")
            .attr("id", d => d)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("refX", nodeRadius + 8)
            .attr("refY", 4)
            .attr("orient", "auto")
            .attr("markerUnits", "userSpaceOnUse")
            .append("path")
            .attr("d", "M0,0 L0,8 L8,4 z")
            ;

        // when there is a zoom event, call zoom on all the element in the g group
        svg.call(
            d3.zoom()
            .scaleExtent([1/4, 9])
            .on("zoom", function () {
                d3.select('g').attr('transform', d3.event.transform);
            })
        );

        svg.selectAll("*").remove();

        // add a group element to the svg for the zoom feature purpose 
        var g = svg.append('g');

        // initialize the edge and add to the group element
        const linkPath = g
            .append("g")
            .selectAll("path")
            .data(links)
            .enter()
            .append("path")
            .attr("id", (d, i) => `link-${i}`)
            .attr("class", d => `link ${d.type}`)
            .attr("marker-end", d => `url(#${d.type})`);
      
        // initialize the edge and add to the group element
        const linkLabel = g
            .append("g")
            .selectAll("text")
            .data(links)
            .enter()
            .append("text")
            .attr("class", "link-label")
            .attr("text-anchor", "middle")
            .attr("dy", "0.31em");

        // add a field to display text on the edge
        linkLabel
            .append("textPath")
            .attr("href", (d, i) => `#link-${i}`)
            .attr("startOffset", "50%")
            .text(d => d.type);
      
        // initialize the node circle and add to the group element
        const nodeCircle = g
            .append("g")
            .selectAll("circle")
            .data(d3.values(nodes))
            .enter()
            .append("circle")
            .attr("r", nodeRadius)
            .call(
                d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            )
            .on("mouseover", addNodeTooltip)
            .on("mouseout", removeNodeTooltip);

        // initialize the node text and add to the group element
        const nodeLabel = g
            .append("g")
            .selectAll("text")
            .data(d3.values(nodes))
            .enter()
            .append("text")
            .attr("class", "node-label")
            .attr("y", ".31em")
            .attr("text-anchor", "middle")
            .text(function(d) {
                return d.name;
        });

        // initialize the node tooltip content and make it visible
        function addNodeTooltip(d) {

            // var coordinate = d3.select(this).attr("transform");
            // coordinate = /\(([^)]*)\)/.exec(coordinate)[1];
            // coordinate = coordinate.split(",").map(function(item) {
            //     return parseFloat(item);
            // });;
            
            const data = generateNodeTooltipHTML(d);
            
            // set the content and the position of the tooltip
            tooltip
            .html(data.html)
            // set the position of the tooltip related to the position of the node
            // .style("left", d.x + 20 + "px")
            // .style("top", d.y + 20  + "px")
            // set the position of the tooltip related to the position of the mouse
            .style("left", d3.event.clientX + 20 + "px")
            .style("top", d3.event.clientY + 20  + "px")
            .style('display', 'block');

            // use react json viewer to display all the objects
            const paramElements = document.getElementsByName("method-parameter");
            for(var i = 0; i < paramElements.length; i++){
                const element = paramElements[i];
                if (typeof(element) != 'undefined' && element != null){
                    ReactDOM.render(<ReactJson src={data.param[i]} name={false} theme="bright:inverted" enableClipboard={false} collapsed={true} displayObjectSize={false} displayDataTypes={true} />, element);
                }
            }

        }

        // make the tooltip remain visible on the screen
        function extendNodeTooltip(d) {
            tooltip.transition().end().then(response => {
                // console.log("response:  " + response);
            }).catch(e => {
                // console.log("error:  " + e);
            });
            tooltip.style('display', 'block');
        }

        // make the tooltip invisible on the screen
        function removeNodeTooltip(d) {
            tooltip.transition().delay(100)
            .style('display', 'none');
        }

        // generate the tooltip content in html from the node data
        function generateNodeTooltipHTML(d) {
            var html = "";
            var param = [];

            html += "<div>";
            html += "Name:  " + d.name + "<br/><br/>";
            
            const data = d.data;
            for(var key in data){
                var index = 0;
                if(typeof data[key] === 'object'  && data[key] !== null){
                    param.push(data[key]);
                    html += key+ ": " + "<div name='method-parameter' id='method-parameter-" + index + "'></div>" + "<br/><br/>";
                    index ++;
                } else {
                    html += key+ ': ' + data[key] + "<br/><br/>";
                }
            }
            html += "</div>";

            var result = {
                html: html,
                param: param  
            };

            return result;
        }
    

        // https://bl.ocks.org/ramtob/3658a11845a89c4742d62d32afce3160
        /**
         * @param {number} targetDistance
         * @param {x,y} point0
         * @param {x,y} point1, two points that define a line segmemt
         * @returns
         * a translation {dx,dy} from the given line segment, such that the distance
         * between the given line segment and the translated line segment equals
         * targetDistance
         */
        function calcTranslation(targetDistance, point0, point1) {
            var x1_x0 = point1.x - point0.x,
                y1_y0 = point1.y - point0.y,
                x2_x0,
                y2_y0;
            if (y1_y0 === 0) {
                x2_x0 = 0;
                y2_y0 = targetDistance;
            } else {
                var angle = Math.atan(x1_x0 / y1_y0);
                x2_x0 = -targetDistance * Math.cos(angle);
                y2_y0 = targetDistance * Math.sin(angle);
            }
            return {
                dx: x2_x0,
                dy: y2_y0
            };
        }
    }

    render() {
        // this.renderChart();
      return (
        <div>
            <div className="top-container"></div>
        </div>
      );
    }
}

export default ForceDirectedGraph;
  