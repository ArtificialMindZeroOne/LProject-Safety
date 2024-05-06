export interface IInitialState {
  popup: boolean;
  cards: any;
  loader: boolean;
  myLike: boolean;
  popupImg: boolean;
  imgLinkModal: string;
  imgTitleModal: string;
  avatarHref: string;
  title: string;
  about: string;
  aboutModal: boolean;
  avatarModal: boolean;
}

export const initialState = {
  popup: false,
  cards: [],
  loader: false,
  myLike: false,
  popupImg: false,
  imgLinkModal: '',
  imgTitleModal: '',
  avatarHref: '',
  title: '',
  about: '',
  aboutModal: false,
  avatarModal: false,
};
