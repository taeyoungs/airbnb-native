import React, { useEffect } from 'react';
import ExplorerPresenter from './ExplorerPresenter';

export default ({ getRooms, rooms }) => {
  useEffect(() => {
    getRooms();
  }, []);

  return <ExplorerPresenter rooms={rooms} />;
};
