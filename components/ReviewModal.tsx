"use client"
import { useState } from "react"

interface ReviewModalProps {
  movieId: number
  movieTitle: string
  posterPath: string
  onClose: () => void
}

export default function ReviewModal({ movieId, movieTitle, posterPath, onClose }: ReviewModalProps) {
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewBody, setReviewBody] = useState("")
  const [reviewRating, setReviewRating] = useState(5)

  async function handleSubmit() {
    const response = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId,
        movieTitle,
        posterPath,
        title: reviewTitle,
        body: reviewBody,
        rating: reviewRating,
      })
    })
    if (response.ok) {
      alert("Review submitted!")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
     
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
        
       
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Review {movieTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        
        <input
          type="text"
          placeholder="Review title..."
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded text-sm"
        />

       
        <textarea
          placeholder="Write your review..."
          value={reviewBody}
          onChange={(e) => setReviewBody(e.target.value)}
          maxLength={500}
          rows={4}
          className="w-full bg-gray-800 text-white p-2 rounded text-sm resize-none"
        />
        <p className="text-gray-400 text-xs">{reviewBody.length}/500</p>

       
        <div className="flex items-center gap-2">
          <label className="text-sm">Rating:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
            className="w-16 bg-gray-800 text-white p-2 rounded text-sm"
          />
          <span className="text-sm text-gray-400">/ 10</span>
        </div>

        
        <button
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
        >
          Submit Review
        </button>

      </div>
    </div>
  )
}