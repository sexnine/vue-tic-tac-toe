<template>
  <div
    class="flex aspect-square h-24 transform-gpu cursor-pointer items-center justify-center rounded-md bg-gray-300 text-[5rem] text-white shadow-inner transition-all hover:scale-105"
    :class="classes"
  >
    <fa-icon v-if="value" :icon="['fas', value]" />
  </div>
</template>

<script setup lang="ts">
  import { computed, defineProps } from "vue";

  const classes = computed(() => {
    return props.value == "x"
      ? "bg-red-500"
      : props.value == "o"
      ? "bg-blue-500"
      : "";
  });

  const props = defineProps<{
    num: number;
    value?: string;
  }>();
</script>
