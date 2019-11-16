// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 90, left: 40 },
  width = 750 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then(function (data) {
  var myScale = d3.scaleLinear()
    .domain([height, 0])
    .range([0, 13000]);
  // X axis
  var x = d3.scaleBand()
    .rangeRound([0, width])
    .domain(data.map(function (d) { return d.Country; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 13000])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  var bars = svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.Country); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function (d) { return height - y(0); }) // always equal to 0
    .attr("y", function (d) { return y(0); })

  // Animation
  svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function (d) { return y(d.Value); })
    .attr("height", function (d) { return height - y(d.Value); })

  d3.select("#my_dataviz").on("click", function () {
    var coords = d3.mouse(this);
    d3.select(bars._groups[0][9]) // yeet
      .transition()
      .duration(300)
      .attr("y", function (d) { return y(myScale(coords[1])) })
      .attr("height", function (d) { return height - y(myScale(coords[1])); })
      .attr('fill', function (d) { return '#69b3a2' })
    d3.select("#reveal1")
      .transition()
      .duration(1000)
      .style("opacity", .1);
  });

  d3.select("#wrapper").append("button")
    .text("Show me how I did")
    .on("click", function () {
      d3.select(bars._groups[0][9]) // yeet
        .transition()
        .duration(1000)
        .attr("y", function (d) { return y(12000) })
        .attr("height", function (d) { return height - y(12000); })
        .attr('fill', function (d) { return 'red' });

      d3.select("#reveal1")
        .transition()
        .duration(1000)
        .style("opacity", 1);
    });
})

// append the svg object to the body of the page
var svg2 = d3.select("#replacename2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv").then(function (data) {
  var myScale = d3.scaleLinear()
    .domain([height, 0])
    .range([0, 13000]);
  // X axis
  var x = d3.scaleBand()
    .rangeRound([0, width])
    .domain(data.map(function (d) { return d.Country; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 13000])
    .range([height, 0]);
  svg2.append("g")
    .call(d3.axisLeft(y));

  // Bars
  var bars = svg2.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.Country); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function (d) { return height - y(0); }) // always equal to 0
    .attr("y", function (d) { return y(0); })

  // Animation
  svg2.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", function (d) { return y(d.Value); })
    .attr("height", function (d) { return height - y(d.Value); })

  d3.select("#replacename2").on("click", function () {
    var coords = d3.mouse(this);
    d3.select(bars._groups[0][9]) // yeet
      .transition()
      .duration(300)
      .attr("y", function (d) { return y(myScale(coords[1])) })
      .attr("height", function (d) { return height - y(myScale(coords[1])); })
      .attr('fill', function (d) { return '#69b3a2' })
    d3.select("#reveal2")
      .transition()
      .duration(1000)
      .style("opacity", .1);
  });

  d3.select("#wrapper_2").append("button")
    .text("Show me how I did")
    .on("click", function () {
      d3.select(bars._groups[0][9]) // yeet
        .transition()
        .duration(1000)
        .attr("y", function (d) { return y(12000) })
        .attr("height", function (d) { return height - y(12000); })
        .attr('fill', function (d) { return 'red' });

      d3.select("#reveal2")
        .transition()
        .duration(1000)
        .style("opacity", 1);
    });
})
