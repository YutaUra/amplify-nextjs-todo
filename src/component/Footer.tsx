import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: 'auto'
  }
}))

const Copyright = () => {
  return (
    <Container>
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link href='/'>
          <a>Todolist</a>
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  )
}

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Copyright />
    </footer>
  )
}

export default Footer
