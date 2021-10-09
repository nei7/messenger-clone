<template>
  <div class="main">
    <Contacts></Contacts>
    <Chat></Chat>
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
import { defineComponent } from 'vue';
import Chat from '../components/Chat.vue';
import Contacts from '../components/Contacts.vue';

export default defineComponent({
  components: {
    Contacts,
    Chat,
  },
});
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 30px;
  background: rgb(241, 241, 241);
  overflow: hidden;
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
  width: 22rem;
  background-color: white;
  height: 100%;
  transition: all 0.18s;
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
</style>
