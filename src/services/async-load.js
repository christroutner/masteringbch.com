/*
  This library gets data that requires an async wait.
*/

// Global npm libraries
import axios from 'axios'

// Local libraries
import GistServers from './gist-servers'

class AsyncLoad {
  constructor () {
    this.BchWallet = false
  }

  // Load the minimal-slp-wallet which comes in as a <script> file and is
  // attached to the global 'window' object.
  async loadWalletLib () {
    do {
      // console.log('window.SlpWallet: ', window.SlpWallet)
      if (typeof window !== 'undefined' && window.SlpWallet) {
        this.BchWallet = window.SlpWallet

        return this.BchWallet
      } else {
        console.log('Waiting for wallet library to load...')
      }

      await sleep(1000)
    } while (!this.BchWallet)
  }

  // Initialize the BCH wallet
  async initWallet (restURL) {
    const options = {
      interface: 'consumer-api',
      restURL,
      noUpdate: true
    }

    const wallet = new this.BchWallet(null, options)

    await wallet.walletInfoPromise
    // console.log(`mnemonic: ${wallet.walletInfo.mnemonic}`)

    this.wallet = wallet

    return wallet
  }

  // Get token data for a given Token ID
  async getTokenData (tokenId) {
    const tokenData = await this.wallet.getTokenData(tokenId)
    // console.log('getTokenData() tokenData: ', tokenData)

    // Convert the IPFS CIDs into actual data.
    if (tokenData.immutableData) { tokenData.immutableData = await this.getIpfsData(tokenData.immutableData) }

    if (tokenData.mutableData) { tokenData.mutableData = await this.getIpfsData(tokenData.mutableData) }

    return tokenData
  }

  // Get data about a Group token
  async getGroupData (tokenId) {
    const tokenData = await this.getTokenData(tokenId)

    const groupData = {
      immutableData: tokenData.immutableData,
      mutableData: tokenData.mutableData,
      nfts: tokenData.genesisData.nfts,
      tokenId: tokenData.genesisData.tokenId
    }

    return groupData
  }

  // Given an IPFS URI, this will download and parse the JSON data.
  async getIpfsData (ipfsUri) {
    let cid = ipfsUri
    if (ipfsUri.includes('ipfs://')) {
      cid = ipfsUri.slice(7)
    }

    // const downloadUrl = `https://${cid}.ipfs.dweb.link/data.json`
    let downloadUrl = `https://pin.fullstack.cash/ipfs/download/${cid}`
    downloadUrl = `https://free-bch.fullstack.cash/ipfs/view/${cid}`
    console.log('downloadUrl: ', downloadUrl)

    const response = await axios.get(downloadUrl)
    const data = response.data

    return data
  }

  // Get a list of alternative back end servers.
  async getServers () {
    // Try to get the list from GitHub
    try {
      const gistLib = new GistServers()
      const gistServers = await gistLib.getServerList()

      const serversAry = []

      for (let i = 0; i < gistServers.length; i++) {
        serversAry.push({ value: gistServers[i].url, label: gistServers[i].url })
      }

      return serversAry
    } catch (err) {
      console.error('Error trying to retrieve list of servers from GitHub: ', err)
      console.log('Returning hard-coded list of servers.')

      const defaultOptions = [
        { value: 'https://free-bch.fullstack.cash', label: 'https://free-bch.fullstack.cash' },
        { value: 'https://bc01-ca-bch-consumer.fullstackcash.nl', label: 'https://bc01-ca-bch-consumer.fullstackcash.nl' },
        { value: 'https://pdx01-usa-bch-consumer.fullstackcash.nl', label: 'https://pdx01-usa-bch-consumer.fullstackcash.nl' },
        { value: 'https://wa-usa-bch-consumer.fullstackcash.nl', label: 'https://wa-usa-bch-consumer.fullstackcash.nl' }
      ]

      return defaultOptions
    }
  }

  // Get info on the NFT for this site.
  async getNftInfo () {
    try {
      const groupTokenId = '22f8475fd82a4163a64cdb0d868534d016964b3acc8a6f0e6572f3c373d01866'

      const groupTokenData = await this.getTokenData(groupTokenId)
      console.log(`Data for Group token ${groupTokenId}: ${JSON.stringify(groupTokenData, null, 2)}`)

      const nfts = groupTokenData.genesisData.nfts

      return nfts
    } catch (err) {
      console.error('Error in getNftInfo(): ', err)
      throw err
    }
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default AsyncLoad
