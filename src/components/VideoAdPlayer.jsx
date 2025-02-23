import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds } from "../store/slices/adsSlice";

const VideoAdPlayer = () => {
  const dispatch = useDispatch();
  const { ads } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAds({ type: "main" }));
  }, [dispatch]);

  const adContainerRef = useRef(null);
  let adsLoader;
  let adsManager;

  useEffect(() => {
    if (!ads?.length || !ads[0]?.videoAd) return;

    const videoAdUrl = ads[0].videoAd;
    // console.log("Using Video Ad URL:", videoAdUrl);

    const loadIMA = () => {
      if (!window.google?.ima) {
        const script = document.createElement("script");
        script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
        script.async = true;
        script.onload = initAd;
        document.body.appendChild(script);
      } else {
        initAd();
      }
    };

    const initAd = () => {
      const adContainer = adContainerRef.current;
      if (!adContainer) return;

      const adDisplayContainer = new window.google.ima.AdDisplayContainer(adContainer);
      adDisplayContainer.initialize(); // Important for autoplay

      adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);

      adsLoader.addEventListener(
        window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        (event) => onAdsManagerLoaded(event, adContainer, adDisplayContainer),
        false
      );

      adsLoader.addEventListener(
        window.google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError
      );

      const adsRequest = new window.google.ima.AdsRequest();
      adsRequest.adTagUrl = videoAdUrl;
      adsRequest.linearAdSlotWidth = adContainer.clientWidth;
      adsRequest.linearAdSlotHeight = adContainer.clientHeight;
      adsLoader.requestAds(adsRequest);
    };

    const onAdsManagerLoaded = (event, adContainer, adDisplayContainer) => {
      try {
        const adsRenderingSettings = new window.google.ima.AdsRenderingSettings();
        adsManager = event.getAdsManager(adsRenderingSettings);

        adsManager.addEventListener(
          window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
          () => console.log("Ad finished, resuming content")
        );

        adsManager.addEventListener(
          window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
          () => console.log("Ad playing, pausing content")
        );

        adsManager.addEventListener(
          window.google.ima.AdErrorEvent.Type.AD_ERROR,
          onAdError
        );

        adsManager.init(adContainer.clientWidth, adContainer.clientHeight, window.google.ima.ViewMode.NORMAL);
        adsManager.start();
      } catch (error) {
        // console.log("Error initializing AdsManager:", error);
      }
    };

    const onAdError = (error) => {
      // console.log("Ad error:", error);
    };

    loadIMA();
  }, [ads]);

  return <div ref={adContainerRef} className="relative w-full h-[15rem]"></div>;
};

export default VideoAdPlayer;
