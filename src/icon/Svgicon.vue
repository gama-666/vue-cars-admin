<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName" />
  </svg>
</template>
<script>
import { computed } from "@vue/composition-api";

export default {
  name: "svgIcon",
  //props: ["iconName", "className"],
  props: {
    iconName: {
      type: String,
      default: "qqq"
    },
    className: {
      type: String
    }
  },
  setup(props) {
    const svgName = computed(() => `#icon-${props.iconName}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      svgName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>