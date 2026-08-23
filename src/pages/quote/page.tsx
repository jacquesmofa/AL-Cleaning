import Layout from '@/components/feature/Layout';
import QuoteEngine from '@/pages/home/components/QuoteEngine';
import BookingSection from '@/pages/quote/components/BookingSection';

export default function QuotePage() {
  return (
    <Layout>
      <BookingSection />
      <QuoteEngine />
    </Layout>
  );
}