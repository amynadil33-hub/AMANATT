import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import PortalLayout from "@/layouts/PortalLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Public Pages
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import AboutPage from "@/pages/about/AboutPage";
import InvestProductPage from "@/pages/invest/InvestProductPage";
import ResourcesPage from "@/pages/resources/ResourcesPage";
import FAQPage from "@/pages/FAQPage";
import ContactPage from "@/pages/ContactPage";
import ApplyPage from "@/pages/ApplyPage";
import CalculatorPage from "@/pages/CalculatorPage";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// Portal Pages
import PortalDashboard from "@/pages/portal/PortalDashboard";
import PortfolioPage from "@/pages/portal/PortfolioPage";
import KYCPage from "@/pages/portal/KYCPage";
import MembershipPage from "@/pages/portal/MembershipPage";
import { InvestmentsPage, TransactionsPage, DocumentsPage, NotificationsPage, ProfilePage, SupportPage } from "@/pages/portal/PortalPages";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { AdminUsers, AdminProjects, AdminInvestments, AdminTransactions, AdminKYC, AdminForms, AdminContent, AdminNotifications, AdminSettings } from "@/pages/admin/AdminPages";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Error Boundary to prevent white screens
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0B1121' }}>
          <div className="text-center px-4">
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem', maxWidth: '400px' }}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#C9A961',
                color: '#0B1121',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <ThemeProvider defaultTheme="dark" storageKey="amanat-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public Website */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="/about/:section" element={<AboutPage />} />
                  <Route path="/invest/:product" element={<InvestProductPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/resources/:type" element={<ResourcesPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/apply" element={<ApplyPage />} />
                  <Route path="/calculator" element={<CalculatorPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                </Route>

                {/* Customer Portal */}
                <Route element={<PortalLayout />}>
                  <Route path="/portal" element={<PortalDashboard />} />
                  <Route path="/portal/portfolio" element={<PortfolioPage />} />
                  <Route path="/portal/investments" element={<InvestmentsPage />} />
                  <Route path="/portal/transactions" element={<TransactionsPage />} />
                  <Route path="/portal/kyc" element={<KYCPage />} />
                  <Route path="/portal/documents" element={<DocumentsPage />} />
                  <Route path="/portal/membership" element={<MembershipPage />} />
                  <Route path="/portal/notifications" element={<NotificationsPage />} />
                  <Route path="/portal/profile" element={<ProfilePage />} />
                  <Route path="/portal/support" element={<SupportPage />} />
                </Route>

                {/* Admin Dashboard */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route path="/admin/investments" element={<AdminInvestments />} />
                  <Route path="/admin/transactions" element={<AdminTransactions />} />
                  <Route path="/admin/kyc" element={<AdminKYC />} />
                  <Route path="/admin/forms" element={<AdminForms />} />
                  <Route path="/admin/content" element={<AdminContent />} />
                  <Route path="/admin/notifications" element={<AdminNotifications />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
