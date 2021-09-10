<template>
  <section class="login">
    <div class="login__form">
      <div class="header">
        <h2>Welcome</h2>
        <p>Here you can create your account</p>
      </div>

      <it-input
        placeholder="Type your username here"
        v-model="username"
        :ref="(el) => (fields.username = el)"
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
    </div>
  </section>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  ComponentPublicInstance,
} from "vue";
import * as Yup from "yup";
import api from "../api";

type Fields = { [index: string]: ComponentPublicInstance };

export default defineComponent({
  setup() {
    const fields = ref<Fields>({});

    const data = reactive({
      username: "",
      email: "",
      password: "",
    });

    const schema = Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Must be a valid email"),
      password: Yup.string().min(5, "Password must be at least 5 characters"),
    });

    const login = async () => {
      try {
        await schema.validateSync(data, { abortEarly: false });

        api.post("auth/register", data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          Object.keys(fields.value).forEach((key) => {
            const field = fields.value[key].$.props;
            const error = err.inner.find(
              (error: { path: string }) => error.path === key
            );
            if (error) {
              field.status = "danger";
              field.message = error.message;
            } else {
              field.status = undefined;
              field.message = undefined;
            }
          });
        }
      }
    };

    return {
      ...toRefs(data),
      login,
      fields,
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
  width: 100%;
  margin-bottom: 1.5rem;
}

.login__form p,
a {
  margin-top: 7px;
  font-size: 0.9rem;
  opacity: 0.7;
}

.login {
  background: rgb(5, 155, 252);
  background: -moz-linear-gradient(
    -21deg,
    rgba(5, 155, 252, 0.1) 27%,
    rgba(73, 82, 255, 0.3) 100%
  );
  background: -webkit-linear-gradient(
    -21deg,
    rgba(5, 155, 252, 0.1) 27%,
    rgba(73, 82, 255, 0.3) 100%
  );
  background: linear-gradient(
    -21deg,
    rgba(5, 155, 252, 0.1) 27%,
    rgba(73, 82, 255, 0.3) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#059bfc",endColorstr="#4952ff",GradientType=1);

  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
