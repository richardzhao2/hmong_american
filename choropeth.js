
var mappings = {}

// D3 Projection
var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 1.5])    // translate to center of screen
    .scale([700]);          // scale things down so see entire US

// Define path generator
var choropeth_path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
    .projection(projection);  // tell path generator to use albersUsa projection


// Define linear scale for output
var map_color = d3.scaleLinear()
    .domain([0, 5000, 90000])
    .range(["#89afcf", "steelblue", "darkred"]);

var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

//Create SVG element and append map to the SVG
var choropeth_svg = d3.select("#choropeth")
    .append("svg")
    .attr("width", width)
    .attr("height", height * 1.3);

choropeth_svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (height / 10))
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("text-decoration", "underline")
    .text("Choropleth of Hmong-American Population");

// Append Div for tooltip to SVG
var div = d3.select("#choropeth")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load in my states data!
d3.csv("https://raw.githubusercontent.com/richardzhao2/hmong_datasets/master/population.csv", function (data) {
    // Load GeoJSON data and merge with states data
    mappings[data.state] = data.population
    d3.json("https://gist.githubusercontent.com/michellechandra/0b2ce4923dc9b5809922/raw/a476b9098ba0244718b496697c5b350460d32f99/us-states.json").then(function (json) {
        // Bind the data to the choropeth_svg and create one path per GeoJSON feature
        choropeth_svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", choropeth_path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function (d) {
                if (mappings[d.properties.name]) {
                    return map_color(mappings[d.properties.name]);
                }

                else {
                    return '#ccc'
                }


            })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.text(d.properties.name + " : " + mappings[d.properties.name])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })

            // fade out tooltip on mouse out               
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });


    });

});