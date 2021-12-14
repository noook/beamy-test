<template>
  <div class="todo-component">
    <form @submit.prevent="onTodoSubmit">
      <button type="button">
        &#8964;
      </button>
      <input type="text" v-model="newTodo">
    </form>
    <div class="list">
      <TodoItem
        v-for="todoItem in displayedTodos"
        :key="todoItem.id"
        :todo="todoItem" />
    </div>
    <div class="footer">
      <p v-if="remainingItems">
        {{ remainingItems }} items left
      </p>
      <p v-else>
        No items left
      </p>
      <div class="actions">
        <button
          @click="activeFilter = 'all'"
          :class="{ active: activeFilter === 'all' }">
          All
        </button>
        <button
          @click="activeFilter = 'active'"
          :class="{ active: activeFilter === 'active' }">
          Active
        </button>
        <button
          @click="activeFilter = 'completed'"
          :class="{ active: activeFilter === 'completed' }">
          Completed
        </button>
      </div>
      <button @click="onClearCompleted" v-if="hasCompletedItem">
        Clear completed
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { v4 } from 'uuid';
import type { ITodoItem } from '@/types';
import TodoItem from './TodoItem.vue';

const todoList = ref<ITodoItem[]>([
  {
    id: v4(),
    name: 'test',
    done: false,
  },
  {
    id: v4(),
    name: 'test 2',
    done: false,
  },
  {
    id: v4(),
    name: 'test 3',
    done: false,
  },
]);

const hasCompletedItem = computed(() => todoList.value.some(({ done }) => done === true));

const newTodo = ref('');

function onTodoSubmit() {
  todoList.value.push({
    id: v4(),
    name: newTodo.value,
    done: false,
  });
  newTodo.value = '';
}

function onClearCompleted() {
  todoList.value = todoList.value.filter(({ done }) => !done);
}

// eslint-disable-next-line arrow-body-style
const remainingItems = computed(() => {
  return todoList.value.reduce((remaining, todoItem) => remaining + +!(todoItem.done), 0);
});

const activeFilter = ref<'all' | 'active' | 'completed'>('all');
const displayedTodos = computed(() => {
  if (activeFilter.value === 'all') return todoList.value;

  const showActive = activeFilter.value === 'active';
  return todoList.value.filter(({ done }) => done === !showActive);
});
</script>

<style lang="scss" scoped>
.todo-component {
  .actions button {
    @apply mx-2;
    &.active {
      @apply border border-red-500 rounded;
      @apply px-2;
    }
  }
}

.footer {
  @apply flex items-center;
}
</style>
