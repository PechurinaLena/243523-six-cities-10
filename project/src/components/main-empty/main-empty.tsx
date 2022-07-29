import {FC} from 'react';
import {City} from 'types/offers';

export type MainEmptyProps = {
  activeCity: City
}

export const MainEmpty: FC<MainEmptyProps> = ({activeCity}) => (
  <section className="cities__no-places">
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in
        {' '}{activeCity.name}
      </p>
    </div>
  </section>
);

export default MainEmpty;
