export default {
  // 钩子函数，当指令绑定到元素上时调用
  mounted(el, binding) {
    // 确保传入的值是一个函数
    if (typeof binding.value !== "function") {
      console.warn(`Expect a function, got ${typeof binding.value}`);
      return;
    }

    // 创建一个点击事件处理器
    const clickOutsideHandler = (event) => {
      // 检查点击事件的目标是否是该元素本身或其子元素
      if (!el.contains(event.target)) {
        // 调用绑定的值作为函数
        binding.value(event);
      }
    };

    // 将事件处理器绑定到元素上，以便稍后卸载时可以引用
    el.__clickOutsideHandler__ = clickOutsideHandler;

    // 添加点击事件监听器到 window
    window.addEventListener("click", clickOutsideHandler);
  },
  // 当指令与元素解绑时调用
  unmounted(el) {
    // 移除事件监听器
    if (el.__clickOutsideHandler__) {
      window.removeEventListener("click", el.__clickOutsideHandler__);
      el.__clickOutsideHandler__ = null;
    }
  }
};
