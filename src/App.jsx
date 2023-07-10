import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginScreen from "./pages/LoginScreen";
import SignUpScreen from "./pages/SignupScreen";
import HomeScreen from "./pages/HomeScreen";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./slices/userAuthSlice";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(localStorage.getItem("auth")));
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={token ? <HomeScreen /> : <LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
