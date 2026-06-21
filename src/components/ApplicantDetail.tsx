'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, FileText, Calendar, Download, MessageSquare } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { formatDate, formatDateTime } from '@/lib/date'

interface Applicant {
  id: string
  fullName: string
  email: string
  phone: string
  position: string
  coverLetter: string
  cvUrl?: string | null
  status: string
  notes?: string | null
  job?: {
    title: string
    department: string
    location: string
    type: string
  } | null
  activities?: any[]
  createdAt: string
}

interface ApplicantDetailProps {
  applicant: Applicant
}

export default function ApplicantDetail({ applicant }: ApplicantDetailProps) {
  const router = useRouter()
  const [notes, setNotes] = useState(applicant.notes || '')
  const [status, setStatus] = useState(applicant.status)
  const [saving, setSaving] = useState(false)
  const [activities, setActivities] = useState(applicant.activities || [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-yellow-100 text-yellow-800'
      case 'Under Review':
        return 'bg-purple-100 text-purple-800'
      case 'Interview Scheduled':
        return 'bg-indigo-100 text-indigo-800'
      case 'Shortlisted':
        return 'bg-green-100 text-green-800'
      case 'Hired':
        return 'bg-emerald-100 text-emerald-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleSaveNotes = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/applicants/${applicant.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      })
      if (res.ok) {
        const data = await res.json()
        setActivities(data.activities || activities)
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true)
    try {
      const res = await fetch(`/api/applicants/${applicant.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        const data = await res.json()
        setStatus(newStatus)
        setActivities(data.activities || activities)
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <a
        href="/dashboard/applicants"
        className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
      >
        ← Back to Applicants
      </a>

      {/* Header */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                  {applicant.fullName}
                </h1>
                <p className="text-lg text-gray-400">{applicant.position}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3" />
                <a href={`mailto:${applicant.email}`} className="hover:text-white transition-colors">
                  {applicant.email}
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3" />
                <a href={`tel:${applicant.phone}`} className="hover:text-white transition-colors">
                  {applicant.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Applied {formatDate(applicant.createdAt)}</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Position Details</h3>
              <p className="text-gray-400">{applicant.job?.title ?? applicant.position ?? "General Application"}</p>
              <p className="text-sm text-gray-500">{applicant.job?.department ?? "—"} • {applicant.job?.location ?? "—"} • {applicant.job?.type ?? "—"}</p>
            </div>
          </div>

          <div className="lg:ml-6">
            {applicant.cvUrl ? (
              <a
                href={applicant.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            ) : (
              <span className="inline-flex items-center px-6 py-3 bg-gray-800 text-gray-400 rounded-full text-sm">
                No CV uploaded
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cover Letter */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
        <h2 className="text-xl font-bold text-white mb-4">Cover Letter</h2>
        <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{applicant.coverLetter}</p>
      </div>

      {/* Status Management */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
        <h2 className="text-xl font-bold text-white mb-4">Update Status</h2>
        <div className="flex flex-wrap gap-3">
          {['New', 'Under Review', 'Interview Scheduled', 'Shortlisted', 'Hired', 'Rejected'].map((statusOption) => (
            <button
              key={statusOption}
              onClick={() => handleStatusChange(statusOption)}
              disabled={saving}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  status === statusOption
                    ? 'bg-white text-black'
                    : 'border border-gray-700 text-gray-300 hover:border-white hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {statusOption}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
        <div className="flex items-center mb-4">
          <MessageSquare className="w-5 h-5 mr-2 text-gray-400" />
          <h2 className="text-xl font-bold text-white">Notes</h2>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          placeholder="Add notes about this applicant..."
          className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors resize-none mb-4"
        />
        <button
          onClick={handleSaveNotes}
          disabled={saving}
          className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Notes'}
        </button>
      </div>

      {/* Activity Timeline */}
      {activities.length > 0 && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h2 className="text-xl font-bold text-white mb-6">Activity Timeline</h2>
          <div className="space-y-4">
            {activities.map((activity: any) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-white rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(activity.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}