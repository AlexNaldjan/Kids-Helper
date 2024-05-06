import { useState } from 'react';
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from '@pbe/react-yandex-maps';
import './MapPage.css';

type Coordinates = {
  latitude: number;
  longitude: number;
};

interface ObjectData {
  name: string;
  description: string;
  address: string;
}

function MapPage() {
  const defaultState: ymaps.IMapState = {
    center: [54.43, 20.3],
    zoom: 9,
    controls: [],
  };

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [objectData, setObjectData] = useState<ObjectData | null>(null);

  const handleSearchSubmit = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=92b06eec-d656-4184-8593-80fd58df7fdf&geocode=${searchQuery}`,
      );

      const data = await response.json();

      const foundCoordinates =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(' ')
          .reverse()
          .map(parseFloat);

      const coordinates: Coordinates = {
        latitude: foundCoordinates[0],
        longitude: foundCoordinates[1],
      };
      setCoordinates(coordinates);

      const objectDataResponse =
        data.response.GeoObjectCollection.featureMember[0].GeoObject;
      const objectData: ObjectData = {
        name: objectDataResponse.name,
        description: objectDataResponse.description,
        address: objectDataResponse.metaDataProperty.GeocoderMetaData.text,
      };
      setObjectData(objectData);
    } catch (error) {
      console.error('Ошибка при поиске адреса:', error);
    }
  };

  const handleMarkerClick = () => {
    if (coordinates) {
      setObjectData({
        name: 'Название маркера',
        description: 'Описание маркера',
        address: 'Адрес маркера',
      });
    }
  };

  return (
    <div className="map-page">
      <div className="map-container">
        <YMaps query={{ lang: 'ru_RU' }}>
          <div style={{ width: '600px', height: '600px' }}>
            <Map
              defaultState={defaultState}
              style={{ width: '100%', height: '600px' }}
            >
              {coordinates && (
                <Placemark geometry={coordinates} onClick={handleMarkerClick} />
              )}
              <FullscreenControl />
            </Map>
          </div>
        </YMaps>
      </div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearchSubmit}>Поиск</button>
      </div>
      <div>
        {objectData && (
          <div>
            <h2>Данные:</h2>
            <p>Название: {objectData.name}</p>
            <p>Описание: {objectData.description}</p>
            <p>Адрес: {objectData.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapPage;
