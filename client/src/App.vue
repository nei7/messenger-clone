<template>
  <div>
    <transition
      enter-active-class="animated fadeIn"
      enter-class="animated fadeIn"
      enter-to-class="animated fadeIn"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>
