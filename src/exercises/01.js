// Building the toggle component

import React from 'react'
// 🐨 uncomment this import to get the switch component.
// It takes an `onClick` and an `on` prop
import {Switch} from '../switch'

class Toggle extends React.Component {
  // 🐨 this toggle component is going to need to have state for `on`
  //
  // You'll also want a method to handle when the switch is clicked
  // which will update the `on` state and call the `onToggle` prop
  // with the new `on` state.
  //
  // 💰 this.setState(newState, callback)
  //
  // The `callback` should be where you call `this.props.onToggle(this.state.on)`
  //
  // 💯 Use a state updater function for `newState` to avoid issues with batching
  state = {
    on: false,
  }
  
  // why not do this? React does not guarentee (esp with asyn mode around the corner), setState could be batched so you dont have control over what state will be when setState is processed 
  // providing an updater function allows you to be passed the current state at the state of that batching
  // toggle = () => this.setState({ on: !this.state.on })
  
  // we need previous state, use updater function
  toggle = () => this.setState(
    currentState => {
      return { on: !currentState.on }
    }, 
    () => {
      // pass a callback that calls this.props.onToggle with new on state
      this.props.onToggle(this.state.on)
    }
  )
  
  render() {
    // 🐨 here you'll want to return the switch with the `on` and `onClick` props
    return <Switch onClick={this.toggle} on={this.state.on} />
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
