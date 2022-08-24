import {FC} from 'react';
import {City} from 'types/offers';

export type MainEmptyProps = {
  currentCity: City
}

export const MainEmpty: FC<MainEmptyProps> = ({currentCity}) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in
            {' '}{currentCity.name}
          </p>
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
        </section>
      </div>
    </div>
  </div>
);

export default MainEmpty;
