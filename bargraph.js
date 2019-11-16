var boxheight = 6;
var data = [];
for (i=0; i < 100; i++) {
  data.push({
    a : ((Math.random() * 30) | 0),
    b : ((Math.random() * 30) | 0),
    c : ((Math.random() * 30) | 0)
  });
}

var margin = {top: 20, right: 20, bottom: 80, left: 40},
    width = boxheight * data.length;

var translate = function(x,y){               
  return "translate(" + x + "," + y + ")";
}

var x = d3.scale.linear()
    .range([0,width])
    .domain([0,data.length])

var max = d3.max(data, function(d){return d.a + d.b + d.c});
var height = max * boxheight;


var svg = d3.select("#main").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", translate(margin.left, margin.top + 0.5))

var y = d3.scale.linear()
    .domain([0, max])
    .rangeRound([height, 0])

var color = d3.scale.category10()
    .domain(["a", "b", "c"])

data.forEach(function(d){
  var y0 = 0;
  d.offsets = color.domain().map(function(type){
    return {type: type, y0: y0, y1: y0 += +d[type], value : d[type]}
  });
});

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var groups = svg.selectAll(".group")
    .data(data)
      .enter().append("g")
        .attr("transform", function(d,i){return "translate(" + x(i) + ", 0)"})
        .attr("class", "group")

var types = groups.selectAll(".type")
    .data(function(d){return d.offsets})
    .enter().append("g")
      .attr("transform", function(d){ return translate(0,y(d.y1))})
      .attr("class", "type")
      .attr("fill", function(d){return color(d.type)})

types.selectAll("rect")
    .data(function(d){return d3.range(0,d.value)})
    .enter().append("rect")
      .attr("height", boxheight-0.5)
      .attr("width", boxheight-0.5)
      .attr("y", function(d){ return boxheight * d })
