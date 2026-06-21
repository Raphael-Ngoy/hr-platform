'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function DeleteApplicantButton({ applicantId, applicantName }: { applicantId: string; applicantName: string }) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${applicantName}?`)) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/applicants/${applicantId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error deleting applicant:', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      title="Delete applicant"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  )
}