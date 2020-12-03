import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Amplify from 'aws-amplify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetTodoQuery, UpdateTodoMutation } from '../../../src/API'
import awsconfig from '../../../src/aws-exports'
import { TodoUpdateForm, TodoUpdateFormData } from '../../../src/component/Form'
import { updateTodo } from '../../../src/graphql/mutations'
import { getTodo } from '../../../src/graphql/queries'
import { TodoType } from '../../../src/interfaces/todo'

Amplify.configure(awsconfig)

const TodosEdit = () => {
  const [todo, setTodo] = useState<TodoType | null>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const asyncFunc = async () => {
      const result = (await API.graphql(
        graphqlOperation(getTodo, { id })
      )) as GraphQLResult<GetTodoQuery>
      if (result.data) {
        setTodo(result.data.getTodo)
      }
    }
    asyncFunc()
  }, [])

  const onSubmit = async (data: TodoUpdateFormData) => {
    if (!todo) return
    ;(await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          ...data,
          id: todo.id
        }
      })
    )) as GraphQLResult<UpdateTodoMutation>
    router.push('/todos/[id]', `/todos/${todo.id}`)
  }

  return !todo ? (
    <></>
  ) : (
    <>
      <Grid container direction='column' spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href='/todos/[id]' as={`/todos/${todo.id}`}>
            <Button component='a' variant='contained' color='default'>
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      <TodoUpdateForm onSubmit={onSubmit} values={todo} />
    </>
  )
}

export default withAuthenticator(TodosEdit)
