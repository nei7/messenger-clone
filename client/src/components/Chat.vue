<template>
  <section class="chat">
    <header>
      <it-avatar
        size="37px"
        :src="`https://avatars.dicebear.com/api/${user.data.avatar}`"
      />
      <p>{{ user.data.name }}</p>
    </header>
    <div class="chat__container" ref="chat">
      <template
        v-for="(messages, timestamp) in sortMessages(user.messages)"
        :key="timestamp"
      >
        <h4>{{ timestamp }}</h4>
        <Message
          v-for="message in messages"
          :key="message.id"
          :content="message.content"
          :user="message.sender.name"
          :avatar="message.sender.avatar"
          :timestamp="timestamp === 'Today' && message.sentAt"
          :mine="message.sender.id === $store.state.user.id"
        />
      </template>
    </div>
    <div class="chat__footer">
      <it-input placeholder="Write sth..." v-model="message" />
      <it-button type="primary" @click="sendMessage">send</it-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Message from '../components/Message.vue';
import { IUser } from '../types/rooms';
import { GettersType } from '../store/users/getters';
import { IMessage } from '../types';
import { sortMessages } from '../utils';
import api from '../api';
import { MutationType } from '../store/users/mutations';

export default defineComponent({
  components: {
    Message,
  },
  setup() {
    const { state, getters, commit } = useStore();
    const route = useRoute();
    const chat = ref<HTMLElement>();
    const message = ref('');

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
          nextTick(() =>
            chat.value!.scrollTo({
              top: chat.value!.scrollHeight,
            }),
          );
        }
      },
    );

    const sendMessage = () => {
      const userid = parseInt(route.params.userid as string);
      api
        .post('/chat/send', {
          content: message.value,
          recieverId: userid,
        })
        .then(({ data }) => {
          message.value = '';
          commit(`users/${MutationType.SET_USER_MESSAGE}`, {
            userid,
            message: data,
          });
        });
    };

    return {
      user,
      sortMessages,
      chat,
      message,
      sendMessage,
    };
  },
});
</script>

<style scoped>
.chat__container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f9fafb;
  overflow-y: scroll;
}
.chat__container h4 {
  margin: 0.7rem auto;
  font-weight: 500;
  opacity: 0.4;
  font-size: 13px;
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
