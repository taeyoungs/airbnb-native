import React, { useEffect } from 'react';
import ExplorerPresenter from './ExplorerPresenter';

export default ({ getRooms, rooms, increasePage, page }) => {
  useEffect(() => {
    getRooms(1);
  }, []);
  useEffect(() => {
    getRooms(page);
  }, [page]);

  return <ExplorerPresenter rooms={rooms} increasePage={increasePage} />;
};
