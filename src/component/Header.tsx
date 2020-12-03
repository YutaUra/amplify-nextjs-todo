import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Container>
          <Grid container direction='row' alignItems='center'>
            <CheckCircleIcon className={classes.icon} />
            <Typography variant='h6' color='inherit' noWrap>
              TodoList
            </Typography>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
