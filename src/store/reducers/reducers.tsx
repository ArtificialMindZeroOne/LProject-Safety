import { initialState } from '../initialState';
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
import { IInitialState } from '../initialState';
import myOwnerId from '../../constants/constants';

interface IAction {
  type: string;
  payload: any;
}

export const reducer = (state: IInitialState = initialState, action: IAction) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        popup: true,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        popup: false,
      };
    case ADD_CARDS:
      return {
        ...state,
        cards: [...state.cards, ...action.payload],
      };
    case CHANGE_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: [...state.cards].filter((el) => el._id !== action.payload),
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [action.payload, ...state.cards],
      };
    case CHANGE_MY_LIKE:
      const updatedCards = state.cards.map((card: any) => {
        if (card._id === action.payload) {
          if (card.likes.some((el: any) => el._id === myOwnerId)) {
            const updatedLikes = card.likes.filter((like: any) => like._id !== myOwnerId);
            return { ...card, likes: updatedLikes };
          } else {
            return {
              ...card,
              likes: [...card.likes, { _id: myOwnerId }],
            };
          }
        }
        return card;
      });
      return { ...state, cards: updatedCards };
    case OPEN_POPUP_IMG:
      return {
        ...state,
        popupImg: action.payload,
      };
    case IMG_LINK_MODAL:
      return {
        ...state,
        imgLinkModal: action.payload,
      };
    case IMG_TITLE_MODAL:
      return {
        ...state,
        imgTitleModal: action.payload,
      };
    case SET_AVATAR_LINK:
      return {
        ...state,
        avatarHref: action.payload,
      };
    case SET_TITEL:
      return {
        ...state,
        title: action.payload,
      };
    case SET_ABOUT:
      return {
        ...state,
        about: action.payload,
      };
    case ABOUT_MODAL_OPEN:
      return {
        ...state,
        aboutModal: action.payload,
      };
    case AVATAR_MODAL_OPEN:
      return {
        ...state,
        avatarModal: action.payload,
      };
    default:
      return state;
  }
};
