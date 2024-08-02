const files = import.meta.glob("../directives/*.ts", { eager: true });
const directives = {
  install: (app) => {
    for (const path in files) {
      const paths = path.split("/");

      const fileName = paths[paths.length - 1]
        .split(".")[0]
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase();
      app.directive(fileName, (files[path] as any).default);
      // console.log(fileName, 'filename');
    }
  }
};

export default directives;
