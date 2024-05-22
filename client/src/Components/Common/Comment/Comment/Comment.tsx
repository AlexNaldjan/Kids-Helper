import { Button, Input, List, Modal, Space } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { CommentsResponse, Props } from '../../Card/type';
import { CommentOutlined } from '@ant-design/icons';
import './Comment.css';
import React from 'react';
import styled from 'styled-components';

const { TextArea } = Input;

const CommentsContainer = styled.div`
  .comment-button {
    margin-bottom: 10px;
  }

  .comment-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .comment-list li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 5px;
  }

  .comment-list img {
    margin-right: 10px;
    border-radius: 50%;
  }

  .comment-list div {
    margin-right: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Comments({ props }: Props): React.ReactElement {
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);

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

  const showCommentModal = () => {
    setIsCommentVisible(true);
  };

  const cancelCommentModal = () => {
    setIsCommentVisible(false);
  };

  return (
    <>
      <CommentsContainer>
        <Button className="comment-button" onClick={showCommentModal}>
          <CommentOutlined />
          {`${comments.length}`}
        </Button>
        <Modal
          title="Все комментарии"
          open={isCommentVisible}
          onCancel={cancelCommentModal}
          onOk={cancelCommentModal}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
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
                  placeholder="Оставьте комментарий"
                />

                <Button type="primary" htmlType="submit">
                  Отправить
                </Button>
              </form>
            </>
          ) : (
            <div>
              Что бы оставить комментарий Вам необходимо зарегистрироваться
            </div>
          )}
        </Modal>
      </CommentsContainer>
    </>
  );
}
export default Comments;
