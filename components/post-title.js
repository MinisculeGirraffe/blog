export default function PostTitle({ children }) {
  return (
    <h1 className="text-2xl font-bold tracking-tighter leading-tight md:leading-none text-center md:text-left">
      {children}
    </h1>
  )
}
