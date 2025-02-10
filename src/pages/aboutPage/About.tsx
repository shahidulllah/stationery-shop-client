const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="my-16">
        {/* Hero Section */}
        <section className="py-20 text-center bg-gray-200 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              About Our Stationery Shop
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Your one-stop destination for all your stationery needs.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At <strong>STN Crack</strong>, our mission is to provide
              high-quality stationery products that inspire creativity,
              productivity, and organization. We believe that the right tools
              can make all the difference in your work and personal life.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Founded in 2023, Stationery Haven started as a small local shop
              with a passion for helping people find the perfect stationery.
              Over the years, we've grown into a trusted online platform,
              offering a wide range of products to customers worldwide.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-500 dark:text-green-400 mb-8">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <img
                  src="https://i.ibb.co.com/DQpmHxJ/Profile.png"
                  alt="Team Member 1"
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Md. Shahidullah</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Founder & CEO
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <img
                  src="https://i.ibb.co.com/1TWjy8W/team1.jpg"
                  alt="Team Member 2"
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Rakibul Islam</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Head of Operations
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <img
                  src="https://i.ibb.co.com/7rSY3pn/team4.jpg"
                  alt="Team Member 3"
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Shaymol Kabir</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customer Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gray-200 dark:bg-gray-800 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Explore our collection and find the perfect stationery for your
              needs.
            </p>
            <button className="bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-500 transition-colors duration-300">
              Shop Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
