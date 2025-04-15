import { atom } from "recoil";

export const nameState = atom({
    key: 'nameState',
    default: '',
});
let _emailState;
export const emailState = () => {
  if (!_emailState) {
    _emailState = atom({
      key: 'emailState',
      default: '',
    });
  }
  return _emailState;
};

export const idState = atom({
    key: 'idState',
    default: '',
});