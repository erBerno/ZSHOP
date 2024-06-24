import { useState, useEffect } from "react";
import VideoFrame from "../../Other/VideoFrame";

export default function IntroductionTwo({ data, style }) {
  const [currentChoose, setCurrentChoose] = useState("");
  const [currentVideoImg, setCurrentVideoImg] = useState("");
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setCurrentChoose(data[0].name);
      setCurrentVideoImg(data[0].videoPoster);
      setCurrentVideoSrc(data[0].videoSrc);
    }
  }, [data]);

  return (
    <div className="introduction-two" style={style}>
      {data && data.length > 0 && (
        <>
          <VideoFrame poster={currentVideoImg} height={500} src={currentVideoSrc} />
          <div className="introduction-two__content">
            <div className="container">
              {data.map((item, index) => (
                <div
                  onMouseOver={() => {
                    setCurrentChoose(item.name);
                    setCurrentVideoImg(item.videoPoster);
                    setCurrentVideoSrc(item.videoSrc);
                  }}
                  key={index}
                  className={`introduction-two__content__item ${currentChoose === item.name ? "active" : ""}`}
                >
                  {!item.description && <span>0{index + 1}.</span>}
                  <a href={process.env.PUBLIC_URL + "#"} onClick={(e) => e.preventDefault()}>
                    {item.name}
                  </a>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}