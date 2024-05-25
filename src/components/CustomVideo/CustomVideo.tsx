import React, { useRef, useState } from "react";
interface Props {
  src: string;
}
function CustomVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);

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

  return (
    <div className="custom-video-container">
      <video
        ref={videoRef}
        src={src}
        className="custom-video"
        onClick={handleVideoClick}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
      />
      {isPaused && (
        <button
          className="buttonVideo play-pause-button"
          onClick={handlePlayPauseButtonClick}
        >
          <svg
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="26px"
          >
            <path
              d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export default CustomVideo;
