import style from './imgModal.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialState } from '../../../store/initialState';
import { action_Open_Popup_Img } from '../../../store/actionCreators/actionCreators';
import closeBtnImg from '../../../assets/close-icon.svg';

const ImgModal = () => {
  const dispatch = useDispatch();
  const popup = useSelector((state: IInitialState) => state.popupImg);
  const imgLink = useSelector((state: IInitialState) => state.imgLinkModal);
  const imgName = useSelector((state: IInitialState) => state.imgTitleModal);

  const handelPopupClose = () => {
    dispatch(action_Open_Popup_Img(false));
  };

  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        handelPopupClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <>
      <div className={`${style.popup} ${popup ? style.popup_visible : ''}`}>
        <div className={style.popup_background} onClick={handelPopupClose}></div>
        <div className={style.popup_main}>
          <img src={imgLink} className={style.modalImg}></img>
          <button type="button" className={style.closeBtnImg} onClick={handelPopupClose}>
            <img src={closeBtnImg} className={style.closeBtnImgIcon}></img>
          </button>
          <span className={style.imgName}>{imgName}</span>
        </div>
      </div>
    </>
  );
};

export default ImgModal;
