// src/components/Testimonials.tsx

import { FC } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  avatar: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "School Teacher",
    review:
      "Absolutely love the range of art supplies! Great prices, fast delivery, and the quality is top-notch.",
    rating: 5,
    avatar: "/images/avatar1.jpg",
  },
  {
    name: "Rahul Sen",
    role: "College Student",
    review:
      "This is my go-to place for stationery. The deals are amazing and everything is super affordable.",
    rating: 4,
    avatar: "/images/avatar2.jpg",
  },
  {
    name: "Sana Sheikh",
    role: "Freelance Designer",
    review:
      "Easy to order and customer service is excellent. The tech accessories and writing tools are very reliable.",
    rating: 5,
    avatar: "/images/avatar3.jpg",
  },
];

const Testimonials: FC = () => {
  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-white">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          What Our Customers Say?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Real feedback from our happy customers who love our products and
          service.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600"
                />
                <div>
                  <h4 className="font-semibold text-lg">{t.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.role}
                  </p>
                </div>
              </div>

              <p className="italic text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <Quote className="w-5 h-5 text-blue-500" />
                {t.review}
              </p>

              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill={i < t.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
