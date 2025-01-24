
interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
  }

const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 10 Gadgets for 2025",
      description:
        "Explore the must-have gadgets for 2025 and learn why they're revolutionizing the tech industry.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      link: "#",
    },
    {
      id: 2,
      title: "5 Tips for Smarter Online Shopping",
      description:
        "Discover how to make the most of your online shopping experience with these expert tips.",
      image: "https://www.cubeselfstorage.my/wp-content/uploads/2021/11/HK-Website-article-banner-1024x493px-7.png",
      link: "#",
    },
    {
      id: 3,
      title: "The Future of Sustainable Fashion",
      description:
        "Learn how sustainable fashion is reshaping the industry and how you can make eco-friendly choices.",
      image: "https://images.unsplash.com/photo-1611078485780-2b76e2f9c2cb",
      link: "#",
    },
  ];
export default function RelevantSection() {
  return (
    <section className="bg-white py-10 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 text-center mb-6">
        Latest Articles
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {post.description}
              </p>
              <a
                href={post.link}
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  )
}
