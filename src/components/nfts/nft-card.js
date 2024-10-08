/*
  Generates a visual card to display information about an individual NFT,
  including the embedded YouTube iframe and links to other platforms where
  the video can be found.

  Responsive YouTube iframe take from this code snippet:
  https://codesandbox.io/p/sandbox/react-responsive-youtube-video-iframe-5boon?file=%2Fsrc%2FYoutubeIframe.tsx%3A20%2C9-20%2C31
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

function TokenCard (props) {
  console.log('props: ', props)
  const { screenSize, token } = props
  const { links, tokenId, mutableData } = token

  // Make a list of links <li> where the video can be found on other platforms.
  const LinkList = makeLinkList(links, tokenId)
  // console.log('LinkList: ', LinkList)

  const videoHeight = screenSize.height * 0.5625

  return (

    <Col xs={12} sm={12} lg={6} style={{ padding: '25px' }} key={`card-${token.tokenId}`}>
      <Card>
        <Card.Body style={{ textAlign: 'center' }}>
          {
              links.youtubeEmbed
                ? (
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
                : props.token.icon
            }
          <Card.Title style={{ textAlign: 'center' }}>
            <h4>{props.token.ticker}</h4>
          </Card.Title>

          <Container>
            <Row>
              <Col>
                <h6>{props.token.name}</h6>
              </Col>
            </Row>
            <br />

            <Row>
              <Col>
                {mutableData.about}
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

  )
}

function makeLinkList (links, tokenId) {
  // console.log('makeLinkList() links: ', links)

  const keys = Object.keys(links)
  const liAry = []
  for (let i = 0; i < keys.length; i++) {
    // console.log(`key: ${keys[i]}, value: ${links[keys[i]]}`)

    // Omit these keys.
    if (keys[i] === 'default') continue
    if (keys[i] === 'youtubeEmbed') continue

    if (typeof links[keys[i]] === 'string') {
      // console.log(`key: ${keys[i]}-${tokenId}`)

      let listItem
      if (keys[i] === 'lbry') {
        listItem = (
          <li key={`${keys[i]}-${tokenId}`}>
            <a href={links[keys[i]]} target='_blank' rel='noreferrer'>
              LBRY
            </a>
          </li>
        )
      } else if (keys[i] === 'psffpp') {
        listItem = (
          <li key={`${keys[i]}-${tokenId}`}>
            <a href={links[keys[i]]} target='_blank' rel='noreferrer'>
              PSFFPP (IPFS)
            </a>
          </li>
        )
      } else {
        listItem = (
          <li key={`${keys[i]}-${tokenId}`}>
            <a href={links[keys[i]]} target='_blank' rel='noreferrer'>
              {keys[i]}
            </a>
          </li>
        )
      }

      liAry.push(listItem)
    }
  }

  return liAry
}

export default TokenCard
