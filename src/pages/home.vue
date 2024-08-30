<script setup lang="ts">
import axios from "@/axios";
// import { awaitAxios } from "@/axios";
import GradientBorderBox from "@/components/gradient-border-box.vue";
defineOptions({
  layout: "layout-default"
});

const { t } = useI18n();

/** axios範例用法 */
const test = async () => {
  console.log("test12");
  const res = await axios.get("/api/get", { params: { name: "test" } });
  // const res = await awaitAxios("post", "/api/example", { nam1e: "test" });
  console.log(res, "res");
};
test();
</script>

<template>
  <div>
    <q-card class="home-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        <div class="box">
          <GradientBorderBox
            height="65px"
            border-radius="16px"
            wrap-border-radius="28px"
            border-width="4px"
            background="linear-gradient(0deg, rgba(252,166,17,1) 0%, rgba(255,246,184,1) 100%)"
            border-color="linear-gradient(180deg, rgba(252,166,17,1) 0%, rgba(255,246,184,1) 100%)"
          ></GradientBorderBox>
        </div>
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
  width: 400px;
  background: #eeeeee;
}

.box {
  border-radius: 28px;
  border: #ffffff 5px solid;
  box-shadow: #e2a307 0.5px 0.5px 0.5px;
}
</style>
