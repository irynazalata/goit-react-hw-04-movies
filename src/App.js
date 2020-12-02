import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
import Cast from './components/Cast/Cast';
import Reviews from './components/Reviews/Reviews';
import routes from './routes';

const App = () => (
  <>
    <Switch>
      <Route path={routes.home} exact component={HomePage}></Route>
      <Route path={routes.movies} exact component={MoviesPage}></Route>
    </Switch>
    <Route path={routes.movieDetails} component={MovieDetailsPage}></Route>
    <Route path={routes.cast} component={Cast}></Route>
    <Route path={routes.reviews} exact component={Reviews}></Route>
    <Redirect to={routes.home} />
  </>
);

export default App;
