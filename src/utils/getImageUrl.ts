export const getImageUrl = (router: string): string => {
  return new URL(`../assets/images/${router}`, import.meta.url).href;
};

export default getImageUrl;
