'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Clock } from 'lucide-react'

interface JobCardProps {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
}

export default function JobCard({ id, title, department, location, type, description }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </div>

        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center text-sm text-gray-400">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{department}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>{type}</span>
          </div>
        </div>

    <Link
      href={`/careers/${id}`}
      className="inline-block mt-4 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
    >
      View Details
    </Link>
      </div>
    </motion.div>
  )
}