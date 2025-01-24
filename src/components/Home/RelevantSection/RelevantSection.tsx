import { BlogPost } from "../../Types/BlogPost.type";

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "5 Essential Stationery Items for Productivity",
      description:
        "Discover the top stationery items that can boost your productivity and keep you organized.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      link: "#",
    },
    {
      id: 2,
      title: "The Art of Journaling: Best Notebooks to Get Started",
      description:
        "Learn how to start journaling and explore the best notebooks available for your creative ideas.",
      image: "https://www.cubeselfstorage.my/wp-content/uploads/2021/11/HK-Website-article-banner-1024x493px-7.png",
      link: "#",
    },
    {
      id: 3,
      title: "Eco-Friendly Stationery: A Sustainable Choice",
      description:
        "Explore eco-friendly stationery options that help reduce waste and contribute to a greener planet.",
      image: "https://media.licdn.com/dms/image/v2/D5612AQG_G_Zz5aUi3Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1733233544448?e=2147483647&v=beta&t=b7TfxSREw7C3Ht6nAvQE2Hk0N7hGtDVWzLnwr6m-Gt4",
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
    );
  }
  