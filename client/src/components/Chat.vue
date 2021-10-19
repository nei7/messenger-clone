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
    <div class="isTyping" v-show="typing">
      <div class="dot-flashing"></div>
      <p>
        <b>{{ user.name }}</b> is typing...
      </p>
    </div>

    <div class="chat__footer">
      <it-input
        placeholder="Write sth..."
        v-model="message"
        @keydown.enter="sendMessage"
        @keydown="handleKeyUp"
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
import { socket } from '../plugins/socket.io/';

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
    const typing = ref(false);

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

      socket.on('typing', (data: { userId: number }) => {
        if (data.userId === state.users.selectedUser.id) {
          typing.value = true;
        }
        setTimeout(() => (typing.value = false), 2000);
      });
      messageEvent.on(EventType.NEW_MESSAGE, callback);
    });

    onUnmounted(() => {
      messageEvent.all.delete(EventType.NEW_MESSAGE);
      socket.off('typing');
    });

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

    let sendTyping: boolean;

    const handleKeyUp = () => {
      if (!sendTyping) {
        const userId = state.users.selectedUser.id;
        sendTyping = true;
        setTimeout(() => {
          api.post(`chat/${userId}/typing`).then(() => (sendTyping = false));
        }, 2000);
      }
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
      typing,
      handleKeyUp,
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

.isTyping {
  width: 100%;
  background-color: #f9fafb;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding: 0.5rem 2.2rem;
}
.isTyping > p {
  margin-left: 1rem;
  font-size: 12px;
  opacity: 0.7;
}
</style>

<style>
.chat__footer div {
  width: 100%;
}
</style>
