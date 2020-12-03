import API, { graphqlOperation } from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Amplify from 'aws-amplify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import awsconfig from '../../src/aws-exports'
import { TodoCreateForm, TodoCreateFormData } from '../../src/component/Form'
import { createTodo } from '../../src/graphql/mutations'

Amplify.configure(awsconfig)

const TodosNew = () => {
  const router = useRouter()

  const onSubmit = async (newTodo: TodoCreateFormData) => {
    await API.graphql(
      graphqlOperation(createTodo, {
        input: {
          ...newTodo,
          completed: false,
          timestamp: Math.floor(Date.now() / 1000)
        }
      })
    )
    router.push('/')
  }

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href='/'>
            <Button component='a' variant='contained' color='default'>
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      <TodoCreateForm onSubmit={onSubmit} />
    </>
  )
}

export default withAuthenticator(TodosNew)
