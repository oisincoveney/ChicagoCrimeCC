import React, { useRef, useState, useEffect } from 'react';
import BarChart from './BarChart/index'
import { useDatabase, SuspenseWithPerf } from 'reactfire';
import 'firebase/database'


const Dashboard = (props) => {

  const container = useRef(null)
  const testRef = useDatabase()

  const [data, setData] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      await testRef.ref('Crimes/').orderByKey().limitToFirst(10).once('value').then(snapshot => {
        setData(snapshot.exportVal())
      })
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SuspenseWithPerf fallback={'loading burrito status...'} traceId={'load-burrito-status'}>
      <div id="vis-container" ref={container}></div>
      <BarChart></BarChart>
      {JSON.stringify(data)}
    </SuspenseWithPerf>
  )
};

Dashboard.propTypes = {
  // bla: PropTypes.string,
};

Dashboard.defaultProps = {
  // bla: 'test',
};

export default Dashboard;
