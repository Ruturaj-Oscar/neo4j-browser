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
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import GeographicSpacial from './Geographic-spacial'
import CartesianSpacial from './Cartesian-spacial'
import DropDownUI from './DropDownUI'
import GoCalendar from 'react-icons/lib/go/calendar'
import { StyledKey, StyledValue } from '../DatabaseInfo/styled'
import { StyledTable } from '../Stream/Queries/styled'

export class AddProperty extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: '',
      propertyType: undefined,
      date: new Date().toLocaleDateString(),
      values: {
        calenderFlag: false,
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

        geographic: { index: '', latitude: '', longitude: '', height: '' },
        cartesian: { index: '', X: '', Y: '', Z: '' }
      }
    }
  }

  /**
   * This method is used to inialize the state.
   * After property Data type change this function is invoked
   */
  getInitState = () => {
    let values = {
      calenderFlag: false,
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

      geographic: { index: '', latitude: '', longitude: '', height: '' },
      cartesian: { index: '', X: '', Y: '', Z: '' }
    }
    return values
  }

  /**
   * Method is used to render the calender on icon click
   */

  toggleCalender = () => {
    let values = _.cloneDeep(this.state.values)
    values.calenderFlag = !this.state.values.calenderFlag
    this.setState({ values })
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
      case 'geographical-Spacial':
        let geoObj = _.cloneDeep(this.state.values.geographic)
        geoObj.longitude = parseFloat(geoObj.longitude)
        geoObj.latitude = parseFloat(geoObj.latitude)
        !geoObj.height || geoObj.height === '__.__'
          ? ((geoObj.index = 'WGS 84 2D'), (geoObj.height = undefined))
          : ((geoObj.index = 'WGS 84 3D'),
          (geoObj.height = parseFloat(geoObj.height)))
        this.props.saveNewProperty(this.state.key, geoObj)
        break

      case 'cartesian-Spacial':
        let carteObj = _.cloneDeep(this.state.values.cartesian)
        carteObj.X = parseFloat(carteObj.X)
        carteObj.Y = parseFloat(carteObj.Y)
        carteObj.Z !== ''
          ? ((carteObj.index = 'Cartesian 3D'),
          (carteObj.Z = parseFloat(carteObj.Z)))
          : ((carteObj.index = 'Cartesian 2D'), (carteObj.Z = undefined))
        this.props.saveNewProperty(this.state.key, carteObj)
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
    const latRe = /^[0-9\b.]+$/
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
      case 'geographical-Spacial':
        values.geographic.latitude !== '' && values.geographic.longitude !== ''
          ? (values.validFlag = true)
          : (values.validFlag = false)
        if (value.id === 'height' && value.value === '__.__') {
          ;(values.validFlag = true), (values.numCheck = true)
        } else {
          latRe.test(value.value)
            ? (values.numCheck = true)
            : (values.numCheck = false)
        }
        values.geographic[value.id] = value.value
        this.setState({ values })
        break
      case 'cartesian-Spacial':
        values.cartesian[value.id] = value.value
        values.cartesian.X !== '' && values.cartesian.Y !== ''
          ? (values.validFlag = true)
          : (values.validFlag = false)
        if (value.id === 'Z' && value.value === '') {
          ;(values.validFlag = true), (values.numCheck = true)
        } else {
          latRe.test(value.value)
            ? (values.numCheck = true)
            : (values.numCheck = false)
        }
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
      case 'geographical-Spacial':
        propertyValueInput = (
          <GeographicSpacial
            handleChange={this.handleChange}
            geographic={this.state.values.geographic}
            numCheck={this.state.values.numCheck}
          />
        )
        break
      case 'cartesian-Spacial':
        propertyValueInput = (
          <CartesianSpacial
            handleChange={this.handleChange}
            cartesian={this.state.values.cartesian}
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
          <DrawerSubHeader>Add Property</DrawerSubHeader>
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
                    {this.state.values.calenderFlag ? (
                      <DayPicker
                        style={{ float: 'right' }}
                        id='date'
                        onDayClick={day => {
                          this.handleChange('date', day)
                        }}
                      />
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
                this.toggleCalender()
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
