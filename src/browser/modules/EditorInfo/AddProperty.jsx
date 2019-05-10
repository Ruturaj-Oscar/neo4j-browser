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
import SpacialComponent from './SpacialComponent'
import DropDownUI from './DropDownUI'
import GoCalendar from 'react-icons/lib/go/calendar'
import { StyledKey, StyledValue } from '../DatabaseInfo/styled'
import { StyledTable } from '../Stream/Queries/styled'

export class AddProperty extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: '',
      calenderFlag: false,
      propertyType: undefined,
      date: new Date().toLocaleDateString(),
      values: {
        validFlag: false,
        numCheck: false,
        boolValue: false,
        typeText: '',
        typeNumber: '',
        selectedDate: {
          year: new Date().getFullYear,
          month: new Date().getMonth,
          day: new Date().getDate
        },
        spacial: {
          latitude: 0.0,
          longitude: 0.0
        }
      }
    }
  }

  /**
   * this method is used to inialize the state.
   */
  getInitState = () => {
    let values = {
      validFlag: false,
      numCheck: false,
      boolValue: false,
      typeText: '',
      typeNumber: '',
      selectedDate: {
        year: new Date().getFullYear,
        month: new Date().getMonth,
        day: new Date().getDate
      },
      spacial: {
        latitude: 0.0,
        longitude: 0.0
      }
    }
    return values
  }

  /**
   * Method is used to render the calender on icon click
   */

  toggleCalender = () => {
    this.setState({
      calenderFlag: !this.state.calenderFlag
    })
  }

  /**
   * this method is invoked on save button click and the state is updated in redux.
   */
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
          Boolean(this.state.values.boolValue)
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

  /**
   * This method handles the component state.
   */
  handleChange = (id, value) => {
    let values = Object.assign({}, this.state.values)
    switch (id) {
      case 'key':
        this.setState({ key: value })
        break
      case 'number':
        const re = /^[0-9\b]+$/
        values.typeNumber = value
        if (values.typeNumber === '') {
          values.validFlag = false
          values.numCheck = false
        } else {
          re.test(value) ? (values.numCheck = true) : (values.numCheck = false)
          values.validFlag = true
        }
        this.setState({ values })
        break
      case 'string':
        values.typeText = value
        values.numCheck = true
        values.typeText === ''
          ? (values.validFlag = false)
          : (values.validFlag = true)
        this.setState({ values })
        break
      case 'latitude':
        const latRe = /^[0-9\b.]+$/
        latRe.test(value) && latRe.test(this.state.values.spacial.longitude)
          ? (values.numCheck = true)
          : (values.numCheck = false)
        values.spacial[id] = value
        values.spacial.longitude === '' || values.spacial.latitude === ''
          ? (values.validFlag = false)
          : (values.validFlag = true)
        this.setState({ values })
        break
      case 'longitude':
        const lonRe = /^[0-9\b.]+$/
        lonRe.test(value) && lonRe.test(this.state.values.spacial.latitude)
          ? (values.numCheck = true)
          : (values.numCheck = false)
        values.spacial[id] = value
        values.spacial.latitude === '' || values.spacial.longitude === ''
          ? (values.validFlag = false)
          : (values.validFlag = true)
        this.setState({ values })
        break
      case 'boolean':
        values.boolValue = value
        values.validFlag = true
        values.numCheck = true
        this.setState({ values })
        break
      case 'date':
        this.setState({ date: value.toLocaleDateString() })
        let newDate = new Date(value)
        values.selectedDate.year = newDate.getUTCFullYear()
        values.selectedDate.month = 1 + newDate.getUTCMonth()
        values.selectedDate.day = newDate.getUTCDate()
        values.validFlag = true
        values.numCheck = true
        this.setState({ values })
        break
      default:
        break
    }
  }

  /**
   * This method used for setting the property data-type and
   * based on the property type, input components are rendered
   */
  onPropertyTypeSelect = propertyType => {
    let values = _.cloneDeep(this.state.values)
    values = this.getInitState()
    this.setState({ values, propertyType })
  }

  render () {
    let propertyValueInput = null
    let textStyle = {
      borderColor: 'crimson',
      borderWidth: '2px',
      width: '120px'
    }
    let validStyle = {
      borderColor: 'green',
      borderWidth: '2px',
      width: '120px'
    }
    const options = ['true', 'false']
    switch (this.state.propertyType) {
      case 'number':
        propertyValueInput = (
          <TextInput
            style={this.state.values.numCheck ? { width: '120px' } : textStyle}
            id='number'
            onChange={e => {
              this.handleChange(e.target.id, e.target.value)
            }}
            value={this.state.values.typeNumber}
          />
        )
        break
      case 'date':
        propertyValueInput = (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextInput
              style={{
                width: '120px'
              }}
              value={this.state.date}
              disabled
            />
            <GoCalendar
              style={{
                float: 'right',
                height: '2em',
                width: '2em',
                color: 'ghostwhite'
              }}
              onClick={this.toggleCalender}
            />
          </div>
        )
        break
      case 'string':
        propertyValueInput = (
          <TextInput
            style={{
              width: '120px'
            }}
            id='string'
            onChange={e => {
              this.handleChange(e.target.id, e.target.value)
            }}
            value={this.state.values.typeText}
          />
        )
        break
      case 'spacial':
        propertyValueInput = (
          <SpacialComponent
            handleChange={this.handleChange}
            spacial={this.state.values.spacial}
            numCheck={this.state.values.numCheck}
          />
        )
        break
      case 'boolean':
        propertyValueInput = (
          <RadioSelector
            id='boolean'
            options={options}
            onChange={e => {
              this.handleChange('boolean', e.target.value)
            }}
            selectedValue={this.state.values.boolValue}
          />
        )
        break
      default:
        null
    }
    return (
      <Drawer id='db-AddProperty'>
        <DrawerHeader />
        <DrawerBody>
          <DrawerSubHeader>
            Add Property : {this.props.SelectedType}
          </DrawerSubHeader>
          <DrawerSection>
            <DrawerSectionBody>
              <StyledTable>
                <tbody>
                  <tr>
                    <StyledKey>key:</StyledKey>
                    <StyledValue>
                      <TextInput
                        id='key'
                        onChange={e => {
                          this.handleChange(e.target.id, e.target.value)
                        }}
                        style={{
                          width: '120px'
                        }}
                      />
                    </StyledValue>
                  </tr>
                  <tr>
                    <StyledKey> Data Type:</StyledKey>
                    <StyledValue>
                      <DropDownUI
                        value={this.state.propertyType}
                        onSelect={this.onPropertyTypeSelect}
                      />
                    </StyledValue>
                  </tr>
                  <tr style={{ verticalAlign: '-webkit-baseline-middle' }}>
                    <StyledKey>Value :</StyledKey>
                    <StyledValue>{propertyValueInput}</StyledValue>
                  </tr>
                  <tr>
                    {this.state.calenderFlag ? (
                      <DatePicker onDatePropSelect={this.handleChange} />
                    ) : null}
                  </tr>
                </tbody>
              </StyledTable>
            </DrawerSectionBody>
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
                this.state.key &&
                (this.state.values.validFlag && this.state.values.numCheck)
                  ? validStyle
                  : textStyle
              }
              onClick={() => {
                this.handleSave(this.state.propertyType)
                this.props.setAddPropVisibility()
                this.setState({
                  calenderFlag: false
                })
              }}
              disabled={
                !(
                  this.state.key &&
                  (this.state.values.validFlag && this.state.values.numCheck)
                )
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
