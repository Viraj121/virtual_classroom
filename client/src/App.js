import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClassPage from "./pages/ClassPage";
import LecturePage from "./pages/LecturePage";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/classes"
          element={<PrivateRoute component={ClassPage} />}
        />
        <Route
          path="/lecture/:lectureId"
          element={<PrivateRoute component={LecturePage} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
