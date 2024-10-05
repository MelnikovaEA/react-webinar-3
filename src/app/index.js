import {Routes, Route, useNavigate} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Authentication from "./authentication";
import Profile from './profile';
import {useEffect} from "react";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isAuth: state.profile.isAuth,
    waiting: state.profile.waiting,
  }));

  const activeModal = useSelector(state => state.modals.name);

  //если пользователь не авторизован - перенаправление на страницу авторизации
  useEffect(() => {
    if (!select.isAuth && select.waiting) {
      navigate(`/login`);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Authentication />} />
        <Route path={'/profile/:id'} element={<Profile />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
