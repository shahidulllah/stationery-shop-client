const ContactSupport = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Need Help? Contact Our Support
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Our support team is ready to assist you 24/7.
        </p>
        <div className="space-y-4 text-gray-700 dark:text-white">
          <p>
            Email:{" "}
            <a
              href="mailto:support@stationeryshop.com"
              className="text-blue-600"
            >
              support@stationeryshop.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-600">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
