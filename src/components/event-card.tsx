import Image from "next/image"
import { Heart } from "lucide-react"

interface EventCardProps {
  title: string
  category: string
  distance: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function EventCard({ title, category, distance, description, imageSrc, imageAlt }: EventCardProps) {
  return (
    <div className="flex items-start gap-4 pb-6 border-b last:border-b-0">
      <div className="border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} width={80} height={80} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm text-gray-500">
          {category} • {distance}
        </p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button className="flex-shrink-0" aria-label="Add to favorites">
        <Heart className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  )
}
