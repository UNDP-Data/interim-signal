/* eslint-disable no-underscore-dangle */
import { Modal } from 'antd';
import uniqBy from 'lodash.uniqby';
import { useState } from 'react';
import styled from 'styled-components';
import {
  HorizonColor, SSCOLOR, STEEPVCOLOR, CountryList,
} from '../Constants';
import { APIDataType, DataFormattedType } from '../Types';
import { Cards } from './Cards';

interface Props {
  filteredSS: string;
  filteredSteep: string;
  filteredText: string;
  selectedHorizon: string;
  selectedCountry: string;
  data: APIDataType[];
}

const FlexContainer = styled.div`
  display: flex;
  width: calc(100% + 2rem);
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem;
`;

const SignalTitleEl = styled.div`
  margin: 2rem 0 1rem 0;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 2.8rem;
`;

const ModalTitleEl = styled.div`
  margin: 2rem 0 0 0;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 3rem;
`;

const ModalBodyEl = styled.div`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

interface ChipElDataType {
  bgColor?: string;
  fontColor?:string;
}

const ChipEl = styled.div<ChipElDataType>`
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'var(--black-400)')};
  color: ${(props) => (props.fontColor ? props.fontColor : 'var(--black)')};
  border-radius: 5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FlexEl = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const HR = styled.hr`
  margin: 2rem  0 1rem 0;
  border-top: 1px solid var(--black-100);
`;

const CardEl = styled.div`
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding: 2rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 5%);
  border: 1px solid var(--black-300);
  word-wrap: break-word;
  margin: 0 1rem 2rem 1rem;
  width: calc(33.33% - 2rem);
  cursor: pointer;
  @media (max-width: 678px) {
    width: calc(50% - 1rem);
  }
  @media (max-width: 420px) {
    width: 100%;
  }
`;

const ButtonEl = styled.button`
  padding: 1rem 1.5rem !important;
  background-color: var(--primary-blue) !important;
  color: var(--white) !important;
  font-weight: bold !important;
  font-size: 1.6rem !important;
  text-transform: uppercase;
  border: 0 !important;
`;

const ColumnEl = styled.div`
  width: 50%;
`;

const ColumnContainer = styled.div`
  display: flex;
`;

