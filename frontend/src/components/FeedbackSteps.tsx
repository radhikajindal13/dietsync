import { useState } from 'react';

type FeedbackStepsProps = {
  onClose: () => void;
};

export function FeedbackSteps({ onClose }: FeedbackStepsProps) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<number | null>(null);
  const [nps, setNps] = useState(5);

  const npsLabel =
    nps >= 9
      ? '🌟 Promoter – Thanks for being awesome!'
      : nps >= 7
      ? '😊 Passive – Help us improve!'
      : '😞 Detractor – We want to make it better for you!';

  const npsColor =
    nps >= 9
      ? 'bg-green-600'
      : nps >= 7
      ? 'bg-orange-500'
      : 'bg-red-600';

  return (
    <>
      {/* -------- Progress bar -------- */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              step >= i ? 'bg-green-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <>
          <p className="font-medium mb-3">
            How would you rate your experience?
          </p>

          {/* ⭐ Star Rating */}
          <div className="flex items-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <svg
                  className={`w-7 h-7 ${
                    rating !== null && star <= rating
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
                </svg>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="text-gray-500"
            >
              Maybe Later
            </button>

            <button
              disabled={rating === null}
              onClick={() => setStep(2)}
              className={`px-5 py-2 rounded-lg text-white ${
                rating === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-600'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <>
          <textarea
            placeholder="What did you like most? ✨"
            className="w-full border rounded-lg p-3 mb-4"
            rows={3}
          />

          <textarea
            placeholder="What needs improvement? 🔧"
            className="w-full border rounded-lg p-3 mb-6"
            rows={3}
          />

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-gray-500"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <>
          <p className="font-medium mb-6">
            How likely are you to recommend DietSync to a friend?
          </p>

          {/* Slider with value bubble */}
          <div className="relative mb-8">
            {/* Value bubble */}
            <div
              className="absolute -top-10 text-sm bg-gray-500 text-white px-2 py-1 rounded-md"
              style={{
                left: `calc(${(nps / 10) * 100}% - 12px)`,
              }}
            >
              {nps}
            </div>

            {/* <input
              type="range"
              min={0}
              max={10}
              value={nps}
              onChange={(e) => setNps(Number(e.target.value))}
              className="w-full accent-green-600"
            /> */}

<input
  type="range"
  min={0}
  max={10}
  value={nps}
  onChange={(e) => setNps(Number(e.target.value))}
  className="w-full appearance-none h-2 rounded-full bg-gray-300 focus:outline-none"
  style={{
    background: `linear-gradient(
      to right,
rgb(33, 185, 79) ${(nps / 10) * 100}%,
      #e5e7eb ${(nps / 10) * 100}%
    )`,
  }}
/>



            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Not likely (0)</span>
              <span>Very likely (10)</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <span
              className={`inline-block px-5 py-2 text-white rounded-full ${npsColor}`}
            >
              {npsLabel}
            </span>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-gray-500"
            >
              Back
            </button>
            <button
              onClick={() => {
                console.log({ rating, nps });
                onClose();
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Send Feedback
            </button>
          </div>
        </>
      )}
    </>
  );
}
