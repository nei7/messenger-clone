<template>
  <section class="login">
    <div class="login__form" ref="form">
      <div class="header">
        <h2>Login</h2>
      </div>

      <it-input
        placeholder="Type your email here"
        v-model="email"
        :ref="el => (fields.email = el)"
      />
      <it-input
        placeholder="Type your password here"
        type="password"
        v-model="password"
        :ref="el => (fields.password = el)"
      />
      <it-button type="primary" style="margin-top:1rem" @click="login"
        >Submit</it-button
      >
      <router-link
        :to="{ name: 'Register' }"
        style="margin-top:1rem; cursor:pointer; text-decoration:none;color:black"
        >I don't have account</router-link
      >
    </div>
  </section>
</template>
<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref, inject } from 'vue';
import api from '../api';
import * as Yup from 'yup';
import { equal } from '../equal-vue';
import { AxiosResponse } from 'axios';
import { useStore } from 'vuex';
import { MutationType } from '../store/user/mutations';
import { useRouter } from 'vue-router';
import { Socket } from 'socket.io-client';
import { ActionTypes } from '../store/users/actions';
import { MutationType as UsersMutationType } from '../store/users/mutations';

type Fields = { [index: string]: ComponentPublicInstance };

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const app = equal();
    const fields = ref<Fields>({});

    const email = ref('');
    const password = ref('');

    const socket = inject('socket') as Socket;

    const schema = Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Must be a valid email'),
      password: Yup.string().required('Password is required'),
    });

    const login = async () => {
      try {
        await schema.validateSync(
          { email: email.value, password: password.value },
          { abortEarly: false },
        );

        const { data } = await api.post<
          unknown,
          AxiosResponse<{
            token: string;
            email: string;
            name: string;
            id: string;
          }>
        >('auth/login', {
          email: email.value,
          password: password.value,
        });

        store.commit(`user/${MutationType.SET_USER}`, data);
        api.defaults.headers = {
          authorization: 'Bearer ' + data.token,
        };

        socket.emit('authenticate', data.token);

        await store.dispatch(`users/${ActionTypes.getUsers}`);
        await store.dispatch(`users/${ActionTypes.getUserMessages}`, data.id);
        store.commit(`users/${UsersMutationType.SELECT_USER}`, data.id);

        router.push('/chat/' + data.id);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Object.keys(fields.value).forEach(key => {
            const field = fields.value[key].$.props;

            const v = err.inner || err.response.data?.errors;

            const error = v.find(
              (error: { path: string }) => error.path === key,
            );
            if (error) {
              field.status = 'danger';
              field.message = error.message || error.error;
            } else {
              field.status = undefined;
              field.message = undefined;
            }
          });
          return;
        }
        if ('response' in err) {
          const res = err.response.data;
          return app.$Message.danger({ text: res.error || res.message });
        }
        app.$Message.danger({ text: err.message });
      }
    };

    return {
      email,
      password,
      fields,
      login,
    };
  },
});
</script>

<style>
.login__form {
  display: grid;
  justify-items: center;
  gap: 1rem;
  background-color: white;
  padding: 3rem 4rem;
  border-radius: 0.5rem;
}
.login__form h2 {
  margin: 0px;
}

.login__form .it-input-prefix-wrapper {
  width: 20rem;
}
.login__form .header {
  padding: 1rem;
}

.login__form p,
a {
  margin-top: 7px;
  font-size: 0.9rem;
  opacity: 0.7;
}

.login {
  background-color: #f9fafb;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
