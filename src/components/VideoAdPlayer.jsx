import React, {useEffect, useRef} from "react";

const VideoAdPlayer = () => {
  const videoRef = useRef(null);
  const adContainerRef = useRef(null);
  const adDisplayContainerRef = useRef(null);
  let adsLoader;
  let adsManager;

  useEffect(() => {
    const loadIMA = () => {
      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;
      script.onload = initAd;
      document.body.appendChild(script);
    };

    const initAd = () => {
      const videoElement = videoRef.current;
      const adContainer = adContainerRef.current;
      const adDisplayContainer = new window.google.ima.AdDisplayContainer(adContainer, videoElement);
      adDisplayContainerRef.current = adDisplayContainer;

      adsLoader = new window.google.ima.AdsLoader(adDisplayContainer);
      adsLoader.addEventListener(
        window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false
      );

      const adsRequest = new window.google.ima.AdsRequest();
      adsRequest.adTagUrl = "https://bid.onclckstr.com/vast?spot_id=6058970";
      adsRequest.linearAdSlotWidth = videoElement.clientWidth;
      adsRequest.linearAdSlotHeight = videoElement.clientHeight;

      adsLoader.requestAds(adsRequest);
    };

    const onAdsManagerLoaded = (event) => {
      const adsRenderingSettings = new window.google.ima.AdsRenderingSettings();
      adsManager = event.getAdsManager(videoRef.current, adsRenderingSettings);

      adsManager.addEventListener(window.google.ima.AdErrorEvent.Type.AD_ERROR, () => {
        console.log("Ad error, playing content...");
        videoRef.current.play();
      });

      adsManager.init(videoRef.current.clientWidth, videoRef.current.clientHeight, window.google.ima.ViewMode.NORMAL);
      adsManager.start();
    };

    loadIMA();
  }, []);

  return (
    <div className="bg-red-500">
      <div ref={adContainerRef} style={{width: "100%", height: "100%"}}></div>
      <video ref={videoRef} width="640" height="360" controls></video>
    </div>
  );
};

export default VideoAdPlayer;
