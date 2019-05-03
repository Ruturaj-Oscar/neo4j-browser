/**
 * This component is used to render the textfields to accept
 * the new properties in key-value pair for node/relationship of
 * the selected item.
 */
import React, { Component } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerSection
} from 'browser-components/drawer'
import { FormButton } from 'browser-components/buttons'
import { TextInput } from 'browser-components/Form'
import {
  DrawerSectionBody,
  DrawerFooter
} from 'browser-components/drawer/index'

export class AddProperty extends Component {
  render () {
    return (
      <Drawer id='db-AddProperty'>
        <DrawerHeader>Add Property</DrawerHeader>
        <hr />
        <DrawerBody>
          <DrawerSection
            style={{
              display: 'block'
            }}
          >
            <DrawerSectionBody
              style={{
                display: 'flex',
                justifyContent: 'space-evenly'
              }}
            >
              <p
                style={{
                  fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Key :
              </p>
              <TextInput id='key' />
            </DrawerSectionBody>
          </DrawerSection>
          <DrawerSection>
            <DrawerSectionBody
              style={{
                display: 'flex',
                justifyContent: 'space-evenly'
              }}
            >
              <p
                style={{
                  fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Value:
              </p>
              <TextInput id='value' />
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
              style={{
                backgroundColor: '#9195a0',
                color: '#30333a',
                fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              Save
            </FormButton>
            <FormButton
              style={{
                backgroundColor: '#9195a0',
                color: '#30333a',
                fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                fontWeight: 'bold',
                fontSize: '12px'
              }}
            >
              Cancel
            </FormButton>
          </DrawerSection>
          <DrawerFooter>
            <hr />
          </DrawerFooter>
        </DrawerBody>
      </Drawer>
    )
  }
}

export default AddProperty
