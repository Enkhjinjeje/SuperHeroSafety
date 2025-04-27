"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Calendar, ChevronLeft, Heart, MoreVertical } from "lucide-react"

export function MobileView() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 overflow-auto">
      <div className="border-b">
        <div className="flex items-center p-4">
          <ChevronLeft className="w-5 h-5 mr-4" />
          <h1 className="text-lg font-medium">Local Events</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Bell className="w-5 h-5" />
            <Calendar className="w-5 h-5" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-16 bottom-0 w-12 border-r flex flex-col items-center py-4 space-y-8">
        <button className="w-8 h-8 rounded-full border-2 border-purple-200 flex items-center justify-center">
          <span className="text-xl">+</span>
        </button>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center mb-1">
              <span className="w-2 h-2 rounded-full border border-gray-400"></span>
            </div>
            <span className="text-[10px] text-gray-500">Label</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="pl-16 pr-4">
        {/* Hero Image */}
        <div className="relative h-48 rounded-lg overflow-hidden mt-4 border-2 border-gray-200">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Puget Sound"
            width={800}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="text-white text-2xl font-bold">Puget Sound</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 mb-6">
          <div className="flex-1 flex justify-center">
            <button className="px-3 py-1 border border-purple-300 text-purple-700 rounded-full text-sm">
              Community
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <button className="px-3 py-1 text-sm border border-transparent">Label</button>
          </div>
        </div>

        {/* Event Cards */}
        <div className="space-y-4 pb-20">
          <MobileEventCard
            title="Bellevue Bridges"
            category="Parks"
            distance="1.2 miles away"
            description="Between Bellevue and Meydenbauer Park"
            imageSrc="/placeholder.svg?height=80&width=80"
          />

          <MobileEventCard
            title="Renton Repairs"
            category="Category"
            distance="5.7 miles away"
            description="Repairing our connection with Renton through gardening"
            imageSrc="/placeholder.svg?height=80&width=80"
          />
        </div>
      </div>
    </div>
  )
}

function MobileEventCard({
  title,
  category,
  distance,
  description,
  imageSrc,
}: {
  title: string
  category: string
  distance: string
  description: string
  imageSrc: string
}) {
  return (
    <div className="flex items-start gap-3 border-b pb-4 last:border-b-0">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} width={80} height={80} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-gray-500">
          {category} • {distance}
        </p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Heart className="w-5 h-5 text-gray-500" />
    </div>
  )
}
