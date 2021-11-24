// hooks
import { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';

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

  const handleSubmit = (e) => {
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
    console.log(name, details, dueDate, category, assignedUsers);
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
        <button className='btn'>Add Project</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
}
