<template>
  <section class="login">
    <div class="login__form">
      <div class="header">
        <h2>Welcome</h2>
        <p>Here you can create your account</p>
      </div>

      <it-input placeholder="Type your username here" />
      <it-input placeholder="Type your email here" />
      <it-input placeholder="Type your password here" />
      <it-button type="primary" style="margin-top:1rem">Submit</it-button>
    </div>
  </section>
</template>

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

.header p {
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
