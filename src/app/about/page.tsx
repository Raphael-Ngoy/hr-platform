import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - NEXUS',
  description: 'Learn about NEXUS, our mission, values, and the team behind our innovative solutions.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-black py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            About NEXUS
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're on a mission to transform industries through innovation, technology, and exceptional talent.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                At NEXUS, we believe that technology has the power to solve the world's most challenging problems. Our mission is to build innovative solutions that make a meaningful impact on businesses and people's lives.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Founded in 2015, we've grown from a small startup to a global team of over 500 talented individuals. We're united by our passion for innovation and our commitment to excellence in everything we do.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do and define our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-400">
                We push boundaries and challenge conventions to create breakthrough solutions.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-400">
                We hold ourselves to the highest standards in every project and interaction.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p className="text-gray-400">
                We believe the best results come from working together as one team.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Integrity</h3>
              <p className="text-gray-400">
                We act with honesty and transparency in all our relationships.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Impact</h3>
              <p className="text-gray-400">
                We measure success by the positive difference we make in the world.
              </p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Growth</h3>
              <p className="text-gray-400">
                We invest in our people and encourage continuous learning and development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-400">
              <p>
                NEXUS was founded in 2015 by a group of passionate technologists who saw an opportunity to transform how businesses leverage technology. What started as a small team of 5 in a garage has grown into a global organization with offices in San Francisco, New York, London, and Singapore.
              </p>
              <p>
                Over the years, we've had the privilege of working with Fortune 500 companies, innovative startups, and everything in between. Our solutions have helped organizations streamline operations, enhance customer experiences, and drive meaningful business outcomes.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible. Our team of 500+ talented individuals brings diverse perspectives and expertise to every challenge, united by a shared commitment to innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Be part of something extraordinary. Explore career opportunities and help us shape the future.
          </p>
          <a
            href="/careers"
            className="inline-block px-10 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  )
}