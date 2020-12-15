import './App.css';
import { Link, Router } from '@reach/router';
import Dashboard from './pages/Dashboard/Dashboard';
import Map from './pages/Map/Map';
import {SuspenseWithPerf} from 'reactfire'
import 'firebase/firestore';


const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          fontWeight: isCurrent ? 'bold' : 'normal',
          borderBottom: isCurrent ? '1px solid black' : 'none'
        }
      };
    }}
  />
);


const App = () => {

return (<div>
        <Dashboard path='/' />
</div>)

  // return (
  //     <div className="container-fluid">
  //       <nav className="navbar-light bg-light">
  //         <div className="container-fluid d-flex align-items-center">
  //           <span className="navbar-brand py-2 ml-2">Chicago Crime Analysis</span>
  //           <div className="navlink-container py-2 d-flex">
  //             <li>
  //               <NavLink className="nav-link" to='/'>Dashboard</NavLink>
  //             </li>
  //             <li>
  //               <NavLink className="nav-link" to='map'>Map</NavLink>
  //             </li>
  //           </div>
  //         </div>
  //       </nav>
  //       <Router>
  //       <SuspenseWithPerf path='/'  fallback={'loading burrito status...'} traceId={'load-burrito-status'}>
  //       <Dashboard path='/' />
  //     </SuspenseWithPerf>
         
  //         <Map path='map' />
  //       </Router>
  //     </div>
  // );
}

export default App;
