<template>
  <div class="contact">
    <it-avatar :src="avatar" size="40px" color="#0a84ff" />
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
  margin-bottom: 10px;
}

.contact:hover {
  background-color: #f6f6f6;
}

.contact__info {
  padding-left: 0.75rem;
  flex-direction: column;
  display: flex;
  justify-items: center;
  justify-content: center;
  flex: 1 1 0%;
  margin: 0px;
}
.name {
  text-shadow: 0px 4px 17px rgba(0, 0, 0, 0.13);
  opacity: 0.9;
  font-weight: 400;
  font-size: 0.96rem;
  margin-bottom: 5px;
}
.last__message {
  font-size: 13px;
  font-weight: 400;
  opacity: 0.6;
}
.timestamp {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.5;
}
</style>
