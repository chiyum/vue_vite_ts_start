/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* https://www.kancloud.cn/yunye/axios/234845 */
import type { AxiosError } from "axios";
import axios from "axios";
// import logger from "@/interceptors/logger";
import auth from "@/interceptors/auth";
import transfer from "@/interceptors/transfer";
const instance = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API || "",
  timeout: 10 * 1000, // 請求超時時間 10 秒
  withCredentials: false, // 是否携帶cookie
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*" //允許跨域
  }
});

/* 狀態碼錯誤範圍 */
instance.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300; // 默認設定
};

/** middleware */
// if (import.meta.env.DEV) {
//   /** console */
//   logger.use(instance);
// }

/** 寫入 Bearer token */
auth.use(instance);

/* 將資料轉換成需要的格式 */
transfer.use(instance);

/** 第二種用法 封裝好的用法 */
export const request = {
  get<T = any>(url: string, data?: any, options: any = {}): Promise<T> {
    return request.request("GET", url, { params: data }, options);
  },
  post<T = any>(url: string, data?: any, options: any = {}): Promise<T> {
    return request.request("POST", url, { data }, options);
  },
  put<T = any>(url: string, data?: any): Promise<T> {
    return request.request("PUT", url, { data });
  },
  delete<T = any>(url: string, data?: any): Promise<T> {
    return request.request("DELETE", url, { params: data });
  },
  request<T = any>(method = "GET", url: string, data?: any, options?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      instance({ method, url, ...data, ...options })
        .then((res) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  },
  awaitGet<T = any>(url: string, data?: any, options: any = {}): any {
    return new Promise((resolve, reject) => {
      request
        .request("GET", url, { params: data }, options)
        .then((r) => resolve(r))
        .catch((err) => resolve(err.response));
    });
  },
  awaitPost<T = any>(url: string, data?: any, options?: any): any {
    return new Promise((resolve, reject) => {
      request
        .request("POST", url, { data }, options)
        .then((r) => resolve(r))
        .catch((err) => resolve(err.response));
    });
  }
};

/** 特殊axios 永遠response都會是then */
export const awaitAxios = <T = any>(
  method = "GET",
  url: string,
  data?: any,
  options?: any
): Promise<T> => {
  return new Promise((resolve, reject) => {
    instance({ method, url, data, ...options }) // 更正 data 的传递方式
      .then((res) => {
        resolve(res.data as T);  // 通常我们只需要从响应中获取 data 属性
      })
      .catch((e: AxiosError) => {
        resolve(e.response.data as T);  // 使用 reject 而不是 resolve 来处理错误
      });
  });
};

export default instance;
