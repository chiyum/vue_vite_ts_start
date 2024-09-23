<template>
  <canvas ref="container"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

const container = ref(null);
const riveInstance = ref(null);

onMounted(() => {
  if (container.value) {
    const canvas = container.value;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    riveInstance.value = new Rive({
      src: new URL("../assets/IPWelcome_Ver5.riv", import.meta.url).href,
      canvas: canvas,
      autoplay: true,
      stateMachines: "State Machine 1",
      layout: new Layout({
        fit: Fit.Contain,
        alignment: Alignment.Center
      }),
      onLoad: () => {
        console.log("Rive file has loaded");
      },
      onStateChange: (event) => {
        console.log("State changed:", event.data[0]);
      }
    });
  }
});

onUnmounted(() => {
  if (riveInstance.value) {
    riveInstance.value.stop();
  }
});
</script>

<style lang="scss" scoped>
canvas {
  width: 500px;
  height: 700px;
}
</style>
