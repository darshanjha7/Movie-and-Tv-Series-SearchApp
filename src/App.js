
import './App.css';
import { Container } from '@mui/system';
import Header from './components/Header';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import SimpleBottomNavigation from './components/MainNav';
import Trending from './components/Pages/Trending/Trending';
import Movies from './components/Pages/Movies/Movies';
import Search from './components/Pages/Search/Search';
import Series from './components/Pages/Series/Series';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <div className="App">
   
      <Container>
        <Routes>
          <Route path="/" element={<Trending/>}/>
          <Route path="/Movie-and-Tv-Series-SearchApp/movies" element={<Movies/>}/>
          <Route path="/Movie-and-Tv-Series-SearchApp/series" element={<Series/>}/>
          <Route path="/Movie-and-Tv-Series-SearchApp/search" element={<Search/>}/>

        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
