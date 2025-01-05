import Header from "./components/Header.jsx"

import './App.css'
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";

function App() {

  return (

    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>

  )
}

export default App
