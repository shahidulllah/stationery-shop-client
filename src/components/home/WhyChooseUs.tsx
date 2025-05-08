import { CheckCircle, ShieldCheck, Truck, ThumbsUp } from "lucide-react";

const highlights = [
  {
    title: "Fast & Free Delivery",
    description:
      "Get your supplies delivered to your doorstep quickly and at no extra cost.",
    icon: <Truck className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  },
  {
    title: "Secure Payments",
    description:
      "We ensure secure and trusted transactions with multiple payment options.",
    icon: (
      <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
    ),
  },
  {
    title: "Quality Guaranteed",
    description:
      "We offer top-quality products from the most trusted stationery brands.",
    icon: (
      <CheckCircle className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />
    ),
  },
  {
    title: "Trusted by Thousands",
    description:
      "Over 5,000 satisfied customers rely on us for their stationery needs.",
    icon: <ThumbsUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Discover what makes our stationery store the preferred choice for
          students, teachers, and creators.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
