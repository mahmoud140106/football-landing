import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAds} from "./../store/slices/adsSlice";

export default function Advertisement({adType, pageType}) {
  const dispatch = useDispatch();
  const {ads, isLoading, isError, errorMessage} = useSelector(
    (state) => state.ads
  );
  const adContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAds({type: pageType}));
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
      adContainerRef.current.innerHTML = adContent;

      const scripts = adContainerRef.current.querySelectorAll("script");

      scripts.forEach((script) => {
        const existingScript = document.querySelector(
          `script[src="${script.src}"]`
        );

        if (!existingScript) {
          const newScript = document.createElement("script");

          if (script.src) {
            newScript.src = script.src;
            newScript.async = true;
            newScript.defer = true;
          } else {
            newScript.text = script.innerText || script.textContent;
          }

          try {
            adContainerRef.current.appendChild(newScript);
          } catch (error) {
          }
        }
      });

    }
  }, [ads, adType]);

  if (isLoading) return <div></div>;
  if (isError) return <div>{errorMessage}</div>;

  return (
    <div ref={adContainerRef} className="h-full w-full flex items-center justify-center"></div>
  );
}
