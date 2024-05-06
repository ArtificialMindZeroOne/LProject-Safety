import style from './editAvatarModal.module.css';
import { useEffect, useRef, useState } from 'react';
import closeBtnImg from '../../../assets/close-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { action_Set_Avatar_Link, action_Open_Modal_Avatar } from '../../../store/actionCreators/actionCreators';
import { IInitialState } from '../../../store/initialState';
import { editAvatar } from '../../../api/api';

function AvatarModalWindow() {
  const dispatch = useDispatch();
  const popup = useSelector((state: IInitialState) => state.avatarModal);
  const add_card_title = useRef<HTMLInputElement | null>(null);
  const add_card_url = useRef<HTMLInputElement | null>(null);
  const validationUrl = useRef<HTMLSpanElement | null>(null);
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  const [errorUrl, setErrorUrl] = useState(false);
  const [url, setUrl] = useState('');

  const handelPopupOpen = () => {
    dispatch(action_Open_Modal_Avatar(false));
    setSaveDisabled(true);
    setTimeout(() => {
      setUrl('');
      if (validationUrl.current) {
        validationUrl.current.textContent = '';
        setErrorUrl(false);
      }
    }, 300);
  };

  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        handelPopupOpen();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    if (add_card_url.current) {
      setUrl(add_card_url.current.value);
    }
    if (url.length >= 2 && url.startsWith('http')) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [url]);

  useEffect(() => {
    setTimeout(() => {
      if (add_card_title.current && add_card_url.current) {
        add_card_title.current.value = '';
        add_card_url.current.value = '';
      }
    }, 300);
  }, []);

  const handleAddCard = (e: any) => {
    e.preventDefault();
    if (add_card_url.current && add_card_url.current.value) {
      editAvatar({
        avatar: add_card_url.current.value,
      })
        .then((res) => {
          console.log(res);
          dispatch(action_Set_Avatar_Link(res.avatar));
          dispatch(action_Open_Modal_Avatar(false));
          setUrl('');
        })
        .catch((err) => {
          if (validationUrl.current) {
            validationUrl.current.textContent = err;
            setErrorUrl(true);
          }
        });
    }
  };

  const urlChange = (e: any) => {
    setUrl(e.target.value);
    if (e.target.value.length < 1) {
      if (validationUrl.current) {
        validationUrl.current.textContent = 'Заполните это поле.';
        setErrorUrl(true);
      }
    } else if (!e.target.value.startsWith('http')) {
      if (validationUrl.current) {
        validationUrl.current.textContent = 'Введите URL.';
        setErrorUrl(true);
      }
    } else if (e.target.value.startsWith('http')) {
      if (validationUrl.current) {
        validationUrl.current.textContent = '';
        setErrorUrl(false);
      }
    }
  };

  return (
    <>
      <div className={`${style.popup} ${popup ? style.popup_visible : ''}`}>
        <div className={style.popup_background} onClick={handelPopupOpen}></div>
        <div className={style.popup_main}>
          <h2>Обновить аватар</h2>
          <form className={style.popup_main_form}>
            <input
              type="text"
              className={`${style.form_input} ${errorUrl ? style.form_input_error : ''}`}
              placeholder="Ссылка на картинку"
              ref={add_card_url}
              onChange={urlChange}
              value={url}
            ></input>
            <span className={style.validationName} ref={validationUrl}></span>
            <button
              type="submit"
              onClick={handleAddCard}
              className={`${style.add_card_sbm_btn} ${isSaveDisabled ? '' : style.add_card_sbm_btn_disabled}`}
            >
              Добавить
            </button>
          </form>
        </div>
        <div className={style.closeBtnImgBlock}>
          <button type="button" className={style.closeBtnImg} onClick={handelPopupOpen}>
            <img src={closeBtnImg} className={style.closeBtnImgIcon}></img>
          </button>
        </div>
      </div>
    </>
  );
}

export default AvatarModalWindow;
