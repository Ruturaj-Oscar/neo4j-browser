/**
 * This component is used to accept the geographical coordinates
 *
 */
import React from 'react'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  style: {
    height: '34px',
    color: '#555',
    fontSize: '14px',
    padding: '6px 12px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '192px'
  },
  container: {
    display: 'unset'
  }
})

function TextMaskCustom(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={[/[1-9]/, /\d/, '.', /\d/, /\d/]}
      showMask
    />
  )
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
}

class GeographicSpacial extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <>
        <div>
          Latitude :
          <Input
            style={
              this.props.numCheck
                ? {
                    width: '120px'
                  }
                : {
                    borderColor: 'crimson',
                    borderWidth: '2px',
                    width: '120px'
                  }
            }
            className={classes.style}
            value={this.props.geographic.latitude}
            onChange={e => {
              this.props.handleChange('geographical-Spacial', e.target)
            }}
            id="latitude"
            inputComponent={TextMaskCustom}
          />
        </div>
        <div>
          Longitude:
          <Input
            style={
              this.props.numCheck
                ? { width: '120px' }
                : {
                    borderColor: 'crimson',
                    borderWidth: '2px',
                    width: '120px'
                  }
            }
            className={classes.style}
            value={this.props.geographic.longitude}
            onChange={e => {
              this.props.handleChange('geographical-Spacial', e.target)
            }}
            id="longitude"
            inputComponent={TextMaskCustom}
          />
        </div>
        <div>
          height:
          <Input
            style={
              this.props.numCheck
                ? { width: '120px' }
                : {
                    borderColor: 'crimson',
                    borderWidth: '2px',
                    width: '120px'
                  }
            }
            className={classes.style}
            value={this.props.geographic.height}
            onChange={e => {
              this.props.handleChange('geographical-Spacial', e.target)
            }}
            id="height"
            inputComponent={TextMaskCustom}
          />
        </div>
      </>
    )
  }
}

GeographicSpacial.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeographicSpacial)
