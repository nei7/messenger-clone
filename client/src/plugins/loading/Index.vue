<template>
  <div>
    <it-loading :radius="radius" :stroke="stroke" :color="color" />
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    color: String,
    radius: Number,
    stroke: Number,
    text: String,
  },
});
</script>
