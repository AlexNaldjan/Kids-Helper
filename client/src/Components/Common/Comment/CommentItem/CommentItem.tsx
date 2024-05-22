import React from 'react';
import { CommentsResponse } from '../../Card/type';
import './CommentItem.css';

interface CommentItemProps {
  item: CommentsResponse;
}

const CommentItem: React.FC<CommentItemProps> = ({ item }) => (
  <div className="comment-item-container">
    <div>
      <img
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        className="comment-avatar"
        alt="User Avatar"
      />
      <div className="comment-username">{item.userName}</div>
    </div>
    <div className="comment-content">
      <div className="comment-text">{item.comment}</div>
    </div>
  </div>
);

export default CommentItem;
