export interface Task {
  id: string
  name: string
  completed: boolean
}

export type TaskId = Pick<Task, 'id'>
export type TaskName= Pick<Task, 'name'>
export type TaskCompleted = Pick<Task, 'completed'>
