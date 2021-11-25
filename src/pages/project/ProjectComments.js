import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { v4 as uuidv4 } from 'uuid';

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthContext();
  const { response, updateDocument } = useFirestore('projects');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: uuidv4(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment('');
    }
  };
  return (
    <div className='project-comments'>
      <h4>Project Comments</h4>
      <form onSubmit={handleSubmit} className='add-comment'>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
          <button className='btn'>Add Comment</button>
        </label>
      </form>
    </div>
  );
}
