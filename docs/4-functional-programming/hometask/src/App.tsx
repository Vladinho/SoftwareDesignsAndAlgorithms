import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account } from '../types';

import rows from './mocks/rows.json';

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

const dataConverter = (
  users: User[],
  accounts: Account[],
  images: Image[]
): Row[] => {
  const rowsObj = users.reduce((acc, { userID, country, name, username}) => {
    acc[userID] = {};
    acc[userID].name = name;
    acc[userID].country = country;
    acc[userID].username = username;
    return acc;
  }, {});
  accounts.reduce((acc, { userID, posts, payments}) => {
    acc[userID].posts = posts;
    const latestPayment = payments.length ? payments.reduce((acc, cur) => {
      if (!acc) {
        return cur;
      }
      return new Date(acc.date) > new Date(cur.date) ? acc : cur;
    }) : { totalSum: 0 };
    acc[userID].lastPayments = latestPayment.totalSum;
    return acc;
  }, rowsObj);
  images.reduce((acc, { userID, url }) => {
    acc[userID].avatar = url;
    return acc;
  }, rowsObj);
  return  Object.values(rowsObj) as Row[];
}

const filterFunc = (data: Row[], filters: Filter[]): Row[] => {
  if (!filters.length) {
    return data;
  }
  return data.filter((row) => filters.some((filter) => filter(row)));
}

export type Filter = (row: Row) => boolean;

function App() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [searchFilter, setSearchFilter] = useState<Filter>(undefined);
  const [initialData, setInitialData] = useState<Row[]>([]);
  const [filteredData, setFilteredData] = useState<Row[]>([]);

  useEffect(() => {
    setFilteredData(filterFunc(initialData, searchFilter ? [...filters, searchFilter] : [...filters]));
  }, [filters, initialData, searchFilter])

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        console.log(images, users, accounts);
        const rows = dataConverter(users, accounts, images);
        setFilteredData(rows);
        setInitialData(rows);
      }
    );
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters updateStore={setFilters} />
            <Sort store={filteredData} updateStore={setFilteredData} />
          </div>
          <Search updateStore={(f) => setSearchFilter(() => f)} />
        </div>
        <Table rows={filteredData} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
