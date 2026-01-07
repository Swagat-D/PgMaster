export type Complaint = {
  id: string
  title: string
  raisedBy: string
  room: string
  createdOn: string
  status: 'open' | 'inprogress' | 'resolved'
}

const complaints: Complaint[] = [
  { id: '1', title: 'Ac Not working', raisedBy: 'Rakesh', room: 'Room 102', createdOn: '22-10-2025', status: 'open' },
  { id: '2', title: 'Wifi Connection', raisedBy: 'Pabitra', room: 'Room 102', createdOn: '20-10-2025', status: 'open' },
  { id: '3', title: 'Cleaning Issue', raisedBy: 'Swagat', room: 'Room 101', createdOn: '18-10-2025', status: 'open' },
  { id: '4', title: 'Light not working', raisedBy: 'Amit', room: 'Room 103', createdOn: '15-10-2025', status: 'inprogress' },
  { id: '5', title: 'Water leakage', raisedBy: 'Sonia', room: 'Room 104', createdOn: '11-10-2025', status: 'inprogress' },
  { id: '6', title: 'Window broken', raisedBy: 'Neha', room: 'Room 105', createdOn: '05-10-2025', status: 'resolved' },
  { id: '7', title: 'Door lock issue', raisedBy: 'Vikram', room: 'Room 106', createdOn: '01-10-2025', status: 'resolved' },
  { id: '8', title: 'TV remote missing', raisedBy: 'Rina', room: 'Room 107', createdOn: '28-09-2025', status: 'open' },
]

export default complaints
