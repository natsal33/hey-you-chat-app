import React from "react";
import AuthProvider from "./Provider/AuthProvider.js";
import Routes from "./Routes/Index";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
