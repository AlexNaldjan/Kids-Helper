import { useEffect, useState } from 'react';
import api from '../../api';
import { ServicesResponse } from '../../api/services/type';

function Main(): JSX.Element {
  const [services, setServices] = useState<ServicesResponse[]>([]);
  useEffect(() => {
    async function getSocialServices() {
      const res = await api.services.getServices();
      setServices(res.data);
    }
    getSocialServices();
  }, []);
  return (
    <>
      <button> services </button>
      <div></div>
    </>
  );
}

export default Main;
