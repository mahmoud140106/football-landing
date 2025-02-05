import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "./../store/slices/adsSlice";

export default function Advertisement({ adType, pageType }) {
  const dispatch = useDispatch();
  const { ads, isLoading, isError, errorMessage } = useSelector(
    (state) => state.ads
  );
  const adContainerRef = useRef(null);

  //   console.log('ads ads', ads);

  useEffect(() => {
    dispatch(fetchAds({ type: pageType }));
  }, [dispatch, pageType]);

  useEffect(() => {
    if (!ads || ads.length === 0 || !adType || !adContainerRef.current) return;

    const adData = ads[0];
    console.log("adData", adData);

    let adContent;

    switch (adType) {
      case "top":
        adContent = adData.topAd;
        break;
      case "side":
        adContent = adData.sideAd;
        break;
      case "bottom":
        adContent = adData.bottomAd;
        break;
      case "btn":
        adContent = adData.btnAd;
        break;
      default:
        return;
    }
    if (adContent && adContainerRef.current) {
      adContainerRef.current.innerHTML = adContent;

      const scripts = adContainerRef.current.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.text = script.innerText;
        document.body.appendChild(newScript);
      });
    //   console.log("📢 Ad Loaded: success", adType);
    //   console.log("📢 Ad Loaded: success", adContent);
    }
  }, [ads, adType]);

  if (isLoading) return <div>Loading Ads...</div>;
  if (isError) return <div>Error: {errorMessage}</div>;

  return (
    <div
      ref={adContainerRef}
      //   style={{ border: "2px solid red", minHeight: "50px" }}  //for debugging purposes
      className="h-full w-full flex items-center justify-center"
    >
      {/* {ads.length > 0 ? "" : null} */}
    </div>
  );
}
