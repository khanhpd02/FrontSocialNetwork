import React, { useRef, useState, useEffect } from "react";
import { GoUnmute, GoMute } from "react-icons/go";
import { CiPause1, CiPlay1 } from "react-icons/ci";
interface Props {
  src: string;
}

function CustomVideoReels({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [, setCurrentTime] = useState(0);
  const [, setDuration] = useState(0);
  const [isSeeking] = useState(false);

  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;

      const handleTimeUpdate = () => {
        if (!isSeeking) {
          setCurrentTime(videoElement.currentTime);
        }
        setDuration(videoElement.duration);
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [isSeeking]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(videoRef.current.paused);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handlePlayPauseButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    togglePlayPause();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  return (
    <div className="custom-video-container">
      <video
        ref={videoRef}
        src={src}
        className="custom-video relative"
        onClick={handleVideoClick}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      />
      {isPaused == true ? (
        <button
          className="bg-[#676767] p-4 rounded-[50%] absolute top-4 left-4 opacity-60"
          onClick={handlePlayPauseButtonClick}
        >
          <CiPlay1 />
        </button>
      ) : (
        <button
          className="bg-[#676767] p-4 rounded-[50%] absolute top-4 left-4 opacity-60"
          onClick={handlePlayPauseButtonClick}
        >
          <CiPause1 />
        </button>
      )}
      <button
        onClick={toggleMute}
        className="bg-[#676767] p-4 rounded-[50%] absolute top-4 left-20 opacity-60"
      >
        {isMuted ? (
          <GoMute style={{ color: "black" }} />
        ) : (
          <GoUnmute style={{ color: "black" }} />
        )}
      </button>
      <div className="video-controls">
        {/* <span>{formatTime(currentTime)}</span> */}
        {/* <input
          type="range"
          className="w-full h-1 bg-white slider"
          min={0}
          max={duration}
          step={1}
          value={currentTime}
          onChange={handleSliderChange}
          onMouseDown={handleSliderMouseDown}
          onMouseUp={handleSliderMouseUp}
        /> */}
        {/* <span>{formatTime(duration)}</span> */}
        {/* <div className="playback-rates">
          <button onClick={() => handlePlaybackRateChange(0.5)}>0.5x</button>
          <button onClick={() => handlePlaybackRateChange(1)}>1x</button>
          <button onClick={() => handlePlaybackRateChange(1.5)}>1.5x</button>
          <button onClick={() => handlePlaybackRateChange(2)}>2x</button>
        </div> */}
      </div>
    </div>
  );
}

export default CustomVideoReels;
