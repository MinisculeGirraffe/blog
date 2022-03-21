import Link from 'next/link'

export default function Header() {
  return (
    <nav className='flex  py-2 bg-stone-800/40 backdrop-blur-lg w-full sticky top-0 left-0 right-0 z-10 mb-7'>
      <div className="flex text-gray-200/97 font-bold text-4xl px-3 hover:underline hover:cursor-pointer">
        <Link href={"/"}>
        <p>Daniel Norred</p>
        </Link>

      </div>
    </nav>
  )
}
