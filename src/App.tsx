import React from 'react';
import { Backdrop } from '@material-ui/core';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Common from './Common';
import Offline from './Offline';
import { useOffline } from './OfflineHook';

function App() {
  const isOffline = useOffline({});
  return (
    <Router>
      <nav>
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/common">Common</Link>
        </li>
        <li>
          <Link to="/offline">Offline</Link>
        </li>
        </ul>
      </nav>
      <div>
        {isOffline && (
          <Backdrop open={true}>
            <CloudOffIcon fontSize="large" />
          </Backdrop>
        )}
        <Switch>
          <Route path="/common">
            <Common />
          </Route>
          <Route path="/offline">
            <Offline />
          </Route>
          <Route path="/">
            <Common />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
  
  export default App;
  