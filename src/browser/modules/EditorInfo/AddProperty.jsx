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
      values: {
        validFlag: false,
        boolValue: false,
        typeText: '',
        typeNumber: '',
        selectedDate: {
          year: 1950,
          month: 12,
          day: 12
        },
        spacial: {
          latitude: '',
          longitude: ''
        }
      }
    }
  }

  getInitState = () => {
    let values = {
      validFlag: false,
      boolValue: false,
      typeText: '',
      typeNumber: '',
      selectedDate: {
        year: 1950,
        month: 12,
        day: 12
      },
      spacial: {
        latitude: '',
        longitude: ''
      }
    }
    return values
  }

  handleSave = type => {
    switch (type) {
      case 'string':
        this.props.saveNewProperty(this.state.key, this.state.values.typeText)
        break
      case 'number':
        this.props.saveNewProperty(
          this.state.key,
          neo4j.int(this.state.values.typeNumber)
        )
        break
      case 'spacial':
        let spacialObj = _.cloneDeep(this.state.values.spacial)
        spacialObj.longitude = parseFloat(spacialObj.longitude)
        spacialObj.latitude = parseFloat(spacialObj.latitude)
        this.props.saveNewProperty(this.state.key, spacialObj)
        break
      case 'boolean':
        this.props.saveNewProperty(
          this.state.key,
          Boolean(this.state.boolValue)
        )
        break
      case 'date':
        let convertedDate = _.cloneDeep(this.state.values.selectedDate)
        convertedDate.year = neo4j.int(convertedDate.year)
        convertedDate.month = neo4j.int(convertedDate.month)
        convertedDate.day = neo4j.int(convertedDate.day)
        this.props.saveNewProperty(this.state.key, convertedDate)
        break
      default:
        break
    }
  }

  handlekeyChange = e => {
    this.setState({ key: e.target.value })
  }

  handleSpacialChange = (id, value) => {
    const re = /^[0-9\b.]+$/
    if (value === '' || re.test(value)) {
      let values = Object.assign({}, this.state.values)
      values.spacial[id] = value
      values.validFlag = true
      this.setState({ values })
    } else alert('please enter number')
  }

  onDatePropSelect = date => {
    let newDate = new Date(date)
    let values = Object.assign({}, this.state.values)
    values.selectedDate.year = newDate.getUTCFullYear()
    values.selectedDate.month = 1 + newDate.getUTCMonth()
    values.selectedDate.day = newDate.getUTCDate()
    values.validFlag = true
    this.setState({ values })
  }

  handleDatatypeChange = (type, value) => {
    const re = /^[0-9\b]+$/
    let values = Object.assign({}, this.state.values)
    if (type === 'number') {
      if (value === '' || re.test(value)) {
        values.typeNumber = value
        values.validFlag = true
        this.setState({ values })
      } else {
        alert('Please enter number')
      }
    }
    if (type === 'string') {
      let values = Object.assign({}, this.state.values)
      values.typeText = value
      values.validFlag = true
      this.setState({ values })
    }
  }

  onPropertyTypeSelect = propertyType => {
    let values = _.cloneDeep(this.state.values)
    values = this.getInitState()
    this.setState({ values, propertyType })
  }

  onBooleanPropSelect = bool => {
    let values = Object.assign({}, this.state.values)
    values.boolValue = bool
    values.validFlag = true
    this.setState({ values })
  }

  render () {
    let propertyValueInput = null
    const options = ['true', 'false']
    switch (this.state.propertyType) {
      case 'number':
        propertyValueInput = (
          <DrawerSection>
            <TextInput
              id='number'
              onChange={e => {
                this.handleDatatypeChange(e.target.id, e.target.value)
              }}
              value={this.state.values.typeNumber}
            />
          </DrawerSection>
        )
        break
      case 'date':
        propertyValueInput = (
          <DrawerSection>
            <DatePicker onDatePropSelect={this.onDatePropSelect} />
            {/* <TextInput
              disabled
              id="date"
              value={this.state.selectedDate.toString()}
            /> */}
          </DrawerSection>
        )
        break
      case 'string':
        propertyValueInput = (
          <DrawerSection>
            <TextInput
              id='string'
              onChange={e => {
                this.handleDatatypeChange(e.target.id, e.target.value)
              }}
              value={this.state.values.typeText}
            />
          </DrawerSection>
        )
        break
      case 'spacial':
        propertyValueInput = (
          <DrawerSection>
            Latitude :
            <DrawerSectionBody>
              <TextInput
                id='latitude'
                onChange={e => {
                  this.handleSpacialChange(e.target.id, e.target.value)
                }}
                value={this.state.values.spacial.latitude}
              />
            </DrawerSectionBody>
            <DrawerSection />
            Longitude :
            <DrawerSectionBody>
              <TextInput
                id='longitude'
                onChange={e => {
                  this.handleSpacialChange(e.target.id, e.target.value)
                }}
                value={this.state.values.spacial.longitude}
              />
            </DrawerSectionBody>
          </DrawerSection>
        )
        break
      case 'boolean':
        propertyValueInput = (
          <DrawerSection>
            <RadioSelector
              options={options}
              onChange={e => {
                this.onBooleanPropSelect(e.target.value)
              }}
              selectedValue={this.state.values.boolValue}
              checked={false}
            />
          </DrawerSection>
        )
        break
      default:
        null
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
              style={
                this.state.key && this.state.values.validFlag
                  ? {
                    borderColor: 'green',
                    color: 'green'
                  }
                  : { borderColor: 'brown', color: 'brown' }
              }
              onClick={() => {
                this.handleSave(this.state.propertyType)
                this.props.setAddPropVisibility()
              }}
              disabled={
                !(this.state.key && this.state.values.validFlag)
              }
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
