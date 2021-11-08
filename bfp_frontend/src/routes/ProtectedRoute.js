
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from './Loader';
import routes from './routes'; // Route list
// import Loader from 'sharedComponent/Loader';

const ProtectedRoutes = () => (
  <Switch>
    <Suspense
      fallback={<Loader />}
    >
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Suspense> 
  </Switch>
);

export default ProtectedRoutes;