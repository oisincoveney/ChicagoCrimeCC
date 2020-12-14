import React, {useRef} from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Dashboard.styles';
import BarChart from './BarChart/index'

const Dashboard = (props) => {
  const dashElement = useRef(null);

  return (
    <div className="DashboardWrapper">
      <div id="vis-container" ref={dashElement}></div>
      <BarChart></BarChart>
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
