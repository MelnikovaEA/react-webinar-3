import {Outlet} from "react-router-dom";
import Basket from './basket';
import useSelector from '../store/use-selector';
import './index.css'

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Outlet />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
