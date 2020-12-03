import { atom } from 'recoil'
import type { TodoType } from '../interfaces/todo'

export const todosState = atom({
  key: 'todos',
  default: [] as TodoType[]
})
