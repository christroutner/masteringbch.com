/*
  Controls the display of the token icon.
  - If there *is not* a YouTube video, then the token icon is displayed.
  - If there *is* a YouTube video, then the token icon is displayed with a play icon overlay.
    When the icon is clicked, the icon is replaced with the embedded (iframe) YouTube video.
*/

// Global imports
import React, { useState } from 'react'
import { Image } from 'react-bootstrap'
import { BsFillPlayBtnFill } from 'react-icons/bs'

function TokenIcon (props) {
  const { token, screenSize } = props
  const { links } = token

  // Switch the icon to the iframe when the icon is clicked.
  const showIframe = function () {
    console.log('showIframe called')
    setIcon(videoIframe)
  }

  // Default icon.
  let initialIcon = (
    <Image
      alt='token-icon'
      src={token.mutableData.tokenIcon}
      style={{ width: '300px', border: '1px solid black' }}
      fluid
    />
  )

  const videoHeight = screenSize.height * 0.5625

  let videoIframe = null
  if (links.youtubeEmbed) {
    videoIframe = (
      <iframe
        width='100%'
        height={`${videoHeight}px`}
        src={token.links.youtubeEmbed}
        title={token.name}
        frameBorder='0'
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
        referrerPolicy='strict-origin-when-cross-origin'
      />
    )
  }

  // Hover a play button over the icon if there is a YouTube video associated with the token.
  if (videoIframe) {
    initialIcon = (
      <div style={{ position: 'relative', display: 'inline-block' }} onClick={showIframe}>
        <Image
          alt='token-icon'
          src={token.mutableData.tokenIcon}
          style={{ width: '300px', border: '1px solid black' }}
          fluid
        />
        <BsFillPlayBtnFill
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
            color: 'red',
            cursor: 'pointer'
          }}
        />
      </div>
    )
  }

  const [icon, setIcon] = useState(initialIcon)

  return (
    <div>
      {icon}
    </div>
  )
}

export default TokenIcon
