/**
 * This component is used to render the textfields to accept
 * the new properties in key-value pair for node/relationship of
 * the selected item.
 */
import React, { Component } from 'react'
import { v1 as neo4j } from 'neo4j-driver'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerSection
} from 'browser-components/drawer'
import { FormButton } from 'browser-components/buttons'
import { TextInput, RadioSelector } from 'browser-components/Form'
import {
  DrawerSectionBody,
  DrawerFooter,
  DrawerSubHeader
} from 'browser-components/drawer/index'
import DatePicker from './DatePicker'
import DropDownUI from './DropDownUI'

export class AddProperty extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: '',
      propertyType: 'string',
      boolValue: false,
      typeText: '',
      typeNumber: 0,
      selectedDate: {
        year: 1950,
        month: 12,
        day: 12
      }
    }
  }

  handleSave = type => {
    switch (type) {
      case 'string':
        this.props.saveNewProperty(this.state.key, this.state.typeText)
        break
      case 'number':
        this.props.saveNewProperty(
          this.state.key,
          neo4j.int(this.state.typeNumber)
        )
        break
      case 'boolean':
        this.props.saveNewProperty(
          this.state.key,
          Boolean(this.state.boolValue)
        )
        break
      case 'date':
        this.props.saveNewProperty(this.state.key, this.state.selectedDate)
        console.log(typeof this.state.selectedDate.year)
        break
      default:
        break
    }
  }

  handlekeyChange = e => {
    this.setState({ key: e.target.value })
  }

  handleDatatypeChange = (type, value) => {
    const re = /^[0-9\b]+$/
    if (type === 'number') {
      if (value === '' || re.test(value)) {
        this.setState({ typeNumber: value, typeText: '' })
      } else alert('Please enter number')
    }
    if (type === 'string') {
      this.setState({ typeText: value, typeNumber: '' })
    }
  }

  onPropertyTypeSelect = propertyType => {
    this.setState({ propertyType })
  }

  onBooleanPropSelect = boolValue => {
    this.setState({ boolValue })
  }

  onDatePropSelect = date => {
    let newDate = new Date(date.toLocaleDateString())
    let newState = _.cloneDeep(this.state)
    ;(newState.selectedDate.year = newDate.getFullYear()),
    (newState.selectedDate.month = newDate.getMonth()),
    (newState.selectedDate.day = newDate.getDate())
  }

  render () {
    let propertyValueInput
    const options = ['true', 'false']
    switch (this.state.propertyType) {
      case 'number':
        propertyValueInput = (
          <div>
            <TextInput
              id='number'
              onChange={e => {
                this.handleDatatypeChange(e.target.id, e.target.value)
              }}
              value={this.state.typeNumber}
            />
          </div>
        )
        break
      case 'date':
        propertyValueInput = (
          <div>
            <DatePicker onDatePropSelect={this.onDatePropSelect} />
            {/* <TextInput
              disabled
              id="date"
              value={this.state.selectedDate.toString()}
            /> */}
          </div>
        )
        break
      case 'string':
        propertyValueInput = (
          <div>
            <TextInput
              id='string'
              onChange={e => {
                this.handleDatatypeChange(e.target.id, e.target.value)
              }}
              value={this.state.typeText}
            />
          </div>
        )
        break
      case 'boolean':
        propertyValueInput = (
          <div>
            <RadioSelector
              options={options}
              onChange={e => {
                this.onBooleanPropSelect(e.target.value)
              }}
              selectedValue={this.state.boolValue}
            />
          </div>
        )
        break
      default:
        propertyValueInput = (
          <div>
            <TextInput id='string' />
          </div>
        )
    }

    return (
      <Drawer id='db-AddProperty'>
        <DrawerHeader>Add Property : {this.props.SelectedType}</DrawerHeader>
        <DrawerBody>
          <DrawerSection>
            <DrawerSubHeader>Key : </DrawerSubHeader>
            <DrawerSectionBody>
              <TextInput id='key' onChange={this.handlekeyChange} />
            </DrawerSectionBody>
          </DrawerSection>
          <DrawerSection>
            <DrawerSubHeader>Datatype : </DrawerSubHeader>
            <DrawerSectionBody>
              <DropDownUI
                value={this.state.propertyType}
                onSelect={this.onPropertyTypeSelect}
              />
            </DrawerSectionBody>
          </DrawerSection>
          <DrawerSection>
            <DrawerSubHeader>Value : </DrawerSubHeader>
            <DrawerSectionBody>{propertyValueInput}</DrawerSectionBody>
          </DrawerSection>
          <hr />
          <DrawerSection
            style={{
              display: 'flex',
              justifyContent: 'space-evenly'
            }}
          >
            <FormButton
              onClick={() => {
                this.handleSave(this.state.propertyType)
                this.props.setAddPropVisibility()
              }}
            >
              Save
            </FormButton>
            <FormButton onClick={this.props.setAddPropVisibility}>
              Cancel
            </FormButton>
          </DrawerSection>
          <DrawerFooter />
        </DrawerBody>
      </Drawer>
    )
  }
}

export default AddProperty
