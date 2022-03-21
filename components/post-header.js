
import DateFormatter from '../components/date-formatter'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>

      <div className="max-w-2xl mx-auto">
        <div className="text-lg">
        <PostTitle>{title}</PostTitle>
      <DateFormatter dateString={date}/>
        </div>
      </div>
    </>
  )
}
