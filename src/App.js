import './App.css';
import './styles/global.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './pages/home/homePage';
import TopVideosPage from './pages/topVideos/topVideosPage';
import TopChannelsPage from './pages/topChannelsPage';
import AboutPage from './pages/aboutPage';
import NotFoundPage from './pages/404Page';
import GlobalHeader from './components/globalHeader';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="top-videos" element={<TopVideosPage />} />
          <Route path="top-channels" element={<TopChannelsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
