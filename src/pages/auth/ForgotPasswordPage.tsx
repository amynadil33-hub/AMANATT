import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await resetPassword(email);
    if (error) { setError(error.message); setLoading(false); }
    else setSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20" style={{ backgroundColor: '#0B1121' }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-3xl font-bold text-white italic">Blocs</Link>
        </div>
        <div className="card-premium p-8">
          {sent ? (
            <div className="text-center">
              <h2 className="font-serif text-xl font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-gray-400 mb-6">We've sent a password reset link to {email}</p>
              <Link to="/login" className="btn-outline-gold">Back to Login</Link>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-gray-400 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>}
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-dark" />
                </div>
                <button type="submit" disabled={loading} className="btn-gold w-full !py-3">{loading ? 'Sending...' : 'Send Reset Link'}</button>
              </form>
              <p className="text-sm text-gray-400 text-center mt-6"><Link to="/login" className="text-gold hover:underline">Back to Login</Link></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
