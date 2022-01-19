import React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import TopBanner from './components/TopBanner';

function App() {
  return (<>
    <div className="wrapper">
      <NavBar />
    </div>
    <div className="banner-wrapper">
      <TopBanner />

    </div>

  </>
  );
}

export default App;
