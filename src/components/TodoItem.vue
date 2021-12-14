<template>
  <div class="todo-item">
    <button role="done-indicator" @click="onToggleTodo">
      {{ todo.done ? '&check;' : '' }}
    </button>
    <span
      @dblclick="isEditing = true"
      v-if="!isEditing"
      :class="{ done: todo.done }">{{ todo.name }}</span>
    <form v-else @submit.prevent="onNameUpdate">
      <input type="text" v-model="updatedName">
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { ITodoItem } from '@/types';

const props = defineProps<{
  todo: ITodoItem
}>();

const isEditing = ref(false);
const updatedName = ref(props.todo.name);

function onToggleTodo() {
  // eslint-disable-next-line vue/no-mutating-props
  props.todo.done = !props.todo.done;
}

function onNameUpdate() {
  // eslint-disable-next-line vue/no-mutating-props
  props.todo.name = updatedName.value;
  isEditing.value = false;
}

</script>

<style lang="scss" scoped>
.todo-item {
  @apply flex items-center h-18 px-2;

  [role=done-indicator] {
    @apply border border-[#E1E9ED] w-8 h-8 rounded-full mr-4;
    @apply flex justify-center items-center outline-none;
  }

  span.done {
    @apply line-through text-gray-500;
  }
}
</style>
