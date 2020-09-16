import React, { useEffect } from 'react';
import ExplorerPresenter from './ExplorerPresenter';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default ({ getRooms, rooms, increasePage, page }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  // console.log(page, refreshing);
  useEffect(() => {
    getRooms(1);
  }, [refreshing]);
  useEffect(() => {
    getRooms(page);
  }, [page]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getRooms(1);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <ExplorerPresenter
      rooms={rooms}
      increasePage={increasePage}
      refreshing={refreshing}
      onRefresh={onRefresh}
      page={page}
    />
  );
};
