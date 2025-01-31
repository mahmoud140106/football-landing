import Header from "./components/Header.jsx";
import { LanguageProvider } from "translate-easy"; // استيراد مزود اللغة
import "./App.css";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import ViewMatch from "./pages/ViewMatch";
import Articles from "./pages/Articles.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/Contactus.jsx";
import Matches from "./pages/Matches.jsx";
import Privacy from "./pages/Privacy.jsx";
import Social from "./components/Social.jsx";
import ArticleDetails from "./pages/ArticleDetails.jsx";

function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <div className="max-w-[1300px] mx-auto">
            <div className="hidden xl:block absolute top-16 rounded-md left-0">
              <Social />
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/viewMatches" element={<ViewMatch />} />
              <Route path="/Articles" element={<Articles />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/articles/:_id" element={<ArticleDetails />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
