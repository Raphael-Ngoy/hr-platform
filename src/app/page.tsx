import Hero from "@/components/Hero"
import JobCard from "@/components/JobCard"
import prisma from "@/lib/prisma"
import { Job } from "@prisma/client"

async function getJobs() {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
    return jobs as Job[]
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

export default async function Home() {
  const jobs = await getJobs()

  return (
    <div>
      <Hero />

      {/* Open Positions Preview */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover opportunities to grow, learn, and make an impact. We're always looking for talented individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job: Job) => (
              <JobCard key={job.id} id={job.id} title={job.title} department={job.department} location={job.location} type={job.type} description={job.description} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/careers" className="inline-block px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-all">
              View All Positions
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-gray-900/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We believe in creating an environment where talented people can do their best work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation First</h3>
              <p className="text-gray-400">Work on cutting-edge projects that push boundaries and shape the future of technology.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Great Team</h3>
              <p className="text-gray-400">Collaborate with some of the brightest minds in the industry who are passionate about what they do.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border border-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Growth & Learning</h3>
              <p className="text-gray-400">Continuous learning opportunities, mentorship programs, and clear career progression paths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Benefits & Perks</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">We take care of our team with comprehensive benefits and a supportive work environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Health Insurance", desc: "Comprehensive medical, dental, and vision coverage" },
              { title: "Flexible Hours", desc: "Work when you're most productive" },
              { title: "Remote Work", desc: "Work from anywhere in the world" },
              { title: "Learning Budget", desc: "Annual stipend for courses and conferences" },
              { title: "Stock Options", desc: "Be an owner in the company you help build" },
              { title: "Unlimited PTO", desc: "Take the time you need to recharge" },
              { title: "Gym Membership", desc: "Stay healthy and active" },
              { title: "Team Events", desc: "Regular team building and social events" },
            ].map((benefit, i) => (
              <div key={i} className="border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-400 mb-10">Take the first step towards an exciting career. Explore our open positions and find your perfect role.</p>
          <a href="/careers" className="inline-block px-10 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105">Browse Open Positions</a>
        </div>
      </section>
    </div>
  )
}
