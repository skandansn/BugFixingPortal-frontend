import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import CreateProject from './components/createProjects';
import Error from './components/error';
import ForgotPassword from './components/forgotPassword';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ViewProject from './components/viewProject';

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
            <Route exact path="/createProject/:id">
              <CreateProject />
            </Route>
            <Route exact path="/projects/:id">
              <ViewProject />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
