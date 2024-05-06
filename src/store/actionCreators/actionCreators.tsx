import {
  OPEN_POPUP,
  CLOSE_POPUP,
  ADD_CARDS,
  CHANGE_LOADER,
  DELETE_CARD,
  ADD_CARD,
  CHANGE_MY_LIKE,
  OPEN_POPUP_IMG,
  IMG_LINK_MODAL,
  IMG_TITLE_MODAL,
  SET_AVATAR_LINK,
  SET_TITEL,
  SET_ABOUT,
  ABOUT_MODAL_OPEN,
  AVATAR_MODAL_OPEN,
} from '../actions/actions';

interface IAddCard {
  _id: string;
  link: string;
  name: string;
  likes: {
    _id: string;
  }[];
  owner: {
    _id: string;
  };
}

export function action_Open_Popup(value: boolean) {
  return {
    type: OPEN_POPUP,
    payload: value,
  };
}

export function action_Close_Popup(value: boolean) {
  return {
    type: CLOSE_POPUP,
    payload: value,
  };
}

export function action_Add_Cards(value: Object[]) {
  return {
    type: ADD_CARDS,
    payload: value,
  };
}

export function action_Change_Loader(value: boolean) {
  return {
    type: CHANGE_LOADER,
    payload: value,
  };
}

export function action_Delete_Card(value: string) {
  return {
    type: DELETE_CARD,
    payload: value,
  };
}

export function action_Add_Card(value: IAddCard) {
  return {
    type: ADD_CARD,
    payload: value,
  };
}

export function action_Change_My_Like(value: string) {
  return {
    type: CHANGE_MY_LIKE,
    payload: value,
  };
}

export function action_Open_Popup_Img(value: boolean) {
  return {
    type: OPEN_POPUP_IMG,
    payload: value,
  };
}

export function action_Set_Link_Img_Modal(value: string) {
  return {
    type: IMG_LINK_MODAL,
    payload: value,
  };
}

export function action_Set_Title_Img_Modal(value: string) {
  return {
    type: IMG_TITLE_MODAL,
    payload: value,
  };
}

export function action_Set_Avatar_Link(value: string) {
  return {
    type: SET_AVATAR_LINK,
    payload: value,
  };
}

export function action_Set_Title(value: string) {
  return {
    type: SET_TITEL,
    payload: value,
  };
}

export function action_Set_About(value: string) {
  return {
    type: SET_ABOUT,
    payload: value,
  };
}

export function action_Open_Modal_About(value: boolean) {
  return {
    type: ABOUT_MODAL_OPEN,
    payload: value,
  };
}
export function action_Open_Modal_Avatar(value: boolean) {
  return {
    type: AVATAR_MODAL_OPEN,
    payload: value,
  };
}
