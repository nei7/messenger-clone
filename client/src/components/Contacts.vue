<template>
  <aside class="contacts">
    <header>
      <it-input
        v-model="inputValue"
        suffix-icon="search"
        placeholder="Search"
      />
    </header>
    <div style="padding: 0 0.5rem">
      <template v-for="(user, i) in users" :key="i">
        <Contact
          @click="getMessages(user.id)"
          :lastMessage="user.lastMessage"
          :avatar="user.avatar"
          :name="user.name"
        ></Contact>
      </template>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Contact from '../components/Contact.vue';
import { useStore } from 'vuex';
import { ActionTypes } from '../store/users/actions';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Contact,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    store.dispatch(`users/${ActionTypes.getUsers}`);

    const getMessages = (id: number) => {
      store.dispatch(`users/${ActionTypes.getUserMessages}`, id).then(() => {
        router.push(`/chat/${id}`);
      });
    };

    return {
      users: computed(() => store.state.users.users),
      getMessages,
    };
  },
});
</script>

<style scoped>
.contacts {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 27rem;
  background-color: white;
  height: 100%;
  transition: all 0.18s;
}

.contacts header {
  display: flex;
  padding: 1rem 1rem 0rem;
}
</style>
