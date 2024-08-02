<script setup lang="ts"></script>

<template>
  <div class="layout-default">
    <div class="layout-default-header">預設layout-header</div>
    <slot />
  </div>
</template>

<style lang="scss">
.layout-default {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
