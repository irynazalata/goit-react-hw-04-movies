import { Route, Redirect } from 'react-router-dom';
import { Suspense } from 'react';
import routes from './routes';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ImageLoader from './shared/Loader/Loader';

const App = () => (
  <>
    <ErrorBoundary>
      <Suspense fallback={<ImageLoader />}>
        {routes.map(route => {
          return <Route key={route.label} {...route} />;
        })}
        <Redirect to="/" />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default App;
