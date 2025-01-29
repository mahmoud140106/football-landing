import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "../store/slices/adsSlice.js";

export default function Advertisement({ adType, pageType }) {
    const dispatch = useDispatch();
    const { ads, isLoading, isError, errorMessage } = useSelector(
        (state) => state.ads
    );

    const [adContent, setAdContent] = useState(null); // حالة لتخزين محتوى الإعلان

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

        let scriptSrc;
        switch (adType) {
            case "top":
                scriptSrc = filteredAd.topAd;
                break;
            case "side":
                scriptSrc = filteredAd.sideAd;
                break;
            case "bottom":
                scriptSrc = filteredAd.bottomAd;
                break;
            default:
                return;
        }

        if (scriptSrc) {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = scriptSrc;
            script.async = true;

            script.onload = () => {
                console.log("Script loaded successfully:", scriptSrc);
                setAdContent("");
            };

            script.onerror = (error) => {
                console.error("Script load error:", error, scriptSrc);
                setAdContent("Error loading the ad.");
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [ads, adType, pageType]);

    if (isLoading) return <div>Loading Ads...</div>;
    if (isError) return <div>Error: {errorMessage}</div>;

    return (
        <div className="bg-transparent h-full w-full flex items-center justify-center">

            <div>{adContent ? adContent : ""}</div>
        </div>
    );
}
