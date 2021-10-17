<template>
  <aside class="contacts">
    <header>
      <it-input
        v-model="inputValue"
        suffix-icon="search"
        placeholder="Search"
      />
    </header>
    <div style="padding: 0 0.8rem">
      <template v-for="(user, i) in users" :key="i">
        <Contact
          @click="getMessages(user.id)"
          :lastMessage="user.lastMessage"
          :avatar="user.avatar"
          :name="user.name"
          :userid="user.id"
          :unreadMessages="user.properties.unreadMessages"
          :lastMessageDate="user.lastMessageDate"
        ></Contact>
      </template>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import Contact from '../components/Contact.vue';
import { useStore } from 'vuex';
import { ActionTypes } from '../store/users/actions';
import { useRouter } from 'vue-router';
import { IUser } from '../types/rooms';
import { Loading } from '../types/loading';
import { MutationType } from '../store/users/mutations';
import { equal } from '../equal-vue';

export default defineComponent({
  components: {
    Contact,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const $loading = inject('loading') as Loading;

    const app = equal();

    const getMessages = (id: number) => {
      const loading = $loading(document.querySelector('.chat__container')!, {
        radius: 22,
        stroke: 3.4,
        color: '#0A84FF',
        background: '#f9fafb',
      });

      store
        .dispatch(`users/${ActionTypes.getUserMessages}`, id)
        .then(() => {
          loading.destroy();
          store.commit(`users/${MutationType.SELECT_USER}`, id);
          router.push(`/chat/${id}`);
        })
        .catch(err => {
          app.$Message.danger({ text: err.message });
        });
    };

    const users = computed(() => {
      return (store.state.users.users as IUser[]).sort((a, b) => {
        if (a.properties.unreadMessages > b.properties.unreadMessages) {
          return -1;
        }
        if (a.properties.unreadMessages < b.properties.unreadMessages) {
          return 1;
        }
        return 0;
      });
    });

    return {
      users,
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
  width: 33rem;
  background-color: white;
  height: 100%;
  transition: all 0.18s;
}

.contacts header {
  display: flex;
  padding: 1rem 1rem 0rem;
}

.contacts header > div {
  width: 100%;
}
.contacts h3 {
  font-weight: 400;
  font-size: 16px;
}
</style>
