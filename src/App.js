import './styles/global.scss';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import AppMenu from './components/appMenu';

import HomePage from './pages/home/homePage';
import TopVideosPage from './pages/topVideos/topVideosPage';
import TopChannelsPage from './pages/topChannels/topChannelsPage';
import TotalCostPage from './pages/totalCost/totalCostPage';
import AboutPage from './pages/about/aboutPage';
import NotFoundPage from './pages/404/404Page';
import GlobalHeader from './components/globalHeader';

function App() {
  const [siteMenuOpen, setSiteMenuOpen] = React.useState(false);

  const toggleMenu = (toggleMenu) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    if (toggleMenu !== undefined) {
      setSiteMenuOpen(toggleMenu);
    } else {
      setSiteMenuOpen(!siteMenuOpen);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalHeader onMenuClick={toggleMenu(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="top-videos" element={<TopVideosPage />} />
          <Route path="top-channels" element={<TopChannelsPage />} />
          <Route path="/total-cost" element={<TotalCostPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Drawer anchor={'right'} open={siteMenuOpen} onClose={toggleMenu(false)}>
            <AppMenu toggleMenu={toggleMenu} />
        </Drawer>
      </BrowserRouter>
    </div>
  );
}

export default App;
