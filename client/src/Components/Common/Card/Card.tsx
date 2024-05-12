import Meta from 'antd/es/card/Meta';
import { ServicesResponse } from '../../../api/services/type';
import { Card } from 'antd';

interface OrganizationProps {
  card: ServicesResponse;
}

function Organization({ card }: OrganizationProps): React.ReactElement {
  console.log(card);
  return (
    <Card
      style={{ width: '300px', height: '600px' }}
      cover={<img alt="img" src={card.img} />}
    >
      <Meta title={card.title} description={card.description} />
    </Card>
  );
}
export default Organization;
