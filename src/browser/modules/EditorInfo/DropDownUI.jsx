import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ffffff'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00'
    }
    // error: will use the default color
  }
})

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
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
  formControl: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: 120
  },
  drop: {
    background: '#fff',
    fontSize: '14px',
    textAlign: '-webkit-center',
    height: '34px',
    color: '#555',
    borderTop: '1px solid #ccc',
    borderRadius: '4px'
  }
})

class DropDownUI extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <FormControl className={classes.formControl} variant='outlined'>
        {/* <InputLabel color="primary" htmlFor="datatype">
              Data Type
            </InputLabel> */}
        <Select
          className={classes.drop}
          value={this.props.value}
          onChange={e => {
            this.props.onSelect(e.target.value)
          }}
          inputProps={{
            name: 'datatype-2',
            id: 'datatype'
          }}
        >
          <MenuItem value='number'>Numbers</MenuItem>
          <MenuItem value='boolean'>Boolean</MenuItem>
          <MenuItem value='string'>String</MenuItem>
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='spacial'>Spacial</MenuItem>
        </Select>
      </FormControl>
      // <Select

      //   value={this.props.value}
      //   name="datatypes"
      //   onChange={e => {
      //     this.props.onSelect(e.target.value);
      //   }}
      //   className={classes.style}
      // >
      //   <MenuItem value="number">Numbers</MenuItem>
      //   <MenuItem value="boolean">Boolean</MenuItem>
      //   <MenuItem value="string">String</MenuItem>
      //   <MenuItem value="date">Date</MenuItem>
      //   <MenuItem value="spacial">Spacial</MenuItem>
      // </Select>
    )
  }
}

export default withStyles(styles)(DropDownUI)
