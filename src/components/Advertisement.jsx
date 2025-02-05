
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
      // Set ad content into container
      adContainerRef.current.innerHTML = adContent;

      // Execute all script tags within the ad container
      const scripts = adContainerRef.current.querySelectorAll("script");

      scripts.forEach((script) => {
        const existingScript = document.querySelector(
          `script[src="${script.src}"]`
        );

        // If the script is not already loaded, create and append it
        if (!existingScript) {
          const newScript = document.createElement("script");

          if (script.src) {
            newScript.src = script.src; // For external scripts
            newScript.async = true; // Ensure script loads asynchronously
            newScript.defer = true; // Ensure script executes after DOM is parsed
          } else {
            // For inline scripts, just copy the inner content
            newScript.text = script.innerText || script.textContent;
          }

          // Add error handling for script load
        //   newScript.onload = () => {
        //     console.log(`Script loaded successfully: ${newScript.src}`);
        //   };

        //   newScript.onerror = (error) => {
        //     console.error(`Error loading script: ${newScript.src}`, error);
        //   };

          // Catch any issues with the script execution
          try {
            adContainerRef.current.appendChild(newScript);
          } catch (error) {
            // console.error("Error appending script:", error);
          }
        }
      });

    //   console.log(adData);
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
