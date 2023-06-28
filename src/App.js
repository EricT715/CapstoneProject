import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from "./pages/game/game";
// import HighscoreBoard from "./pages/highscore/highscore";
import Start from "./pages/start/start";
import WatchLearning from "./pages/WatchLearning/WatchLearning";
import Header from "./pages/Header/Header";


function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path = "/" element = {<Start />}/>
        <Route path = "/Game" element = {<Game />} />
        {/* <Route path = "/highscoreboard" element= {<HighscoreBoard />}/> */}
        <Route path = "/WatchLearning" element = {<WatchLearning/>} />
    </Routes>
    {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
