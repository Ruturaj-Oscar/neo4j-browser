import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

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
  }
})

class DropDownUI extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Select
        value={this.props.value}
        name='datatypes'
        onChange={e => {
          this.props.onSelect(e.target.value)
        }}
        className={classes.style}
      >
        <MenuItem value='number'>Numbers</MenuItem>
        <MenuItem value='boolean'>Boolean</MenuItem>
        <MenuItem value='string'>String</MenuItem>
        <MenuItem value='date'>Date</MenuItem>
      </Select>
    )
  }
}

export default withStyles(styles)(DropDownUI)
