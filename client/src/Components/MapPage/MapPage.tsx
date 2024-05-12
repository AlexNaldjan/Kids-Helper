import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from '@pbe/react-yandex-maps';

import './MapPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store';
import { Card } from 'antd';
import { setSelectedMarker } from '../../store/map/mapSlice';
import { fetchCoordinates } from '../../store/map/mapThunks';
import { setMarkers } from '../../store/map/markerSlice';
import api from '../../api';
import { Flex, Layout } from 'antd';

const { Sider, Content } = Layout;

const { Meta } = Card;

function MapPage() {
  const markersData = useSelector((state: RootState) => state.markers.markers);
  const selectedMarker = useSelector(
    (state: RootState) => state.map.selectedMarker,
  );
  const coordinates = useSelector((state: RootState) => state.map.coordinates);
  const dispatch = useDispatch();

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

  return (
    <Flex gap="middle" wrap>
      <Content>
        <div className="map-page">
          <div className="map-container">
            <YMaps query={{ lang: 'ru_RU' }}>
              <div style={{ width: '600px', height: '600px' }}>
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
                style={{ width: 300 }}
                cover={
                  <img
                    alt={markersData[selectedMarker].img}
                    src={markersData[selectedMarker].img}
                  />
                }
              >
                <Meta
                  title={markersData[selectedMarker].title}
                  description={markersData[selectedMarker].description}
                />
              </Card>
            </div>
          )}
        </div>
      </Content>
      <Sider>Sider</Sider>
    </Flex>
  );
}

export default MapPage;
