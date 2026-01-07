export type Complaint = {
  id: string
  title: string
  raisedBy: string
  room: string
  createdOn: string
  status: 'open' | 'inprogress' | 'resolved'
  description?: string
  photos?: string[]
  logs?: { title: string; time: string }[]
  assignedTo?: { name: string; role?: string; phone?: string }[]
  priority?: 'High' | 'Medium' | 'Low'
}

const complaints: Complaint[] = [
  {
    id: '1',
    title: 'Ac Not working',
    raisedBy: 'Rakesh',
    room: 'Room 102',
    createdOn: '22-10-2025',
    status: 'open',
    priority: 'High',
    description: 'The AC in my room is not cooling since yesterday evening. It makes a loud noise and then stops. Please send someone to fix it as soon as possible.',
    photos: [],
    logs: [
      { title: 'Ticket created by Rakesh', time: '22-10-2025, 09:00 AM' }
    ],
    assignedTo: [],
  },
  {
    id: '2',
    title: 'Wifi Connection',
    raisedBy: 'Pabitra',
    room: 'Room 102',
    createdOn: '20-10-2025',
    status: 'open',
    priority: 'High',
    description: 'I am facing continuous issues with the Wi‑Fi connection in my room. The network shows connected, but there is either no internet access or the connection drops frequently.',
    photos: [],
    logs: [
      { title: 'Ticket created by Pabitra', time: '20-10-2025, 09:00 AM' },
      { title: 'Complaint assigned to Raghav', time: '20-10-2025, 12:30 PM' }
    ],
    assignedTo: [ { name: 'Raghav', role: 'Employee', phone: '9999999999' } ],
  },
  {
    id: '3',
    title: 'Cleaning Issue',
    raisedBy: 'Swagat',
    room: 'Room 101',
    createdOn: '18-10-2025',
    status: 'open',
    priority: 'Medium',
    description: 'The room cleaning schedule was missed this week and the waste bin was not emptied.',
    photos: [],
    logs: [ { title: 'Ticket created by Swagat', time: '18-10-2025, 10:15 AM' } ],
    assignedTo: [],
  },
  {
    id: '4',
    title: 'Light not working',
    raisedBy: 'Amit',
    room: 'Room 103',
    createdOn: '15-10-2025',
    status: 'inprogress',
    priority: 'Medium',
    description: 'Ceiling light flickers when switched on. Electrician visiting today.',
    photos: [],
    logs: [ { title: 'Ticket created by Amit', time: '15-10-2025, 08:00 AM' }, { title: 'Assigned to electrician', time: '15-10-2025, 11:00 AM' } ],
    assignedTo: [ { name: 'Suhani Shah', role: 'Employee', phone: '8888888888' } ],
  },
  {
    id: '5',
    title: 'Water leakage',
    raisedBy: 'Sonia',
    room: 'Room 104',
    createdOn: '11-10-2025',
    status: 'inprogress',
    priority: 'High',
    description: 'There is a steady water leak under the sink causing puddles on the floor.',
    photos: [],
    logs: [ { title: 'Ticket created by Sonia', time: '11-10-2025, 07:30 AM' }, { title: 'Plumber scheduled', time: '11-10-2025, 10:00 AM' } ],
    assignedTo: [ { name: 'Plumber Team', role: 'Contractor', phone: '7777777777' } ],
  },
  {
    id: '6',
    title: 'Window broken',
    raisedBy: 'Neha',
    room: 'Room 105',
    createdOn: '05-10-2025',
    status: 'resolved',
    priority: 'Low',
    description: 'Window pane cracked after storm; glass replaced.',
    photos: [],
    logs: [ { title: 'Ticket created by Neha', time: '05-10-2025, 03:00 PM' }, { title: 'Window replaced', time: '06-10-2025, 10:00 AM' } ],
    assignedTo: [ { name: 'Maintenance', role: 'Employee', phone: '6666666666' } ],
  },
  {
    id: '7',
    title: 'Door lock issue',
    raisedBy: 'Vikram',
    room: 'Room 106',
    createdOn: '01-10-2025',
    status: 'resolved',
    priority: 'Low',
    description: 'Lock was jamming; lubrication fixed the issue.',
    photos: [],
    logs: [ { title: 'Ticket created by Vikram', time: '01-10-2025, 09:30 AM' }, { title: 'Locked fixed', time: '02-10-2025, 11:00 AM' } ],
    assignedTo: [ { name: 'Suhani Shah', role: 'Employee', phone: '8888888888' } ],
  },
  {
    id: '8',
    title: 'TV remote missing',
    raisedBy: 'Rina',
    room: 'Room 107',
    createdOn: '28-09-2025',
    status: 'open',
    priority: 'Low',
    description: 'TV remote missing from room shelf.',
    photos: [],
    logs: [ { title: 'Ticket created by Rina', time: '28-09-2025, 08:45 AM' } ],
    assignedTo: [],
  },
]

export default complaints
