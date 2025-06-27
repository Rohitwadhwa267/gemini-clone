import React from "react";
import Sidebar from "./componenets/sidebar/Sidebar";
import Main from "./componenets/main/Main";
import ErrorBoundry from "./componenets/ErrorBoundry";

const App = () => {
  return (
    <>
      <ErrorBoundry>
        <Sidebar />
      </ErrorBoundry>
      <Main />
    </>
  );
};

export default App;
