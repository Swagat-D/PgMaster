export type Room = {
  id: string;
  roomNumber: string;
  status: 'available' | 'full';
  bedCount: number;
  rentDueCount: number;
  underNoticeCount: number;
  activeTickets: number;
  occupancyPercent?: number;
  images?: any[];
  floor?: string;
  amenities?: string[];
  pricePerBed?: number;
  activeTicketIssue?: string[];
  rentDueTenants?: string[];
  underNoticeTenant?: string[];
};

export const roomsData: Room[] = [
  { 
    id: 'r1', 
    roomNumber: '101', 
    status: 'available', 
    bedCount: 6, 
    rentDueCount: 2, 
    underNoticeCount: 2, 
    activeTickets: 5, 
    occupancyPercent: 85.4, 
    floor: 'Ground Floor', 
    amenities: ['Geyser', 'Washing Machine', 'Ac'], 
    images: [require('../../assets/home.png')], 
    pricePerBed: 15000,
    activeTicketIssue: [  'Leaking pipe in bathroom', 'WiFi not working' ],
    rentDueTenants: ['Rahul Yadav', 'Manisha Rani','Ankit Kumar', 'Sonal Gupta'],
    underNoticeTenant: ['Rahul Yadav', 'Ankit Kumar']
  },
  { 
    id: 'r2', 
    roomNumber: '102', 
    status: 'full', 
    bedCount: 6, 
    rentDueCount: 2, 
    underNoticeCount: 1, 
    activeTickets: 5, 
    occupancyPercent: 100, 
    floor: '1st Floor', 
    images: [require('../../assets/home.png')], 
    amenities: ['WiFi', 'Heating'], 
    pricePerBed: 5000,
    activeTicketIssue: ['AC not working'],
    rentDueTenants: ['John Doe', 'Jane Smith'],
    underNoticeTenant: ['John Doe']
  },
  { 
    id: 'r3', 
    roomNumber: '103', 
    status: 'available', 
    bedCount: 4, 
    rentDueCount: 0, 
    underNoticeCount: 0, 
    activeTickets: 0, 
    occupancyPercent: 75, 
    images: [require('../../assets/home.png')], 
    floor: '1st Floor', 
    amenities: ['Air Conditioning', 'Heating'], 
    pricePerBed: 12000,
    activeTicketIssue: [],
    rentDueTenants: [],
    underNoticeTenant: []
  },
];

export default roomsData;
