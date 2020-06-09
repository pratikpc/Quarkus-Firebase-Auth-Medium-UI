import React from 'react';
import Landing from './components/Landing';
import { ShowIfAuth, ShowIfNoAuth } from './components/Utils/AuthCheck';
import Login from './components/Login';


const App = () => {
  return <>
      <ShowIfAuth>
        <Landing/>
      </ShowIfAuth>
      <ShowIfNoAuth>
        <Login />
      </ShowIfNoAuth>
  </>;
}

export default App;
