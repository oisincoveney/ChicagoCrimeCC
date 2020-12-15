import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//import { Test } from './BarChart.styles';
import _ from 'lodash';
import {useD3} from '../../../hooks/useD3'
import * as d3 from 'd3'

const BarChart = (props) => {

  const [data, setData] = useState([])
  
  const ref = useD3(
    (svg) => {
      const margins = {
        left: 50,
        right: 50,
        top: 100,
        bottom: 80
      }
      const width = 800
      const height = 800

      const x = d3.scaleLinear()
        .domain([d3.min(Object.keys(data)), d3.max(Object.keys(data))])
        .range([0, width])
      
      const y = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => d.value))])
        .range([height + 200, 0])

      const xAxis = d3.axisBottom().scale(x)
      const yAxis = d3.axisLeft().scale(y)

      svg
        .select('.x-axis')
        .attr('transform', `translate(${margins.left}, ${margins.top})`)
        .call(xAxis)
      
      svg
        .select('.y-axis')
        .attr('transform', `translate(${margins.left}, ${margins.top})`)
        .call(yAxis)

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll("bar") // 'all' means all of the elements below it, even if they don't exist. Here, a number (equal to data length) of 'rect' objects are created with class 'bar' 
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => i * width / Object.keys(data).length + margins.left)
        .attr("width", width / Object.keys(data).length - 4)
        .attr("y", (d) => margins.top)
        .attr("height", (d) => Math.abs(y(0) - y(d.value)))

    }, [data.length]
  )



  useEffect(() => {
    let tmp = {}
    for (let i = 0; i < 100; i++) {
      let num = Math.floor(Math.random() * 10)
      if(_.has(tmp, num)) {
        tmp[num] += 1 
      } else {
        tmp[num] = 1
      }
    }
    setData(Object.keys(tmp).map(key => ({ key, value: tmp[key] })))

  }, [])


  return (<div className="BarChartWrapper">
    <svg
      ref={ref}
      style={{
        height: "80vh",
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>)
};

BarChart.propTypes = {
  // bla: PropTypes.string,
};

BarChart.defaultProps = {
  // bla: 'test',
};

export default BarChart;
