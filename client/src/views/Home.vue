<template>
  <section class="login">
    <div class="login__form">
      <it-input suffix-icon="remove_red_eye" />
      <it-button type="primary">Button</it-button>
    </div>
  </section>
</template>

<style scoped>
.login__form {
  display: inline-grid;
  gap: 1rem;
}

.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>
