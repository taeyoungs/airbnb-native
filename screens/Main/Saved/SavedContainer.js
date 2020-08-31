import React, { useEffect } from 'react';
import SavedPresenter from './SavedPresenter';

export default ({ getFavs }) => {
  //   console.log(props);
  useEffect(() => {
    getFavs();
  }, []);
  return <SavedPresenter />;
};
