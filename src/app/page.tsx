import Image from "next/image"
import Link from "next/link"
import { EventCard } from "../components/EventCard"
import { MobileView } from "../components/mobile-view"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden md:flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center space-x-8">
          <div className="w-8 h-8 border-2 border-gray-400 flex items-center justify-center rounded-md">
            <span className="font-bold">S</span>
          </div>
          <nav className="flex space-x-6">
            <Link href="#" className="text-sm font-medium">
              Local Events
            </Link>
            <Link href="#" className="text-sm font-medium">
              Maps
            </Link>
            <Link href="#" className="text-sm font-medium">
              Community
            </Link>
            <Link href="#" className="text-sm font-medium">
              Impact
            </Link>
            <Link href="#" className="text-sm font-medium">
              Contact
            </Link>
            <Link href="#" className="text-sm font-medium">
              Link
            </Link>
          </nav>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded">Sign in</button>
          <button className="px-3 py-1 text-sm border-2 border-gray-800 text-gray-800 rounded">Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b py-16 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Superhero Safety Network</h1>
          <p className="text-gray-500 text-lg">Connecting Communities for Change</p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden mb-6">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Puget Sound with Seattle skyline and Mt. Rainier"
                width={800}
                height={400}
                className="w-full"
              />
              <div className="absolute bottom-6 left-6">
                <h2 className="text-white text-4xl font-bold">Puget Sound</h2>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full border border-gray-200 overflow-hidden">
              <button className="px-6 py-2 bg-purple-100 text-purple-700 flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Community
              </button>
              <button className="px-6 py-2">Label</button>
            </div>
          </div>

          <div className="space-y-6">
            <EventCard
              title="Bellevue Bridges"
              category="Parks"
              distance="1.2 miles away"
              description="Cleaning up Bellevue Downtown Park"
              imageSrc="/placeholder.svg?height=80&width=80"
              imageAlt="Bellevue Bridges"
            />

            <EventCard
              title="Renton Repairs"
              category="Category"
              distance="5.7 miles away"
              description="Repairing our connection with Renton through gardening"
              imageSrc="/placeholder.svg?height=80&width=80"
              imageAlt="Renton Repairs"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 mt-auto border-t">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="w-8 h-8 border-2 border-gray-400 flex items-center justify-center rounded-md mb-4">
                <span className="font-bold">S</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <SocialIcon name="Twitter" />
                <SocialIcon name="Instagram" />
                <SocialIcon name="Facebook" />
                <SocialIcon name="LinkedIn" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <FooterLinks
                title="Use cases"
                links={[
                  { name: "UI design", href: "#" },
                  { name: "UX design", href: "#" },
                ]}
              />

              <FooterLinks
                title="Explore"
                links={[
                  { name: "Design", href: "#" },
                  { name: "Prototyping", href: "#" },
                  { name: "Wireframing", href: "#" },
                  { name: "Diagramming", href: "#" },
                  { name: "Brainstorming", href: "#" },
                  { name: "Online whiteboard", href: "#" },
                  { name: "Team collaboration", href: "#" },
                  { name: "Figma", href: "#" },
                ]}
              />

              <FooterLinks
                title="Resources"
                links={[
                  { name: "Blog", href: "#" },
                  { name: "Best practices", href: "#" },
                  { name: "Colors", href: "#" },
                  { name: "Color wheel", href: "#" },
                  { name: "Support", href: "#" },
                  { name: "Developers", href: "#" },
                  { name: "Resource library", href: "#" },
                ]}
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile View - Only visible on small screens */}
      <MobileView />
    </div>
  )
}

function SocialIcon({ name }: { name: string }) {
  const icons = {
    Twitter: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Instagram: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Facebook: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    LinkedIn: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.9079 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  }

  return (
    <Link href="#" aria-label={name} className="border border-gray-300 rounded-full p-1">
      {icons[name as keyof typeof icons]}
    </Link>
  )
}

function FooterLinks({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-medium mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-sm text-gray-500">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
