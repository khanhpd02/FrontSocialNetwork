import React, { useRef } from "react";

interface AutoPlayAudioProps {
  audioSrc: string;
  songName: string;
}

const AutoPlayAudio: React.FC<AutoPlayAudioProps> = ({
  audioSrc,
  songName,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };
  return (
    <div>
      <h2>{songName}</h2>
      <div onClick={handleClick}>
        <audio ref={audioRef}>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AutoPlayAudio;
