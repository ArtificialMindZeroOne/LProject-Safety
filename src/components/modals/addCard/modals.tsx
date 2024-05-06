import style from './modals.module.css';
import { useEffect, useRef, useState } from 'react';
import closeBtnImg from '../../../assets/close-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { action_Close_Popup, action_Add_Card } from '../../../store/actionCreators/actionCreators';
import { IInitialState } from '../../../store/initialState';
import { addNewCard } from '../../../api/api';

function ModalWindow() {
  const dispatch = useDispatch();
  const popup = useSelector((state: IInitialState) => state.popup);
  const add_card_title = useRef<HTMLInputElement | null>(null);
  const add_card_url = useRef<HTMLInputElement | null>(null);
  const validationName = useRef<HTMLSpanElement | null>(null);
  const validationUrl = useRef<HTMLSpanElement | null>(null);
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  const [errorName, setErrorName] = useState(false);
  const [errorUrl, setErrorUrl] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handelPopupOpen = () => {
    dispatch(action_Close_Popup(false));
    setSaveDisabled(true);
    setTimeout(() => {
      setTitle('');
      setUrl('');
      if (validationName.current) {
        validationName.current.textContent = '';
        setErrorName(false);
      }
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
    if (add_card_title.current && add_card_url.current) {
      setTitle(add_card_title.current.value);
      setUrl(add_card_url.current.value);
    }
    if (title.length >= 2 && url.length >= 2 && url.startsWith('http')) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [title, url]);

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
    if (add_card_title.current && add_card_url.current && add_card_title.current.value.length >= 2 && add_card_url.current.value) {
      addNewCard({
        name: add_card_title.current.value,
        link: add_card_url.current.value,
      })
        .then((res) => {
          dispatch(action_Add_Card(res));
          dispatch(action_Close_Popup(false));
          setTitle('');
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
          <h2>Добавить карточку</h2>
          <form className={style.popup_main_form}>
            <input
              type="text"
              className={`${style.form_input} ${errorName ? style.form_input_error : ''}`}
              placeholder="Название"
              ref={add_card_title}
              onChange={nameChange}
              value={title}
            ></input>
            <span className={style.validationName} ref={validationName}></span>
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

export default ModalWindow;
