import { useState } from "react";
import { toast } from "sonner";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get updates on exclusive offers and new products!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
