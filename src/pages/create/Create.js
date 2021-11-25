// hooks
import { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
// components
import Select from 'react-select';

// styles
import './Create.css';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const { documents } = useCollection('users');
  const { user } = useAuthContext();
  const { response, addDocument } = useFirestore('projects');
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setformError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((document) => {
        return {
          value: document,
          label: document.displayName,
        };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformError(null);

    if (!category) {
      setformError('Please select a project category.');
      return;
    }

    if (!assignedUsers.length) {
      setformError('Please assign the project to at least one user.');
      return;
    }

    // taking only required data from the user object before passing it
    // to the project object
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (response.success) {
      navigate('/');
    }
  };

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input required type='text' onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            type='text'
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type='date'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
            autoComplete='off'
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select onChange={(option) => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assign to:</span>
          <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti />
        </label>

        {!response.isPending ? (
          <button className='btn'>Add Project</button>
        ) : (
          <button disabled className='btn'>
            Adding...
          </button>
        )}

        {formError && <p className='error'>{formError}</p>}
        {response.error && <p className='error'>{response.error}</p>}
      </form>
    </div>
  );
}
