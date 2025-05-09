const reviews = [
  {
    name: "Anisha Sharma",
    content:
      "The quality of the products is top-notch! Fast delivery and great service too.",
    rating: 5,
  },
  {
    name: "Rohan Das",
    content: "Wide range of products, decent prices. Would recommend!",
    rating: 4,
  },
  {
    name: "Sneha Patel",
    content:
      "I ordered stationery for my office. Everything came neatly packed!",
    rating: 5,
  },
];

const ProductReviews = () => {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                {review.name[0]}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold dark:text-white">{review.name}</h4>
                <div className="text-yellow-500 text-sm">
                  {"⭐".repeat(review.rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              "{review.content}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
