<script setup lang="ts">
// import axios from "@/axios";
// import { awaitAxios } from "@/axios";
defineOptions({
  layout: "layout-default"
});

const { t } = useI18n();

/** axios範例用法 */
// const test = async () => {
//   console.log("test12");
//   const res = await axios.post("/api/example", { n1ame: "test" });
//   const res = await awaitAxios("post", "/api/example", { nam1e: "test" });
//   console.log(res, 'res');
// };
// test();
</script>

<template>
  <div>
    <q-card class="home-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ t("global.hello") }}
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped>
.home-card {
  margin: 20px;
  width: 300px;
}
</style>
