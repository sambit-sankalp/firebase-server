import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import ProjectList from "./Project/ProjectList";
import AddProject from "./Project/AddProject";
import SignIn from "./AuthScreens/SignIn";
import SignUp from "./AuthScreens/SignUp";

const Body = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={ProjectList} />
          <Route path="/addproject" exact component={AddProject} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default Body;
