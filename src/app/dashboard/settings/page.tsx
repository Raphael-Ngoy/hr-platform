'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, LogOut, Download, Bell, Shield, Globe, Briefcase, Plus, Edit2, Trash2, X } from 'lucide-react'

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: 'HR Admin', email: 'hr@nexus.com', role: 'HR Admin' })
  const [defaultStatus, setDefaultStatus] = useState('New')
  const [timezone, setTimezone] = useState('America/New_York')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newApplicantAlerts, setNewApplicantAlerts] = useState(true)
  const [saved, setSaved] = useState(false)
  const [jobs, setJobs] = useState<any[]>([])
  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [jobForm, setJobForm] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', salary: '' })

  useEffect(() => {
    fetchJobs()
    fetchSettings()
  }, [])

  const fetchJobs = async () => {
    const res = await fetch('/api/jobs')
    if (res.ok) setJobs(await res.json())
  }

  const fetchSettings = async () => {
    const res = await fetch('/api/settings')
    if (res.ok) {
      const data = await res.json()
      if (data.profile) setProfile(data.profile)
      if (data.notifications) {
        setEmailNotifications(data.notifications.email)
        setNewApplicantAlerts(data.notifications.applicantAlerts)
      }
      if (data.system) setTimezone(data.system.timezone)
    }
  }

  const handleSaveProfile = async () => {
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile })
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSaveNotifications = async () => {
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notifications: { email: emailNotifications, applicantAlerts: newApplicantAlerts } })
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSaveSystem = async () => {
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: { timezone } })
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingJob ? 'PATCH' : 'POST'
    const body = editingJob ? { ...jobForm, id: editingJob.id } : jobForm

    const res = await fetch('/api/jobs', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.ok) {
      setShowJobForm(false)
      setEditingJob(null)
      setJobForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', salary: '' })
      fetchJobs()
    }
  }

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return
    await fetch('/api/jobs', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchJobs()
  }

  const handleToggleJob = async (job: any) => {
    await fetch('/api/jobs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: job.id, isActive: !job.isActive })
    })
    fetchJobs()
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Status', 'Created Date']
    const rows = [] as any[]
    // In a real app, fetch applicants and convert to CSV
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'applicants.csv'
    a.click()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-gray-400">Manage your HR account and recruitment preferences.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Profile Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <input type="text" value={profile.role} disabled className="w-full px-4 py-3 bg-black border border-gray-800 text-gray-400 rounded-lg cursor-not-allowed" />
            </div>
          </div>
          <button onClick={handleSaveProfile} className="mt-6 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Save Profile</button>
        </motion.div>

        {/* Account Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <LogOut className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Account Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors" />
            </div>
            <button className="px-6 py-2 bg-red-900/30 border border-red-800 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors text-sm font-medium">Logout All Sessions</button>
          </div>
        </motion.div>

        {/* Recruitment Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Recruitment Settings</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Default Applicant Status</label>
            <select value={defaultStatus} onChange={(e) => setDefaultStatus(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors">
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
            </select>
          </div>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg cursor-pointer">
              <span className="text-gray-300">Email Notifications</span>
              <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-white focus:ring-white" />
            </label>
            <label className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg cursor-pointer">
              <span className="text-gray-300">New Applicant Alerts</span>
              <input type="checkbox" checked={newApplicantAlerts} onChange={(e) => setNewApplicantAlerts(e.target.checked)} className="w-5 h-5 rounded border-gray-600 bg-gray-900 text-white focus:ring-white" />
            </label>
            <button onClick={handleSaveNotifications} className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Save Notifications</button>
          </div>
        </motion.div>

        {/* System Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-bold text-white">System Settings</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
              <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full px-4 py-3 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors">
                <option value="America/New_York">Eastern Time (US & Canada)</option>
                <option value="America/Chicago">Central Time (US & Canada)</option>
                <option value="America/Denver">Mountain Time (US & Canada)</option>
                <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Berlin">Berlin (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button onClick={handleSaveSystem} className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">Save Timezone</button>
              <button onClick={exportCSV} className="px-6 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Applicants Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Admin Users Management */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-white">Admin Users</h2>
            </div>
            <a href="/dashboard/settings/admin-users" className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Manage Admins
            </a>
          </div>
          <p className="text-gray-400">Create, edit, and manage HR admin accounts. Control access and permissions for your recruitment team.</p>
        </motion.div>

        {/* Jobs Management */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-white">Jobs Management</h2>
            </div>
            <button onClick={() => { setEditingJob(null); setJobForm({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', salary: '' }); setShowJobForm(true) }} className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Job
            </button>
          </div>

          {showJobForm && (
            <form onSubmit={handleJobSubmit} className="mb-6 p-6 bg-black border border-gray-800 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Job Title" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} required className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white" />
                <input placeholder="Department" value={jobForm.department} onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })} required className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white" />
                <input placeholder="Location" value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} required className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white" />
                <select value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })} className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <textarea placeholder="Description" value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} required rows={3} className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white" />
              <textarea placeholder="Requirements" value={jobForm.requirements} onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })} required rows={2} className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white" />
              <input placeholder="Salary Range (optional)" value={jobForm.salary} onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })} className="w-full px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white" />
              <div className="flex gap-4">
                <button type="submit" className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">{editingJob ? 'Update Job' : 'Create Job'}</button>
                <button type="button" onClick={() => setShowJobForm(false)} className="px-6 py-2 border border-gray-700 text-gray-300 rounded-full text-sm font-medium hover:border-white hover:text-white transition-colors">Cancel</button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-white font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-400">{job.department} • {job.location} • {job.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleToggleJob(job)} className={`px-3 py-1 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => { setEditingJob(job); setJobForm(job); setShowJobForm(true) }} className="p-2 text-gray-400 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}