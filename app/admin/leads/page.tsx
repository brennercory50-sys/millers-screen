'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Download, Phone, Mail, MapPin, Calendar, FileText, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

interface Lead {
  id: string
  full_name: string
  phone: string
  email: string
  project_type: string
  city: string | null
  message: string | null
  created_at: string
  status?: string
  follow_up_date?: string | null
}

interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

interface Stats {
  total: number
  emailOptIns: number
  byStatus: { status: string; _count: number }[]
}

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'quoted', 'won', 'lost', 'archived'] as const

export default function AdminLeadsPage() {
  const queryClient = useQueryClient()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [editingNotes, setEditingNotes] = useState('')
  const [editingStatus, setEditingStatus] = useState('')
  const [editingFollowUp, setEditingFollowUp] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['leads', search, page],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.set('page', page.toString())
      params.set('pageSize', '20')
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/leads?${params.toString()}`)
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/admin/login'
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to fetch')
      }
      return res.json()
    },
  })

  const leads: Lead[] = data?.leads ?? []
  const pagination: PaginationMeta = data?.pagination ?? { page: 1, pageSize: 20, total: 0, totalPages: 0 }
  const stats = data?.stats ?? { total: 0, emailOptIns: 0, byStatus: [] }

  const updateMutation = useMutation({
    mutationFn: async ({ id, notes, status, followUpDate }: { id: string; notes?: string; status?: string; followUpDate?: string | null }) => {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, notes, status, followUpDate }),
      })
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/admin/login'
          throw new Error('Unauthorized')
        }
        throw new Error('Failed to update')
      }
      return res.json()
    },
    onSuccess: () => {
      toast.success('Lead updated successfully')
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
    onError: () => {
      toast.error('Failed to update lead')
    },
  })

  const handleUpdateLead = (field: 'notes' | 'status' | 'followUpDate') => {
    if (!selectedLead) return

    const updates: { notes?: string; status?: string; followUpDate?: string | null } = {}
    
    if (field === 'notes') {
      updates.notes = editingNotes
    } else if (field === 'status') {
      updates.status = editingStatus
    } else if (field === 'followUpDate') {
      updates.followUpDate = editingFollowUp || null
    }

    updateMutation.mutate({ id: selectedLead.id, ...updates })
  }

  const exportLeads = () => {
    const headers = ['Name', 'Email', 'Phone', 'Project', 'City', 'Status', 'Created']
    const rows = leads.map((l: Lead) => [
      l.full_name,
      l.email,
      l.phone,
      l.project_type,
      l.city ?? '',
      l.status ?? 'new',
      new Date(l.created_at).toLocaleDateString(),
    ])
    const csv = [headers, ...rows].map((r: string[]) => r.map((v: string) => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-bg-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Lead Dashboard</h1>
            <p className="text-muted mt-1">Manage and track your leads</p>
          </div>
          <button onClick={exportLeads} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-text-primary">{stats.total}</p>
          </div>
        </div>

        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="w-full pl-10 pr-4 py-2 bg-bg-1 border border-line rounded-md text-text-primary focus:border-accent-red focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left p-4 text-sm font-semibold text-muted">Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted">Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted hidden md:table-cell">Contact</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted hidden lg:table-cell">Project</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted hidden lg:table-cell">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted">Loading...</td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted">No leads found</td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-b border-line hover:bg-bg-0/50 transition-colors">
                      <td className="p-4 text-sm text-muted">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-text-primary">{lead.full_name}</p>
                        <p className="text-sm text-muted md:hidden">{lead.email}</p>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <p className="text-sm text-text-primary">{lead.email}</p>
                        <p className="text-sm text-muted">{lead.phone}</p>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <p className="text-sm text-text-primary">{lead.project_type}</p>
                        {lead.city && <p className="text-sm text-muted">{lead.city}</p>}
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          lead.status === 'won' ? 'bg-green-500/20 text-green-400' :
                          lead.status === 'lost' ? 'bg-red-500/20 text-red-400' :
                          lead.status === 'quoted' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {lead.status ?? 'new'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setSelectedLead(lead)
                            setEditingNotes(lead.message ?? '')
                            setEditingStatus(lead.status ?? 'new')
                            setEditingFollowUp(lead.follow_up_date ?? '')
                          }}
                          className="p-2 hover:bg-bg-1 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-muted" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-line flex items-center justify-between">
              <p className="text-sm text-muted">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={pagination.page === 1}
                  className="p-2 hover:bg-bg-1 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-2 hover:bg-bg-1 rounded disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50" onClick={() => setSelectedLead(null)}>
          <div className="bg-panel h-full w-full max-w-lg overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-line flex items-center justify-between">
              <h2 className="text-xl font-bold text-text-primary">Lead Details</h2>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-bg-1 rounded">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-text-primary text-lg">{selectedLead.full_name}</h3>
                <p className="text-muted text-sm">{selectedLead.project_type}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted" />
                  <a href={`tel:${selectedLead.phone}`} className="text-accent-red hover:underline">{selectedLead.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted" />
                  <a href={`mailto:${selectedLead.email}`} className="text-accent-red hover:underline">{selectedLead.email}</a>
                </div>
                {selectedLead.city && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted" />
                    <span className="text-muted">{selectedLead.city}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted" />
                  <span className="text-muted">{new Date(selectedLead.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Status</label>
                <select
                  value={editingStatus}
                  onChange={e => setEditingStatus(e.target.value)}
                  onBlur={() => editingStatus !== (selectedLead.status ?? 'new') && handleUpdateLead('status')}
                  className="w-full px-3 py-2 bg-bg-1 border border-line rounded text-text-primary"
                >
                  {LEAD_STATUSES.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Follow-up Date</label>
                <input
                  type="date"
                  value={editingFollowUp}
                  onChange={e => setEditingFollowUp(e.target.value)}
                  onBlur={() => handleUpdateLead('followUpDate')}
                  className="w-full px-3 py-2 bg-bg-1 border border-line rounded text-text-primary"
                />
              </div>

              {selectedLead.message && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-muted" />
                    <span className="text-sm font-medium text-muted">Project Details</span>
                  </div>
                  <p className="text-sm text-text-primary bg-bg-1 p-3 rounded">{selectedLead.message}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Notes</label>
                <textarea
                  value={editingNotes}
                  onChange={e => setEditingNotes(e.target.value)}
                  onBlur={() => editingNotes !== (selectedLead.message ?? '') && handleUpdateLead('notes')}
                  placeholder="Add notes about this lead..."
                  rows={4}
                  className="w-full px-3 py-2 bg-bg-1 border border-line rounded text-text-primary resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
