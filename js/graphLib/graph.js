/* Copyright Tera Insights, 2013. Released under MIT license */

/*
 *  Dracula Graph Layout and Drawing Framework 0.0.3alpha
 *  (c) 2010 Philipp Strathausen <strathausen@gmail.com>, http://strathausen.eu
 *  Contributions by Jake Stothard <stothardj@gmail.com>.
 *
 *  based on the Graph JavaScript framework, version 0.0.1
 *  (c) 2006 Aslak Hellesoy <aslak.hellesoy@gmail.com>
 *  (c) 2006 Dave Hoover <dave.hoover@gmail.com>
 *
 *  Ported from Graph::Layouter::Spring in
 *    http://search.cpan.org/~pasky/Graph-Layderer-0.02/
 *  The algorithm is based on a spring-style layouter of a Java-based social
 *  network tracker PieSpy written by Paul Mutton <paul@jibble.org>.
 *
 *  This code is freely distributable under the MIT license. Commercial use is
 *  hereby granted without any cost or restriction.
 *
 *  Links:
 *
 *  Graph Dracula JavaScript Framework:
 *      http://graphdracula.net
 *
 /*--------------------------------------------------------------------------*/
//graph object
	var graph ={};
	console.log(graph);

/*
 * Edge Factory
 */
var EdgeFactory = function() {
    graph.template = new Object();
    graph.template.data = new Object();
    graph.template.directed = false;
    graph.template.weight = 1;
};
EdgeFactory.prototype = {
    build: function(source, target) {
        var e = jQuery.extend(true, {}, graph.template);
        e.source = source;
        e.target = target;
        return e;
    }
};

/*
 * Graph
 */
//DISCUSS:Singleton
var Graph = function() {
	
	graph.nodes = {};
    	graph.edges = [];
    	graph.snapshots = []; // previous graph states TODO to be implemented
    	graph.edgeFactory = new EdgeFactory();
	
    	return graph;

};
//Graph.prototype = {// Broken into individual function
    /* 
     * add a node
     * @id          the node's ID (string or number)
     * @content     (optional, dictionary) can contain any information that is
     *              being interpreted by the layout algorithm or the graph
     *              representation
     * addNode will update the information if the node already exists
     */
    graph.addNode = function(id, content) {
        /* testing if node is already existing in the graph */
        if(graph.nodes[id] == undefined) {
            graph.nodes[id] = new Graph.Node(id, content);
        } else {
	    jQuery.extend(graph.nodes[id].data, content);//data->content
	}
        return graph.nodes[id];
    };

    // TODO: allow update of data for an edge
	//Discuss with Prof. DOBRA
    graph.addEdge = function(source, target, data, directed) {
        
	//console.log(source+" "+target);
	var s = graph.addNode(source,data);
        var t = graph.addNode(target,data);
        var edge = graph.edgeFactory.build(s, t);
        jQuery.extend(edge.data, data);
        if (directed) { // if directed edge, add it to target adjList
	    t.edges.push(edge);
	    edge.directed = true;
	}
        s.edges.push(edge);
        graph.edges.push(edge);
    };
    
    graph.removeNode = function(id) {
        delete graph.nodes[id];
        for(var i = 0; i < graph.edges.length; i++) {
            if (graph.edges[i].source.id == id || graph.edges[i].target.id == id) {
                graph.edges.splice(i, 1);
                i--;
            }
        }
    };




//};

/*
 * Node
 */
Graph.Node = function(id, data){
    var node = {};
    node.id = id;
    node.edges = [];
    node.data = data;
    return node;
};

Graph.Node.prototype = {
};

