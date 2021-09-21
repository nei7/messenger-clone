<template>
  <div class="item">
    <i class="material-icons-outlined" v-if="icon">{{ icon }}</i>
    <p>
      {{ text }}
      <slot v-if="!text"> </slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.item {
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem;
  transition: all 0.2s ease-in-out;
}
.item p {
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}

.item i {
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.5);
  cursor: default;
  vertical-align: middle;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.item:hover {
  background-color: #f6f6f6;
  cursor: pointer;
}
</style>
