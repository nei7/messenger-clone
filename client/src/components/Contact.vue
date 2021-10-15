<template>
  <div class="contact" :class="{ active }">
    <it-badge v-if="unreadMessages > 0" :value="unreadMessages" point>
      <it-avatar
        :src="`https://avatars.dicebear.com/api/${avatar}`"
        size="40px"
      />
    </it-badge>
    <it-avatar
      :src="`https://avatars.dicebear.com/api/${avatar}`"
      size="40px"
      v-else
    />

    <div class="contact__info">
      <p class="name">{{ name }}</p>
      <p class="last__message">
        {{ lastMessage || 'no recent messages' }}
      </p>
    </div>
    <p class="timestamp">
      {{ howLongAgo(lastMessageDate) }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { howLongAgo } from '../utils';

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
    userid: {
      type: Number,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: true,
    },
    unreadMessages: {
      type: Number,
      default: 0,
    },
    lastMessageDate: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();

    const active = computed(() =>
      props.highlight
        ? parseInt(route.params.userid as string) === props.userid
        : null,
    );

    return {
      active,
      howLongAgo,
    };
  },
});
</script>

<style scoped>
.contact {
  margin: 1rem 0rem 1rem 0rem;
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
.active {
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
  color: black;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 1px;
}
.last__message {
  font-size: 13px;
  font-weight: 300;
  opacity: 0.6;
}
.timestamp {
  font-size: 11px;
  font-weight: 400;
  opacity: 0.5;
}
</style>
