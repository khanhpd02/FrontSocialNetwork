import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { ShareS } from "../../../recoil/initState";
import { useRecoilState } from "recoil";
import { IoMdClose } from "react-icons/io";
type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
    linkImage: string;
  }[];
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [, setLoadShare] = useRecoilState(ShareS);
  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }
  const hanldeWrap = (index: number) => {
    setImageIndex(index);
  };
  return (
    <section
      aria-label="Image Slider"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(158, 158, 158, 0.5)",
        width: "100%",
        height: "100%",
        zIndex: 999,
        display: "flex",
        transition: "width 0.3s ease, height 0.3s ease",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="absolute " style={{ top: 3, right: 10 }}>
        <div
          className="text-[25px] p-2 cursor-pointer hover:bg-[#4d4c4c] rounded-[50%] duration-500"
          onClick={() => setLoadShare("0")}
        >
          <IoMdClose color="white" />
        </div>
      </div>
      <div
        style={{
          width: "auto",
          height: "auto",

          maxWidth: "40vw",
          display: "flex",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={images[imageIndex]?.linkImage}
          alt="ss"
          className="img-slider-img"
        />
      </div>
      <button
        onClick={showPrevImage}
        className="img-slider-btn"
        style={{ left: 0 }}
        aria-label="View Previous Image"
      >
        <GrFormPrevious />
      </button>
      <button
        onClick={showNextImage}
        className="img-slider-btn"
        style={{ right: 0 }}
        aria-label="View Next Image"
      >
        <GrFormNext />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: ".5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: ".25rem",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            className="img-slider-dot-btn"
            aria-label={`View Image ${index + 1}`}
            onClick={() => hanldeWrap(index)}
          >
            {index === imageIndex ? (
              <div className="text-white">
                <FaRegCircleDot />
              </div>
            ) : (
              <div className="text-white">
                <FaRegCircle />
              </div>
            )}
          </button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  );
}
