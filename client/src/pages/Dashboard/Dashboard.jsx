import React from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Dashboard.styles';
import * as d3 from 'd3';

const Dashboard = (props) => {

  let drawChart = () => {
    const width = 800;
    const height = 450;
    const el = new Element('div');
    const svg = d3.select(el)
      .append('svg')
      .attr('id', 'chart')
      .attr('width', width)
      .attr('height', height);

    return el.toReact();
  }

  return (
    <div className="DashboardWrapper">
      {drawChart()}
    </div>
  )
};

Dashboard.propTypes = {
  // bla: PropTypes.string,
};

Dashboard.defaultProps = {
  // bla: 'test',
};

export default Dashboard;
