import React, { useEffect } from 'react';
import SavedPresenter from './SavedPresenter';

export default ({ getFavs, rooms }) => {
  // console.log(favs);
  useEffect(() => {
    getFavs();
  }, []);
  return <SavedPresenter rooms={rooms} />;
};
