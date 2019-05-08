/*
 * This program depicts the behaviour of the edit drawer.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddProperty from './AddProperty'
import * as textEditorActions from 'shared/modules/itemEditor/TexteditorUI'
import * as itemEditorActions from 'shared/modules/itemEditor/itemEditorDuck'

export class EditorInfo extends Component {
  render () {
    return this.props.addPropVisibility ? (
      <div>
        <AddProperty
          SelectedType={this.props.SelectedType}
          setAddPropVisibility={this.props.setAddPropVisibility}
          saveNewProperty={this.props.saveNewProperty}
        />
      </div>
    ) : (
      <div onClick={this.props.setAddPropVisibility}>Add Property</div>
    )
  }
}
const mapStateToProps = state => {
  return {
    addPropVisibility: state.TextEditorUI.addPropVisibility,
    SelectedType: state.itemEditor.selectedItem._fields[0].labels
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAddPropVisibility: () => {
      dispatch(textEditorActions.setAddPropVisibility())
    },
    saveNewProperty: (id, value) => {
      dispatch(itemEditorActions.saveNewProperty(id, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorInfo)
