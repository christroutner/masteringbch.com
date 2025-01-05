/*
  This Body component is a container for all the different Views of the app.
  Views are equivalent to 'pages' in a multi-page app. Views are hidden or
  displayed to simulate the use of pages in an SPA.
  The Body app contains all the Views and chooses which to show, based on
  the state of the Menu component.
*/

// Global npm libraries
import React, { useState } from 'react'

// Local libraries
// import GetBalance from '../balance'
// import Placeholder2 from '../placeholder2'
// import Placeholder3 from '../placeholder3'
import ServerSelectView from '../servers/select-server-view'
import ShowNfts from '../nfts'
import Support from '../../pages/support'

function AppBody (props) {
  // Dependency injection through props
  const appData = props.appData
  const menuState = props.menuState

  // State - Allows children pages to pass their state up to his parent.
  const [tokenCards, setTokenCards] = useState([])

  function updateTokenCards (tokenCards) {
    setTokenCards(tokenCards)
  }

  // Choose which view to display based on the menuState.
  function chooseView (menuState) {
    switch (menuState) {
      case 0:
        return (<ShowNfts appData={appData} updateTokenCards={updateTokenCards} tokenCards={tokenCards} />)
      case 1:
        return (<Support appData={appData} />)

      case 100:
        return (<ServerSelectView appData={appData} />)
      default:
        return (<ShowNfts appData={appData} />)
    }
  }

  return (
    <>
      {chooseView(menuState)}
    </>
  )
}

export default AppBody
