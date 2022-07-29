import styled from 'styled-components';
import { SSCOLOR, STEEPVCOLOR } from '../Constants';
// import { COLORVALUES, SDGCOLOR, STEEPVCOLOR } from '../Constants';
import { SignalDataFormattedType } from '../Types';

interface Props {
  data: SignalDataFormattedType ;
}

const TooltipTitle = styled.div`
  font-size: 2rem;
  color: var(--navy);  
  width: 100%;
  box-sizing: border-box;
  position: relative;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 2.4rem;
`;

const TooltipBody = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const CardContainer = styled.div`
  margin: 0 1rem;
`;

interface ChipElDataType {
  bgColor?: string;
  fontColor?:string;
}

const ChipEl = styled.div<ChipElDataType>`
  padding: 0 1rem;
  font-size: 1.4rem;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'var(--black-400)')};
  color: ${(props) => (props.fontColor ? props.fontColor : 'var(--black)')};
  border-radius: 5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FlexEl = styled.div`
  display: flex;
  margin-bottom: 0rem;
  flex-wrap: wrap;
`;

const ModalTitleEl = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 2rem;
`;

const HR = styled.hr`
  margin: 1rem  0;
  border-top: 1px solid var(--black-100);
`;

const ModalBodyEl = styled.div`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

export const Cards = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <CardContainer>
      <div>
        <TooltipTitle>
          {data['Signal Title']}
        </TooltipTitle>
        <FlexEl>
          {
            data.STEEPV.map((d, i) => (
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
            data.keywords.map((d, i) => (
              <ChipEl
                key={i}
              >
                {d}
              </ChipEl>
            ))
          }
        </FlexEl>
      </div>
      <TooltipBody>
        <HR />
        <ModalTitleEl>Horizon</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            <ChipEl>
              {data['When is the signal likely to have the most impact if it becomes dominant?']}
            </ChipEl>
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <ModalTitleEl>Related Signature Solution</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            {
              data.relatedSignatureSolutions.map((d, i) => (
                <ChipEl
                  key={i}
                  bgColor={SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].bgColor : undefined}
                  fontColor={SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].textColor : undefined}
                >
                  {d}
                </ChipEl>
              ))
            }
          </FlexEl>
        </ModalBodyEl>
      </TooltipBody>
    </CardContainer>
  );
};
