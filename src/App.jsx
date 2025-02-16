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
import NotificationCard from "./components/NotificationCard.jsx";
function App() {
  const dispatch = useDispatch();
  const { adsCompanies, keywords } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAdsCompanies());
    dispatch(fetchKeywords());
  }, [dispatch]);

  const adsContent = useMemo(() => {
    return adsCompanies?.map((ad, index) => (
      <>
        <Fragment key={index}>{parse(ad.key)}</Fragment>
      </>
    ));
  }, [adsCompanies]);

  const parseMeta = (metaString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = metaString;
    const meta = tempDiv.firstChild;

    if (!meta || meta.tagName !== "META") return {};

    return Object.fromEntries(
      [...meta.attributes].map((attr) => [attr.name, attr.value])
    );
  };

  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const notificationDismissed = localStorage.getItem("notificationDismissed");
    // console.log("Notification Dismissed:", notificationDismissed);
    // console.log("Notification Permission:", Notification.permission);

    if (
      notificationDismissed === "true" &&
      Notification.permission === "granted"
    ) {
      setShowNotification(false);
    }
  }, []);

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem("notificationDismissed", "true");
  };

  const handleAllow = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Subscribed!", {
            body: "You will now receive notifications.",
            icon: "/bell-icon.png",
          });
          handleDismiss();
        }
      });
    }
  };
  return (
    <>
      <Helmet>
        {/* {adsCompanies?.map((ad) => (
          <Fragment key={ad._id}>{parse(ad.key)}</Fragment>
        ))} */}
        {adsCompanies?.map((ad) =>
          ad.key.includes("<script") ? (
            <Fragment key={ad._id}>{parse(ad.key)}</Fragment>
          ) : (
            <meta key={ad._id} {...parseMeta(ad.key)} />
          )
        )}
        {/* {adsContent} */}
        <meta
          name="keywords"
          content={keywords?.keywords?.map((keyword) => keyword)}
        />
      </Helmet>
      {showNotification && (
        <div className=" fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <NotificationCard onDismiss={handleDismiss} onAllow={handleAllow} />
        </div>
      )}
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
