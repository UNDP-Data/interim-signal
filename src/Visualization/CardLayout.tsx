import { Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { HorizonColor, SSCOLOR, STEEPVCOLOR } from '../Constants';
import Data from '../data.json';
import { SignalDataFormattedType } from '../Types';
import { Cards } from './Cards';

interface Props {
  filteredSS: string;
  filteredSteep: string;
  filteredText: string;
  selectedHorizon: string;
  selectedCountry: string;
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

export const CardLayout = (props: Props) => {
  const {
    filteredSS,
    filteredSteep,
    filteredText,
    selectedHorizon,
    selectedCountry,
  } = props;
  const DataFormatted = Data.map((d) => {
    const relatedSignatureSolutions = [d['Which primary signature solution/enabler is the signal linked to?'] === 'Other (unlinked to a signature solution/enabler)' ? d['Other (unlinked to a signature solution/enabler)'] : d['Which primary signature solution/enabler is the signal linked to?']];
    if (d['Which additional signature solution/enabler is the signal linked to?_Development financing'] === 1 && relatedSignatureSolutions.indexOf('Development Financing') === -1) relatedSignatureSolutions.push('Development Financing');
    if (d['Which additional signature solution/enabler is the signal linked to?_Digitalisation'] === 1 && relatedSignatureSolutions.indexOf('Digitalisation') === -1) relatedSignatureSolutions.push('Digitalisation');
    if (d['Which additional signature solution/enabler is the signal linked to?_Energy'] === 1 && relatedSignatureSolutions.indexOf('Energy') === -1) relatedSignatureSolutions.push('Energy');
    if (d['Which additional signature solution/enabler is the signal linked to?_Environment'] === 1 && relatedSignatureSolutions.indexOf('Environment') === -1) relatedSignatureSolutions.push('Environment');
    if (d['Which additional signature solution/enabler is the signal linked to?_Gender equality'] === 1 && relatedSignatureSolutions.indexOf('Gender Equality') === -1) relatedSignatureSolutions.push('Gender Equality');
    if (d['Which additional signature solution/enabler is the signal linked to?_Governance'] === 1 && relatedSignatureSolutions.indexOf('Governance') === -1) relatedSignatureSolutions.push('Governance');
    if (d['Which additional signature solution/enabler is the signal linked to?_Innovation'] === 1 && relatedSignatureSolutions.indexOf('Innovation') === -1) relatedSignatureSolutions.push('Innovation');
    if (d['Which additional signature solution/enabler is the signal linked to?_Poverty and inequality'] === 1 && relatedSignatureSolutions.indexOf('Poverty and Inequality') === -1) relatedSignatureSolutions.push('Poverty and Inequality');
    if (d['Which additional signature solution/enabler is the signal linked to?_Resilience'] === 1 && relatedSignatureSolutions.indexOf('Resilience') === -1) relatedSignatureSolutions.push('Resilience');
    if (d['Which additional signature solution/enabler is the signal linked to?_Other (unlinked to a signature solution/enabler)'] === 1 && relatedSignatureSolutions.indexOf('Others') === -1) relatedSignatureSolutions.push('Others');
    if (d['Other (unlinked to a signature solution/enabler)'] !== '' && relatedSignatureSolutions.indexOf(d['Other (unlinked to a signature solution/enabler)']) === -1) relatedSignatureSolutions.push(d['Other (unlinked to a signature solution/enabler)']);
    const STEEPV = [];
    if (d['STEEP V_Economic – issues of value, money, financial tools and systems, business and business models, exchanges and transactions'] === 1) STEEPV.push('Economic');
    if (d['STEEP V_Environmental – The natural world, living environment, sustainability, resources, climate and health'] === 1) STEEPV.push('Environmental');
    if (d['STEEP V_Political – legal issues, policy, governance, rules and regulations and organizational systems'] === 1) STEEPV.push('Political');
    if (d['STEEP V_Social – issues related to human culture, demography communication, movement and migration, work and education'] === 1) STEEPV.push('Social');
    if (d['STEEP V_Technological – Made culture, tools, devices, systems, infrastructure and networks'] === 1) STEEPV.push('Technological');
    if (d['STEEP V_Values – ethics, spirituality, ideology or other forms of values'] === 1) STEEPV.push('Values');
    const keywords = [];
    if (d['Keyword 1'] !== '') keywords.push(d['Keyword 1']);
    if (d['Keyword 2'] !== '') keywords.push(d['Keyword 2']);
    if (d['Keyword 3'] !== '') keywords.push(d['Keyword 3']);
    if (d['Enter \'other\' keyword'] !== '') keywords.push(d['Enter \'other\' keyword']);
    return {
      ...d, relatedSignatureSolutions, STEEPV, keywords,
    };
  });
  const DataFilteredBySteep = filteredSteep === 'All STEEP+V' ? [...DataFormatted] : DataFormatted.filter((d) => d.STEEPV.indexOf(filteredSteep) !== -1);
  const DataFilteredBySS = filteredSS === 'All Signature Solutions' ? [...DataFilteredBySteep] : DataFilteredBySteep.filter((d) => d.relatedSignatureSolutions.indexOf(filteredSS) !== -1);
  const DataFilteredByHorizon = selectedHorizon === 'All Horizons' ? [...DataFilteredBySS] : DataFilteredBySS.filter((d) => d['When is the signal likely to have the most impact if it becomes dominant?'] === selectedHorizon);
  const DataFilteredByText = filteredText === '' ? [...DataFilteredByHorizon] : DataFilteredByHorizon.filter((d) => d['Signal Title'].toLowerCase().includes(filteredText.toLowerCase()) || d['Signal Description: What is the signal about?'].toLowerCase().includes(filteredText.toLowerCase()) || d['Signal Description: Why is it important for development?'].toLowerCase().includes(filteredText.toLowerCase()) || d.keywords.indexOf(filteredText) !== -1);
  const DataFilteredByCountry = selectedCountry === 'All CO/Unit' ? [...DataFilteredByText] : DataFilteredByText.filter((d) => d['CO/Unit'] === selectedCountry);
  const [mouseClickData, setMouseClickData] = useState<SignalDataFormattedType | null>(null);
  return (
    <>
      <FlexContainer>
        {
          DataFilteredByCountry.map((d, i) => <CardEl key={i} onClick={() => { setMouseClickData(d as SignalDataFormattedType); }}><Cards data={d as SignalDataFormattedType} key={i} /></CardEl>)
        }
      </FlexContainer>
      {
        mouseClickData ? (
          <Modal
            visible
            title={mouseClickData['Signal Title']}
            onOk={() => { setMouseClickData(null); }}
            onCancel={() => { setMouseClickData(null); }}
            footer={[
              <ButtonEl onClick={() => { setMouseClickData(null); }}>
                Done
              </ButtonEl>,
            ]}
            width={960}
          >
            <SignalTitleEl>{mouseClickData['Signal Title']}</SignalTitleEl>
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
              <div className='bold'>What</div>
              <div>{mouseClickData['Signal Description: What is the signal about?']}</div>
              <br />
              <br />
              <div className='bold'>Why</div>
              <div>{mouseClickData['Signal Description: Why is it important for development?']}</div>
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Horizon</ModalTitleEl>
            <ModalBodyEl>
              <ChipEl
                style={{ width: 'fit-content' }}
                bgColor={HorizonColor.findIndex((el) => el.value === mouseClickData['When is the signal likely to have the most impact if it becomes dominant?']) !== -1 ? HorizonColor[HorizonColor.findIndex((el) => el.value === mouseClickData['When is the signal likely to have the most impact if it becomes dominant?'])].bgColor : undefined}
                fontColor={HorizonColor.findIndex((el) => el.value === mouseClickData['When is the signal likely to have the most impact if it becomes dominant?']) !== -1 ? HorizonColor[HorizonColor.findIndex((el) => el.value === mouseClickData['When is the signal likely to have the most impact if it becomes dominant?'])].textColor : undefined}
              >
                {mouseClickData['When is the signal likely to have the most impact if it becomes dominant?']}
              </ChipEl>
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Related Signature Solutions/Enablers</ModalTitleEl>
            <ModalBodyEl>
              <FlexEl>
                {
                  mouseClickData.relatedSignatureSolutions.map((d, i) => (
                    <ChipEl
                      key={i}
                      bgColor={SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase()) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase())].bgColor : undefined}
                      fontColor={SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase()) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value.toLowerCase() === d.toLowerCase())].textColor : undefined}
                    >
                      {d}
                    </ChipEl>
                  ))
                }
                {
                  mouseClickData['Other (unlinked to a signature solution/enabler)'] !== '' ? <ChipEl>{mouseClickData['Other (unlinked to a signature solution/enabler)']}</ChipEl> : null
                }
              </FlexEl>
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>CO/Unit</ModalTitleEl>
            <ModalBodyEl>
              {mouseClickData['CO/Unit']}
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Sources</ModalTitleEl>
            <ModalBodyEl>
              <a href={mouseClickData['Source (URL)']} target='_blank' rel='noreferrer'>{mouseClickData['Source (URL)']}</a>
            </ModalBodyEl>
          </Modal>
        )
          : null
      }
    </>
  );
};
