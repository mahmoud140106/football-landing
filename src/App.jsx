import Header from "./components/Header.jsx"

import './App.css'
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ViewMatch from "./pages/ViewMatch";
import Articles from "./pages/Articles.jsx";
import AboutUs from "./pages/AboutUs.jsx"
import ContactUs from "./pages/Contactus.jsx"
import Matches from "./pages/Matches.jsx"
import Privacy from "./pages/Privacy.jsx"
import Social from "./components/Social.jsx";

function App() {

  return (

    <div>
      <Header />
      <div className="max-w-7xl mx-auto">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/viewMatches" element={<ViewMatch />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/privacy" element={<Privacy />} />

        </Routes>
      </div>
      <Footer />
    </div>

  )
}

export default App
