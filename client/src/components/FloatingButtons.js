import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Autorenew from '@material-ui/icons/Autorenew';

const styles = theme => ({
  button: {
    marginRight: '2.5%',
    marginBottom: '20px',
    position: 'fixed',
    right: 0,
    bottom: 0
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  secondaryButton: {
    right: '180px'
  }
});

class FloatingButtons extends React.Component {

  downloadClick = () => {
    this.props.downloadClick()
  };

  reloadClick = () => {
    this.props.reloadClick()
  };
  
  render() {
    const { classes } = this.props;
    return ( 
      <div>
        <Button variant="extendedFab" aria-label="Reload" 
          className={`${classes.button} ${classes.secondaryButton}`}
          onClick={this.reloadClick}>
          <Autorenew />
        </Button>
        <Button variant="extendedFab" aria-label="Download" 
          color="secondary" className={classes.button}
          onClick={this.downloadClick}>
          <SaveIcon className={classes.leftIcon} />
          Save report
        </Button>
      </div>
    );
  }
}

FloatingButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FloatingButtons);