import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}>
      <div className="text-center px-4">
        <p className="font-serif text-8xl font-bold text-gold mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.</p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="btn-gold">Return Home</Link>
          <Link to="/projects" className="btn-outline-gold">Browse Projects</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
