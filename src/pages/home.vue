<script setup lang="ts">

defineOptions({
  layout: 'layout-default'
});

const { t } = useI18n();

</script>

<template>
    <div>
      <q-card class="home-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ t('global.hello') }}
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