import React from 'react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from 'react-testing-library';


export const renderWithHistory = ({
  route = '/',
  history = createMemoryHistory({ initialEntries: [route] }),
  ...props
} = {}) => (Comp: React.ComponentType<{ history?: MemoryHistory }>) => {
  const componentWithRouter = (
    <Router history={history}>
      <Comp history={history} {...props} />
    </Router>
  );
  return {
    ...render(componentWithRouter),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};
