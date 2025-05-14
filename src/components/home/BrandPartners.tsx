const brands = [
  "/public/images/blogs/blog-1.jpeg",
  "/public/images/blogs/blog-1.jpeg",
  "/public/images/blogs/blog-1.jpeg",
  "/public/images/blogs/blog-1.jpeg",
  "/public/images/blogs/blog-1.jpeg",
];

const BrandPartners = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Our Trusted Brands
        </h2>
        <div className="flex flex-wrap items-center justify-evenly">
          {brands.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Brand ${index + 1}`}
              className="h-36 grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
