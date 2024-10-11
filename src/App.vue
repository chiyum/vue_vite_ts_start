<script setup lang="ts">
import { isNil, defaultTo, path } from "ramda";

const route = useRoute();

const isMobile = ref(false);
provide("isMobile", isMobile); // 供layout等子組件使用當前設備是否為手機

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
  const useAwd = defaultTo(false)(path(["meta", "useAwd"], route));
  const mobileLayout = currentLayout + "-mobile";
  // defaulto的功用就是給預設值
  // 這邊的用法是先設定defaultTo預設值，
  // 緊接著馬上用設置好的預設值下去執行再return結果給變數
  // 所以才會是兩個（）（）分別代表執行了兩次fn，設置及使用
  // 分解大概長這樣：
  // const default = defaultTo("layout-error");
  // default(path(["meta", "layout"], store.state.route))
  return useAwd && isMobile.value ? mobileLayout : currentLayout;
  // defaulto的功用就是給預設值
  // 這邊的用法是先設定defaultTo預設值，
  // 緊接著馬上用設置好的預設值下去執行再return結果給變數
  // 所以才會是兩個（）（）分別代表執行了兩次fn，設置及使用
  // 分解大概長這樣：
  // const default = defaultTo("layout-error");
  // default(path(["meta", "layout"], store.state.route))
});
const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768;
};

const getComponent = (vnode: VNode) => {
  if (vnode?.type && typeof vnode.type === "object") {
    const componentType = vnode.type as {
      desktop?: () => Promise<Component>;
      mobile?: () => Promise<Component>;
    };

    if ("desktop" in componentType && "mobile" in componentType) {
      // AWD 組件
      const selectedComponent = isMobile.value
        ? componentType.mobile
        : componentType.desktop;

      return defineAsyncComponent({
        loader: selectedComponent
      });
    }
  }

  // 如果不是 AWD 組件，返回原始的 vnode
  return vnode;
};

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice);
});
</script>

<template>
  <!-- 外層利用is載入layout -->
  <component :is="layout">
    <!-- 內層利用router顯示 透過解構賦值 取得從router-view取得的component 在把Component用在:is＝"Component"身上-->
    <router-view v-slot="{ Component }">
      <component :is="getComponent(Component)" />
    </router-view>
  </component>
</template>
