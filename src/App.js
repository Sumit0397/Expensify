import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupLogin from "./Pages/SignUpLogin/SignupLogin";
import Home from "./Pages/Homesection/Home";
import Profile from "./Pages/Profilesection/Profile";
import RootLayout from "./Pages/RootLayout/RootLayout";
import { useContext } from "react";
import AuthContext from "./Context/auth-context";
import "./App.css";
import ThemeContext from "./Context/theme-context";
import Dashboard from "./Pages/DashboardSection/Dashboard";
import UserProfile from "./Pages/Profilesection/UserProfile";
import ForgetPassword from "./Pages/SignUpLogin/ForgetPassword";


function App() {

  const authContext = useContext(AuthContext);
  const themeCtx = useContext(ThemeContext);

  console.log(authContext.isLoggedIn);

  return (
    <div className="App" id={themeCtx.theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            authContext.isLoggedIn ? (
              <Navigate to="/home/welcome" />
            ) : (
              <SignupLogin />
            )
          } />
          <Route path="/home" element={<RootLayout />}>
            <Route path="/home/welcome" element={<Home />} />
            <Route path="/home/profile" element={<Profile />} />
            <Route path="/home/userprofile" element={<UserProfile/>}/>
            <Route path="/home/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
