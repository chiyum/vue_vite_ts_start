import { getImageUrl } from "@/utils/getImageUrl";
import { isNil } from "ramda";

export default {
  mounted(el, binding) {
    const defaultImage = getImageUrl("assets/vue.svg");
    /** 為空值則給預設圖片 */
    if (el.src === "" || isNil(el.src)) {
      el.src = defaultImage;
    }
    /** 原先圖片載入失敗也給預設圖片 */
    el.onerror = () => {
      const fallbackImage = binding.value || defaultImage;
      el.src = fallbackImage;
    };
  }
};
