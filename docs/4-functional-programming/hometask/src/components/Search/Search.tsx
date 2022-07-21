import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';
import { Row } from '../Table';

export interface ISearchStore {
  searchValue: string;
  searchedData: Row[];
}

interface SearchProps {
  store: Row[];
  updateStore: (store: ISearchStore) => void;
}

// OR

//interface SearchProps {
//  selected?: {};
//  updateSelected?: (val) => void;
//}

// OR store can be global

export function Search({ store, updateStore }: SearchProps) {
  const [searchedValue, setSearchedValue] = useState<string>('');

  const onChange = (value) => {
    setSearchedValue(value);
    const newSearchedData = store
      .filter(({country, name, username }) => [country, name, username]
        .some((str) => str.toLowerCase().includes(value.toLowerCase())))
    updateStore({ searchedData: newSearchedData, searchValue: value })
  }

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      onChange={(e) => onChange(e.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
}
