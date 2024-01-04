import { notFound } from 'next/navigation'

export default function Review({
  params
}: {
  params: { productId: string; reviewId: string }
}) {
  if (parseInt(params.reviewId) === 0) {
    notFound()
  } else if (parseInt(params.reviewId) > 10) {
    notFound()
  }
  return (
    <div>
      <h1>
        Review {params.reviewId} for product {params.productId}
      </h1>
    </div>
  )
}
