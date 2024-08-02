import { keys, forEach, reduce, isNil, isEmpty, assoc } from "ramda";

/**
 * 這個函數用於過濾對象中的 null 和空值。具體作用如下：
 * •	payload: 輸入的對象
 * •	rejectNil: 是否過濾 null 值
 * •	rejectEmpty: 是否過濾空值
 * 該函式遍歷 payload 的鍵，如果值為 null 或空，且對應的旗標為 true，則不將該key的值對加到結果對象中。最終返回過濾後的新資料。
 */
const _computedRejectData = (payload, { rejectNil, rejectEmpty }) =>
  reduce(
    (result, key) => {
      const value = payload[key];
      if (rejectNil && isNil(value)) return result;
      if (rejectEmpty && isEmpty(value)) return result;
      return assoc(key, value, result);
    },
    {},
    keys(payload)
  );

const transfer = {
  use(instance) {
    instance.interceptors.request.use(
      function (config) {
        const {
          rejectNil = true /** 過濾 null */,
          rejectEmpty = false /** 過濾空值 */,
          isFormData = false /** 轉換成 FormData */
        } = config;

        if (config.params) {
          config.params = _computedRejectData(config.params, {
            rejectNil,
            rejectEmpty
          });
        }

        if (config.data) {
          config.data = _computedRejectData(config.data, {
            rejectNil,
            rejectEmpty
          });

          if (isFormData) {
            const formData = new FormData();
            forEach((key) => {
              if (config.data[key] instanceof Array) {
                forEach((value) => {
                  formData.append(`${key}[]`, value);
                }, config.data[key]);
              } else {
                formData.append(key, config.data[key]);
              }
            }, keys(config.data));
            config.data = formData;
          }
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    /** response回傳 */
    instance.interceptors.response.use(
      // 狀態碼為 2xx
      async function (response) {
        return response.data;
      },
      // 狀態碼不為 2xx
      function (error) {
        return Promise.reject(error);
      }
    );
  }
};

export default transfer;
