import {FC} from 'react';
import {Link} from 'react-router-dom';

import {cities} from 'types/const';

export const CityList: FC = () => {
  const activeLink = cities.find((item) => item === 'Amsterdam');
  const activeClass = 'locations__item-link tabs__item tabs__item--active';
  const noActiveClass = 'locations__item-link tabs__item';
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <Link to={''} className={activeLink === city ? activeClass : noActiveClass}>
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CityList;
