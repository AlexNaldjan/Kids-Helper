import { Button, Input, List } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { CommentsResponse, Props } from '../../Card/type';

const { TextArea } = Input;

function Comments({ props }: Props): React.ReactElement {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<CommentsResponse[]>([]);

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );

  const profile = useSelector(
    (state: RootState) => state.auth.profileData.profile,
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const userName = profile.username;
      const userId = profile.id;
      const serviceId = props;
      await fetch('http://localhost:3000/api/add/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userId, serviceId, comment }),
      });
      const res = await fetch(`http://localhost:3000/api/comment/${props}`);
      const data = await res.json();
      setComments(data);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getComments() {
      try {
        const res = await fetch(`http://localhost:3000/api/comment/${props}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    getComments();
  }, []);
  return (
    <>
      {comments.length > 0 ? (
        <List
          className="comment-list"
          header={`${comments.length} replies`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
            <li>
              <img
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style={{ width: '30px' }}
              />
              <div>{item.userName}</div>
              <div>{item.comment}</div>
            </li>
          )}
        />
      ) : (
        <div> </div>
      )}
      ,
      {isLoggedIn ? (
        <>
          <form onSubmit={handleSubmit}>
            <TextArea
              showCount
              maxLength={100}
              value={comment}
              onChange={e => setComment(e.target.value)}
              autoSize={true}
              placeholder="Оставьте комминтарий"
            />

            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </form>
        </>
      ) : (
        <div>Что бы оставить комментарий Вам необходимо зарегистрироваться</div>
      )}
    </>
  );
}
export default Comments;
