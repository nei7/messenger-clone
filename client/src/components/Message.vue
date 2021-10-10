<template>
  <div class="message" :class="mine ? 'mine' : null">
    <it-avatar
      color="#0a84ff"
      size="32px"
      :src="`https://avatars.dicebear.com/api/${avatar}`"
    />
    <div>
      <p>
        {{ user }} <span>{{ timestamp }}</span>
      </p>
      <div class="card">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.message > .it-avatar {
  margin-right: 10px;
  align-self: self-start;
  margin-top: 6px;
}

.message {
  align-self: flex-start;
  display: flex;
  align-items: center;
}
.mine > .it-avatar {
  display: none;
}

.mine > div > p {
  text-align: end;
}

.message > div > p {
  font-size: 14px;
  margin: 0px 2px 5px 3px;
  opacity: 0.7;
}
.message > div > p span {
  margin-left: 4px;
  font-size: 10px;
  opacity: 0.5;
}

.card {
  background-color: rgb(255, 255, 255);
  -webkit-box-shadow: 5px 5px 26px -18px rgba(0, 0, 0, 0.31);
  box-shadow: 5px 5px 26px -18px rgba(0, 0, 0, 0.31);
  padding: 0.5rem;
  border-radius: 0px 10px 10px 10px;
  width: max-content;
  word-break: break-all;
}

.card p {
  font-size: 0.9rem !important;
  opacity: 0.7;
}

.card .date {
  font-size: 0.62rem;
  -webkit-font-smoothing: antialiased;
  margin-top: 7px;
  opacity: 0.5;
  float: right;
}
.mine {
  align-self: flex-end;
}
.mine > div {
  direction: rtl;
}

.mine .card {
  color: white;
  align-self: flex-end;
  background-color: rgb(0, 132, 255);
  box-shadow: 0 2px 4px rgb(48 81 255 / 40%);
  -webkit-box-shadow: 5px 5px 26px -18px rgba(0, 0, 0, 0.31);
  box-shadow: 5px 5px 26px -18px rgba(0, 0, 0, 0.31);
  border-radius: 10px 0px 10px 10px;
}
.mine > div > p {
  display: none;
}

.mine .card p {
  opacity: 1;
  font-weight: 500 !important;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    mine: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
    },
    user: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
});
</script>
