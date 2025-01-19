import { useNavigate } from "react-router-dom";

function About() {

  const navigate = useNavigate();
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
        <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
          <div className="card-body">
            {/* Header Section */}
            <h1 className="text-center mb-6 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              About Our Book Shop
            </h1>
            
            {/* Introduction Section */}
            <p className="text-lg text-justify mb-6 leading-relaxed">
              Welcome to our Book Shop! Whether you're a lifelong reader or just getting started, our platform provides an easy-to-use, feature-rich experience for discovering, buying, and managing your books. We strive to offer a seamless shopping experience that combines a vast selection of books with powerful search and filtering options.
            </p>
  
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
  
            {/* Features Section */}
            <h2 className="text-2xl font-semibold mb-4">Features of the Book Shop</h2>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>
                <strong>Vast Collection:</strong> Discover a curated collection of books spanning multiple genres, including fiction, non-fiction, mystery, romance, and more.
              </li>
              <li>
                <strong>Responsive Design:</strong> Our platform is fully optimized for all screen sizes, ensuring a smooth experience on desktops, tablets, and mobile devices.
              </li>
              <li>
                <strong>Advanced Search & Filters:</strong> Find your next favorite read using filters like genre, author, price range, and publication date.
              </li>
              <li>
                <strong>Shopping Cart:</strong> Add books to your cart and checkout quickly with secure payment options and fast delivery.
              </li>
              <li>
                <strong>Admin Panel:</strong> Manage book listings, track sales, and control user accounts with our powerful backend tools.
              </li>
            </ul>
  
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
  
            {/* Technology Stack Section */}
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <p className="text-lg mb-4">
              Our platform is powered by a modern stack to ensure a fast, responsive, and secure experience for both customers and administrators.
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li><strong>Frontend:</strong> React.js paired with <strong>Tailwind CSS</strong> for a sleek, responsive UI.</li>
              <li><strong>Backend:</strong> ASP.NET Core, providing robust, scalable server-side functionality.</li>
              <li><strong>Database:</strong> SQL Server ensures all customer and book data is securely stored and efficiently managed.</li>
            </ul>
  
            <hr className="my-6 border-gray-300 dark:border-gray-600" />
  
            {/* Purpose Section */}
            <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
            <p className="text-lg mb-6">
              Our mission is to create an accessible, intuitive, and enjoyable experience for book lovers everywhere. By combining modern technologies with a passion for reading, we aim to provide a seamless shopping experience for book enthusiasts while showcasing our full-stack development expertise.
            </p>
  
            {/* Call to Action */}
            <div className="text-center mt-8">
              <button 
              
              onClick={()=>{navigate("/contact-us")}}
              className="btn btn-primary text-white text-lg bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-md focus:ring-4 focus:ring-blue-300 transition-all">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default About;
  