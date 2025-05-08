import { FC } from "react";
import { Flame, Percent, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

interface Deal {
  title: string;
  desc: string;
  image: string;
  tag: string;
  link: string;
  icon: JSX.Element;
}

const deals: Deal[] = [
  {
    title: "Hot Deal: 25% Off Writing Tools",
    desc: "Get top-quality pens, pencils, and markers at 25% off. Limited time offer!",
    image: "/public/images/p-1.jpg",
    tag: "Limited Time",
    link: "/products?category=Writing",
    icon: <Flame className="text-red-500 w-6 h-6" />,
  },
  {
    title: "Flash Sale: Office Supplies",
    desc: "Essential office items at discounted prices. Hurry, offer ends soon!",
    image: "/public/images/p-2.jpg",
    tag: "Flash Sale",
    link: "/products?category=OfficeSupplies",
    icon: <Clock3 className="text-yellow-400 w-6 h-6" />,
  },
  {
    title: "Art Supplies Special - 15% Off",
    desc: "Bring creativity to life with discounted brushes, paints & more.",
    image: "/public/images/p-3.jpg",
    tag: "Exclusive",
    link: "/products?category=ArtSupplies",
    icon: <Percent className="text-green-500 w-6 h-6" />,
  },
  {
    title: "Flash Sale: Office Supplies",
    desc: "Essential office items at discounted prices. Hurry, offer ends soon!",
    image: "/public/images/p-4.jpg",
    tag: "Flash Sale",
    link: "/products?category=OfficeSupplies",
    icon: <Clock3 className="text-yellow-400 w-6 h-6" />,
  },
];

const DealsAndOffers: FC = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          Exclusive Deals & Offers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:scale-[1.02] transition duration-300"
            >
              <div className="h-44 sm:h-52 md:h-56 lg:h-48 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="object-cover w-full h-full hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {deal.icon}
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white">
                    {deal.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1 line-clamp-1">{deal.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {deal.desc}
                </p>
                <Link
                  to={deal.link}
                  className="inline-block text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsAndOffers;
