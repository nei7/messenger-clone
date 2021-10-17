<template>
  <div class="main">
    <Contacts></Contacts>
    <Chat></Chat>
    <aside class="chat__details">
      <it-avatar
        size="4rem"
        :src="`https://avatars.dicebear.com/api/` + user.avatar"
      />

      <h4 style="margin-bottom: 2rem">
        {{ user.name }}
      </h4>
      <div class="collapse">
        <Collapse
          :item="{
            name: 'info',
            subitems: [
              {
                name: 'Account created ' + user.createdAt,
              },
            ],
          }"
        ></Collapse>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Chat from '../components/Chat.vue';
import Contacts from '../components/Contacts.vue';
import Collapse from '../components/Collapse.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    Collapse,
    Contacts,
    Chat,
  },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.users.selectedUser),
    };
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
