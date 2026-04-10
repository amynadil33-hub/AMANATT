// Demo data for investor portal and admin dashboard

export const demoProjects = [
  {
    id: 'proj-001',
    title: 'Malé Waterfront Residences',
    slug: 'male-waterfront-residences',
    category: 'Residential',
    location: 'Malé, Kaafu Atoll',
    status: 'ongoing',
    image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    minimum_investment: 500000,
    funding_goal: 12000000,
    funded_amount: 8400000,
    expected_return: 9.8,
    profit_share: '70/30',
    duration: '36 months',
    description: 'Premium waterfront residential development in the heart of Malé.',
    created_at: '2024-06-01T10:00:00Z',
  },
  {
    id: 'proj-002',
    title: 'Addu City Commercial Hub',
    slug: 'addu-city-commercial-hub',
    category: 'Commercial',
    location: 'Addu City, Addu Atoll',
    status: 'funded',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    minimum_investment: 250000,
    funding_goal: 8000000,
    funded_amount: 8000000,
    expected_return: 11.2,
    profit_share: '65/35',
    duration: '48 months',
    description: 'Mixed-use commercial development in Addu City.',
    created_at: '2024-02-15T10:00:00Z',
  },
  {
    id: 'proj-003',
    title: 'Baa Atoll Luxury Villas',
    slug: 'baa-atoll-luxury-villas',
    category: 'Vacation Rentals',
    location: 'Dharavandhoo, Baa Atoll',
    status: 'ongoing',
    image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    minimum_investment: 1000000,
    funding_goal: 20000000,
    funded_amount: 14000000,
    expected_return: 12.1,
    profit_share: '60/40',
    duration: '60 months',
    description: 'Luxury overwater villas near UNESCO Biosphere Reserve.',
    created_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'proj-004',
    title: 'Hulhumalé Phase III Office Park',
    slug: 'hulhumale-phase-iii-office-park',
    category: 'Commercial',
    location: 'Hulhumalé, Kaafu Atoll',
    status: 'upcoming',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    minimum_investment: 750000,
    funding_goal: 15000000,
    funded_amount: 0,
    expected_return: 8.5,
    profit_share: '70/30',
    duration: '42 months',
    description: 'Grade A office park in the rapidly developing Hulhumalé Phase III.',
    created_at: '2025-01-20T10:00:00Z',
  },
  {
    id: 'proj-005',
    title: 'Laamu Atoll Resort & Spa',
    slug: 'laamu-atoll-resort-spa',
    category: 'Vacation Rentals',
    location: 'Gan, Laamu Atoll',
    status: 'ongoing',
    image_url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    minimum_investment: 2000000,
    funding_goal: 35000000,
    funded_amount: 21000000,
    expected_return: 10.5,
    profit_share: '55/45',
    duration: '72 months',
    description: 'Five-star resort development with 120 overwater villas.',
    created_at: '2023-11-05T10:00:00Z',
  },
];

