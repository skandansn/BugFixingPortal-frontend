import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CreateProject from './components/createProjects';
import ForgotPassword from './components/forgotPassword';
import Home from './components/home';
import Login from './components/login';
import NavBar from './components/navbar';
import Register from './components/register';

function App() {
  return (
    <div className="App">
      <div className="content">
        <Router>
          <Switch>
            <Route exact path="/registration">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/forgotPassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/createProject">
              <CreateProject />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
