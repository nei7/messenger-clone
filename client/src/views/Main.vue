<template>
  <div class="main">
    <Contacts></Contacts>
    <Chat></Chat>
    <aside class="chat__details">
      <it-avatar
        size="4rem"
        :src="
          `https://avatars.dicebear.com/api/` +
            $store.state.users.selectedUser.avatar
        "
      />

      <h4 style="margin-bottom: 2rem">
        {{ $store.state.users.selectedUser.name }}
      </h4>
      <div class="collapse">
        <div class="item">
          <h4>Info</h4>
          <it-icon name="expand_more" outlined />
        </div>
        <div class="item sub">
          <h4>tak</h4>
        </div>
      </div>
      <div class="collapse">
        <div class="item">
          <h4>Settings</h4>
          <it-icon name="expand_more" outlined />
        </div>
      </div>
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
  background: rgb(241, 241, 241);
  overflow: hidden;
}

.navigation {
  justify-content: center;
}
.collapse {
  width: 90%;
}

.sub {
  padding: 0.5em !important;
  padding-left: 0.6rem !important;
}
.sub h4 {
  opacity: 0.6 !important;
  font-weight: 400 !important;
}

.item {
  display: flex;
  padding: 0.6rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.item:hover {
  background-color: #f6f6f6;
}

.item h4 {
  opacity: 0.8;
  margin: 0;
  font-weight: 500;
  flex-grow: 1;
  font-size: 14px;
}

header h3 {
  margin: 0px;
}

.chat__details {
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 30rem;
  background-color: white;
  height: 100%;

  align-items: center;
}
.chat__details > h4 {
  margin-top: 14px;
  font-weight: 500;
  font-size: 1.2rem;
}
</style>
