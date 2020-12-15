import React, { useRef, useState, useEffect } from 'react';
import BarChart from './BarChart/index'
import { useDatabase, SuspenseWithPerf } from 'reactfire';
import 'firebase/database'


const Dashboard = (props) => {

  const container = useRef(null)
  const testRef = useDatabase()

  const [data, setData] = useState([])

  useEffect(() => {
    let tmp = []
    testRef.ref('Crimes/').once('value').then(snapshot => {
      tmp.push(snapshot.id)
    }).then(() => {
      setData(tmp)
    })
  })

  
  // const {status, data} = useFirestoreDocData(testRef)
  

  // if (status === 'loading') {
    // return <h1>Hello!!</h1>
  // }



  

  return (
    <SuspenseWithPerf fallback={'loading burrito status...'} traceId={'load-burrito-status'}>
      <div id="vis-container" ref={container}></div>
      <BarChart></BarChart>
      {JSON.stringify(Object.keys(testRef))}
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
