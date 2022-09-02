import {FC} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from 'enums';

const NotFound: FC = () => (
  <section style={{width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5'}}>
    <h1 style={{
      display: 'flex',
      justifyContent: 'center',
      fontSize: '7em',
      fontWeight: 500,
      color: 'red',
      textTransform: 'uppercase',
    }}
    >
      404 Error
    </h1>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '3% 0',
      fontSize: '24px',
      lineHeight: '1',
      fontWeight: 400,
      fontStyle: 'oblique',
      textAlign: 'center',
      color: '#000',
    }}
    >
      Страница не найдена :(
    </div>
    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
      <button style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 15px',
        fontSize: '24px',
        fontWeight: 400,
        border: '#4481c3',
        borderRadius: '30px',
        color: 'white',
        backgroundColor: '#4481c3',
      }}
      >
        <Link to={AppRoute.Root}>Вернуться на главную страницу
        </Link>
      </button>
    </div>
  </section>
);

export default NotFound;
