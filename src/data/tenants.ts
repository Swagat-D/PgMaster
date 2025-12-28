export type Tenant = {
  id: string;
  name: string;
  room: string;
  underNotice: boolean;
  rentAmount?: number;
  joinedDate: string;
  mobile?: string;
  photo?: any;
  underNoticeDays?: number;
  bookingAmount?: number;
  bookingDate?: string;
  moveInDate?: string;
};

export const tenantsData: Tenant[] = [
  {
    id: '1',
    name: 'Rihan Kapoor',
    room: '101',
    underNotice: true,
    rentAmount: 1400,
    underNoticeDays: 2,
    joinedDate: '23 Sep 2022',
    bookingAmount: 1400,
    bookingDate: '10 Oct 2025',
    moveInDate: '23 Oct 2025',
    mobile: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Pabitra Sundariii',
    room: '102',
    underNotice: true,
    rentAmount: 1800,
    underNoticeDays: 5,
    joinedDate: '23 Sep 2022',
    bookingDate: '01 Sep 2025',
    moveInDate: '05 Sep 2025',
    mobile: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Swagat Dash',
    room: '101',
    underNotice: true,
    rentAmount: 2000,
    underNoticeDays: 3,
    bookingDate: '15 Jul 2025',
    moveInDate: '20 Jul 2025',
    joinedDate: '23 Sep 2022',
    mobile: '+91 9876543212',
  },
  {
    id: '4',
    name: 'Arjun Sharma',
    room: '102',
    underNotice: false,
    rentAmount: 2200,
    joinedDate: '15 Aug 2022',
    bookingAmount: 2200,
    mobile: '+91 9876543213',
  },
  {
    id: '5',
    name: 'Priya Singh',
    room: '103',
    underNotice: false,
    rentAmount: 1250,
    joinedDate: '10 Jul 2022',
    bookingAmount: 1250,
    mobile: '+91 9876543214',
  },
];

export default tenantsData;
