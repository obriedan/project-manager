//hooks
import { useCollection } from '../../hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

//components
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

// styles
import './Dashboard.css';

export default function Dashboard() {
  const { documents, error } = useCollection('projects');
  const [currentFilter, setCurrentFilter] = useState('all');
  const { user } = useAuthContext();

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          default:
            return document.category === currentFilter;
        }
      })
    : null;

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {error && <p className='error'>{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
