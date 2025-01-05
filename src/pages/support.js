/* 
  The support page shows users how to access Telegram support channels.
  It also shows users how to support me, by donating cryptocurrency or by purchasing a NFT. It also explains the benefits of purchasing a NFT.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

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
          <Col style={{ textAlign: 'center' }}>
            <p>Something here</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Support
