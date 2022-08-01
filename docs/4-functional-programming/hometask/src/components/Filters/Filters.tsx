import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

import styles from './Filters.module.scss';
import { Filter } from '../../App';

interface FiltersProps {
  updateStore: (filters: Filter[]) => void;
}

// OR

//interface FiltersProps {
//  selected?: {};
//  updateSelected?: (val) => void;
//}

// OR store can be global

const OPTIONS = [
  {
    title: 'Without posts',
  },
  {
    title: 'More than 100 posts',
  },
];

export function Filters({ updateStore }: FiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const onChange = ({ title }) => {
    console.log(title); // for debugging

    let updatedFilters;
    if (selectedFilter.find((filter) => filter === title)) {
      updatedFilters = selectedFilter.filter(
        (filter) => filter !== title
      );
    } else {
      updatedFilters = [...selectedFilter, title];
    }

    setSelectedFilter(updatedFilters);
    const filters: Filter[] = updatedFilters.map((f) => {
        switch (f) {
          case 'Without posts': return ({ posts }) => posts === 0
          case 'More than 100 posts': return ({ posts }) => posts > 100
        }
    });
    updateStore(filters);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map((option) => (
          <li
            value={option.title}
            onClick={() => onChange(option)}
            key={option.title}
          >
            <Checkbox
              checked={!!selectedFilter.find(filter => filter === option.title)}
              value={option.title}
              onChange={() => onChange(option)}
              size="small"
              color="primary"
            />{' '}
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
