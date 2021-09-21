<template>
  <div class="card" :class="direction === 'right' ? 'right' : null">
    <p>{{ content }}</p>

    <span class="date">{{ date }}</span>
  </div>
</template>

<style>
.card {
  background-color: white;
  -webkit-box-shadow: 5px 5px 26px -18px rgba(0, 0, 0, 0.31);
  box-shadow: 5px 5px 26px -18px rgba(0, 0, 0, 0.31);
  padding: 0.7rem;
  border-radius: 10px;
  max-width: 27rem;
  min-width: 3rem;
  align-self: flex-start;
  word-break: break-all;
}

.card p {
  font-weight: 300;
  font-size: 1rem;
}

.card .date {
  font-weight: 300;
  font-size: 0.62rem;
  -webkit-font-smoothing: antialiased;
  margin-top: 7px;
  opacity: 0.5;
  float: right;
}

.right {
  align-self: flex-end;
  color: white;
  background-color: rgb(0, 132, 255);
  -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
}
.right p {
  font-weight: 400 !important;
}
.right .date {
  opacity: 0.9;
  font-weight: 500;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    direction: {
      type: String,
      validator: (val: string) => ["right", "left"].includes(val),
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
});
</script>
