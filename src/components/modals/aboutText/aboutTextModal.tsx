import style from './aboutTextModal.module.css';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialState } from '../../../store/initialState';
import { action_Open_Modal_About, action_Set_Title, action_Set_About } from '../../../store/actionCreators/actionCreators';
import closeBtnImg from '../../../assets/close-icon.svg';
import { setUserData } from '../../../api/api';

const AboutTextModal = () => {
  const dispatch = useDispatch();
  const titleFromState = useSelector((state: IInitialState) => state.title);
  const aboutFromState = useSelector((state: IInitialState) => state.about);
  const aboutModal = useSelector((state: IInitialState) => state.aboutModal);
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const me_title = useRef<HTMLInputElement | null>(null);
  const me_about = useRef<HTMLInputElement | null>(null);
  const validationName = useRef<HTMLSpanElement | null>(null);
  const validationAbout = useRef<HTMLSpanElement | null>(null);
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  const [errorName, setErrorName] = useState(false);
  const [errorAbout, setErrorAbout] = useState(false);

  const handelPopupOpen = () => {
    dispatch(action_Open_Modal_About(false));
    setSaveDisabled(true);
    setTimeout(() => {
      if (validationName.current) {
        validationName.current.textContent = '';
        setErrorName(false);
      }
      if (validationAbout.current) {
        validationAbout.current.textContent = '';
        setErrorAbout(false);
      }
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      if (me_title.current && me_about.current) {
        me_title.current.value = titleFromState;
        me_about.current.value = aboutFromState;
      }
    }, 300);
  }, [aboutModal]);

  useEffect(() => {
    if (me_title.current && me_about.current) {
      setTitle(me_title.current.value);
      setAbout(me_about.current.value);
    }
    if (title.length >= 2 && about.length >= 2) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [title, about]);

  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        handelPopupOpen();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const handleSaveAbout = (e: any) => {
    e.preventDefault();
    if (title.length >= 2 && about.length >= 2) {
      setUserData({
        name: title,
        about: about,
      }).then((res) => {
        dispatch(action_Set_Title(res.name));
        dispatch(action_Set_About(res.about));
        handelPopupOpen();
      });
    }
  };

  const nameChange = (e: any) => {
    setTitle(e.target.value);
    if (e.target.value.length < 1) {
      if (validationName.current) {
        validationName.current.textContent = 'Заполните это поле.';
        setErrorName(true);
      }
    } else if (e.target.value.length === 1) {
      if (validationName.current) {
        validationName.current.textContent = 'Текст должен быть не короче 2 симв. Длина текста сейчас: 1 символ.';
        setErrorName(true);
      }
    } else if (e.target.value.length > 1) {
      if (validationName.current) {
        validationName.current.textContent = '';
        setErrorName(false);
      }
    }
  };

  const aboutChange = (e: any) => {
    setAbout(e.target.value);
    if (e.target.value.length < 1) {
      if (validationAbout.current) {
        validationAbout.current.textContent = 'Заполните это поле.';
        setErrorAbout(true);
      }
    } else if (e.target.value.length === 1) {
      if (validationAbout.current) {
        validationAbout.current.textContent = 'Текст должен быть не короче 2 симв. Длина текста сейчас: 1 символ.';
        setErrorAbout(true);
      }
    } else if (e.target.value.length > 1) {
      if (validationAbout.current) {
        validationAbout.current.textContent = '';
        setErrorAbout(false);
      }
    }
  };

  return (
    <>
      <div className={`${style.popup} ${aboutModal ? style.popup_visible : ''}`}>
        <div className={style.popup_background} onClick={handelPopupOpen}></div>
        <div className={style.popup_main}>
          <h2>Редактировать профиль</h2>
          <form className={style.popup_main_form}>
            <input
              type="text"
              className={`${style.form_input} ${errorName ? style.form_input_error : ''}`}
              placeholder="Имя"
              ref={me_title}
              minLength={2}
              onChange={nameChange}
            ></input>
            <span className={style.validationName} ref={validationName}></span>
            <input
              type="text"
              className={`${style.form_input} ${errorAbout ? style.form_input_error : ''}`}
              placeholder="Описание"
              ref={me_about}
              minLength={2}
              onChange={aboutChange}
            ></input>
            <span className={style.validationAbout} ref={validationAbout}></span>
            <button
              type="submit"
              onClick={handleSaveAbout}
              className={`${style.add_card_sbm_btn} ${isSaveDisabled ? '' : style.add_card_sbm_btn_disabled}`}
            >
              Сохранить
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
};

export default AboutTextModal;
