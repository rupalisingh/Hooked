import './App.css';
import MainPage from './Components/MainPage';
import Feed from './Components/Feed';
import AuthProvider from './Context/AuthProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';
import SetProfile from './Components/SetProfile';
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/UsersFeed' component={Feed} />
          <Route path='/' component={MainPage} exact={true} />
          <Route path='/SetProfile' component={SetProfile} />
          <PrivateRoute path='/YourProfile' component={Profile} />
          {/* <Route path = '/Header' component = {Header}/> */}
          {/* <Route path = '/Signup' component = {Signup}/> */}
          {/* <MainPage /> */}
          {/* <Hooked/> */}
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
