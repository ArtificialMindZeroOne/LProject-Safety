import style from './cards.module.css';
import { useEffect } from 'react';
import { getCards, addLike, deleteLike, deleteCard } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import ReactLoading from 'react-loading';
import myOwnerId from '../../constants/constants';
import { IInitialState } from '../../store/initialState';
import { useDispatch, useSelector } from 'react-redux';
import {
  action_Add_Cards,
  action_Change_Loader,
  action_Delete_Card,
  action_Change_My_Like,
  action_Open_Popup_Img,
  action_Set_Link_Img_Modal,
  action_Set_Title_Img_Modal,
} from '../../store/actionCreators/actionCreators';

function Cards() {
  const dispatch = useDispatch();
  const data = useSelector((state: IInitialState) => state.cards);
  const loader = useSelector((state: IInitialState) => state.loader);

  const getData = async () => {
    try {
      dispatch(action_Change_Loader(false));
      const cardsData = await getCards();
      dispatch(action_Add_Cards(cardsData));
    } catch (error) {
      console.error('Ошибка при получении карточек:', error);
    } finally {
      setTimeout(() => {
        dispatch(action_Change_Loader(true));
      }, 1900);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLikeClick = async (cardId: string) => {
    const card = data.find((card: any) => card._id === cardId);
    if (card) {
      const hasLike = card.likes.some((like: any) => like._id === myOwnerId);
      try {
        if (hasLike) {
          await deleteLike(cardId);
          dispatch(action_Change_My_Like(cardId));
        } else {
          await addLike(cardId);
          dispatch(action_Change_My_Like(cardId));
        }
      } catch (error) {
        console.error('Ошибка при обработке лайка:', error);
      }
    }
  };

  const deleteChoosenCard = async (id: string) => {
    try {
      await deleteCard(id);
      dispatch(action_Delete_Card(id));
    } catch (error) {
      console.error('Ошибка при удалении карточки:', error);
    }
  };

  const openImgModal = (link: string, name: string) => {
    dispatch(action_Open_Popup_Img(true));
    dispatch(action_Set_Link_Img_Modal(link));
    dispatch(action_Set_Title_Img_Modal(name));
  };

  return (
    <>
      <div className={style.cardsBlock}>
        {loader ? (
          data.map((el: any) => {
            return (
              <article className={style.article} key={uuidv4()}>
                <button
                  type="button"
                  className={`${style.basket_delete} ${el.owner && el.owner._id === myOwnerId && style.my_card}`}
                  onClick={() => deleteChoosenCard(el._id)}
                ></button>
                <img src={el.link} className={style.img} alt={el.name} onClick={() => openImgModal(el.link, el.name)} />
                <div className={style.articleTitleBlock}>
                  <span>{el.name}</span>
                  <span className={style.likes}>
                    {el.likes && (
                      <>
                        <button
                          type="button"
                          className={`${style.like} ${el.likes.some((el: any) => el._id === myOwnerId) ? style.like_active : ''}`}
                          onClick={() => handleLikeClick(el._id)}
                        ></button>
                        {el.likes.length}
                      </>
                    )}
                  </span>
                </div>
              </article>
            );
          })
        ) : (
          <div className={style.loaderBlock}>
            <h2>Идет загрузка карточек...</h2>
            <ReactLoading type={`spin`} color={`#65dfff`} className={style.loader} />
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
