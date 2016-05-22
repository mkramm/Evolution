import React from 'react'
import ResourcButtonListContainer from '../containers/Resource/ResourceButtonList'
import ResearchButtonContainer from '../containers/Research/Button'

const Game = () => (
  <div>
    <ResourcButtonListContainer />
    <ResearchButtonContainer name="Use Your Brain" />
  </div>
)

export default Game;