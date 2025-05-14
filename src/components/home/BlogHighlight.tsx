import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const blogPosts = [
  {
    title: "Top 10 Stationery Essentials for School",
    excerpt:
      "Discover the must-have stationery items every student needs to stay organized and productive this school year.",
    image: "/public/images/blogs/blog-1.jpeg",
    date: "2025-04-10",
    slug: "/blogs/stationery-essentials",
  },
  {
    title: "Boost Creativity with Art Supplies",
    excerpt:
      "Learn how high-quality art supplies can spark creativity in kids and adults alike.",
    image: "/public/images/blogs/blog-2.jpeg",
    date: "2025-03-28",
    slug: "/blogs/creative-art-supplies",
  },
  {
    title: "Office Setup Tips for Maximum Efficiency",
    excerpt:
      "Explore smart tips and tools to set up a productive and organized office space using the right stationery.",
    image: "/public/images/blogs/blog-3.jpeg",
    date: "2025-03-15",
    slug: "/blogs/office-setup-tips",
  },
];

const BlogHighlights = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Explore More With Blogs
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <CalendarDays size={16} className="mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  to={post.slug}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
