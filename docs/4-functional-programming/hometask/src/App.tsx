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

function App() {
  const [data, setData] = useState<Row[]>(undefined);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) => {
        console.log(images, users, accounts);
        const rowsObj = users.reduce((acc, cur) => {
          acc[cur.userID] = {};
          acc[cur.userID].name = cur.name;
          acc[cur.userID].country = cur.country;
          acc[cur.userID].username = cur.username;
          return acc;
        }, {});
        accounts.reduce((acc, cur) => {
          acc[cur.userID].posts = cur.posts;
          const latestPayment = cur.payments.length ? cur.payments.reduce((acc, cur) => {
            if (!acc) {
              return cur;
            }
           return new Date(acc.date) > new Date(cur.date) ? acc : cur;
          }) : { totalSum: 0 };
          acc[cur.userID].lastPayments = latestPayment.totalSum;
          return acc;
        }, rowsObj);
        images.reduce((acc, cur) => {
          acc[cur.userID].avatar = cur.url;
          return acc;
        }, rowsObj);
        setData(Object.values(rowsObj));
      }
    );
  }, [])

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters />
            <Sort />
          </div>
          <Search />
        </div>
        <Table rows={data || mockedData} />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
