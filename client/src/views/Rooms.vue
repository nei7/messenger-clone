<template>
  <div class="main">
    <aside class="contacts">
      <header>
        <it-input
          v-model="inputValue"
          suffix-icon="search"
          placeholder="Search"
        />
      </header>
      <div style="padding: 0 0.7rem">
        <template v-for="(user, i) in users" :key="i">
          <Contact
            lastMessage="sieam ziomek"
            :avatar="user.avater"
            :name="user.name"
          ></Contact>
        </template>
      </div>
    </aside>
    <section class="chat">
      <header>
        <it-avatar size="37px" />
        <p>siema</p>
      </header>
      <div class="chat__container">
        <Message
          direction="right"
          content="msg1"
          :date="new Date().toLocaleString()"
        />

        <Message content="msg2" :date="new Date().toLocaleString()" />

        <Message
          direction="right"
          content="msg3"
          :date="new Date().toLocaleString()"
        />
        <Message content="lorem ipsum" :date="new Date().toLocaleString()" />
      </div>
      <div class="chat__footer">
        <it-input></it-input>
        <it-button type="primary">send</it-button>
      </div>
    </section>
    <aside class="chat__details">
      <header>
        <it-avatar size="4.5rem" />
        <p>siema</p>
      </header>
      <div class="details">
        <Item icon="notifications_off">Turn off notifications</Item>
        <Item icon="block">Block user</Item>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Message from "../components/Message.vue";
import Contact from "../components/Contact.vue";
import Item from "../components/DetailsSidebar/Item.vue";

export default defineComponent({
  components: {
    Message,
    Contact,
    Item,
  },
  setup() {
    const users = ref([
      {
        name: "user0",
        username: "user0",
        avatar: "https://randomuser.me/api/portraits/med/women/76.jpg",
      },
      {
        name: "user1",
        username: "user1",
        avatar: "https://randomuser.me/api/portraits/med/women/76.jpg",
      },
    ]);
    const drawerVisible = ref(true);
    return {
      users,
      drawerVisible,
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
  height: calc(100vh - 9rem);
  background-color: #f8f9fa;
  overflow-y: scroll;
  box-sizing: border-box;
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
</style>
<style>
.chat__footer div {
  width: 100%;
}
</style>
