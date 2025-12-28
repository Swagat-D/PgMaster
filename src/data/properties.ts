export type Room = {
  id: string;
  roomNumber: string;
  status: 'available' | 'full';
  bedCount: number;
  rentDueCount: number;
  underNoticeCount: number;
  activeTickets: number;
  occupancyPercent?: number;
};

export const roomsData: Room[] = [
  { id: 'r1', roomNumber: '101', status: 'available', bedCount: 6, rentDueCount: 2, underNoticeCount: 1, activeTickets: 5, occupancyPercent: 85.4 },
  { id: 'r2', roomNumber: '102', status: 'full', bedCount: 6, rentDueCount: 2, underNoticeCount: 1, activeTickets: 5, occupancyPercent: 100 },
  { id: 'r3', roomNumber: '103', status: 'available', bedCount: 4, rentDueCount: 0, underNoticeCount: 0, activeTickets: 0, occupancyPercent: 75 },
];

export default roomsData;
