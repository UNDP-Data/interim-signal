export interface SignalDataType {
  'CO/Unit': string;
  'q1_region': string;
  'Signal Title': string;
  'Signal Description: What is the signal about?': string;
  'Signal Description: Why is it important for development?': string;
  'Source (URL)': string;
  'STEEP V_Social – issues related to human culture, demography communication, movement and migration, work and education':1 | 0;
  'STEEP V_Technological – Made culture, tools, devices, systems, infrastructure and networks':1 | 0;
  'STEEP V_Economic – issues of value, money, financial tools and systems, business and business models, exchanges and transactions':1 | 0;
  'STEEP V_Environmental – The natural world, living environment, sustainability, resources, climate and health':1 | 0;
  'STEEP V_Political – legal issues, policy, governance, rules and regulations and organizational systems':1 | 0;
  'STEEP V_Values – ethics, spirituality, ideology or other forms of values':1 | 0;
  'Is the signal': string;
  'Which primary signature solution/enabler is the signal linked to?': string;
  'Which additional signature solution/enabler is the signal linked to?_Poverty and inequality':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Governance':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Resilience':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Environment':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Energy':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Gender equality':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Digitalisation':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Innovation':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Development financing':1 | 0;
  'Which additional signature solution/enabler is the signal linked to?_Other (unlinked to a signature solution/enabler)':1 | 0;
  'Other (unlinked to a signature solution/enabler)': string;
  'When is the signal likely to have the most impact if it becomes dominant?': string;
  'Keyword 1': string;
  'Keyword 2': string;
  'Keyword 3': string;
  "Enter 'other' keyword": string;
  'Attachment [OPTIONAL]': string;
  'Attachment [OPTIONAL]_URL': string;
  '_validation_status': 'Not Approved' | 'Approved' | 'On Hold' | '';
}

export interface SignalDataFormattedType extends SignalDataType {
  relatedSignatureSolutions: string[];
  STEEPV: string[];
  keywords: string[];
}

export interface MouseOverDataType extends SignalDataFormattedType {
  xPos: number;
  yPos: number;
}

export interface ValidationDataType {
  timestamp: number;
  uid: string;
  'by_whom': string;
  color: string;
  label: string;
}

export interface AttachmentDataType{
  'download_large_url': string;
  'download_medium_url': string;
  'download_small_url': string;
  'download_url': string;
  filename: string;
  id: number;
  instance: number;
  mimetype: string;
  xform: number;
}
export interface APIDataType {
  'A_Demo/q1_country': string;
  'A_Demo/q1_region': string;
  'B_signal/q2_signal': string;
  'B_signal/q3_implications': string | undefined;
  'B_signal/q3_issue': string | undefined;
  'B_signal/q4_url': string;
  'C_category/D_keywords/q10_keywords_01': string | undefined;
  'C_category/D_keywords/q10_keywords_02': string | undefined;
  'C_category/D_keywords/q10_keywords_03': string | undefined;
  'C_category/q6_steepv': string;
  'C_category/q7_strength': 'familiar_1' | 'weak_1' | 'deviant';
  'C_category/q8_1_ss': string;
  'C_category/q8_ss': string;
  'C_category/q8_ss_other': string | undefined;
  'C_category/q9_timeframe': 'immediate' | 'medium' | 'longterm' | 'unknown';
  deviceid: string;
  email: string;
  end: string;
  'formhub/uuid': string;
  'meta/instanceID': string;
  name: string;
  start: string;
  subscriberid: string;
  today: string;
  username: string;
  __version__: string;
  _attachments: AttachmentDataType[];
  _geolocation: [number, number];
  _id: number;
  _notes: string[];
  _status: string;
  '_submission_time': string;
  '_submitted_by': string | null;
  _tags: string[];
  _uuid: string;
  '_validation_status': ValidationDataType | {};
  _version_: string;
  '_xform_id_string': string;
}

export interface DataFormattedType extends APIDataType {
  relatedSignatureSolutions: string[];
  STEEPV: string[];
  keywords: string[];
  country: string;
  horizon: string;
}
