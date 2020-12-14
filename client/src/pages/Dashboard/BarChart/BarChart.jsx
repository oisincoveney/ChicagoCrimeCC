import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './BarChart.styles';
import * as d3 from 'd3';

const BarChart = (htmlContainer, props) => {

  useEffect(() => {
    var MARGINS = { top: 20, right: 20, bottom: 70, left: 40 }
    let WIDTH = 600 - MARGINS.left - MARGINS.right;
    let HEIGHT = 300 - MARGINS.top - MARGINS.bottom;

    /*
    var margin = { top: 20, right: 20, bottom: 70, left: 40 },
          width = 600 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;*/

    // Parse the date / time
    var parseDate = d3.timeFormat("%Y-%m").parse;

    // var x = d3.scaleOrdinal(d3.schemeCategory10);

    // var y = d3.scaleLinear().range([height, 0]);

    // var xAxis = d3.svg.axis()
    //   .scale(x)
    //   .orient("bottom")
    //   .tickFormat(d3.timeFormat("%Y-%m"));

    // var yAxis = d3.svg.axis()
    //   .scale(y)
    //   .orient("left")
    //   .ticks(10);



    var x = d3.scaleBand().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 1000]);

    var y = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 100 + 10 * 300]);


    var xAxis = d3.axisBottom()
      .scale(x);

    var yAxis = d3.axisLeft()
      .scale(y);

    var svg = d3.select("#vis-container").append("svg")
      .attr("width", WIDTH + MARGINS.left + MARGINS.right)
      .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
      .append("g")
      .attr("transform",
        "translate(" + MARGINS.left + "," + MARGINS.top + ")");

    d3.csv("bar-data.csv", function (error, _) {

      let data = []
      for (let yr = 1990; yr < 1991; yr++) {
        for(let mon = 1; mon < 13; mon++) {
          let y = parseInt(yr)
          let m = parseInt(mon)
          if (m < 10) {
            m = '0' + m;
          }

          data.push({
            date: y + '-' + m,
            value: Math.floor(Math.random() * 101)
          })
        }
      }

      x.domain(data.map(function (d) { return d.date; }));
      y.domain([0, d3.max(data, function (d) { return d.value; })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + HEIGHT + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value ($)");

      svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function (d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return HEIGHT - y(d.value); });

    });
  }, [])


  return <div className="BarChartWrapper">
    asdf
  </div>
};

BarChart.propTypes = {
  // bla: PropTypes.string,
};

BarChart.defaultProps = {
  // bla: 'test',
};

export default BarChart;
