<template>
  <div class="contact">
    <it-avatar :src="avatar" size="50px" />
    <div class="contact__info">
      <p class="name">{{ name }}</p>
      <p class="last__message">
        {{ lastMessage }}
      </p>
    </div>
    <p class="timestamp">
      10 minut temu
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    lastMessage: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.contact {
  padding: 0.8rem 0.5rem;
  border-radius: 0.6rem;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.contact:hover {
  background-color: #f6f6f6;
}

.contact__info {
  padding-left: 0.75rem;
  flex-direction: column;
  display: flex;
  flex: 1 1 0%;
  margin: 0px;
}
.name {
  font-weight: 400;
  font-size: 1.1rem;
}
.last__message {
  font-size: 12px;
  font-weight: 400;
  color: #787f8a;
}
.timestamp {
  font-size: 10px;
  font-weight: 400;
  color: #787f8a;
}
</style>
