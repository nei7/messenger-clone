<template>
  <section class="login animated fadeIn">
    <div class="login__form">
      <div class="header">
        <h2>Welcome</h2>
        <p>Here you can create your account</p>
      </div>

      <it-input
        placeholder="Type your username here"
        v-model="name"
        :ref="(el) => (fields.name = el)"
      />

      <it-input
        placeholder="Type your email here"
        v-model="email"
        :ref="(el) => (fields.email = el)"
      />

      <it-input
        placeholder="Type your password here"
        v-model="password"
        type="password"
        :ref="(el) => (fields.password = el)"
      />

      <it-button type="primary" style="margin-top:1rem" @click="login"
        >Submit</it-button
      >
      <router-link
        :to="{ name: 'Login' }"
        style="margin-top:1rem; cursor:pointer; text-decoration:none; color:black"
        >I have account</router-link
      >
      <transition name="slide-fade">
        <div v-if="loggedIn" class="loggedIn">
          <div>
            <div class="header" style="text-align:center">
              <h2>Success!</h2>
              <p>{{ message }}</p>
            </div>
            <it-button
              type="primary"
              @click="$router.push('/login')"
              style="margin:auto"
            >
              Login
            </it-button>
          </div>
        </div>
      </transition>
    </div>

    <it-modal v-model="error.show">
      <template #header>
        <h3 style="margin: 0">Error</h3>
      </template>

      <template #body>
        <p>{{ error.message }}</p>
      </template>
      <template #actions>
        <it-button type="primary" @click="error.show = false">ok</it-button>
      </template>
    </it-modal>
  </section>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  ComponentPublicInstance,
  inject,
} from "vue";
import * as Yup from "yup";
import api from "../api";
import { Loading } from "../types/loading";

type Fields = { [index: string]: ComponentPublicInstance };

export default defineComponent({
  setup() {
    const $loading = inject("loading") as Loading;

    const fields = ref<Fields>({});
    const loggedIn = ref(false);
    const message = ref("");
    let error = reactive({
      show: false,
      message: "",
    });

    const loginData = reactive({
      name: "",
      email: "",
      password: "",
    });

    const schema = Yup.object().shape({
      name: Yup.string().required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Must be a valid email"),
      password: Yup.string().min(5, "Password must be at least 5 characters"),
    });

    const login = async () => {
      let loading;
      try {
        await schema.validateSync(loginData, { abortEarly: false });

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        loading = $loading(document.querySelector(".login__form")!, {
          radius: 25,
          stroke: 3,
          color: "#0A84FF",
        });
        const { data } = await api.post("auth/register", loginData);
        message.value = data.message;
        loggedIn.value = true;
      } catch (err) {
        if (err instanceof Yup.ValidationError || err?.response?.data?.errors) {
          Object.keys(fields.value).forEach((key) => {
            const field = fields.value[key].$.props;

            const v = err.inner || err.response.data?.errors;

            const error = v.find(
              (error: { path: string }) => error.path === key
            );
            if (error) {
              field.status = "danger";
              field.message = error.message || error.error;
            } else {
              field.status = undefined;
              field.message = undefined;
            }
          });
        } else {
          error.show = true;
          error.message = err?.response.data?.error ?? err.message;
        }
      } finally {
        loading?.destroy();
      }
    };

    return {
      ...toRefs(loginData),
      login,
      fields,
      loggedIn,
      message,
      error,
    };
  },
});
</script>

<style>
.loggedIn {
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  padding: 0;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
}
</style>
