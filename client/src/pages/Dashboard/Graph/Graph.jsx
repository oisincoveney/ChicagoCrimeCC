import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Graph.styles';

const Graph = ({func, tag}) => {
  useEffect(() => {
    func(tag)
  }, [])
  return <div className="GraphWrapper" id={`#${tag}`}>
    Test content
  </div>
};

Graph.propTypes = {
  // bla: PropTypes.string,
};

Graph.defaultProps = {
  // bla: 'test',
};

export default Graph;
