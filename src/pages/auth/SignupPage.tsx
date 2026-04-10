import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SignupPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) { setError(error.message); setLoading(false); }
    else setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-20" style={{ backgroundColor: '#0B1121' }}>
        <div className="w-full max-w-md px-4 text-center">
          <div className="card-premium p-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-2">Account Created</h2>
            <p className="text-gray-400 mb-6">Please check your email to verify your account before signing in.</p>
            <Link to="/login" className="btn-gold">Go to Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20" style={{ backgroundColor: '#0B1121' }}>
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-3xl font-bold text-white italic">Blocs</Link>
          <p className="text-gray-400 mt-2">Create your investor account</p>
        </div>
        <div className="card-premium p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="input-dark" placeholder="Your full legal name" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-dark" placeholder="investor@example.com" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="input-dark" placeholder="Minimum 8 characters" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="input-dark" placeholder="Repeat your password" />
            </div>
            <label className="flex items-start gap-2 text-xs text-gray-400">
              <input type="checkbox" required className="rounded border-gray-600 mt-0.5" />
              I agree to the Terms of Service, Privacy Policy, and Risk Disclosures.
            </label>
            <button type="submit" disabled={loading} className="btn-gold w-full !py-3">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account? <Link to="/login" className="text-gold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