export const CardLayout = (props: Props) => {
  const {
    filteredSS,
    filteredSteep,
    filteredText,
    selectedHorizon,
    selectedCountry,
    data,
  } = props;
  const DataFormatted = data.map((d) => {
    const relatedSignatureSolutions = [d['C_category/q8_ss'] === 'other' ? d['C_category/q8_ss_other'] : SSCOLOR[SSCOLOR.findIndex((ss) => ss.key === d['C_category/q8_ss'])].value];
    d['C_category/q8_1_ss'].split(' ').forEach((el) => {
      if (el !== 'other') relatedSignatureSolutions.push(SSCOLOR[SSCOLOR.findIndex((ss) => ss.key === el)].value);
    });
    if (d['C_category/q8_ss_other'] && d['C_category/q8_ss'] !== 'other') relatedSignatureSolutions.push(d['C_category/q8_ss_other']);
    const STEEPV = d['C_category/q6_steepv'].split(' ').map((steepv) => STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.key === steepv)].value);
    const keywords = [];
    if (d['C_category/D_keywords/q10_keywords_01']) keywords.push(d['C_category/D_keywords/q10_keywords_01']);
    if (d['C_category/D_keywords/q10_keywords_02']) keywords.push(d['C_category/D_keywords/q10_keywords_02']);
    if (d['C_category/D_keywords/q10_keywords_03']) keywords.push(d['C_category/D_keywords/q10_keywords_03']);
    const country = CountryList[CountryList.findIndex((el) => el.key === d['A_Demo/q1_country'])].value;
    const horizon = HorizonColor[HorizonColor.findIndex((el) => el.key === d['C_category/q9_timeframe'])].value;
    return {
      ...d, relatedSignatureSolutions, STEEPV, keywords, country, horizon,
    };
  });
  const DataFilteredBySteep = filteredSteep === 'All STEEP+V' ? [...DataFormatted] : DataFormatted.filter((d) => d.STEEPV.indexOf(filteredSteep) !== -1);
  const DataFilteredBySS = filteredSS === 'All Signature Solutions' ? [...DataFilteredBySteep] : DataFilteredBySteep.filter((d) => d.relatedSignatureSolutions.indexOf(filteredSS) !== -1);
  const DataFilteredByHorizon = selectedHorizon === 'All Horizons' ? [...DataFilteredBySS] : DataFilteredBySS.filter((d) => d.horizon === selectedHorizon);
  const DataFilteredByText = filteredText === '' ? [...DataFilteredByHorizon] : DataFilteredByHorizon.filter((d) => d['B_signal/q2_signal'].toLowerCase().includes(filteredText.toLowerCase()) || d['B_signal/q3_issue']?.toLowerCase().includes(filteredText.toLowerCase()) || d['B_signal/q3_implications']?.toLowerCase().includes(filteredText.toLowerCase()) || d.keywords.indexOf(filteredText) !== -1);
  const DataFilteredByCountry = selectedCountry === 'All CO/Unit' ? [...DataFilteredByText] : DataFilteredByText.filter((d) => d.country === selectedCountry);
  const [mouseClickData, setMouseClickData] = useState<DataFormattedType | null>(null);
  return (
    <>
      <FlexContainer>
        {
          DataFilteredByCountry.map((d, i) => <CardEl key={i} onClick={() => { setMouseClickData(d as DataFormattedType); }}><Cards data={d as DataFormattedType} key={i} /></CardEl>)
        }
      </FlexContainer>
      {
        mouseClickData ? (
          <Modal
            visible
            title={mouseClickData['B_signal/q2_signal']}
            onOk={() => { setMouseClickData(null); }}
            onCancel={() => { setMouseClickData(null); }}
            footer={[
              <ButtonEl onClick={() => { setMouseClickData(null); }}>
                Done
              </ButtonEl>,
            ]}
            width={960}
          >
            <SignalTitleEl>{mouseClickData['B_signal/q2_signal']}</SignalTitleEl>
            <FlexEl>
              {
                mouseClickData.STEEPV.map((d, i) => (
                  <ChipEl
                    bgColor={STEEPVCOLOR.findIndex((el) => el.value === d) !== -1 ? STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].bgColor : undefined}
                    fontColor={STEEPVCOLOR.findIndex((el) => el.value === d) !== -1 ? STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].textColor : undefined}
                    key={i}
                  >
                    {d}
                  </ChipEl>
                ))
              }
              {
                mouseClickData.keywords.map((d, i) => (
                  <ChipEl
                    key={i}
                  >
                    {d}
                  </ChipEl>
                ))
              }
            </FlexEl>
            <ModalBodyEl>
              <div className='bold'>Issue</div>
              <div>{mouseClickData['B_signal/q3_issue']}</div>
              <br />
              <br />
              <div className='bold'>Implication</div>
              <div>{mouseClickData['B_signal/q3_implications']}</div>
            </ModalBodyEl>
            <HR />
            <ColumnContainer>
              <ColumnEl>
                <ModalTitleEl>Horizon</ModalTitleEl>
                <ModalBodyEl>
                  <ChipEl
                    style={{ width: 'fit-content' }}
                    bgColor={HorizonColor.findIndex((el) => el.value === mouseClickData.horizon) !== -1 ? HorizonColor[HorizonColor.findIndex((el) => el.value === mouseClickData.horizon)].bgColor : undefined}
                    fontColor={HorizonColor.findIndex((el) => el.value === mouseClickData.horizon) !== -1 ? HorizonColor[HorizonColor.findIndex((el) => el.value === mouseClickData.horizon)].textColor : undefined}
                  >
                    {mouseClickData.horizon}
                  </ChipEl>
                </ModalBodyEl>
              </ColumnEl>
            </ColumnContainer>
            <HR />
            <ModalTitleEl>Related Signature Solutions/Enablers</ModalTitleEl>
            <ModalBodyEl>
              <FlexEl>
                {
                  uniqBy(mouseClickData.relatedSignatureSolutions, (d) => d.toLowerCase()).map((d, i) => (
                    <ChipEl
                      key={i}
                      bgColor={SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase()) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase())].bgColor : undefined}
                      fontColor={SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase()) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase())].textColor : undefined}
                    >
                      {d}
                    </ChipEl>
                  ))
                }
              </FlexEl>
            </ModalBodyEl>
            <HR />
            <ColumnContainer>
              <ColumnEl>
                <ModalTitleEl>CO/Unit</ModalTitleEl>
                <ModalBodyEl>
                  {mouseClickData.country}
                </ModalBodyEl>
              </ColumnEl>
              <ColumnEl>
                <ModalTitleEl>Region</ModalTitleEl>
                <ModalBodyEl>
                  {mouseClickData['A_Demo/q1_region']}
                </ModalBodyEl>
              </ColumnEl>
            </ColumnContainer>
            {
              mouseClickData._attachments.length > 0 ? (
                <>
                  <HR />
                  <ModalTitleEl>Attachments</ModalTitleEl>
                  <ModalBodyEl>
                    <a href={mouseClickData._attachments[0].download_url} target='_blank' rel='noreferrer'>{mouseClickData._attachments[0].filename}</a>
                  </ModalBodyEl>
                </>
              ) : null
            }
            <HR />
            <ModalTitleEl>Sources</ModalTitleEl>
            <ModalBodyEl>
              <a href={mouseClickData['B_signal/q4_url']} target='_blank' rel='noreferrer'>{mouseClickData['B_signal/q4_url']}</a>
            </ModalBodyEl>
          </Modal>
        )
          : null
      }
    </>
  );
};
