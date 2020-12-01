import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
import Cast from './components/Cast/Cast';
import Reviews from './components/Reviews/Reviews';
const App = () => (
  <>
    <Switch>
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/movies" exact component={MoviesPage}></Route>
    </Switch>
    <Route path="/movies/:movieId" component={MovieDetailsPage}></Route>
    <Route path="/movies/:movieId/cast" component={Cast}></Route>
    <Route path="/movies/:movieId/reviews" exact component={Reviews}></Route>
    <Redirect to="/" />
  </>
);

export default App;
