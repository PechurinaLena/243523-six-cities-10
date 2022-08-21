import {FC} from 'react';

import {Offer} from 'types/offers';

export type HostCardProps = {
  currentOffer: Offer
}

export const HostCard: FC<HostCardProps> = ({currentOffer}) => (
  <div className="property__host">
    <h2 className="property__host-title">Meet the host</h2>
    <div className="property__host-user user">
      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
        <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74"
          height="74"
          alt="Host avatar"
        />
      </div>
      <span className="property__user-name">
        {currentOffer.host.name}
      </span>
      {currentOffer.host.isPro &&
        <span className="property__user-status">
                      Pro
        </span>}
    </div>
    <div className="property__description">
      <p className="property__text">
        {currentOffer.description}
      </p>
    </div>
  </div>
);

export default HostCard;
