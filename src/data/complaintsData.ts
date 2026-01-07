import complaints from './complaints'

export function getComplaintById(id: string) {
  const c = complaints.find(x => x.id === id)
  if (!c) return null

  // Enrich with fields used by the details screen
  return {
    ...c,
    createdAt: c.createdOn || '',
    description: c.description || 'No description provided by the tenant.',
    priority: (c as any).priority || 'High',
    photos: (c as any).photos || [],
    logs: (c as any).logs || [
      { title: `Ticket created by ${c.raisedBy}`, time: c.createdOn || '' },
    ],
    assignedTo: (c as any).assignedTo || [],
  }
}

export default {
  getComplaintById,
}
