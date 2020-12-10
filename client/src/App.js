import './App.css';
import { Link, Router } from '@reach/router';
import Dashboard from './pages/Dashboard/Dashboard';
import Map from './pages/Map/Map';
import 'bootstrap/dist/css/bootstrap.css';

const NavLink = props => (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        return {
          style: {
            color: isCurrent ? "red" : "blue"
          }
        };
      }}
    />
  );


const App = () => {

    
    return (
        <div className="container-fluid">
            123
            {/* <nav className="navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Chicago Crime Analysis</span>
                    <Link className="nav-link" to='/'>Dashboard</Link>
                    <Link className="nav-link" to='map'>Map</Link>
                </div>
            </nav> */}
            <Router>
                <Dashboard path='/'/>
                <Map path='map' />
            </Router>
        </div>        
    );
}

export default App;
