import type { Task, TaskId, TaskName } from "@/types/todo"
import { defineStore, acceptHMRUpdate } from "pinia"
import { ref } from "vue"

// export const useTodoStore = defineStore({
//   id: 'todo',
//   state: () => ({
//     tasks: [],
//     loading: false
//   }),
//   getters: {},
//   actions: {}
// })

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)

  const addTask = ({ name }: TaskName): void => {
    loading.value = true
    const newTask = { name, id: crypto.randomUUID(), completed: false }
    setTimeout(() => {
      tasks.value.push(newTask)
      loading.value = false
    }, 2000)
  }

  const deleteTask = ({ id }: TaskId): void => {
    loading.value = true
    tasks.value = tasks.value.filter(task => task.id !== id)
    loading.value = false
  }

  const updateTask = ({ id }: TaskId): void => {
    loading.value = true
    const taskToUpdate = tasks.value.find(task => task.id === id)
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed
    }
    setTimeout(() => loading.value = false, 2000)
  }

  return { tasks, loading, addTask, deleteTask, updateTask }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot))
}
