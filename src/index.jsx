import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import game from './reducers'
import Game from './components/Game'

let store = createStore(game)

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('game')
)