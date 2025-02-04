import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "../store/slices/adsSlice.js";

export default function Advertisement({ adType, pageType }) {
    const dispatch = useDispatch();
    const { ads, isLoading, isError, errorMessage } = useSelector(
        (state) => state.ads
    );

    console.log('ads ads', ads);

    useEffect(() => {
        dispatch(fetchAds());
    }, [dispatch]);

    useEffect(() => {
        if (ads.length === 0) return;

        const filteredAd = ads.find((ad) => ad.type === pageType);
        if (!filteredAd) {
            console.log("No ad available for this page.");
            return;
        }

        let adContent;
        switch (adType) {
            case "top":
                adContent = filteredAd.topAd;
                break;
            case "side":
                adContent = filteredAd.sideAd;
                break;
            case "bottom":
                adContent = filteredAd.bottomAd;
                break;
            default:
                return;
        }
        const scripts = adContent.split('\n').filter(Boolean);

        scripts.forEach(scriptStr => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = scriptStr.trim();
            const scriptElement = tempDiv.querySelector("script");

            if (scriptElement && scriptElement.src && !document.querySelector(`script[src="${scriptElement.src}"]`)) {
                const newScript = document.createElement("script");
                newScript.src = scriptElement.src;
                newScript.type = "text/javascript";
                newScript.async = true;

                newScript.onload = () => console.log("✅ Ad script loaded:", newScript.src);
                newScript.onerror = (error) => console.error("❌ Error loading ad script:", error);

                document.head.appendChild(newScript);
            }
        });
        // if (adContent) {
        //     const tempDiv = document.createElement("div");
        //     tempDiv.innerHTML = adContent.trim();
        //     const scriptElement = tempDiv.querySelector("script");
        //
        //     if (scriptElement && scriptElement.src && !document.querySelector(`script[src="${scriptElement.src}"]`)) {
        //         const newScript = document.createElement("script");
        //         newScript.src = scriptElement.src;
        //         newScript.type = "text/javascript";
        //         newScript.async = true;
        //
        //         newScript.onload = () => console.log("✅ Ad script loaded:", newScript.src);
        //         newScript.onerror = (error) => console.error("❌ Error loading ad script:", error);
        //
        //         document.head.appendChild(newScript);
        //     }
        // }
    }, [ads, adType, pageType]);

    if (isLoading) return <div>Loading Ads...</div>;
    if (isError) return <div>Error: {errorMessage}</div>;

    return (
        <div className="h-full w-full flex items-center justify-center">
            {ads.length > 0 ? "" : null}
        </div>
    );
}
