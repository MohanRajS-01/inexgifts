import React, { useState } from 'react';
import { FiStar, FiX, FiCheckCircle } from 'react-icons/fi';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

const ReviewModal = ({ isOpen, onClose, item, order, onReviewSubmitted }) => {
  const { currentUser } = useAuth() || {};
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a short review comment before submitting.");
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const reviewPayload = {
        productId: String(item.id || item.title),
        productTitle: item.title,
        productImage: item.image || '/assets/images/products/led_photo_lamp.jpg',
        rating,
        comment: comment.trim(),
        userEmail: currentUser?.email || order?.customerEmail || 'customer@example.com',
        userName: currentUser?.name || order?.shippingAddress?.fullName || 'Verified Customer',
        orderId: order?.id || 'ORD-UNKNOWN'
      };

      await reviewService.addReview(reviewPayload);
      setSubmitting(false);
      setSubmitted(true);

      if (onReviewSubmitted) {
        onReviewSubmitted(reviewPayload);
      }

      setTimeout(() => {
        setSubmitted(false);
        setComment('');
        onClose();
      }, 1500);
    } catch (err) {
      setSubmitting(false);
      setError("Could not submit review. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition"
        >
          <FiX className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <FiCheckCircle />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Review Submitted!</h3>
            <p className="text-xs text-slate-500">Thank you for rating your delivered product! Your review is now live.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Delivered Order #{order?.id}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-2">Rate & Review Product</h3>
              <p className="text-xs text-slate-500">Share your genuine experience with other buyers.</p>
            </div>

            {/* Product Item Preview */}
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <img
                src={item.image || '/assets/images/products/led_photo_lamp.jpg'}
                alt={item.title}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                <p className="text-[10px] text-slate-500">Verified Delivered Product</p>
              </div>
            </div>

            {/* Interactive Star Selection */}
            <div className="text-center py-2 bg-slate-50 rounded-2xl border border-slate-200/60">
              <label className="text-xs font-semibold text-slate-600 block mb-2">Select Your Rating:</label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform active:scale-125"
                  >
                    <FiStar
                      className={`h-7 w-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-amber-600 mt-1 block">
                {rating === 5 ? '⭐⭐⭐⭐⭐ Outstanding!' : rating === 4 ? '⭐⭐⭐⭐ Great Product' : rating === 3 ? '⭐⭐⭐ Average' : '⭐⭐ Needs Improvement'}
              </span>
            </div>

            {/* Review Comment Textarea */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Review Comment:
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the gift quality, design, and delivery?"
                className="w-full p-3 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50"
              />
            </div>

            {error && <p className="text-xs font-bold text-red-500">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 transition active:scale-95 disabled:opacity-50"
            >
              {submitting ? 'Submitting Review...' : 'Submit Review to Firestore ⭐'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
