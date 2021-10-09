<template>
  <section class="chat">
    <header>
      <it-avatar
        size="37px"
        :src="`https://avatars.dicebear.com/api/${data.avatar}`"
      />
      <p>{{ data.name }}</p>
    </header>
    <div class="chat__container">
      <Message
        v-for="message in messages"
        :key="message.id"
        :content="message.content"
        :user="message.sender.name"
        :timestamp="message.sentAt"
        :avatar="message.sender.avatar"
        :mine="message.sender.id != data.id"
      />
    </div>
    <div class="chat__footer">
      <it-input placeholder="Write sth..." />
      <it-button type="primary">send</it-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Message from '../components/Message.vue';
import { IUser } from '../types/rooms';
import { GettersType } from '../store/users/getters';
import { IMessage } from '../types';

export default defineComponent({
  components: {
    Message,
  },
  setup() {
    const { state, getters } = useStore();
    const route = useRoute();
    const user = reactive<{
      data: IUser;
      messages: IMessage[];
    }>({
      data: {} as IUser,
      messages: [],
    });

    watch(
      () => route.params.userid,
      () => {
        if (route.params.userid) {
          const data = (state.users.users as IUser[]).find(
            user => user.id === parseInt(route.params.userid as string),
          );
          if (!data) return;
          user.data = data;
          user.messages = getters[`users/${GettersType.getUserMessages}`](
            parseInt(route.params.userid as string),
          );
        }
      },
    );

    return {
      ...toRefs(user),
    };
  },
});
</script>

<style scoped>
.chat > .chat__container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f9fafb;
  overflow-y: auto;
}
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chat__footer {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  background: white;
}
.chat header {
  padding: 1rem;
  align-items: center;
  display: flex;
  background: white;
}
.chat p {
  margin-left: 0.7rem;
  font-weight: 400;
  font-size: 1.1rem;
  overflow: hidden;
}
</style>

<style>
.chat__footer div {
  width: 100%;
}
</style>
