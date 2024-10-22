import { useState, useEffect } from 'react';
import { GetCountries, GetState, GetCity } from 'react-country-state-city';


export default function App(): JSX.Element {

  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);

  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);

  useEffect(() => {
    GetCountries().then((result: any[]) => {
      setCountriesList(result);
    });
  }, []);
  console.log({ countriesList });

  const handleCountryChange = (id: string) => {
    const selectedCountryId = Number(id);
    setCountryId(selectedCountryId);
    GetState(selectedCountryId).then((result: any[]) => {
      setStateList(result);
    });
    setStateId(0);
    setCityId(0);
  };
  console.log({ countryId, stateList });

  const handleStateChange = (id: string) => {
    const selectedStateId = Number(id);
    setStateId(selectedStateId);
    GetCity(countryId, selectedStateId).then((result: any[]) => {
      setCityList(result);
    });
    setCityId(0);
  };
  console.log({ stateId, cityList });

  const handleCityChange = (id: string) => {
    const selectedCityId = Number(id);
    setCityId(selectedCityId);
  };
  console.log({ cityId });

  const [countryCode, setCountryCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };
  console.log({ countryCode, phoneNumber });

  return (
    <div>
      {/* Country Dropdown */}
      <label>Country:</label>
      <select onChange={(e) => handleCountryChange(e.target.value)} value={countryId}>
        <option value="">Select Country</option>
        {countriesList.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <label>State:</label>
      <select onChange={(e) => handleStateChange(e.target.value)} value={stateId} disabled={stateList.length === 0}>
        <option value="">Select State</option>
        {stateList.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <label>City:</label>
      <select onChange={(e) => handleCityChange(e.target.value)} value={cityId} disabled={cityList.length === 0}>
        <option value="">Select City</option>
        {cityList.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      {/* Country Code Dropdown */}
      <label>Country Code:</label>
      <select onChange={handleCountryCodeChange} value={countryCode}>
        <option value="">Select Country Code</option>
        {countriesList.map((country) => (
          <option key={country.id} value={`+${country.phone_code}`}>
            {country.name} ({country.phone_code})
          </option>
        ))}
      </select>

      {/* Phone Number Field */}
      <label>Phone Number:</label>
      <span>{countryCode}</span> {/* Show the selected country code */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter your phone number"
      />
    </div>
  );
}