import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Music from './component/Music';
import Menu from './component/Menu';
import Pnf from './component/Pnf';
import Tracks from './component/Tracks';

function App() {
  return (
   <BrowserRouter>

   <Menu/>

   {/* route path and component */}
      <Routes>
        <Route path={`/`} element={<Music/>} />
        <Route path={`/music`} element={<Music/>} />
        <Route path={`/tracks/artist/:id`} element={<Tracks/>} />
        <Route path={`/*`} element={<Pnf/>} />
      </Routes>

   </BrowserRouter>
  );
}

export default App;
