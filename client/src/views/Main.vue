<template>
  <div class="main ">
    <aside class="contacts">
      <header>
        <it-input
          v-model="inputValue"
          suffix-icon="search"
          placeholder="Search"
        />
      </header>
      <div style="padding: 0 0.7rem">
        <div class="divider"></div>
        <template v-for="(user, i) in users" :key="i">
          <Contact
            lastMessage="last message"
            :avatar="user.avater"
            :name="user.name"
          ></Contact>
        </template>
      </div>
    </aside>
    <section class="chat">
      <header>
        <it-avatar size="37px" />
        <p>user</p>
      </header>
      <div class="chat__container">
        <Message content="dwdwijdwiodjw" user="nei" timestamp="12:20" />
      </div>
      <div class="chat__footer">
        <it-input></it-input>
        <it-button type="primary">send</it-button>
      </div>
    </section>
    <aside class="chat__details">
      <header>
        <it-avatar size="4.5rem" />
        <p>user</p>
        <span>last active 3 hours ago</span>
      </header>
    </aside>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import Message from '../components/Message.vue';
import Contact from '../components/Contact.vue';
import { useStore } from 'vuex';
import { ActionTypes } from '../store/users/actions';
import { io } from 'socket.io-client';

export default defineComponent({
  components: {
    Message,
    Contact,
  },
  setup() {
    const store = useStore();
    const socket = io('http://localhost:5000');

    socket.emit('message', {
      sender: {
        id: 1,
        name: 'nei',
        email: 'wdd',
      },
      receiver: {
        id: 1,
        name: 'nobody',
        email: 'wdd',
      },
      message: 'string',
    });

    onMounted(() => {
      store.dispatch(`users/${ActionTypes.getUsers}`);
    });

    const selectedUser = ref('');

    const drawerVisible = ref(true);

    return {
      users: computed(() => store.state.users.users),
      drawerVisible,
      selectedUser,
    };
  },
});
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
}
.navigation {
  justify-content: center;
}

header div {
  width: 100%;
}

header h3 {
  margin: 0px;
}

.chat__details {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 30rem;
  background-color: white;
  height: 100vh;
  transition: all 0.18s;
  border-left: 1px solid #f2f3f7;
}

.chat__details header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.chat__details header p {
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1rem;
}
.chat__details header > span {
  margin-top: 5px;
  font-size: 0.8rem;
  font-weight: 400;
  opacity: 0.5;
}

.chat__details .details {
  margin-top: 2rem;
  display: flex;
  gap: 0.1rem;
  flex-direction: column;
  padding: 0rem 0.7rem;
}

.contacts {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 32rem;
  background-color: white;
  height: 100vh;
  transition: all 0.18s;
  border-right: 1px solid #f2f3f7;
}

.contacts header {
  display: flex;
  padding: 1rem 1rem 0rem;
  margin-bottom: 1rem;
}

.chat header {
  padding: 1rem;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #f2f3f7;
}
.chat p {
  margin-left: 0.7rem;
  font-weight: 400;
  font-size: 1.1rem;
  overflow: hidden;
}

.chat > .chat__container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 9.1rem);
  background-color: #f8f9fa;
  overflow-y: auto;

  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e6e1e6;
  border-radius: 30px;
}

::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 15px;
  box-shadow: inset 0px 0px 0px 0px #f0f0f0;
}
.chat {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}

.chat__footer {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.add_button {
  padding: 3px;
  background-color: blue;
}
</style>
<style>
.chat__footer div {
  width: 100%;
}
</style>
