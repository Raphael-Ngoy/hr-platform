'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, FileText, Calendar } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/date'

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
  } | null
  createdAt: string
}

interface ApplicantCardProps {
  applicant: Applicant
}

export default function ApplicantCard({ applicant }: ApplicantCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-gray-600 transition-all"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Applicant Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{applicant.fullName}</h3>
              <p className="text-sm text-gray-400">{applicant.job?.title ?? applicant.position ?? "General Application"}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
              {applicant.status}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-400">
              <Mail className="w-4 h-4 mr-2" />
              <span>{applicant.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Phone className="w-4 h-4 mr-2" />
              <span>{applicant.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Applied {formatDate(applicant.createdAt)}</span>
            </div>
          </div>

          {applicant.coverLetter && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 line-clamp-2">{applicant.coverLetter}</p>
            </div>
          )}

          {applicant.notes && (
            <div className="bg-gray-800 rounded-lg p-3 mb-4">
              <p className="text-xs font-medium text-gray-400 mb-1">Notes:</p>
              <p className="text-sm text-gray-400">{applicant.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 lg:ml-6">
          <Link
            href={`/dashboard/applicants/${applicant.id}`}
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors text-center"
          >
            View Details
          </Link>
          {applicant.cvUrl && (
            <a
              href={applicant.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gray-700 text-gray-300 rounded-full text-sm font-medium hover:border-white hover:text-white transition-colors text-center flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download CV
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}