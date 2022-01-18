import React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import TopBanner from './components/TopBanner';

function App() {
  return (<>
    <div className="wrapper">
      <NavBar />
    </div>
    <TopBanner />

  </>
  );
}

export default App;
