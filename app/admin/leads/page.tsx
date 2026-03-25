'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, ChevronDown, Phone, Mail, MapPin, Calendar, FileText, X, Eye, CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react'

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'won', 'lost']
const STAGE_OPTIONS = ['none', 'initial', 'consultation', 'proposal', 'negotiation', 'closed']

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  won: 'bg-green-500/10 text-green-400 border-green-500/30',
  lost: 'bg-red-500/10 text-red-400 border-red-500/30',
}

const STAGE_COLORS: Record<string, string> = {
  none: 'bg-gray-500/10 text-gray-400',
  initial: 'bg-blue-500/10 text-blue-400',
  consultation: 'bg-yellow-500/10 text-yellow-400',
  proposal: 'bg-purple-500/10 text-purple-400',
  negotiation: 'bg-orange-500/10 text-orange-400',
  closed: 'bg-green-500/10 text-green-400',
}

interface Lead {
  id: string
  fullName: string
  phone: string
  email: string
  projectType: string
  city: string | null
  message: string | null
  status: string
  followUpStage: string
  notes: string | null
  leadSource: string
  emailMarketingConsent: boolean
  emailMarketingConsentAt: string | null
  createdAt: string
  updatedAt: string
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
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [optInFilter, setOptInFilter] = useState('all')
  const [editingNotes, setEditingNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('status', filter)
      if (search) params.set('search', search)
      if (optInFilter !== 'all') params.set('optIn', optInFilter)

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
  }, [filter, search, optInFilter])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const updateLead = async (id: string, data: Partial<Lead>) => {
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

  const exportLeads = (exportOptIns = false) => {
    const exportData = exportOptIns ? leads.filter(l => l.emailMarketingConsent) : leads
    const headers = ['Name', 'Email', 'Phone', 'Project', 'City', 'Source', 'Status', 'Opt-In', 'Created']
    const rows = exportData.map(l => [
      l.fullName,
      l.email,
      l.phone,
      l.projectType,
      l.city ?? '',
      l.leadSource,
      l.status,
      l.emailMarketingConsent ? 'Yes' : 'No',
      new Date(l.createdAt).toLocaleDateString(),
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = exportOptIns ? 'email-opt-ins.csv' : 'leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusCount = (status: string) => {
    const found = stats.byStatus.find(s => s.status === status)
    return found?._count ?? 0
  }

  return (
    <div className="min-h-screen bg-bg-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Lead Dashboard</h1>
            <p className="text-muted mt-1">Manage and track your leads</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => exportLeads(false)} className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All
            </button>
            <button onClick={() => exportLeads(true)} className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Opt-Ins
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-text-primary">{stats.total}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">New</p>
            <p className="text-3xl font-bold text-blue-400">{getStatusCount('new')}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">Contacted</p>
            <p className="text-3xl font-bold text-yellow-400">{getStatusCount('contacted')}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">Qualified</p>
            <p className="text-3xl font-bold text-purple-400">{getStatusCount('qualified')}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">Won</p>
            <p className="text-3xl font-bold text-green-400">{getStatusCount('won')}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-muted mb-1">Email Opt-Ins</p>
            <p className="text-3xl font-bold text-accent-red">{stats.emailOptIns}</p>
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
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 bg-bg-1 border border-line rounded-md text-text-primary focus:border-accent-red focus:outline-none"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <select
              value={optInFilter}
              onChange={e => setOptInFilter(e.target.value)}
              className="px-4 py-2 bg-bg-1 border border-line rounded-md text-text-primary focus:border-accent-red focus:outline-none"
            >
              <option value="all">All Opt-Ins</option>
              <option value="true">Email Opt-In Only</option>
              <option value="false">No Opt-In</option>
            </select>
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
                  <th className="text-left p-4 text-sm font-semibold text-muted">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted hidden sm:table-cell">Opt-In</th>
                  <th className="text-left p-4 text-sm font-semibold text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted">Loading...</td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted">No leads found</td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr key={lead.id} className="border-b border-line hover:bg-bg-0/50 transition-colors">
                      <td className="p-4 text-sm text-muted">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-text-primary">{lead.fullName}</p>
                        <p className="text-sm text-muted md:hidden">{lead.email}</p>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <p className="text-sm text-text-primary">{lead.email}</p>
                        <p className="text-sm text-muted">{lead.phone}</p>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <p className="text-sm text-text-primary">{lead.projectType}</p>
                        {lead.city && <p className="text-sm text-muted">{lead.city}</p>}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${STATUS_COLORS[lead.status] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        {lead.emailMarketingConsent ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-500" />
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedLead(lead)}
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
                <h3 className="font-bold text-text-primary text-lg">{selectedLead.fullName}</h3>
                <p className="text-muted text-sm">{selectedLead.projectType}</p>
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
                  <span className="text-muted">{new Date(selectedLead.createdAt).toLocaleString()}</span>
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
                <label className="block text-sm font-medium text-muted mb-2">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={e => updateLead(selectedLead.id, { status: e.target.value })}
                  disabled={updating}
                  className="w-full px-3 py-2 bg-bg-1 border border-line rounded text-text-primary"
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Follow-Up Stage</label>
                <select
                  value={selectedLead.followUpStage}
                  onChange={e => updateLead(selectedLead.id, { followUpStage: e.target.value })}
                  disabled={updating}
                  className="w-full px-3 py-2 bg-bg-1 border border-line rounded text-text-primary"
                >
                  {STAGE_OPTIONS.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">Notes</label>
                <textarea
                  value={editingNotes}
                  onChange={e => setEditingNotes(e.target.value)}
                  onBlur={() => {
                    if (editingNotes !== selectedLead.notes) {
                      updateLead(selectedLead.id, { notes: editingNotes })
                    }
                  }}
                  placeholder="Add notes about this lead..."
                  rows={4}
                  className="w-full px-3 py-2 bg-bg-1 border border-line rounded text-text-primary resize-none"
                />
              </div>

              <div className="pt-4 border-t border-line">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Email Marketing Opt-In</span>
                  {selectedLead.emailMarketingConsent ? (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-4 h-4" /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-500">
                      <XCircle className="w-4 h-4" /> No
                    </span>
                  )}
                </div>
                {selectedLead.emailMarketingConsentAt && (
                  <p className="text-xs text-muted mt-1">
                    Opted in: {new Date(selectedLead.emailMarketingConsentAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-line">
                <p className="text-xs text-muted">
                  Source: <span className="text-text-primary">{selectedLead.leadSource}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
