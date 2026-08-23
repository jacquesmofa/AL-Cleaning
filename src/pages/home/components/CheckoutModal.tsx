import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CheckoutModalProps {
  onClose: () => void;
  total: number;
  referenceId: string;
}

type PaymentMode = 'deposit' | 'full';
type PaymentMethod = 'stripe' | 'interac';

export default function CheckoutModal({ onClose, total, referenceId }: CheckoutModalProps) {
  const { t, i18n } = useTranslation();
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('full');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('interac');

  const amount = paymentMode === 'deposit' ? 50 : total;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground-950/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-background-50 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 text-foreground-500 transition-colors"
          aria-label={t('checkoutCancel')}
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Header */}
        <h3 className="font-heading text-xl font-semibold text-foreground-950 mb-1">{t('checkoutTitle')}</h3>
        <p className="text-foreground-600 text-sm mb-6">{t('checkoutSubtext')}</p>

        {/* Amount + Reference */}
        <div className="bg-background-100 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-foreground-600">{t('checkoutAmount')}</span>
            <span className="text-lg font-bold text-foreground-950">${amount.toLocaleString()} CAD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-foreground-600">{t('checkoutBookingRef')}</span>
            <span className="text-sm font-mono font-semibold text-primary-600">{referenceId}</span>
          </div>
        </div>

        {/* Payment Mode: Deposit vs Full */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground-700 mb-2">
            {i18n.language === 'fr' ? 'Montant du paiement' : 'Payment Amount'}
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPaymentMode('deposit')}
              className={`flex-1 py-2.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                paymentMode === 'deposit'
                  ? 'border-accent-400 bg-accent-50 text-accent-700'
                  : 'border-background-200 bg-background-50 text-foreground-600 hover:border-background-300'
              }`}
            >
              {t('checkoutDeposit')}
            </button>
            <button
              type="button"
              onClick={() => setPaymentMode('full')}
              className={`flex-1 py-2.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
                paymentMode === 'full'
                  ? 'border-accent-400 bg-accent-50 text-accent-700'
                  : 'border-background-200 bg-background-50 text-foreground-600 hover:border-background-300'
              }`}
            >
              {t('checkoutFullAmount')}
            </button>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="mb-6">
          <div className="flex gap-1 p-1 bg-background-100 rounded-full mb-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('interac')}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                paymentMethod === 'interac'
                  ? 'bg-background-50 text-foreground-950 shadow-sm'
                  : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              {t('checkoutInteracTab')}
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('stripe')}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                paymentMethod === 'stripe'
                  ? 'bg-background-50 text-foreground-950 shadow-sm'
                  : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              {t('checkoutStripeTab')}
            </button>
          </div>

          {/* Interac e-Transfer */}
          {paymentMethod === 'interac' && (
            <div className="bg-background-100 rounded-xl p-5 space-y-4">
              <p className="text-sm text-foreground-600">{t('checkoutInteracDesc')}</p>

              <div>
                <label className="block text-xs font-medium text-foreground-500 mb-1">{t('checkoutInteracEmail')}</label>
                <div className="flex items-center gap-2 bg-background-50 rounded-lg px-4 py-2.5 border border-background-200">
                  <span className="text-sm font-mono font-semibold text-foreground-950">armeljoelkokea@yahoo.com</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText('armeljoelkokea@yahoo.com')}
                    className="text-primary-500 hover:text-primary-600 text-sm flex-shrink-0"
                  >
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground-500 mb-1">{t('checkoutInteracMemo')}</label>
                <div className="flex items-center gap-2 bg-background-50 rounded-lg px-4 py-2.5 border border-background-200">
                  <span className="text-sm font-mono font-semibold text-foreground-950">{referenceId}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(referenceId)}
                    className="text-primary-500 hover:text-primary-600 text-sm flex-shrink-0"
                  >
                    <i className="ri-file-copy-line"></i>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-foreground-500 bg-accent-50 rounded-lg p-3">
                <i className="ri-information-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                <span>{t('checkoutInteracNote')}</span>
              </div>
            </div>
          )}

          {/* Stripe */}
          {paymentMethod === 'stripe' && (
            <div className="bg-background-100 rounded-xl p-5 text-center">
              <p className="text-sm text-foreground-600 mb-4">{t('checkoutStripeDesc')}</p>

              <div className="flex items-center justify-center gap-3 mb-5">
                <i className="ri-visa-line text-2xl text-foreground-400"></i>
                <i className="ri-mastercard-line text-2xl text-foreground-400"></i>
                <span className="text-xs font-semibold text-foreground-400">AMEX</span>
                <i className="ri-apple-line text-2xl text-foreground-400"></i>
                <i className="ri-google-line text-2xl text-foreground-400"></i>
              </div>

              {/* Card Form Placeholder */}
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-foreground-500 mb-1 text-left">
                    {i18n.language === 'fr' ? 'Numéro de carte' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-400 placeholder:text-foreground-300 cursor-not-allowed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground-500 mb-1 text-left">
                      {i18n.language === 'fr' ? 'Expiration' : 'Expiry'}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-400 placeholder:text-foreground-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground-500 mb-1 text-left">
                      {i18n.language === 'fr' ? 'CVC' : 'CVC'}
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-background-200 bg-background-50 text-sm text-foreground-400 placeholder:text-foreground-300 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-secondary-50 rounded-lg p-4 text-left">
                <p className="text-xs text-secondary-700 font-medium mb-1">
                  <i className="ri-information-line mr-1"></i>
                  {i18n.language === 'fr'
                    ? 'Paiement en ligne à venir'
                    : 'Online Payments Coming Soon'}
                </p>
                <p className="text-xs text-secondary-600">
                  {i18n.language === 'fr'
                    ? 'Le paiement par carte de crédit sera bientôt disponible. En attendant, utilisez le virement Interac pour réserver instantanément.'
                    : 'Credit card payments will be available soon. In the meantime, use Interac e-Transfer to book instantly.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-full text-sm font-semibold bg-primary-500 text-background-50 hover:bg-primary-600 transition-all whitespace-nowrap"
        >
          {paymentMethod === 'interac'
            ? (i18n.language === 'fr' ? 'J\'ai envoyé le virement' : 'I\'ve Sent the Transfer')
            : t('checkoutCancel')}
        </button>
      </div>
    </div>
  );
}