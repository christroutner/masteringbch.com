/*
  This is a placeholder View
*/

// Global npm libraries
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ProgressBar, Spinner } from 'react-bootstrap'

// Local libraries
import NftCard from './nft-card.js'
import useScreenSize from '../../hooks/use-screen-size.js'

function ShowNfts (props) {
  const { appData, updateTokenCards, tokenCards } = props
  const { wallet, allNfts } = appData

  // const [nftData, setNftData] = useState([])
  // const [tokenCards, setTokenCards] = useState([])
  // const [isFirstCall, setIsFirstCall] = useState(true)
  const [showLoading, setShowLoading] = useState(true)
  const [tokenLoadingInfo, setTokenLoadingInfo] = useState(
    <>
      <p>{`Retrieved data for NFT ${0} of ${allNfts.length}`}</p>
      <ProgressBar now={0} label={`${0}%`} />
    </>
  )

  const screenSize = useScreenSize()

  useEffect(() => {
    console.log('useEffect() called. appData: ', appData)
    console.log('allNfts: ', allNfts)

    async function asyncEffect () {
      // if (isFirstCall) {
      //   setIsFirstCall(false)


      // Use existing data if available.
      if (tokenCards.length) {
        // updateTokenCards(tokenCards)
        console.log('tokenCards already exist. Returning.')
        setShowLoading(false)
        return
      }

      const tokenCardAry = []
      const allNftData = []

      for (let i = 0; i < allNfts.length; i++) {
        // for (let i = 0; i < 1; i++) {
        const thisNft = allNfts[i]
        const nftData = await wallet.getTokenData(thisNft)
        // console.log('nftData: ', nftData)

        // Get the mutable data if it exists in the token data.
        let mutableData = null
        if (nftData.mutableData) {
          mutableData = await getIpfsData(nftData.mutableData)
          // console.log('mutableData: ', mutableData)
        }

        // Get the immutable data if it exists in the token data.
        let immutableData = null
        if (nftData.immutableData) {
          immutableData = await getIpfsData(nftData.immutableData)
          // console.log('immutableData: ', immutableData)
        }

        const links = mutableData.fullSizedUrl ? mutableData.fullSizedUrl : []
        console.log('links: ', links)

        nftData.mutableDataUri = nftData.mutableData
        nftData.immutableDataUri = nftData.immutableData
        nftData.mutableData = mutableData
        nftData.immutableData = immutableData
        console.log('Updated nftData: ', nftData)

        allNftData.push(nftData)
        // setNftData(allNftData)

        const propData = {
          token: {
            ticker: nftData.genesisData.ticker,
            name: nftData.genesisData.name,
            tokenId: nftData.genesisData.tokenId,
            icon: (<img alt='token-icon' src={mutableData.tokenIcon} style={{ width: '300px' }} />),
            links,
            mutableDataUri: nftData.mutableDataUri,
            immutableDataUri: nftData.immutableDataUri,
            mutableData: nftData.mutableData,
            immutableData: nftData.immutableData
          },
          screenSize
        }

        const nftCard = NftCard(propData)

        tokenCardAry.push(nftCard)

        const now = Math.floor(((i + 1) / allNfts.length) * 100)

        setTokenLoadingInfo(
          <>
            <p>{`Retrieved data for NFT ${i + 1} of ${allNfts.length}`}</p>
            <ProgressBar now={now} label={`${now}%`} />
          </>
        )
      }
      console.log('tokenCardAry: ', tokenCardAry)
      setShowLoading(false)

      updateTokenCards(tokenCardAry)
      // }
    }

    if (Array.isArray(allNfts) && allNfts.length) {
      asyncEffect()
    } else {
      console.error('allNfts is empty. Can not load NFT data.')
    }
  }, [allNfts])

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
              >Mastering Bitcoin Cash Group Token
              </a>.
            </p>
            {
              showLoading
                ? (
                  <>
                    <span>
                      Loading NFT data... <Spinner animation='border' />
                    </span>
                    <p>
                      {tokenLoadingInfo}
                    </p>
                  </>
                  )
                : null
            }
          </Col>
        </Row>

        <Row>
          {tokenCards}
        </Row>
      </Container>
    </>
  )
}

// Retrieve IPFS data from a PSFFPP node.
async function getIpfsData (ipfsUri) {
  try {
    if (!ipfsUri.includes('ipfs://')) { return 'not available' }

    const ipfsCid = ipfsUri.slice(7)

    // const url = `https://files.tokentiger.com/ipfs/download/${ipfsCid}/data.json`
    const url = `https://pin.fullstack.cash/ipfs/download/${ipfsCid}`
    console.log('url: ', url)

    const response = await fetch(url)
    const ipfsData = await response.json()

    return ipfsData
  } catch (err) {
    return {
      message: `Could not download this CID: ${ipfsUri}`
    }
  }
}

export default ShowNfts
