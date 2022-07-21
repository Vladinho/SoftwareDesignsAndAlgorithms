import { useState, useEffect } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Table, Filters, Sort, Search, ISearchStore } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';

import styles from './App.module.scss';

import type { Row } from './components';
import type { Image, User, Account } from '../types';

import rows from './mocks/rows.json';

// mockedData has to be replaced with parsed Promises’ data
const mockedData: Row[] = rows.data;

function App() {
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [{ searchValue, searchedData }, setSearchedData] = useState<ISearchStore>({ searchValue: '', searchedData: []});
  const [initialData, setInitialData] = useState<Row[]>([]);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        console.log(images, users, accounts);
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
        const rows = Object.values(rowsObj) as Row[];
        setFilteredData(rows);
        setSearchedData((s) => ({ ...s, searchedData: rows }));
        setInitialData(rows);
      }
    );
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters store={initialData} updateStore={setFilteredData} />
            <Sort store={filteredData} updateStore={setFilteredData} />
          </div>
          <Search store={filteredData} updateStore={setSearchedData} />
        </div>
        <Table rows={searchValue ? searchedData : filteredData || mockedData} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
