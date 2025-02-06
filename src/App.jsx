import Header from "./components/Header.jsx";
import {LanguageProvider} from "translate-easy";
import "./App.css";
import Footer from "./components/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Matches from "./pages/Matches.jsx";

function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-1">
          <div className="">
            <div className="hidden xl:block absolute top-16 rounded-md left-0">
            </div>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/Articles" element={<Articles/>}/>
              <Route path="/matches" element={<Matches/>}/>
              <Route path="/aboutUs" element={<AboutUs/>}/>
            </Routes>
          </div>
        </div>
        <Footer/>
      </div>
    </LanguageProvider>
  );
}

export default App;
