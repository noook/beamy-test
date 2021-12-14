<template>
  <div class="home">
    <Todo />
  </div>
</template>

<script lang="ts" setup>
import Todo from '@/components/Todo.vue';
</script>

<style lang="scss" scoped>
.home {
  .btn-primary {
    @apply border border-[#E1E9ED] rounded;
    @apply  px-2 h-9 bg-purple-700 text-white hover:opacity-40 duration-75;
  }
}
</style>
