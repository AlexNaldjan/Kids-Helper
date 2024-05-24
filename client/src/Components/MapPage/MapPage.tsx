import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from '@pbe/react-yandex-maps';

import './MapPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { RootState } from '../../store';
import { setSelectedMarker } from '../../store/map/mapSlice';
import { fetchCoordinates } from '../../store/map/mapThunks';
import { setMarkers } from '../../store/map/markerSlice';
import { Input, Select } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

import Organization from '../Common/Card/Card';
import { ServicesResponse } from '../../api/services/type';

const { Search } = Input;
const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value);

function MapPage() {
  const markersData = useSelector((state: RootState) => state.markers.markers);
  const selectedMarker = useSelector(
    (state: RootState) => state.map.selectedMarker,
  );

  // console.log('=======>', );
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );
  const [services, setServices] = useState<ServicesResponse[]>([]);
  const coordinates = useSelector((state: RootState) => state.map.coordinates);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(markersData.map(marker => marker.category))];

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line no-inner-declarations
      async function getSocialServices() {
        try {
          const res = await fetch(
            `http://localhost:3000/api/socialService/${profile.id}`,
          );
          const data = await res.json();
          setServices(data);
        } catch (error) {
          console.error('Error fetching social services:', error);
        }
      }
      getSocialServices();
    }
  }, [profile]);

  useEffect(() => {
    async function getSocialServices() {
      try {
        const res = await fetch('http://localhost:3000/api/socialService');
        const data = await res.json();
        dispatch(setMarkers(data));
      } catch (error) {
        console.error('Error fetching social services:', error);
      }
    }
    getSocialServices();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCoordinates(markersData));
  }, [dispatch, markersData]);

  const handleMarkerClick = useCallback(
    (index: number) => {
      dispatch(setSelectedMarker(index));
    },
    [dispatch],
  );

  const handleMapClick = useCallback(() => {
    dispatch(setSelectedMarker(null));
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(null);
    setInputValue(e.target.value);
  };
  const filteredMarkers = services.filter(marker =>
    marker.title.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredMarkersByCategory = selectedCategory
    ? services.filter(marker => marker.category === selectedCategory)
    : services;

  return (
    <div className="map">
      <div className="map-background" />
      <div className="overlay" />
      <div className="map-wrapper">
        <div className="search-container">
          <div className="map-filter-placeholder">
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
          </div>

          <div className="map-search-placeholder">
            <Search
              placeholder="Найти организацию"
              style={{ borderRadius: '25px' }}
              allowClear
              enterButton="Найти"
              size="large"
              onSearch={onSearch}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="map-page">
          <div className="map-container">
            <YMaps query={{ lang: 'ru_RU' }}>
              <div style={{ width: '1160px', height: '1000px' }}>
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
            <Organization
              key={markersData[selectedMarker].id}
              card={markersData[selectedMarker]}
              setServices={setServices}
              userId={profile.id}
              isMapPage={true}
            />
          )}
          <div className="markers-container">
            <div className="marker-wrap">
              {selectedCategory !== null
                ? filteredMarkersByCategory.map(marker => (
                    <div className="map-organisation-card">
                      <Organization
                        key={marker.id}
                        card={marker}
                        setServices={setServices}
                        userId={profile.id}
                        isMapPage={false}
                      />
                    </div>
                  ))
                : filteredMarkers.map(marker => (
                    <div className="map-organisation-card">
                      <Organization
                        key={marker.id}
                        card={marker}
                        setServices={setServices}
                        userId={profile.id}
                        isMapPage={false}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPage;
