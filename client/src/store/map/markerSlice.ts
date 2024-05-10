import { createSlice } from '@reduxjs/toolkit';

export interface MarkerDataType {
  id: number;
  title: string;
  address: string;
  img: string;
  description: string;
  price: string;
}

const markersData: MarkerDataType[] = [
  {
    id: 1,
    title: 'Детская городская поликлиника № 39, филиал № 2',
    img: 'https://avatars.mds.yandex.net/get-altay/9793917/2a0000018a92ffaeabf518115d8c30525690/XXXL',
    description:
      'Форма собственности:государственная. Предоставляемые справки:больничный лист, медицинский осмотр, санаторно-курортная карта, справка в бассейн.Доступность помещения на инвалидной коляске:доступно. Вакцинация:столбняк, краснуха, грипп, туберкулёз, гепатит, АКДС и АДСМ, вирус папилломы, менингококковый менингит, корь, проба Манту, полиомиелит. Врачи и специалисты:хирург, травматолог, педиатр, офтальмолог, массажист, невролог, ортопед, оториноларинголог',
    address: 'Москва, Красноармейская ул., 30А',
    price: 'Оказание услуг по медецинскому полису',
  },
  {
    id: 2,
    title: 'Историческая площадка Паровозное депо Подмосковная',
    img: 'https://avatars.mds.yandex.net/get-altay/8128793/2a00000187cdd57c6e7cd802053c03d688fa/XXXL',
    description:
      'Музей:архитектурный, историко-бытовой, истории организаций, ж-д транспорт и метро',
    address: 'Москва, 2-й Амбулаторный пр., 8А',
    price: 'от 140 рублей',
  },
];

interface MarkerState {
  markers: MarkerDataType[];
}

const initialState: MarkerState = {
  markers: markersData,
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    setMarkers(state, action) {
      state.markers = action.payload;
    },
  },
});

export const { setMarkers } = markersSlice.actions;
export default markersSlice.reducer;
