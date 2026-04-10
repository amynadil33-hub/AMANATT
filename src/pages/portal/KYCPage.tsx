import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const steps = ['Identity Verification', 'Liveness Check', 'Address Verification', 'Tax & Regulatory', 'AML / Source of Wealth', 'KYC Declaration'];

const KYCPage: React.FC = () => {
  const { profile, isDemo } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [submission, setSubmission] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [declarations, setDeclarations] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    if (isDemo) {
      setSubmission({ status: 'approved', submitted_at: '2024-03-15T12:00:00Z', reviewed_at: '2024-03-16T10:00:00Z' });
      return;
    }
    if (!profile?.id) return;
    supabase.from('kyc_submissions').select('*').eq('user_id', profile.id).order('created_at', { ascending: false }).limit(1)
      .then(({ data }) => {
        if (data?.[0]) { setSubmission(data[0]); setFormData(data[0].step_data || {}); }
      });
  }, [profile?.id, isDemo]);

  const updateField = (key: string, value: string) => setFormData((prev: any) => ({ ...prev, [key]: value }));

  const saveDraft = async () => {
    if (isDemo) return;
    if (!profile?.id) return;
    setLoading(true);
    if (submission) {
      await supabase.from('kyc_submissions').update({ step_data: formData, updated_at: new Date().toISOString() }).eq('id', submission.id);
    } else {
      const { data } = await supabase.from('kyc_submissions').insert([{ user_id: profile.id, status: 'draft', step_data: formData }]).select().single();
      if (data) setSubmission(data);
    }
    setLoading(false);
  };

  const submitKYC = async () => {
    if (isDemo) return;
    if (!profile?.id) return;
    setLoading(true);
    if (submission) {
      await supabase.from('kyc_submissions').update({ step_data: formData, status: 'submitted', submitted_at: new Date().toISOString() }).eq('id', submission.id);
      setSubmission({ ...submission, status: 'submitted' });
    } else {
      const { data } = await supabase.from('kyc_submissions').insert([{ user_id: profile.id, status: 'submitted', step_data: formData, submitted_at: new Date().toISOString() }]).select().single();
      if (data) setSubmission(data);
    }
    setLoading(false);
  };

  if (submission?.status === 'submitted' || submission?.status === 'under_review' || submission?.status === 'approved') {
    return (
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-1">KYC <span className="text-gold">Verification</span></h1>
        <p className="text-gray-400 mb-8">Your verification status</p>
        <div className="card-premium p-8 text-center max-w-lg mx-auto">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${submission.status === 'approved' ? 'bg-green-500/10' : 'bg-gold/10'}`}>
            <svg className={`w-8 h-8 ${submission.status === 'approved' ? 'text-green-400' : 'text-gold'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">
            {submission.status === 'approved' ? 'KYC Approved' : submission.status === 'submitted' ? 'KYC Submitted' : 'Under Review'}
          </h2>
          <p className="text-gray-400">
            {submission.status === 'approved' ? 'Your identity has been verified. You have full investment access.' : 'Your KYC submission is being reviewed. This typically takes 24-48 hours.'}
          </p>
          <span className={`inline-block mt-4 ${submission.status === 'approved' ? 'badge-funded' : 'badge-ongoing'}`}>{submission.status.replace('_', ' ')}</span>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Primary government-issued identity documents. All documents must be valid and unexpired.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Full Legal Name (as on ID) <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="text" value={formData.legal_name || ''} onChange={e => updateField('legal_name', e.target.value)} className="input-dark" placeholder="Exact name on document" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Document Type <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><select value={formData.doc_type || ''} onChange={e => updateField('doc_type', e.target.value)} className="input-dark"><option value="">Select ID type</option><option value="passport">Passport</option><option value="national_id">National ID Card</option><option value="drivers_license">Driver's License</option></select></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Document Number <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="text" value={formData.doc_number || ''} onChange={e => updateField('doc_number', e.target.value)} className="input-dark" placeholder="ID / Passport number" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Issue Date <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="date" value={formData.issue_date || ''} onChange={e => updateField('issue_date', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Expiry Date <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="date" value={formData.expiry_date || ''} onChange={e => updateField('expiry_date', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Issuing Country <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="text" value={formData.issuing_country || ''} onChange={e => updateField('issuing_country', e.target.value)} className="input-dark" placeholder="Country that issued the document" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Issuing Authority</label><input type="text" value={formData.issuing_authority || ''} onChange={e => updateField('issuing_authority', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Place of Birth</label><input type="text" value={formData.place_of_birth || ''} onChange={e => updateField('place_of_birth', e.target.value)} className="input-dark" placeholder="City, Country" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="text-sm text-gray-300 font-semibold">Front side of document</p>
              <p className="text-xs text-gray-500 mt-1">High resolution · Max 10MB</p>
            </div>
            <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="text-sm text-gray-300 font-semibold">Back side of document</p>
              <p className="text-xs text-gray-500 mt-1">High resolution · Max 10MB</p>
            </div>
          </div>
        </div>
      );
      case 1: return (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Confirm you are a real person and match your submitted identity document.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="text-sm text-gray-300 font-semibold">Selfie with ID</p>
              <p className="text-xs text-gray-500 mt-1">Face and ID must both be clearly visible</p>
            </div>
            <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="text-sm text-gray-300 font-semibold">Liveness Video (Optional)</p>
              <p className="text-xs text-gray-500 mt-1">Short 5-second face video · MP4 or MOV</p>
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Current residential address. Must match proof of address document.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Street Address <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="text" value={formData.street || ''} onChange={e => updateField('street', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">City</label><input type="text" value={formData.city || ''} onChange={e => updateField('city', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Country</label><input type="text" value={formData.country || ''} onChange={e => updateField('country', e.target.value)} className="input-dark" /></div>
          </div>
          <div className="border-2 border-dashed rounded-xl p-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-sm text-gray-300 font-semibold">Proof of Address</p>
            <p className="text-xs text-gray-500 mt-1">Utility bill, bank statement, or government letter (within 3 months)</p>
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Required for FATCA, CRS, and Maldives CMDA compliance.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Tax Residency Country <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><input type="text" value={formData.tax_country || ''} onChange={e => updateField('tax_country', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">TIN / Tax ID Number</label><input type="text" value={formData.tin || ''} onChange={e => updateField('tin', e.target.value)} className="input-dark" /></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">US Person (FATCA)? <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><select value={formData.us_person || ''} onChange={e => updateField('us_person', e.target.value)} className="input-dark"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Dual Tax Residency?</label><select value={formData.dual_tax || ''} onChange={e => updateField('dual_tax', e.target.value)} className="input-dark"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></select></div>
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Anti-Money Laundering and Counter-Terrorism Financing (AML/CTF) verification.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Primary Source of Wealth <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><select value={formData.wealth_source || ''} onChange={e => updateField('wealth_source', e.target.value)} className="input-dark"><option value="">Select</option><option value="employment">Employment</option><option value="business">Business</option><option value="inheritance">Inheritance</option><option value="investments">Investments</option><option value="other">Other</option></select></div>
            <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Estimated Total Wealth (USD) <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><select value={formData.wealth_range || ''} onChange={e => updateField('wealth_range', e.target.value)} className="input-dark"><option value="">Select range</option><option value="250k-1m">$250,000 – $1,000,000</option><option value="1m-5m">$1M – $5M</option><option value="5m-20m">$5M – $20M</option><option value="20m+">$20M+</option></select></div>
          </div>
          <div><label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Describe Source of Wealth <span className="text-xs text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded ml-1">Required</span></label><textarea value={formData.wealth_desc || ''} onChange={e => updateField('wealth_desc', e.target.value)} rows={3} className="input-dark" placeholder="Please provide a detailed explanation..." /></div>
        </div>
      );
      case 5: return (
        <div className="space-y-5">
          <p className="text-sm text-gray-400">Final confirmations required before your KYC submission is processed.</p>
          {['I confirm all documents submitted are genuine, valid, and unaltered originals or certified true copies.', 'I understand that providing false information is a criminal offence under Maldivian law.', 'I consent to Blocs conducting background checks, including PEP screening and sanctions list checks.', 'I agree that Blocs may request additional documents at any time as part of ongoing due diligence.', 'I have read and understood the Blocs KYC Policy, AML/CTF Policy, and Privacy Notice.'].map((text, i) => (
            <label key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 cursor-pointer">
              <input type="checkbox" checked={declarations[i]} onChange={() => { const d = [...declarations]; d[i] = !d[i]; setDeclarations(d); }} className="rounded border-gray-600 mt-0.5 accent-[#C9A961]" />
              <span className="text-sm text-gray-300">{text}</span>
            </label>
          ))}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div>
      <p className="section-label mb-2">KNOW YOUR CUSTOMER</p>
      <h1 className="font-serif text-3xl font-bold text-white mb-1">KYC <span className="text-gold">Verification</span></h1>
      <p className="text-gray-400 mb-8">Complete KYC verification to unlock full investment access. Required by Maldives Capital Market Authority (CMDA) and FATF guidelines.</p>

      <div className="rounded-xl p-4 mb-8" style={{ backgroundColor: 'rgba(59,130,246,0.06)', borderLeft: '3px solid #3B82F6' }}>
        <p className="text-sm text-blue-400">Your KYC data is encrypted and stored in compliance with Maldives Data Protection Act. It is used solely for investor verification and AML/CFT compliance.</p>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setCurrentStep(i)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${i === currentStep ? 'bg-gold/10 text-gold' : i < currentStep ? 'bg-white/5 text-green-400' : 'bg-white/5 text-gray-500'}`}>
            <span className="font-semibold">{i + 1}</span>{s}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="card-premium p-6 lg:p-8 mb-6">
        <h2 className="font-serif text-xl font-bold text-white mb-4">Step {currentStep + 1} — {steps[currentStep]}</h2>
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="btn-ghost disabled:opacity-30">Previous</button>
        <div className="flex gap-3">
          <button onClick={saveDraft} disabled={loading} className="btn-outline-gold">{loading ? 'Saving...' : 'Save Draft'}</button>
          {currentStep < steps.length - 1 ? (
            <button onClick={() => setCurrentStep(currentStep + 1)} className="btn-gold">Next Step</button>
          ) : (
            <button onClick={submitKYC} disabled={loading || !declarations.every(Boolean)} className="btn-gold disabled:opacity-50">{loading ? 'Submitting...' : 'Submit KYC'}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
