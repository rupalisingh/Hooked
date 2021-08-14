import './App.css';
import MainPage from './Components/MainPage';
import Feed from './Components/Feed';
import AuthProvider from './Context/AuthProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';
import SetProfile from './Components/SetProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path = '/UsersFeed' component = {Feed}/>
          <Route path = '/Login' component = {MainPage}/>
          <Route path = '/SetProfile' component = {SetProfile}/>
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
