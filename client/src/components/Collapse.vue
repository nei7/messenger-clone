<template>
  <div>
    <div class="item" @click="active = !active">
      <h4>{{ item.name }}</h4>
      <it-icon
        name="expand_more"
        :style="{ transform: active ? 'rotate(180deg)' : null }"
        outlined
      />
    </div>
    <transition-group name="fade-bottom">
      <div
        v-show="active"
        class="item sub"
        v-for="(subitem, index) in item.subitems"
        :key="index"
      >
        <h4>{{ subitem.name }}</h4>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<{
        name: string;
        icon?: string;
        subitems: Array<{ name: string }>;
      }>,
      required: true,
    },
  },
  setup(props) {
    const active = ref(props.item);

    return {
      active,
    };
  },
});
</script>

<style scoped>
.sub {
  padding: 0.5em !important;
  padding-left: 0.6rem !important;
}
.sub h4 {
  font-size: 13px !important;
  opacity: 0.6 !important;
  font-weight: 400 !important;
}

.item {
  display: flex;
  padding: 0.6rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.item:hover {
  background-color: #f6f6f6;
}

.item h4 {
  opacity: 0.8;
  margin: 0;
  font-weight: 500;
  flex-grow: 1;
  font-size: 15px;
}
</style>