export const demoInvestments = [
  {
    id: 'inv-001',
    user_id: 'demo-investor-001',
    project_id: 'proj-001',
    amount: 500000,
    expected_return: 49000,
    status: 'active',
    invested_at: '2024-07-15T10:00:00Z',
    created_at: '2024-07-15T10:00:00Z',
    projects: { title: 'Malé Waterfront Residences', category: 'Residential', status: 'ongoing', expected_return: 9.8, image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80' },
  },
  {
    id: 'inv-002',
    user_id: 'demo-investor-001',
    project_id: 'proj-002',
    amount: 250000,
    expected_return: 28000,
    status: 'active',
    invested_at: '2024-03-20T10:00:00Z',
    created_at: '2024-03-20T10:00:00Z',
    projects: { title: 'Addu City Commercial Hub', category: 'Commercial', status: 'funded', expected_return: 11.2, image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  },
  {
    id: 'inv-003',
    user_id: 'demo-investor-001',
    project_id: 'proj-003',
    amount: 1000000,
    expected_return: 121000,
    status: 'active',
    invested_at: '2024-02-10T10:00:00Z',
    created_at: '2024-02-10T10:00:00Z',
    projects: { title: 'Baa Atoll Luxury Villas', category: 'Vacation Rentals', status: 'ongoing', expected_return: 12.1, image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80' },
  },
];

export const demoTransactions = [
  { id: 'txn-001', user_id: 'demo-investor-001', type: 'deposit', amount: 500000, status: 'completed', reference: 'DEP-2024-001', created_at: '2024-07-15T10:00:00Z' },
  { id: 'txn-002', user_id: 'demo-investor-001', type: 'deposit', amount: 250000, status: 'completed', reference: 'DEP-2024-002', created_at: '2024-03-20T10:00:00Z' },
  { id: 'txn-003', user_id: 'demo-investor-001', type: 'deposit', amount: 1000000, status: 'completed', reference: 'DEP-2024-003', created_at: '2024-02-10T10:00:00Z' },
  { id: 'txn-004', user_id: 'demo-investor-001', type: 'return', amount: 24500, status: 'completed', reference: 'RET-2024-Q3', created_at: '2024-10-01T10:00:00Z' },
  { id: 'txn-005', user_id: 'demo-investor-001', type: 'return', amount: 14000, status: 'completed', reference: 'RET-2024-Q2', created_at: '2024-07-01T10:00:00Z' },
  { id: 'txn-006', user_id: 'demo-investor-001', type: 'return', amount: 30250, status: 'completed', reference: 'RET-2025-Q1', created_at: '2025-01-01T10:00:00Z' },
  { id: 'txn-007', user_id: 'demo-investor-001', type: 'fee', amount: 3500, status: 'completed', reference: 'FEE-2024-001', created_at: '2024-12-31T10:00:00Z' },
];

export const demoPortfolioEntries = [
  {
    id: 'pe-001',
    user_id: 'demo-investor-001',
    project_id: 'proj-001',
    current_value: 537000,
    return_to_date: 37000,
    allocation_percent: 29,
    projects: { title: 'Malé Waterfront Residences', category: 'Residential', status: 'ongoing', image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80' },
  },
  {
    id: 'pe-002',
    user_id: 'demo-investor-001',
    project_id: 'proj-002',
    current_value: 278000,
    return_to_date: 28000,
    allocation_percent: 15,
    projects: { title: 'Addu City Commercial Hub', category: 'Commercial', status: 'funded', image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  },
  {
    id: 'pe-003',
    user_id: 'demo-investor-001',
    project_id: 'proj-003',
    current_value: 1085000,
    return_to_date: 85000,
    allocation_percent: 56,
    projects: { title: 'Baa Atoll Luxury Villas', category: 'Vacation Rentals', status: 'ongoing', image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80' },
  },
];

export const demoNotifications = [
  { id: 'notif-001', user_id: 'demo-investor-001', title: 'Q1 2025 Returns Distributed', body: 'Your quarterly profit share of $30,250 has been credited to your account.', read_status: false, created_at: '2025-01-02T10:00:00Z' },
  { id: 'notif-002', user_id: 'demo-investor-001', title: 'Baa Atoll Villas — Construction Update', body: 'Phase 2 construction is 78% complete. On track for Q3 2025 handover.', read_status: false, created_at: '2024-12-15T10:00:00Z' },
  { id: 'notif-003', user_id: 'demo-investor-001', title: 'New Project Available', body: 'Hulhumalé Phase III Office Park is now open for investment. Minimum bloc: $750,000.', read_status: true, created_at: '2025-01-20T10:00:00Z' },
  { id: 'notif-004', user_id: 'demo-investor-001', title: 'KYC Approved', body: 'Your KYC verification has been approved. You now have full investment access.', read_status: true, created_at: '2024-03-16T10:00:00Z' },
  { id: 'notif-005', user_id: 'demo-investor-001', title: 'Annual Tax Statement Ready', body: 'Your 2024 annual tax statement is now available in the Documents section.', read_status: true, created_at: '2025-02-01T10:00:00Z' },
];

// Admin demo data
export const demoUsers = [
  { id: 'demo-investor-001', auth_user_id: 'demo-investor-auth-001', full_name: 'Ahmed Rasheed', email: 'investor@blocs.mv', phone: '+960 7771234', role: 'customer', membership_tier: 'Gold', created_at: '2024-03-15T10:00:00Z' },
  { id: 'user-002', auth_user_id: 'auth-002', full_name: 'Fathimath Zahra', email: 'fathimath@example.com', phone: '+960 7772345', role: 'customer', membership_tier: 'Platinum', created_at: '2023-08-20T10:00:00Z' },
  { id: 'user-003', auth_user_id: 'auth-003', full_name: 'Mohamed Ali', email: 'mohamed.ali@example.com', phone: '+960 7773456', role: 'customer', membership_tier: 'Silver', created_at: '2024-11-01T10:00:00Z' },
  { id: 'user-004', auth_user_id: 'auth-004', full_name: 'Aishath Noor', email: 'aishath@example.com', phone: '+960 7774567', role: 'customer', membership_tier: 'Gold', created_at: '2024-05-10T10:00:00Z' },
  { id: 'user-005', auth_user_id: 'auth-005', full_name: 'Hassan Ibrahim', email: 'hassan@example.com', phone: '+960 7775678', role: 'customer', membership_tier: 'Silver', created_at: '2025-01-05T10:00:00Z' },
  { id: 'demo-admin-001', auth_user_id: 'demo-admin-auth-001', full_name: 'Ibrahim Waheed', email: 'admin@blocs.mv', phone: '+960 7775678', role: 'admin', membership_tier: 'Platinum', created_at: '2023-01-10T10:00:00Z' },
  { id: 'user-007', auth_user_id: 'auth-007', full_name: 'Mariyam Didi', email: 'mariyam@example.com', phone: '+960 7776789', role: 'customer', membership_tier: 'Gold', created_at: '2024-09-15T10:00:00Z' },
  { id: 'user-008', auth_user_id: 'auth-008', full_name: 'Abdulla Shareef', email: 'abdulla@example.com', phone: '+960 7777890', role: 'customer', membership_tier: 'Silver', created_at: '2024-12-20T10:00:00Z' },
];

export const demoKycSubmissions = [
  { id: 'kyc-001', user_id: 'demo-investor-001', status: 'approved', submitted_at: '2024-03-15T12:00:00Z', reviewed_at: '2024-03-16T10:00:00Z', created_at: '2024-03-15T10:00:00Z', profiles: { full_name: 'Ahmed Rasheed', email: 'investor@blocs.mv' } },
  { id: 'kyc-002', user_id: 'user-002', status: 'approved', submitted_at: '2023-08-21T10:00:00Z', reviewed_at: '2023-08-22T10:00:00Z', created_at: '2023-08-20T10:00:00Z', profiles: { full_name: 'Fathimath Zahra', email: 'fathimath@example.com' } },
  { id: 'kyc-003', user_id: 'user-003', status: 'submitted', submitted_at: '2024-11-05T10:00:00Z', reviewed_at: null, created_at: '2024-11-01T10:00:00Z', profiles: { full_name: 'Mohamed Ali', email: 'mohamed.ali@example.com' } },
  { id: 'kyc-004', user_id: 'user-005', status: 'under_review', submitted_at: '2025-01-08T10:00:00Z', reviewed_at: null, created_at: '2025-01-05T10:00:00Z', profiles: { full_name: 'Hassan Ibrahim', email: 'hassan@example.com' } },
  { id: 'kyc-005', user_id: 'user-008', status: 'draft', submitted_at: null, reviewed_at: null, created_at: '2024-12-20T10:00:00Z', profiles: { full_name: 'Abdulla Shareef', email: 'abdulla@example.com' } },
];

export const demoContactSubmissions = [
  { id: 'contact-001', full_name: 'James Wilson', email: 'james@example.com', subject: 'Investment Inquiry', message: 'I am interested in learning more about your Baa Atoll project. What is the minimum investment?', created_at: '2025-03-01T10:00:00Z' },
  { id: 'contact-002', full_name: 'Sarah Chen', email: 'sarah@example.com', subject: 'Partnership Opportunity', message: 'We are a Dubai-based family office looking to explore partnership opportunities with Blocs.', created_at: '2025-02-20T10:00:00Z' },
  { id: 'contact-003', full_name: 'Ali Raza', email: 'ali.raza@example.com', subject: 'Shariah Compliance', message: 'Can you provide details about your Shariah certification process and which scholars are on your board?', created_at: '2025-02-15T10:00:00Z' },
];

export const demoApplications = [
  { id: 'app-001', full_name: 'David Thompson', email: 'david@example.com', investment_interest: '$1M - $5M', created_at: '2025-03-05T10:00:00Z' },
  { id: 'app-002', full_name: 'Fatima Al-Sayed', email: 'fatima@example.com', investment_interest: '$250K - $1M', created_at: '2025-02-28T10:00:00Z' },
  { id: 'app-003', full_name: 'Rajesh Patel', email: 'rajesh@example.com', investment_interest: '$5M+', created_at: '2025-02-10T10:00:00Z' },
];

export const demoSupportTickets = [
  { id: 'ticket-001', user_id: 'demo-investor-001', subject: 'Tax Statement Download Issue', message: 'I am unable to download my 2024 tax statement. The button does not seem to work.', status: 'open', created_at: '2025-03-10T10:00:00Z', profiles: { full_name: 'Ahmed Rasheed' } },
  { id: 'ticket-002', user_id: 'user-004', subject: 'Portfolio Value Discrepancy', message: 'My portfolio shows a different value than what I calculated. Can you please verify?', status: 'resolved', created_at: '2025-02-25T10:00:00Z', profiles: { full_name: 'Aishath Noor' } },
];

export const demoAllInvestments = [
  ...demoInvestments,
  { id: 'inv-004', user_id: 'user-002', project_id: 'proj-003', amount: 2000000, expected_return: 242000, status: 'active', invested_at: '2024-01-20T10:00:00Z', created_at: '2024-01-20T10:00:00Z', projects: { title: 'Baa Atoll Luxury Villas' }, profiles: { full_name: 'Fathimath Zahra', email: 'fathimath@example.com' } },
  { id: 'inv-005', user_id: 'user-004', project_id: 'proj-001', amount: 500000, expected_return: 49000, status: 'active', invested_at: '2024-08-01T10:00:00Z', created_at: '2024-08-01T10:00:00Z', projects: { title: 'Malé Waterfront Residences' }, profiles: { full_name: 'Aishath Noor', email: 'aishath@example.com' } },
  { id: 'inv-006', user_id: 'user-007', project_id: 'proj-005', amount: 2000000, expected_return: 210000, status: 'active', invested_at: '2023-12-01T10:00:00Z', created_at: '2023-12-01T10:00:00Z', projects: { title: 'Laamu Atoll Resort & Spa' }, profiles: { full_name: 'Mariyam Didi', email: 'mariyam@example.com' } },
];

export const demoAllTransactions = [
  ...demoTransactions,
  { id: 'txn-008', user_id: 'user-002', type: 'deposit', amount: 2000000, status: 'completed', reference: 'DEP-2024-004', created_at: '2024-01-20T10:00:00Z', profiles: { full_name: 'Fathimath Zahra' } },
  { id: 'txn-009', user_id: 'user-004', type: 'deposit', amount: 500000, status: 'completed', reference: 'DEP-2024-005', created_at: '2024-08-01T10:00:00Z', profiles: { full_name: 'Aishath Noor' } },
  { id: 'txn-010', user_id: 'user-007', type: 'deposit', amount: 2000000, status: 'completed', reference: 'DEP-2023-006', created_at: '2023-12-01T10:00:00Z', profiles: { full_name: 'Mariyam Didi' } },
];
