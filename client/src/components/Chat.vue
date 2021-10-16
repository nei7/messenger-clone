<template>
  <section class="chat">
    <header v-if="user">
      <it-avatar
        size="37px"
        :src="`https://avatars.dicebear.com/api/${user.avatar}`"
      />
      <p>{{ user.name }}</p>
    </header>
    <div class="content">
      <div class="chat__container" ref="chat" @scroll="loadMessages">
        <template
          v-for="(msgs, timestamp) in sortMessages(messages, unread)"
          :key="timestamp"
        >
          <h4>{{ timestamp }}</h4>
          <Message
            v-for="message in msgs"
            :key="message.id"
            :content="message.content"
            :user="message.sender.name"
            :avatar="message.sender.avatar"
            :timestamp="timestamp === 'Today' ? message.sentAt : null"
            :mine="message.sender.id === $store.state.user.id"
          />
        </template>
      </div>
    </div>
    <div class="chat__footer">
      <it-input
        placeholder="Write sth..."
        v-model="message"
        @keydown.enter="sendMessage"
      />
      <it-button type="primary" @click="sendMessage">send</it-button>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  nextTick,
  computed,
  onMounted,
  onUnmounted,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Message from '../components/Message.vue';
import { GettersType } from '../store/users/getters';
import { sortMessages } from '../utils';
import api from '../api';
import { MutationType } from '../store/users/mutations';
import { IMessage } from '../types';
import { equal } from '../equal-vue';
import { ActionTypes } from '../store/users/actions';
import { debounce } from '../helpers';
import { EventType, messageEvent } from '../events/messages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Handler<T = any> = (event?: T) => void;

export default defineComponent({
  components: {
    Message,
  },
  setup() {
    const { state, getters, commit, dispatch } = useStore();
    const route = useRoute();
    const chat = ref<HTMLElement>();
    const message = ref('');
    const app = equal();
    const unread = ref(0);

    const messages = computed<IMessage[]>(() =>
      getters[`users/${GettersType.getUserMessages}`](
        parseInt(route.params.userid as string),
      ),
    );
    const user = computed(() => state.users.selectedUser);

    onMounted(() => {
      const callback: Handler = (data: {
        content: string;
        senderId: number;
      }) => {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = document.querySelector('.chat__container')!;
        if (scrollHeight - 50 < scrollTop + clientHeight) {
          nextTick(() =>
            document.querySelector('.chat__container')!.scrollTo({
              top: scrollHeight,
            }),
          );
        } else {
          if (data.senderId === parseInt(route.params.userid as string)) {
            unread.value = 0;
            const message = app.$Message({
              text: data.content,
              duration: 4000,
              icon: 'person_outline',
            });
            document.querySelector('.content')!.appendChild(message.$el);
          }
        }
      };

      messageEvent.on(EventType.NEW_MESSAGE, callback);
    });

    onUnmounted(() => messageEvent.all.delete(EventType.NEW_MESSAGE));

    watch(
      () => route.params.userid,
      () => {
        if (state.users.selectedUser) {
          unread.value = state.users.selectedUser.properties.unreadMessages;

          commit(`users/${MutationType.PURGE_UNREAD}`);
          nextTick(() =>
            chat.value!.scrollTo({
              top: chat.value!.scrollHeight,
            }),
          );
        }
      },
    );

    const sendMessage = () => {
      unread.value = 0;
      api
        .post('/chat/send', {
          content: message.value,
          recieverId: state.users.selectedUser?.id,
        })
        .then(({ data }) => {
          message.value = '';
          commit(`users/${MutationType.SET_USER_MESSAGE}`, {
            receiverId: state.users.selectedUser?.id,
            senderId: state.user.id,
            message: data,
          });
          nextTick(() =>
            chat.value!.scrollTo({
              top: chat.value!.scrollHeight,
            }),
          );
        })
        .catch(err => {
          app.$Message.danger({
            text: err.response?.data.message || err.message,
          });
        });
    };

    const loadMessages = debounce(async () => {
      const { scrollTop, clientHeight } = chat.value as HTMLElement;
      if (scrollTop <= clientHeight) {
        await dispatch(
          `users/${ActionTypes.loadUserMesages}`,
          parseInt(route.params.userid as string),
        );
      }
    }, 30);

    return {
      user,
      sortMessages,
      chat,
      message,
      sendMessage,
      messages,
      loadMessages,
      unread,
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
.content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}

.chat__container h4 {
  margin: 0.7rem auto;
  font-weight: 400;
  opacity: 0.5;
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
