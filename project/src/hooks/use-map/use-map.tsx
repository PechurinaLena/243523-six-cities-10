import {MutableRefObject, useEffect, useRef, useState} from 'react';
import L, {Map, TileLayer} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {City} from 'types/offers';
import {cities} from 'mocks/cities';

export const useMap = (currentCity: City, mapRef: MutableRefObject<HTMLElement | null>): Map | null => {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const [currentCityOffer, setCurrentCityOffer] = useState<string>(currentCity.name);

  const currentPoint = cities.find((city) => city.name === currentCity.name);

  if (currentPoint) {
    if (currentPoint?.name !== currentCityOffer) {
      map?.setView(new L.LatLng(currentPoint.location.latitude, currentPoint.location.longitude), currentPoint.location.zoom);
      setCurrentCityOffer(currentPoint.name);
    }
  }

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && currentPoint && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: currentPoint.location.latitude,
          lng: currentPoint.location.longitude,
        },
        zoom: currentPoint.location.zoom,
      });

      new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(instance);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, currentPoint]);

  return map;
};

export default useMap;
