import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - NEXUS',
  description: 'Get in touch with NEXUS. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-black py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question or want to learn more? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
                Office Information
              </h2>
              
              <div className="space-y-8">
                <div className="border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">San Francisco Headquarters</h3>
                  <div className="space-y-3 text-gray-400">
                    <p>123 Innovation Street</p>
                    <p>San Francisco, CA 94105</p>
                    <p>United States</p>
                    <p className="pt-2">+1 (555) 123-4567</p>
                    <p>sf@nexus.com</p>
                  </div>
                </div>

                <div className="border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">New York Office</h3>
                  <div className="space-y-3 text-gray-400">
                    <p>456 Tech Avenue, Floor 12</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                    <p className="pt-2">+1 (555) 987-6543</p>
                    <p>ny@nexus.com</p>
                  </div>
                </div>

                <div className="border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-4">London Office</h3>
                  <div className="space-y-3 text-gray-400">
                    <p>78 Innovation Hub</p>
                    <p>London, EC2A 1BX</p>
                    <p>United Kingdom</p>
                    <p className="pt-2">+44 20 7946 0958</p>
                    <p>london@nexus.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}