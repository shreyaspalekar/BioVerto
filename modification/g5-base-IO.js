// import "g5.js"
// import "d3.js"

/* This file contains base IO pluggins */


// Delimiter separated edge graph with implicit nodes default is assumed to be csv
(function(g5){
    g5.addIOPlugin(
	"dsv",
	// TODO: allow the separator to be specified by arg1 
	function(delimiter, blob, source, target){
	    source = source || "source";
	    target = target || "target";
		delimiter = delimiter || ",";
	    var graph = g5.createGraph();
	    d3.dsv(delimiter,"text/plain").parse(blob, function(data){
		data.each(function(d){
		    // assuming that source and target columns are defined
		    var source = d[source];
		    delete d[source];
		    var target = d[target];
		    delete d[target];
		    graph.addEdge(source, target, d);
		});
		// select the first element and add accessors functions for members
		var el = data[0] || {};
		for (v in el){
		    g5.addEdgeAccessor(v, g5.createAccessor(v));
		}
	    });
	    return graph;
	},
	// #TODO output function that returns csv string
	function(delimiter){
		var graph = g5.getGraph();
		var dsv = '';
		graph.edges.each(function(d){
			dsv += source;
			dsv += ',';
			dsv += target;
			dsv += ',';
			dsv += value;
			dsv += '\n';
		});
		return dsv;
	});
}(g5));

// json 


(function(g5){
    g5.addIOPlugin(
	"json",
	// TODO: allow the separator to be specified by arg1 
	function(blob, source, target){
	    source = source || "source";
	    target = target || "target";
		var graph = g5.createGraph();
	    d3.json(blob, function(data){
			data.each(function(d){
		    // assuming that source and target columns are defined
				var source = d[source];
				delete d[source];
				var target = d[target];
				delete d[target];
				graph.addEdge(source, target, d);
			});
		// select the first element and add accessors functions for members
		var el = data[0] || {};
		for (v in el){
		    g5.addEdgeAccessor(v, g5.createAccessor(v));
		}
	    });
	    return graph;
	},
	// #TODO output function that returns csv string
	undefined
	)
}(g5));