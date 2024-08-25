
// Global npm libraries
import React, { useState, useEffect } from "react";

// Local libraries


const VideoIframe = (props) => {
  const { videoId, autoPlay, title } = props;
  const videoURL = `https://www.youtube.com/embed/${videoId}${
    autoPlay ? "?autoplay=1" : ""
  }`;
  // const iframeRef = useRef(null);
  const defaultHeight = 495;
  // const [videoHeight, setVideoHeight] = useState(defaultHeight)
  let videoHeight = defaultHeight

  console.log('props: ', props)
  const {screenSize} = props
  // const { links } = props.token
  // const {id} = props

  // Make a list of links <li> where the video can be found on other platforms.
  // const LinkList = makeLinkList(links)

  // const handleChangeVideoWidth = useCallback(() => {
  //   const ratio =
  //     window.innerWidth > 990
  //       ? 1.0
  //       : window.innerWidth > 522
  //       ? 1.2
  //       : window.innerWidth > 400
  //       ? 1.45
  //       : 1.85;
  //   const height = iframeRef.current
  //     ? iframeRef.current.offsetWidth * 0.5625
  //     : defaultHeight;
  //   return setVideoHeight(Math.floor(height * ratio));
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", handleChangeVideoWidth);
  //   const ratio =
  //     window.innerWidth > 990
  //       ? 1.0
  //       : window.innerWidth > 522
  //       ? 1.2
  //       : window.innerWidth > 400
  //       ? 1.45
  //       : 1.85;
  //   const height = iframeRef.current
  //     ? iframeRef.current.offsetWidth * 0.5625
  //     : defaultHeight;
  //   setVideoHeight(Math.floor(height * ratio));
  //   return function cleanup() {
  //     window.removeEventListener("resize", handleChangeVideoWidth);
  //   };
  // }, [videoHeight]);


  // setVideoHeight(screenSize.height * 0.5625)
  videoHeight = screenSize.height * 0.5625

  return (
    <iframe
      title={title}
      width="100%"
      height={`${videoHeight}px`}
      src={videoURL}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

// function makeLinkList (links) {
//   console.log('makeLinkList() links: ', links)
//
//   const keys = Object.keys(links)
//   const liAry = []
//   for (let i = 0; i < keys.length; i++) {
//     console.log(`key: ${keys[i]}, value: ${links[keys[i]]}`)
//     if (keys[i] === 'default') continue
//     if(keys[i] === 'youtubeEmbed') continue
//
//     if (typeof links[keys[i]] === 'string') {
//       liAry.push(
//         <li key={keys[i]}>
//           <a href={links[keys[i]]} target='_blank' rel='noreferrer'>
//             {keys[i]}
//           </a>
//         </li>
//       )
//     }
//   }
//
//   return liAry
// }

export default VideoIframe;
