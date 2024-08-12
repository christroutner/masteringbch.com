/*
  Generates a visual card to display information about an individual NFT.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

function TokenCard (props) {
  console.log('props: ', props)
  const { links } = props.token

  const LinkList = makeLinkList(links)
  // console.log('LinkList: ', LinkList)

  return (
    <>
      <Col xs={12} sm={6} lg={4} style={{ padding: '25px' }}>
        <Card>
          <Card.Body style={{ textAlign: 'center' }}>
            {
              links.youtubeEmbed
                ? (
                  <iframe
                    width='800'
                    src='https://www.youtube.com/embed/RFPIjuypjh4'
                    title={props.token.name}
                    frameborder='0'
                    allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerpolicy='strict-origin-when-cross-origin' allowfullscreen
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
