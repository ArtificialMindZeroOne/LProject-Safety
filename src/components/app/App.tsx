import { useDispatch, useSelector } from 'react-redux';
import {
  action_Open_Popup,
  action_Set_Avatar_Link,
  action_Set_Title,
  action_Set_About,
  action_Open_Modal_About,
  action_Open_Modal_Avatar,
} from '../../store/actionCreators/actionCreators';
import style from './App.module.css';
import Cards from '../../components/cards/cards.tsx';
import addBtn from '../../assets/add-button.svg';
import ModalWindow from '../modals/addCard/modals.tsx';
import ImgModal from '../modals/imgModal/imgModal';
import AboutModal from '../modals/aboutText/aboutTextModal.tsx';
import { IInitialState } from '../../store/initialState';
import { getUserInfo } from '../../api/api.tsx';
import { useEffect, useRef } from 'react';
import ReactLoading from 'react-loading';
import editBtnAbout from '../../assets/edit-button.svg';
import editImg from '../../assets/edit-img.svg';
import AvatarModalWindow from '../modals/editAvatar/editAvatarModal.tsx';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state: IInitialState) => state.loader);
  const avatarHref = useSelector((state: IInitialState) => state.avatarHref);
  const titleName = useSelector((state: IInitialState) => state.title);
  const titleAbout = useSelector((state: IInitialState) => state.about);
  const avatar = useRef<HTMLImageElement | null>(null);
  const title = useRef<HTMLHeadingElement | null>(null);
  const about = useRef<HTMLHeadingElement | null>(null);

  const handelPopupOpen = () => {
    dispatch(action_Open_Popup(true));
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      dispatch(action_Set_Avatar_Link(res.avatar));
      dispatch(action_Set_Title(res.name));
      dispatch(action_Set_About(res.about));
    });
  }, []);

  const handleAboutmodal = () => {
    dispatch(action_Open_Modal_About(true));
  };

  const avatarModal = () => {
    dispatch(action_Open_Modal_Avatar(true));
  };

  return (
    <>
      <section className={style.main}>
        <h1 className={style.title}>Учебный проект</h1>
        <div className={style.topEditBlock}>
          {data ? (
            <div className={style.topEditBlockLeft}>
              <img src={avatarHref} className={style.topEditBlockLeftAvatar} ref={avatar} alt="Аватар"></img>
              <div className={style.cardAvatarEdit} onClick={avatarModal}>
                <img src={editImg} className={style.cardAvatarEditImg}></img>
              </div>
              <div>
                <div className={style.titleEditBlock}>
                  <h2 ref={title} className={style.titleName}>
                    {titleName}
                  </h2>
                  <img src={editBtnAbout} className={style.titleEditBtn} onClick={handleAboutmodal}></img>
                </div>
                <h3 ref={about} className={style.titleAbout}>
                  {titleAbout}
                </h3>
              </div>
            </div>
          ) : (
            <ReactLoading type={`bars`} color={`#65dfff`} className={style.loader} />
          )}
          <button type="button" className={style.btnOpenModalAddCard} onClick={handelPopupOpen} disabled={data ? false : true}>
            <img src={addBtn}></img>
          </button>
        </div>
        <Cards />
        <ModalWindow />
        <ImgModal />
        <AboutModal />
        <AvatarModalWindow />
        <footer className={style.copy}>&copy; Created by Artem Zalevsky</footer>
      </section>
    </>
  );
}

export default App;
