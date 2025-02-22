import Header from "./components/Header.jsx";
import { LanguageProvider } from "translate-easy";
import "./App.css";
import Footer from "./components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import Articles from "./pages/Articles.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Matches from "./pages/Matches.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useMemo, useState } from "react";
import { fetchAdsCompanies, fetchKeywords } from "./store/slices/adsSlice.js";
import parse from "html-react-parser";
import { Helmet } from "react-helmet-async";
function App() {
  const dispatch = useDispatch();
  const { adsCompanies, keywords } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAdsCompanies());
    dispatch(fetchKeywords());
  }, [dispatch]);

  const parseMeta = (metaString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = metaString;
    const meta = tempDiv.firstChild;

    if (!meta || meta.tagName !== "META") return {};

    return Object.fromEntries(
      [...meta.attributes].map((attr) => [attr.name, attr.value])
    );
  };

  // console.log(adsCompanies);

  const parseScript = (scriptString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = scriptString;
    const script = tempDiv.firstChild;

    if (!script || script.tagName !== "SCRIPT")
      return { attributes: {}, content: "" };

    return {
      attributes: Object.fromEntries(
        [...script.attributes].map((attr) => [attr.name, attr.value])
      ),
      content: script.textContent,
    };
  };



  return (
    <>
      <Helmet>
        {adsCompanies?.map((ad) => {
          if (ad.key.includes("<script")) {
            const { attributes, content } = parseScript(ad.key);

            return attributes.src ? (
              <script key={ad._id} {...attributes} />
            ) : (
              <script
                key={ad._id}
                {...attributes}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          } else {
            return <meta key={ad._id} {...parseMeta(ad.key)} />;
          }
        })}

        <meta
          name="keywords"
          content={keywords?.keywords?.map((keyword) => keyword)}
        />
      </Helmet>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <div className="">
              <div className="hidden xl:block absolute top-16 rounded-md left-0"></div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Articles" element={<Articles />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/aboutUs" element={<AboutUs />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </LanguageProvider>
    </>
  );
}

export default App;
