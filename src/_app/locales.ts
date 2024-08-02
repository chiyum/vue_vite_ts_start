// 語系處理
// @desc 抓取locales底下的所有js檔案

// 需要安裝 Ramda 的 TypeScript 類型定義
import * as R from "ramda";

interface FileModule {
  default: Record<string, string>;
}

interface Messages {
  [locale: string]: Record<string, string>;
}

const files: Record<string, FileModule> = import.meta.glob("../locales/**/*.ts", { eager: true });
const messages: Messages = {};

for (const path in files) {
  const pathToFile = path
    .replace("../locales/", "")
    .toLowerCase()
    .replace(".ts", "");
  const [locale, ...paths] = pathToFile.split("/");
  const messageKey = R.join(".", paths); // 語系key
  const fileObj = files[path].default; // 語系value
  messages[locale] = R.reduce(
    (merge: Record<string, string>, key: string) =>
      /** 合併每個 */
      R.mergeDeepRight(merge, {
        [`${messageKey}.${key}`]: fileObj[key]
      }),
    messages[locale] || {},
    R.keys(fileObj)
  );
}

export default messages;