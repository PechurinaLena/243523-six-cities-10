import {FC, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {Icon, Marker} from 'leaflet';

import useMap from 'hooks/use-map';
import {City, Offer} from 'types/offers';
import {AppRoute} from 'enums';
import {getTransformedRoute} from 'utils';

const defaultIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export type CitiesMapProps = {
  cityOffers: Offer[];
  currentCity: City;
  selectedCard?: number;
}

export const CitiesMap: FC<CitiesMapProps> = ({cityOffers, selectedCard, currentCity}) => {
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const map = useMap(currentCity, mapRef);

  useEffect(() => {
    if (map) {
      const markers: Marker[] = [];
      const zoom = 12;
      cityOffers.forEach(({location, id, title}) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        }).bindPopup(title, {
          closeButton: false
        });
        map.flyTo([location.latitude, location.longitude], zoom);
        markers.push(marker);
        marker
          .setIcon(
            selectedCard === id && selectedCard !== undefined
              ? currentIcon
              : defaultIcon
          )
          .addTo(map);
        marker.on('click', () => navigate(getTransformedRoute(`${AppRoute.Room}/${id}`)));
        marker.on('mouseover', () => marker.openPopup());
      });
      return () => markers.forEach((marker) => map.removeLayer(marker));
    }
  }, [map, navigate, cityOffers, selectedCard]);

  return (
    <div data-testid="map" style={{height: '100%'}} ref={mapRef}></div>
  );
};

export default CitiesMap;
