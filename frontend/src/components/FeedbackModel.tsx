import { X } from 'lucide-react';
import { FeedbackSteps } from './FeedbackSteps';

type FeedbackModalProps = {
  open: boolean;
  onClose: () => void;
};

export function FeedbackModel({ open, onClose }: FeedbackModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-1">
          Share Your Experience
        </h2>
        <p className="text-gray-600 mb-6">
          Help us improve DietSync! Your feedback matters to us.
        </p>

        <FeedbackSteps onClose={onClose} />
      </div>
    </div>
  );
}
