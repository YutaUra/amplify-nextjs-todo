import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export type TodoCreateFormData = {
  name: String
}

export type TodoCreateFormProps = {
  onSubmit: (value: TodoCreateFormData) => void
}

export const TodoCreateForm = (props: TodoCreateFormProps) => {
  const { onSubmit } = props
  const {
    register,
    handleSubmit,
    errors,
    reset
  } = useForm<TodoCreateFormData>()

  const handler: SubmitHandler<TodoCreateFormData> = newObj => {
    onSubmit(newObj)
    reset()
  }

  //   const errorMessage = (field: keyof TodoCreateFormData) => {
  //     const message = []
  //     const error = errors.name?.message
  //     if (errors[field].type == 'required') {
  //       message.push('required')
  //     }
  //     if (errors[field]?.type == 'maxLength') {
  //       message.push('Exceeded 20 characters')
  //     }
  //     return message.join(', ')
  //   }

  return (
    <form onSubmit={handleSubmit(handler)}>
      <Grid container direction='column' spacing={2}>
        <Grid item md={6}>
          <TextField
            label='Name'
            name='name'
            fullWidth
            inputRef={register({
              required: { value: true, message: 'required' },
              maxLength: { value: 20, message: 'Exceeded 20 characters' }
            })}
            error={Boolean(errors.name)}
            // helperText={errorMessage('name')}
          />
        </Grid>
        <Grid item md={6}>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export type TodoUpdateFormData = {
  name: String
}

export type TodoUpdateFormProps = {
  onSubmit: (value: TodoUpdateFormData) => void
  values: TodoUpdateFormData
}

export const TodoUpdateForm = (props: TodoUpdateFormProps) => {
  const { onSubmit, values } = props
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue
  } = useForm<TodoUpdateFormData>()

  useEffect(() => {
    setValue('name', values.name)
  })

  const handler: SubmitHandler<TodoUpdateFormData> = newObj => {
    onSubmit(newObj)
    reset()
  }

  //   const errorMessage = (field: keyof TodoCreateFormData) => {
  //     const message = []
  //     const error = errors.name?.message
  //     if (errors[field].type == 'required') {
  //       message.push('required')
  //     }
  //     if (errors[field]?.type == 'maxLength') {
  //       message.push('Exceeded 20 characters')
  //     }
  //     return message.join(', ')
  //   }

  return (
    <form onSubmit={handleSubmit(handler)}>
      <Grid container direction='column' spacing={2}>
        <Grid item md={6}>
          <TextField
            label='Name'
            name='name'
            fullWidth
            inputRef={register({
              required: { value: true, message: 'required' },
              maxLength: { value: 20, message: 'Exceeded 20 characters' }
            })}
            error={Boolean(errors.name)}
            // helperText={errorMessage('name')}
          />
        </Grid>
        <Grid item md={6}>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
