import styled from 'styled-components';
import axios from 'axios';
import { Input, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import {
  CountryList, HorizonColor, SSCOLOR, STEEPVCOLOR,
} from '../Constants';
import { CardLayout } from './CardLayout';
import { APIDataType } from '../Types';

const SettingsContainer = styled.div`
  margin: 4rem 0 2rem 0;
`;

const SettingsEl = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 128rem;
  margin: 0 auto;
`;

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 128rem;
  margin: auto;
`;

const SelectionEl = styled.div`
  width: calc(25% - 1rem);
  margin-bottom: 2rem;
  font-size: 1.4rem;
  @media (max-width: 800px) {
    width: calc(50% - 1rem);
  }
  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const Visualization = () => {
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSS, setFilteredSS] = useState<string>('All Signature Solutions');
  const [selectedHorizon, setSelectedHorizon] = useState<string>('All Horizons');
  const [selectedCountry, setSelectedCountry] = useState<string>('All CO/Unit');
  const [filteredText, setFilteredText] = useState<string>('');
  const [data, setData] = useState<undefined | APIDataType[]>(undefined);
  useEffect(() => {
    axios.get('https://undp-kobo-api.herokuapp.com/get-data?id=aVyAsMwPQYr97DtTh5uhy3')
      .then((d: any) => {
        setData(d.data);
      });
  }, []);

  return (
    <>
      <SettingsContainer>
        <SettingsEl>
          <SelectionEl>
            <Select
              className='select-box'
              style={{ width: '100%' }}
              placeholder='Please select'
              defaultValue='All STEEP+V'
              showSearch
              allowClear
              value={filteredSteep}
              onChange={(values) => { setFilteredSteep(values || 'All STEEP+V'); }}
            >
              <Select.Option key='All STEEP+V'>All STEEP+V</Select.Option>
              {
                STEEPVCOLOR.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
              }
            </Select>
          </SelectionEl>
          <SelectionEl>
            <Select
              className='select-box'
              style={{ width: '100%' }}
              placeholder='Please select'
              defaultValue='All Signature Solutions'
              showSearch
              allowClear
              value={filteredSS}
              onChange={(values) => { setFilteredSS(values || 'All Signature Solutions'); }}
            >
              <Select.Option key='All Signature Solutions'>All Signature Solutions/Enablers</Select.Option>
              {
                SSCOLOR.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
              }
            </Select>
          </SelectionEl>
          <SelectionEl>
            <Select
              className='select-box'
              style={{ width: '100%' }}
              placeholder='Please select'
              defaultValue='All Horizons'
              showSearch
              allowClear
              value={selectedHorizon}
              onChange={(values) => { setSelectedHorizon(values || 'All Horizons'); }}
            >
              <Select.Option key='All Horizons'>All Horizons</Select.Option>
              {
                HorizonColor.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
              }
            </Select>
          </SelectionEl>
          <SelectionEl>
            <Select
              className='select-box'
              style={{ width: '100%' }}
              placeholder='All CO/Unit'
              defaultValue='All CO/Unit'
              showSearch
              allowClear
              value={selectedCountry}
              onChange={(values) => { setSelectedCountry(values || 'All CO/Unit'); }}
            >
              <Select.Option key='All CO/Unit'>All CO/Unit</Select.Option>
              {
                CountryList.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
              }
            </Select>
          </SelectionEl>
        </SettingsEl>
        <SettingsEl>
          <Input
            className='input-box'
            placeholder='Search Signals'
            onChange={(values) => { setFilteredText(values.target.value); }}
          />
        </SettingsEl>
      </SettingsContainer>
      <VizEl>
        {
          data
            ? (
              <CardLayout
                filteredSS={filteredSS}
                filteredSteep={filteredSteep}
                filteredText={filteredText}
                selectedHorizon={selectedHorizon}
                selectedCountry={selectedCountry}
                data={data}
              />
            ) : <Spin />
        }
      </VizEl>
    </>
  );
};
