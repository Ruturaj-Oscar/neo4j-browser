/*
 * This program depicts the behaviour of the edit drawer.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withBus } from 'react-suber'
import AddProperty from './AddProperty'

export class EditorInfo extends Component {
  render () {
    return (
      <div>
        <div>Editor</div>
        <AddProperty />
      </div>
    )
  }
}

export default withBus(connect()(EditorInfo))
