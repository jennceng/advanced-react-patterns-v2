// render props

import React from 'react'
import {Switch} from '../switch'

// because we don't use instance (doesn't use this) you can take it off the class, we can make it a static property, or even just move it out of the class altogether

// here we've upgraded renderSwitch to be a pure component, passing in the args as needed in the render and now renderSwitch also doesn't rely on 'this'

const renderSwitch = ({on, toggle}) => {
  return <Switch on={on} onClick={toggle} />
}

class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )

  render() {
    const {on} = this.state
    return this.props.children({on: this.state.on, toggle: this.toggle})
  }
}

const OriginalToggle = (props) =>
  <Toggle {...props}>
    {({on, toggle}) => <Switch on={on} onClick={toggle} />}
  </Toggle>



// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <OriginalToggle onToggle={onToggle} />
    // <Toggle onToggle={onToggle}>
    //   {({on, toggle}) => (
    //     <div>
    //       {on ? 'The button is on' : 'The button is off'}
    //       <Switch on={on} onClick={toggle} />
    //       <hr />
    //       <button aria-label="custom-button" onClick={toggle}>
    //         {on ? 'on' : 'off'}
    //       </button>
    //     </div>
    //   )}
    // </Toggle>
  )
}
Usage.title = 'Render Props'

export {Toggle, Usage as default}
