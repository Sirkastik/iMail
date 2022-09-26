<template>
  <span class="checkbox" :class="{ 'checkbox--marked': isMarked }">
    <component :is="selectedComponent"></component>
  </span>
</template>

<script>
import CheckboxEmpty from "./icons/CheckboxEmpty.vue";
import CheckboxMarked from "./icons/CheckboxMarked.vue";
export default {
  props: { isMarked: Boolean },
  computed: {
    selectedComponent() {
      return this.isMarked ? CheckboxMarked : CheckboxEmpty;
    },
  },
};
</script>

<style scoped>
.checkbox {
  cursor: pointer;
  margin: 1rem;
  font-size: 1.5rem;
  color: rgba(209, 206, 206, 0.6);
}

.checkbox--marked {
    
    color: #50caff;
}
</style>
