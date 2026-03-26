'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, Phone, Mail, MapPin, Calendar, FileText, X, Eye, CheckCircle, XCircle } from 'lucide-react'

interface Lead {
  id: string
  full_name: string
  phone: string
  email: string
  project_type: string
  city: string | null
  message: string | null
  created_at: string
}

interface Stats {
  total: number
  emailOptIns: number
  byStatus: { status: string; _count: number }[]
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, emailOptIns: 0, byStatus: [] })
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [search, setSearch] = useState('')
  const [editingNotes, setEditingNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ''}` },
      })
      const data = await res.json()
      if (data.leads) setLeads(data.leads)
      if (data.stats) setStats(data.stats)
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const updateLead = async (id: string, data: { notes?: string }) => {
    setUpdating(true)
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET ?? ''}`,
        },
        body: JSON.stringify({ id, ...data }),
      })
      await fetchLeads()
      if (selectedLead?.id === id) {
        setSelectedLead(prev => prev ? { ...prev, ...data } : null)
      }
    } catch (err) {
      console.error('Failed to update lead:', err)
    } finally {
      setUpdating(false)
    }
  }

  const exportLeads = () => {
    const headers = ['Name', 'Email', 'Phone', 'Project', 'City', 'Created']
    const rows = leads.map(l => [
      l.full_name,
      l.email,
      l.phone,
      l.project_type,
      l.city ?? '',
      new Date(l.created_at).toLocaleDateString(),
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
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
                onChange={e => setSearch(e.target.value)}
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
                  <th className="text-left p-4 text-sm font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">Loading...</td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">No leads found</td>
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
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setSelectedLead(lead)
                            setEditingNotes(lead.message ?? '')
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
                  onBlur={() => {
                    if (editingNotes !== selectedLead.message) {
                      updateLead(selectedLead.id, { notes: editingNotes })
                    }
                  }}
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
