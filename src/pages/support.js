/*
  The support page shows users how to access Telegram support channels.
  It also shows users how to support me, by donating cryptocurrency or by purchasing a NFT. It also explains the benefits of purchasing a NFT.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

// Local libraries
import DonationImage from './images/bch-donation-qr.jpg'

function Support (props) {
  const { wallet } = props

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Support</h1>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <h2>Getting Technical Support</h2>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <p>
              If you have technical questions about Bitcoin, Bitcoin Cash, 
              the <a href='https://cashstack.info'>Cash Stack</a>, or
              anything else covered on this site, there are two Telegram channels
              where you can get support. You'll need to download the Telegram chat
              application for your desktop or mobile device, if you do not already
              have it installed.
            </p>
            <ul>
              <li>
                <a href='https://t.me/bch_js_toolkit'>BCH-JS Toolkit</a> - This 
                is a community-support channel for JavaScript developers who are interested
                in Bitcoin Cash, SLP tokens, and using the <a href='https://cashstack.info'>Cash Stack</a>.
              </li>
              <br />
              <li>
                <a href='https://t.me/cash_stack_devs'>Pro Dev Support Channel</a> - This 
                is a Telegram channel for supporters of the content on this website. Anyone can join this channel,
                but only supporters will be able to ask to speak. This channel has access to an AI Agent
                that has been trained on all Cash Stack source code as well as several books on Bitcoin and
                Bitcoin Cash. It can answer technical questions, and help write, explain, or debug code 
                at any time of day.
              </li>
            </ul>
            
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <h2>Supporting the Site</h2>
            <p>
              The mission of this site is to increase education around Bitcoin, Tokens, privacy,
              and using technology to enforce the rights and freedoms of individuals. If you
              would like to support the efforts of this site, there are a few ways you can do so.
            </p>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <h3>Purchasing Video NFTs</h3>
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <p>
              Each video features on this site has been tokenized as an NFT.
              The token makes the video censorship-resistant, but it also
              allows you to support the creator of the video by purchasing
              the token on <a href="https://dex.fullstack.cash">an SLP DEX</a>.
            </p>
            <p>
              Purchasing an NFT also gives you direct access to 
              the <a href='https://t.me/cash_stack_devs'>Pro Dev Support Channel</a>,
              where you can ask questions, get help, and get access to the Ben, the AI Agent.
              If you are a JavaScript developer, building an application on Bitcoin Cash,
              getting access to the Ben AI Agent can provide technical support for your project.
              If you are a business owner, getting access to the Ben AI Agent can help you
              understand the technology and make decisions about how to use it.
            </p>
          </Col>
          <Col lg={5}>
            <p>YouTube video should go here, showing how to purchase video NFTs.</p>
            <Image src={DonationImage} />
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <h3>Donations</h3>
          </Col>
        </Row>
        <br />

        <Row>
          <Col style={{ textAlign: 'center' }} lg={5}>
            <Image src={DonationImage} />
          </Col>
          <Col lg={7}>
            <p>
              If you would like to make a direct donation, you can send Bitcoin Cash to the address below,
              or scan the QR code.
            </p>
            <ul>
              <li>
                bitcoincash:qrdwympyf53gmazutytu48qvk56gz0pnhvwhg6yrgh
              </li>
            </ul>
            <p>
              Donations in other cryptocurrencies are also accepted. You can find the addresses
              for each of the supported cryptocurrencies on <a href='https://cointr.ee/trout'>cointr.ee/trout</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Support
