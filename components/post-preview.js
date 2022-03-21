import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'

import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className=' bg-stone-400/30 p-4 rounded-md'>
      <h3 className="text-3xl leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed">{excerpt}</p>
    </div>
  )
}
