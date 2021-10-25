
import React, {useState} from 'react';
import Chat from './Chat'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {

  // const [user, setUser] = useState(null);
  const [{ user },dispatch ] = useStateValue();

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className='app__body'>
                <Sidebar />
                {/* React-Router --> chat screen */}
                <Switch>
                  <Route path='/room/:roomId'>
                    <Chat />
                  </Route>
                  <Route path='/'>
                    <h1>Welcome</h1>
                  </Route>
                </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
