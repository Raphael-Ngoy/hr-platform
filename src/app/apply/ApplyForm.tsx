'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function ApplyForm() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [job, setJob] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(!!jobId)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
  })

  useEffect(() => {
    if (jobId) {
      setIsLoading(true)
      fetch(`/api/jobs/${jobId}`)
        .then(res => {
          if (!res.ok) throw new Error('Job not found')
          return res.json()
        })
        .then(data => {
          setJob(data)
          setFormData(prev => ({ ...prev, position: data.title }))
        })
        .catch(err => {
          console.error('Error fetching job:', err)
          setError('Could not load job details. Please select a position manually.')
        })
        .finally(() => setIsLoading(false))
    }
  }, [jobId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const fileInput = form.querySelector('#cv') as HTMLInputElement
      const file = fileInput?.files?.[0]

      if (!file) {
        setError('CV file is required. Please upload your resume.')
        setSubmitting(false)
        return
      }

      const submitFormData = new FormData()
      const position = job ? job.title : formData.position
      
      submitFormData.append('fullName', formData.fullName)
      submitFormData.append('email', formData.email)
      submitFormData.append('phone', formData.phone)
      submitFormData.append('position', position)
      submitFormData.append('coverLetter', formData.coverLetter)
      submitFormData.append('jobId', jobId || '')
      submitFormData.append('jobTitle', job?.title || '')
      submitFormData.append('department', job?.department || '')
      submitFormData.append('location', job?.location || '')
      submitFormData.append('employmentType', job?.type || '')
      submitFormData.append('salaryRange', job?.salary || '')
      submitFormData.append('cv', file)

      const response = await fetch('/api/applicants', {
        method: 'POST',
        body: submitFormData,
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError(responseData.error || 'Unknown error occurred')
        console.error('SUBMISSION FAILED:', responseData)
      }
    } catch (error: any) {
      console.error('FULL SUBMIT ERROR:', error)
      setError(
        error?.message ||
        'Failed to submit application. Please check your connection and try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Application Submitted!
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Thank you for your interest in joining NEXUS. We've received your application and will review it carefully. We'll be in touch soon!
          </p>
          <a
            href="/careers"
            className="inline-block px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Careers
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="bg-black py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Take the first step towards an exciting career at NEXUS. We can't wait to learn more about you.
          </p>
        </div>
      </section>

      <section className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                Personal Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {jobId && job ? (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-2">Applying for:</p>
                    <p className="text-lg font-semibold text-white">{job.title}</p>
                    <div className="mt-2 text-sm text-gray-400 space-y-1">
                      <p>Department: {job.department}</p>
                      <p>Location: {job.location}</p>
                      <p>Type: {job.type}</p>
                      {job.salary && <p>Salary: {job.salary}</p>}
                    </div>
                    <input type="hidden" name="position" value={job.title} />
                  </div>
                ) : jobId && isLoading ? (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Loading job details...</p>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                      Position Applied For *
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="">Select a position</option>
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="UX Designer">UX Designer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Marketing Manager">Marketing Manager</option>
                      <option value="Sales Representative">Sales Representative</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
                Additional Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="Tell us why you'd be a great fit for this role..."
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-300 mb-2">
                    CV/Resume (PDF only) *
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-gray-800"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Maximum file size: 10MB. Accepted format: PDF
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-lg text-sm whitespace-pre-wrap">
                <p className="font-medium mb-1">Error:</p>
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="px-12 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}