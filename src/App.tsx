import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/loader/loader";
import Jokes from "./pages/listJokes";
import JokeDetails from "./pages/editJoke";
import AddJoke from "./pages/addJoke";
import Login from "./pages/loginScreen";

const App = () => {
  const token = localStorage.getItem("token");
  const loggedIn = !!token;
  return (
    <Suspense fallback={<Loader loading={false} />}>
      <Router>
        
          <Routes>
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
           <Route path="/" element={<Jokes />} />
            <Route path="/jokes/:id" element={<JokeDetails />} />
            <Route path="/addjoke/" element={<AddJoke />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </Routes>
        
      </Router>
    </Suspense>
  );
};

export default App;
