import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Index from "./components/layout/Index";
import Lyrics from "./components/tracks/Lyrics";
import Artist from "./components/tracks/Artist";
import Album from "./components/tracks/Album";
import SearchResults from "./components/tracks/SearchResults";

import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route
                exact
                path={[
                  "/lyrics/track/:id",
                  "/artist/:id/album/:id/lyrics/track/:id",
                ]}
                component={Lyrics}
              />
              <Route exact path="/artist/:id" component={Artist} />
              <Route exact path="/artist/:id/album/:id" component={Album} />
              <Route exact path="/results" component={SearchResults} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
};
export default App;
