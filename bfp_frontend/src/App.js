import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Loader from 'shareComponent/Loader';
import ProtectedRoutes from './routes/ProtectedRoute'; //Authenticated routes
import PublicRoute from './routes/PublicRoute'; 
import PrivateRoute from './routes/PrivateRoute'; 
import Loader from './routes/Loader';

const LoginPage = lazy(() => import('./components/login'));
const Register = lazy(() => import('./components/register'));
const ForgotPassword = lazy(() => import('./components/forgotPassword'));
const NoFoundComponent = lazy(() => import('./components/error'));

const App = () => {

  function getToken() {
    // console.log(localStorage)
    return localStorage.getItem('token');
  }


  const isAuthenticated = getToken();

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute
            path="/login"
            isAuthenticated={isAuthenticated}
          >
            <LoginPage />
          </PublicRoute>
          <PublicRoute
            path="/register"
            isAuthenticated={isAuthenticated}
          >
            <Register />
          </PublicRoute>
          <PublicRoute
            path="/forgotPassword"
            isAuthenticated={isAuthenticated}
          >
            <ForgotPassword />
          </PublicRoute>
          <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
          >
            <ProtectedRoutes />
          </PrivateRoute>
          <Route path="*">
            <NoFoundComponent />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;