import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Landing from "./pages/landing";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Home from "./pages/home";
import Search from "./pages/search";
import ForgotPass from "./pages/forgotPass";
import axios from "axios";
import SendEmail from "./pages/forgotPass/sendEmail";
import ChangePass from "./pages/forgotPass/changePass";
import Setting from "./pages/setting";
import ArtistProfile from "./pages/search/artistInfo";
import ViewCommissionDetail from "./pages/view-commission-details";
import ManageArtist from "./pages/manageArtist";
import CreateCommissionDetail from "./pages/create-commission-details";

axios.defaults.baseURL = process.env.REACT_APP_HOST;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/view-commission-details"
            element={<ViewCommissionDetail />}
          />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:userid" element={<ArtistProfile />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/forgotPass" element={<ForgotPass />} />
          <Route path="/forgotPass/sendEmail" element={<SendEmail />} />
          <Route path="/forgotPass/:userid" element={<ChangePass />} />
          <Route path="/manage-artist" element={<ManageArtist />} />
          <Route
            path="/create-commission-details/:userid"
            element={<CreateCommissionDetail />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
