<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from './stores/todo'
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore()

const { tasks, loading } = storeToRefs(todoStore)
const { addTask, deleteTask, updateTask } = todoStore

const taskInput = ref('')
const saveTask = (): void => {
  addTask({ name: taskInput.value })
  taskInput.value = ''
}

</script>

<template>

  <form class="form-task" @submit.prevent>
    <input type="text" class="form-task__input" placeholder="Add new task" v-model="taskInput">
    <button type="button" class="form-task__button" @click="saveTask()">Create task</button>
  </form>

  <div v-show="!tasks.length" class="no-result">
    <span>😧</span>
    <br>
    <strong>No items yet...</strong>
  </div>

  <div v-show="tasks.length" class="task-container">
    <template v-if="!loading && tasks.length">

      <div class="card-task">
        <template v-for="task in tasks" :key="task.id">
          <input type="checkbox" :name="task.id" :id="task.id" class="card-task__checkbox">
          <strong class="card-task__name" v-text="task.name"></strong>
          <button type="button" class="card-task__button" @click="deleteTask({id: task.id})">❌</button>
        </template>
      </div>
    </template>
  </div>

  <div class="loading-container">
    <template v-if="loading">
      <strong>Loading...</strong>
    </template>
  </div>

</template>

<style lang="scss">

  @import './assets/_root.scss';

  .form-task {
    width: 100%;
    display: flex;

    &__input {
      all: initial;
      width: calc(65% - 1rem);
      background-color: $gray-color;
      padding: $padding;
      border-radius: $border;
    }

    &__button {
      all: initial;
      width: 35%;
      background-color: $primary-color;
      padding: $padding;
      border-radius: $border;
      color: $white-color;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      margin-left: 1rem;
    }

  }

  .no-result, .loading-container {
    text-align: center;

    span {
      font-size: xx-large;
    }
  }

  .task-container {
    width: 100%;

    .card-task {
      background-color: $gray-color;
      border-radius: $border;
      padding: $padding;
      margin-bottom: 1rem;

      &__checkbox {
        transition: all 0.4 ease;
      }

      &__name {
        text-transform: uppercase;
      }

      &.done {
        .card-task__name {
          text-decoration: line-through;
          opacity: 0.7;
        }
      }

      &__button {
        all: initial;
        float: right;
        cursor: pointer;
      }

    }
  }

</style>
