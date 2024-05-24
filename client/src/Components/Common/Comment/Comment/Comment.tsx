import { Button, Input, List, Modal } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { CommentsResponse, Props } from '../../Card/type';
import './Comment.css';
import { CommentOutlined } from '@ant-design/icons';
import React from 'react';
import CommentItem from '../CommentItem/CommentItem';

const { TextArea } = Input;

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
      await fetch('http://31.129.42.58:3000/api/add/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userId, serviceId, comment }),
      });
      const res = await fetch(`http://31.129.42.58:3000/api/comment/${props}`);
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
        const res = await fetch(
          `http://31.129.42.58:3000/api/comment/${props}`,
        );
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
      <Button onClick={showCommentModal} className="comment-button">
        <CommentOutlined />
        {`${comments.length}`}
      </Button>
      <Modal
        title="Все комментарии"
        open={isCommentVisible}
        onCancel={cancelCommentModal}
        onOk={cancelCommentModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className="comments-container">
          {comments.length > 0 ? (
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={item => (
                <li className="comment-item">
                  <div className=" user">
                    <CommentItem item={item} />
                  </div>
                </li>
              )}
            />
          ) : (
            <div> </div>
          )}

          {isLoggedIn ? (
            <>
              <form className="comment-form" onSubmit={handleSubmit}>
                <TextArea
                  showCount
                  maxLength={100}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  autoSize={true}
                  placeholder="Оставьте комментарий"
                />

                <button className="comment-send-btn" type="submit">
                  Отправить
                </button>
              </form>
            </>
          ) : (
            <div>
              Чтобы оставить комментарий Вам необходимо зарегистрироваться
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
export default Comments;
