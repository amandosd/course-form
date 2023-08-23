export interface IMeeting {
    key: number;
    BeginDate: Date;
    age: number;
    address: string;
}

export interface IMeetingForm {
  dataSource: IMeeting[];
  onAddMeeting: (data: IMeeting) => void;
  onDeleteMeeting:(key: number) => void;
}