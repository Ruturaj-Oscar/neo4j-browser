/**
 * This component is used to accept the cartesian coordinates
 *
 */
import React from 'react'
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

class CartesianSpacial extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <>
        <div>
          X :<br />
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
            value={this.props.cartesian.X}
            onChange={e => {
              this.props.handleChange('cartesian-Spacial', e.target)
            }}
            id="X"
          />
        </div>
        <div>
          Y :<br />
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
            value={this.props.cartesian.Y}
            onChange={e => {
              this.props.handleChange('cartesian-Spacial', e.target)
            }}
            id="Y"
          />
        </div>
        <div>
          Z :<br />
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
            value={this.props.cartesian.Z}
            onChange={e => {
              this.props.handleChange('cartesian-Spacial', e.target)
            }}
            id="Z"
          />
        </div>
      </>
    )
  }
}

CartesianSpacial.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CartesianSpacial)
