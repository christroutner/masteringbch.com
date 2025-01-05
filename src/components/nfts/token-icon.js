/*
  Controls the display of the token icon.
  - If there *is not* a YouTube video, then the token icon is displayed.
  - If there *is* a YouTube video, then the token icon is displayed with a play icon overlay.
    When the icon is clicked, the icon is replaced with the embedded (iframe) YouTube video.
*/

import React from 'react'
import { Image } from 'react-bootstrap'
import { BsFillPlayBtnFill } from 'react-icons/bs'

function TokenIcon(props) {

  const { token, videoIframe } = props

  const showIframe = function() {
    console.log('showIframe')
  }

  // Default icon.
  let icon = <Image 
        alt='token-icon'
        src={token.mutableData.tokenIcon}
        style={{ width: '300px', border: '1px solid black' }}
        fluid 
      />
  
  // Hover a play button over the icon if there is a YouTube video associated with the token.
  // if(videoIframe) {
  //   icon = (
  //     <div style={{ position: 'relative', display: 'inline-block' }} onClick={showIframe}>
  //       <Image 
  //         alt='token-icon'
  //         src={token.mutableData.tokenIcon}
  //         style={{ width: '300px' }}
  //         fluid 
  //       />
  //       <BsFillPlayBtnFill 
  //         style={{
  //           position: 'absolute',
  //           top: '16%',
  //           left: '50%',
  //           transform: 'translate(-50%, -50%)',
  //           fontSize: '3rem',
  //           color: 'black',
  //           cursor: 'pointer'
  //         }}
  //       />
  //     </div>
  //   )
  // }


  return (
    <div>
      {icon}
    </div>
  )
}

export default TokenIcon