import React, { useState } from 'react';
import SearchPresenter from './SearchPresenter';
import api from '../../../api';

export default ({ token, navigation }) => {
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [beds, setBeds] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [result, setResult] = useState([]);
  const handleSubmit = async () => {
    const form = {
      ...(beds && { beds }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(maxPrice && { max_price: maxPrice }),
    };
    try {
      setIsLoading(true);
      const {
        data: { results },
      } = await api.search(form, token);
      setResult(results);
      //   console.log(form);
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleReset = () => {
    setBeds();
    setBedrooms();
    setBathrooms();
    setMaxPrice();
  };
  return (
    <SearchPresenter
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      beds={beds}
      setBeds={setBeds}
      bedrooms={bedrooms}
      setBedrooms={setBedrooms}
      bathrooms={bathrooms}
      setBathrooms={setBathrooms}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      result={result}
      term={term}
      setTerm={setTerm}
      navigation={navigation}
    />
  );
};
