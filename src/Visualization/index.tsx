/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Input, Select } from 'antd';
import { useState } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import uniq from 'lodash.uniq';
import { SSCOLOR, STEEPVCOLOR } from '../Constants';
import { CardLayout } from './CardLayout';
import Data from '../data.json';

const SettingsEl = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 128rem;
  margin: 4rem auto 2rem auto;
`;

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 128rem;
  margin: auto;
`;

const SelectionEl = styled.div`
  width: calc(33.33% - 1rem);
  font-size: 1.4rem;
`;

export const Visualization = () => {
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSS, setFilteredSS] = useState<string>('All Signature Solutions');
  const [filteredText, setFilteredText] = useState<string>('');
  return (
    <>
      <SettingsEl>
        <SelectionEl>
          <Select
            className='select-box'
            style={{ width: '100%' }}
            placeholder='Please select'
            defaultValue='All STEEP+V'
            onChange={(values) => { setFilteredSteep(values); }}
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
            onChange={(values) => { setFilteredSS(values); }}
          >
            <Select.Option key='All Signature Solutions'>All Signature Solutions</Select.Option>
            {
              SSCOLOR.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
            }
          </Select>
        </SelectionEl>
        <SelectionEl>
          <Input
            className='input-box'
            placeholder='Search Signals'
            onChange={(values) => { setFilteredText(values.target.value); }}
          />
        </SelectionEl>
      </SettingsEl>
      <VizEl>
        <CardLayout
          filteredSS={filteredSS}
          filteredSteep={filteredSteep}
          filteredText={filteredText}
        />
      </VizEl>
    </>
  );
};
