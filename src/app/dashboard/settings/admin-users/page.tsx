'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, UserPlus, Shield } from 'lucide-react'
import { formatDate } from '@/lib/date'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'HR Admin', status: 'Active' })

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    const res = await fetch('/api/settings/admin-users')
    if (res.ok) setAdmins(await res.json())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingAdmin ? 'PATCH' : 'POST'
    const body = editingAdmin ? { ...formData, id: editingAdmin.id } : formData

    const res = await fetch('/api/settings/admin-users', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (res.ok) {
      setShowForm(false)
      setEditingAdmin(null)
      setFormData({ name: '', email: '', password: '', role: 'HR Admin', status: 'Active' })
      fetchAdmins()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return
    await fetch('/api/settings/admin-users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    fetchAdmins()
  }

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
    setFormData({ name: admin.name, email: admin.email, password: '', role: admin.role, status: admin.status })
    setShowForm(true)
  }

  return (
    <div className="pt-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Admin Users</h1>
          <p className="mt-2 text-gray-400">Manage HR admin accounts and permissions.</p>
        </div>
        <button
          onClick={() => { setEditingAdmin(null); setFormData({ name: '', email: '', password: '', role: 'HR Admin', status: 'Active' }); setShowForm(true) }}
          className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-2xl space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password {editingAdmin && '(leave blank to keep)'}</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingAdmin}
                className="w-full px-4 py-2 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white"
              >
                <option value="HR Admin">HR Admin</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              {editingAdmin ? 'Update Admin' : 'Create Admin'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-gray-700 text-gray-300 rounded-full text-sm font-medium hover:border-white hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Role</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Created</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {admins.map((admin) => (
              <motion.tr
                key={admin.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-white">{admin.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{admin.email}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{admin.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    admin.status === 'Active' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'
                  }`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{formatDate(admin.createdAt)}</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button onClick={() => handleEdit(admin)} className="text-gray-400 hover:text-white transition-colors mr-3">
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => handleDelete(admin.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}