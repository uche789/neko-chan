const btoa = (data: any) => Buffer.from(data).toString('base64');

const atob = (data: string) => Buffer.from(data, 'base64').toString('ascii');

declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
       btoa: Function;
       atob: Function;
    }
  }
}

const setUp = () => {
  global.btoa = btoa;
  global.atob = atob;
};

export default {
  setUp,
};
