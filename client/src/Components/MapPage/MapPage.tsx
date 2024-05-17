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
import { Input, Select, Card } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import ModalWindow from '../Calendar/ModalWindow/ModalWindow';
import moment, { Moment } from 'moment';

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
  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  const [events, setEvents] = useState<Record<string, Event[]>>({});
  // Состояние для видимости модального окна
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Состояние для выбора дня
  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);

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

  const handleModalOpen = (dayItem: Moment | null | undefined) => {
    if (dayItem) {
      setSelectedDay(dayItem);
      setIsModalOpen(true);
    }
  };

  const handleAddEvent = (
    formData: FormData,
    dayItem: Moment | null | undefined,
  ) => {
    if (dayItem !== null && dayItem !== undefined) {
      const event: Event = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        cost: formData.cost,
        date: formData.date,
        kidId: formData.kidId,
        id: null,
      };

      const dayKey = dayItem.format('YYYY-MM-DD');
      setEvents(prevEvents => ({
        ...prevEvents,
        [dayKey]: [...(prevEvents[dayKey] || []), event],
      }));
    }
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
                //description={markersData[selectedMarker].description}
              />
              <button
                type="button"
                onClick={() => handleModalOpen(moment('2024-05-06'))}
              >
                Добавить в события
              </button>
            </Card>
          </div>
        )}
        <div className="marker-wrap">
          {selectedCategory !== null
            ? filteredMarkersByCategory.map(marker => (
                <Card
                  key={marker.id}
                  style={{ width: 300, marginBottom: 20 }}
                  cover={<img alt={marker.img} src={marker.img} />}
                >
                  <Meta title={marker.title} description={marker.description} />
                </Card>
              ))
            : filteredMarkers.map(marker => (
                <Card
                  key={marker.id}
                  style={{ width: '300px', height: '600px' }}
                  cover={<img alt={marker.img} src={marker.img} />}
                >
                  <Meta title={marker.title} description={marker.description} />
                </Card>
              ))}
        </div>
      </div>
      <ModalWindow
        dayItem={selectedDay}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleAddEvent={handleAddEvent}
      />
    </div>
  );
}

export default MapPage;
