<template>
  <div id="layout" :class="isCollpase?'close':'open'">
    <Lyaoutnav />
    <Lyaoutheader />
    <Lyaoutmain />
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
import Lyaoutheader from "./Componets/Header";
import Lyaoutmain from "./Componets/Main";
import Lyaoutnav from "./Componets/Nav";

export default {
  name: "layout",
  components: { Lyaoutheader, Lyaoutmain, Lyaoutnav },
  setup(props, { root }) {
    const isCollpase = computed(() => root.$store.state.app.isCollpase);
    return {
      isCollpase
    };
  }
};
</script>
<style lang="scss" scoped>
</style>