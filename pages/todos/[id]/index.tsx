import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Amplify from 'aws-amplify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetTodoQuery } from '../../../src/API'
import awsconfig from '../../../src/aws-exports'
import { getTodo } from '../../../src/graphql/queries'
import { TodoType } from '../../../src/interfaces/todo'
Amplify.configure(awsconfig)

const TodosShow = () => {
  const [todo, setTodo] = useState<TodoType | null>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const asyncFunc = async () => {
      if (id) {
        const result = (await API.graphql(
          graphqlOperation(getTodo, { id })
        )) as GraphQLResult<GetTodoQuery>
        setTodo(result.data?.getTodo || null)
      }
    }
    asyncFunc()
  }, [router.query])

  return !todo ? (
    <></>
  ) : (
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
          <Link href='/todos/[id]/edit' as={`/todos/${todo.id}/edit`}>
            <Button component='a' variant='contained' color='primary'>
              Edit
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container direction='column' spacing={2}>
        <Grid item md={6}>
          <Typography variant='h2'>{todo.name}</Typography>
        </Grid>
        <Grid item md={6}>
          <Typography color='textSecondary'>
            created at {new Date(todo.timestamp * 1000).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography>
            {todo.completed ? 'Completed' : 'In progress'}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthenticator(TodosShow)
