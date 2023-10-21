'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCar } from './redux/slices/carSlice';

const CarLookup = () => {
  const dispatch = useDispatch();
  const car = useSelector((state) => state.car.car);
  const loading = useSelector((state) => state.car.loading);
  const error = useSelector((state) => state.car.error);
  const [carType, setCarType] = useState('');

  const handleCarTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarType(event.target.value);
  };

  const searchCar = (event) => {
    event.preventDefault();
    if (carType.trim() !== '') {
      dispatch(fetchCar(carType));
    }
  };

  return (
    <div>
      <h1>Find Your Car</h1>
      <form onSubmit={searchCar}>
        <label htmlFor="carType">Select Car Type: </label>
        <select id="carType" onChange={handleCarTypeChange}>
          <option value="">Select a Car Type</option>
          <option value="electrical">Electrical</option>
          <option value="wheels">2 Wheels</option>
          <option value="sport">Sport</option>
        </select>
        <button style={{ marginLeft: '5px' }} type="submit">
          Search Car
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {car && (
        <div>
          <h1>Car Details</h1>
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Year: {car.year}</p>
        </div>
      )}
    </div>
  );
};

export default CarLookup;
