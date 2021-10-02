<template>
  <section class="login">
    <div class="login__form" ref="form">
      <div class="header">
        <h2>Login</h2>
      </div>

      <it-input
        placeholder="Type your email here"
        v-model="email"
        :ref="(el) => (fields.email = el)"
      />
      <it-input
        placeholder="Type your password here"
        type="password"
        v-model="password"
        :ref="(el) => (fields.password = el)"
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
  <it-modal v-model="$route.query.ok">
    <template #header>
      <h3 style="margin: 0">Info</h3>
    </template>

    <template #body>
      <p>
        {{
          $route.query.ok === "false"
            ? "Account already exist"
            : "Account created succesfully"
        }}
      </p>
    </template>
    <template #actions>
      <it-button type="primary" @click="$router.replace({ ok: null })"
        >Got it</it-button
      >
    </template>
  </it-modal>
</template>
<script lang="ts">
import { ComponentPublicInstance, defineComponent, ref } from "vue";
import api from "../api";
import * as Yup from "yup";

type Fields = { [index: string]: ComponentPublicInstance };

export default defineComponent({
  setup() {
    const fields = ref<Fields>({});

    const email = ref("");
    const password = ref("");

    const schema = Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Must be a valid email"),
      password: Yup.string().required("Password is required"),
    });

    const login = async () => {
      try {
        await schema.validateSync(
          { email: email.value, password: password.value },
          { abortEarly: false }
        );
        api.post("auth/login", {
          email: email.value,
          password: password.value,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
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
        }
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
  margin-bottom: 1.5rem;
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
