import React from 'react';
import styled from 'styled-components';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Dots from './shared/components/Dots';
import PrivateRoute from './auth/components/PrivateRoute';
import Dashboard from './dashboard/Dashboard';
import Login from './auth/pages/Login/Login';
import ResetPassword from './auth/ResetPassword';
import ForgotPassword from './auth/ForgotPassword';
import ErrorPage from './shared/pages/Error';
import { fonts } from './styles/style_guide';


const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1280px;
  overflow-x: hidden;
  background: transparent;
  font-family: ${fonts.family.default};
`;

const ProtectedRoutes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
  </Switch>
);

const App = () => (
  <Dots>
    <AppContainer>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/error/:code" component={ErrorPage} />
          <PrivateRoute path="/*" component={ProtectedRoutes} />
        </Switch>
      </BrowserRouter>
    </AppContainer>
  </Dots>
);

export default App;
