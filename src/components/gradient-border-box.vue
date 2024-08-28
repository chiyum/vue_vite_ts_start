<script setup lang="ts">
defineProps({
  background: {
    type: String,
    default:
      "linear-gradient(127deg, rgba(164,45,209,1) 0%, rgba(67,13,122,1) 100%)"
  },
  borderColor: {
    type: String,
    default:
      "linear-gradient(0deg, rgba(168,56,255,1) 0%, rgba(197,123,255,1) 50%, rgba(168,56,255,1) 100%)"
  },
  borderWidth: {
    type: String,
    default: "1px"
  },
  borderRadius: {
    type: String,
    default: "12px"
  },
  wrapBorderRadius: {
    type: String,
    default: "12px"
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  mainClass: {
    type: String,
    default: ""
  },
  useSameBorderRadius: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="gradient-border-box-border"
    :style="{
      width: width,
      height: height,
      background: borderColor,
      borderRadius: useSameBorderRadius ? borderRadius : wrapBorderRadius,
      padding: borderWidth
    }"
  >
    <div
      class="gradient-border-box-main"
      :class="mainClass"
      :style="{
        background: background,
        width: `calc(100% - ${borderWidth})`,
        height: `calc(100% - ${borderWidth})`,
        borderRadius: borderRadius
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradient-border-box-border {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
