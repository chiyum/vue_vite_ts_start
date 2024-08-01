<script setup lang="ts">
import { isNil, defaultTo, path } from "ramda";

const route = useRoute();

const layout = computed(() => {
  /* 一開始都是 undefined */
  /* isNil為檢查空值，為null或undefined則return null */
  if (isNil(route?.path)) return null;
  /*
    拿設定的 layout。
    通常預設是layout-default，但如果該頁面沒有設定layout，則會使用layout-error 
    defaultTo 設定預設值
    path 取得物件的值 相當於route.meta.layout
   */
  const currentLayout = defaultTo("layout-error")(
    path(["meta", "layout"], route)
  );
  // defaulto的功用就是給預設值
  // 這邊的用法是先設定defaultTo預設值，
  // 緊接著馬上用設置好的預設值下去執行再return結果給變數
  // 所以才會是兩個（）（）分別代表執行了兩次fn，設置及使用
  // 分解大概長這樣：
  // const default = defaultTo("layout-error");
  // default(path(["meta", "layout"], store.state.route))
  return currentLayout;
});
</script>

<template>
  <!-- 外層利用is載入layout -->
  <component :is="layout">
    <!-- 內層利用router顯示 透過解構賦值 取得從router-view取得的component 在把Component用在:is＝"Component"身上-->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>
