import React, { useRef, useState, useEffect } from 'react';
import BarChart from './BarChart/index'
import { useDatabase, SuspenseWithPerf, database } from 'reactfire';
import 'firebase/database'
import bb, { bar, line } from 'billboard.js'
import Graph from './Graph/Graph';
import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";


const Dashboard = (props) => {

  const container = useRef(null)
  const testRef = useDatabase()

  const [data, setData] = useState(null)
  const [locData, setLocData] = useState(null)
  const [g1Data, setG1Data] = useState(null)
  const [g2Data, setG2Data] = useState(null)
  // const [g3Data, setG3Data] = useState(null)


  useEffect(() => {

    const fetchData = async () => {
      await testRef.ref('Crimes/').orderByKey().limitToFirst(100).once('value').then(snapshot => {
        setData(snapshot.exportVal())
      })
    }

    fetchData()



    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!g2Data) return

  }, [g2Data])

  useEffect(() => {
    if (!g1Data) return



  }, [g1Data])

  useEffect(() => {
    if (!locData) return
    setG2Data(Object.values(locData).reduce((a, c) => {
      if (c['Location Description'] in a) {
        a[c['Location Description']] += 1
      } else {
        a[c['Location Description']] = 1
      }
      return a
    }))

  }, [locData])

  useEffect(() => {
    if (!data) return
    let q = Object.values(data).map(async v => await testRef.ref('Location/' + v.Location).once('value').then(d => d.val()))
    Promise.all(q).then(val => setLocData(val))


    setG1Data(Object.values(data).reduce((a, c) => {
      if (c['Description'] in a) {
        a[c['Description']] += 1
      } else {
        a[c['Description']] = 1
      }
      return a
    }, {}))

  }, [data])

  const graph1 = (tag) => {
    if (!g1Data) return []

    let xv = ['Description']
    xv.push(...Object.keys(g1Data))

    let yv = ['Number of crimes']
    yv.push(...Object.values(g1Data))

    console.log([xv, yv])

    return [xv, yv]
  }

  const graph2 = (tag) => {
    let xv = ['Location Description']
    xv.push(...Object.keys(g2Data))

    let yv = ['Number of crimes']
    yv.push(...Object.values(g2Data))

    let c2 = bb.generate({
      data: {
        rows: [
          xv, yv
        ],
        type: bar(),
      },
      tooltip: {
        show: false
      },
      axis: {
        rotated: true,
        x: {

        },
        y: {
          type: "linear"
        }
      },
      bindto: tag
    })

  }

  return (
    <SuspenseWithPerf fallback={'loading burrito status...'} traceId={'load-burrito-status'}>
      <div id="vc1" ref={container}></div>
      <BillboardChart categories={graph1[0]} data={{
        columns: graph1(),
        type: "bar"}}></BillboardChart>)
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
