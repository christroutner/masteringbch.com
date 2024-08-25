/*
  Generates a visual card to display information about an individual NFT,
  including the embedded YouTube iframe and links to other platforms where
  the video can be found.

  Responsive YouTube iframe take from this code snippet:
  https://codesandbox.io/p/sandbox/react-responsive-youtube-video-iframe-5boon?file=%2Fsrc%2FYoutubeIframe.tsx%3A20%2C9-20%2C31
*/

// Global npm libraries
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

function TokenCard (props) {
  const iframeRef = useRef(null)
  
  console.log('props: ', props)
  const { links } = props.token

  // Make a list of links <li> where the video can be found on other platforms.
  const LinkList = makeLinkList(links)
  // console.log('LinkList: ', LinkList)

  // State for manipulating iframe size.

  const defaultHeight = 495
  const [videoHeight, setVideoHeight] = useState(
    iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight
  )

  // This callback is executed when the screen size changes.
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

  // This hook is called anytime the screen size changes.
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
  // }, [videoHeight, handleChangeVideoWidth]);

  return (
    <>
      <Col xs={12} sm={6} lg={6} style={{ padding: '25px' }}>
        <Card>
          <Card.Body style={{ textAlign: 'center' }}>
            {
              links.youtubeEmbed
                ? (
                  <iframe
                    ref={iframeRef}
                    width='100%'
                    height={`${videoHeight}px`}
                    src='https://www.youtube.com/embed/RFPIjuypjh4'
                    title={props.token.name}
                    frameborder='0'
                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
                    referrerpolicy='strict-origin-when-cross-origin'
                    allowfullscreen
                  />
                  )
                : props.token.icon
            }
            <Card.Title style={{ textAlign: 'center' }}>
              <h4>{props.token.ticker}</h4>
            </Card.Title>

            <Container>
              <Row>
                <Col>
                  {props.token.name}
                </Col>
              </Row>
              <br />

              <br />
              <Row>
                <Col>
                  <p>View this video on the following platforms:</p>
                  <ul style={{ textAlign: 'left' }}>
                    {LinkList}
                  </ul>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

function makeLinkList (links) {
  console.log('makeLinkList() links: ', links)

  const keys = Object.keys(links)
  const liAry = []
  for (let i = 0; i < keys.length; i++) {
    console.log(`key: ${keys[i]}, value: ${links[keys[i]]}`)
    if (keys[i] === 'default') continue
    if(keys[i] === 'youtubeEmbed') continue

    if (typeof links[keys[i]] === 'string') {
      liAry.push(
        <li key={keys[i]}>
          <a href={links[keys[i]]} target='_blank' rel='noreferrer'>
            {keys[i]}
          </a>
        </li>
      )
    }
  }

  return liAry
}

export default TokenCard
