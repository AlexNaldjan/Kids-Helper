import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from '@pbe/react-yandex-maps';

import './MapPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store';
import { setSelectedMarker } from '../../store/map/mapSlice';
import { fetchCoordinates } from '../../store/map/mapThunks';
import { setMarkers } from '../../store/map/markerSlice';
import api from '../../api';
import { Input, Select, Card } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

const { Meta } = Card;

function MapPage() {
  const markersData = useSelector((state: RootState) => state.markers.markers);
  const selectedMarker = useSelector(
    (state: RootState) => state.map.selectedMarker,
  );
  const coordinates = useSelector((state: RootState) => state.map.coordinates);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(markersData.map(marker => marker.category))];

  useEffect(() => {
    async function getSocialServices() {
      const res = await api.services.getServices();
      dispatch(setMarkers(res.data));
    }
    getSocialServices();
  }, []);

  useEffect(() => {
    dispatch(fetchCoordinates(markersData));
  }, [dispatch, markersData]);

  const handleMarkerClick = (index: number) => {
    dispatch(setSelectedMarker(index));
  };

  const handleMapClick = () => {
    dispatch(setSelectedMarker(null));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(null);
    setInputValue(e.target.value);
  };
  const filteredMarkers = markersData.filter(marker =>
    marker.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredMarkersByCategory = selectedCategory
    ? markersData.filter(marker => marker.category === selectedCategory)
    : markersData;

  return (
    <div className="map">
      <div className="search">
        <Select
          placeholder="Выберите категорию"
          style={{ width: 200, marginRight: 10 }}
          onChange={handleCategoryChange}
        >
          {categories.map(category => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>

        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          onChange={handleSearchChange}
        />
      </div>
      <div className="map-page">
        <div className="map-container">
          <YMaps query={{ lang: 'ru_RU' }}>
            <div style={{ width: '800px', height: '600px' }}>
              <Map
                defaultState={{
                  center: [55.796, 37.541],
                  zoom: 9,
                  controls: [],
                }}
                style={{ width: '100%', height: '600px' }}
                onClick={handleMapClick}
              >
                {coordinates.map((coordinate, index) => (
                  <Placemark
                    key={markersData[index].id}
                    geometry={coordinate}
                    options={{
                      preset: 'islands#icon',
                      iconColor: '#ff0000',
                    }}
                    onClick={() => handleMarkerClick(index)}
                  />
                ))}
                <FullscreenControl />
              </Map>
            </div>
          </YMaps>
        </div>
        {selectedMarker !== null && (
          <div className="marker-info">
            <Card
              style={{ width: 200 }}
              cover={
                <img
                  alt={markersData[selectedMarker].img}
                  src={markersData[selectedMarker].img}
                />
              }
            >
              <Meta
                title={markersData[selectedMarker].title}
                // description={markersData[selectedMarker].description}
              />
              <button type="button">Добавить в события</button>
            </Card>
          </div>
        )}
        <div className="marker-wrap">
          {selectedCategory !== null
            ? filteredMarkersByCategory.map(marker => (
                <Card
                  key={marker.id}
                  style={{ width: 200, marginBottom: 20 }}
                  cover={<img alt={marker.img} src={marker.img} />}
                >
                  <Meta title={marker.title} description={marker.description} />
                </Card>
              ))
            : filteredMarkers.map(marker => (
                <Card
                  key={marker.id}
                  style={{ width: 200 }}
                  cover={<img alt={marker.img} src={marker.img} />}
                >
                  <Meta title={marker.title} description={marker.description} />
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
