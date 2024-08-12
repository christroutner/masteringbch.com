/*
  This is a placeholder View
*/

// Global npm libraries
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const GroupTokenId = '22f8475fd82a4163a64cdb0d868534d016964b3acc8a6f0e6572f3c373d01866'

function Placeholder2 (props) {
  const { appData } = props
  const { wallet } = appData

  useEffect(() => {
    console.log('useEffect() called. appData: ', appData)

    async function asyncEffect () {
      // Get the genesis data.
      const tokenData = await wallet.getTokenData(GroupTokenId)
      console.log('tokenData: ', tokenData)

      const nfts = tokenData.genesisData.nfts
      console.log('nfts: ', nfts)
    }
    asyncEffect()
  })

  return (
    <>
      <Container>
        <Row>
          <Col>
            <p>
              Displaying information for{' '}
              <a
                href='https://slp-token.fullstack.cash/?tokenid=22f8475fd82a4163a64cdb0d868534d016964b3acc8a6f0e6572f3c373d01866'
                target='_blank' rel='noreferrer'
              >
                Mastering Bitcoin Cash Group Token
              </a>.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Placeholder2
