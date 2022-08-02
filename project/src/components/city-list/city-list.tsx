import {FC} from 'react';
import {Link} from 'react-router-dom';

import {cities} from 'mocks/cities';
import {City} from 'types/offers';

export type CityListProps = {
  currentCity: City;
  handleClickCity: (item: City) => void
}

export const CityList: FC<CityListProps> = ({currentCity, handleClickCity}) => (
  <ul className="locations__list tabs__list">
    {cities.map((city) => (
      <li key={city.name} className="locations__item">
        <Link to={''} className={`locations__item-link tabs__item ${currentCity.name === city.name
          ? 'tabs__item--active'
          : ''}`}
        onClick={() => handleClickCity(city)}
        >
          <span>{city.name}</span>
        </Link>
      </li>
    ))}
  </ul>
);
export default CityList;
