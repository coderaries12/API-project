import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateSpot";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        
        <Route exact path='/'>
         <SpotList />
        </Route>
        <Route exact path='/spots'>
         <CreateSpot />
        </Route>
        <Route exact path='/spots/:spotId'>
         <SingleSpot />
        </Route>
       
        </Switch>}
    </>
  );
}

export default App;
