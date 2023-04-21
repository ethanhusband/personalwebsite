import Link from 'next/link'

export default function FetchingResume() {
  return (
    <div className="bg-zinc-200 p-4 mt-16 rounded-lg  flex flex-col gap-y-2 mx-auto w-64 border-2 border-black ">
      <h1 className="text-center text-black">Fetching Resume...</h1>
      <hr className="bg-black text-black border-0.5 border-black" />
      <Link href="/" className="italic  text-center text-black">
        Go back home
      </Link>
    </div>
  )
}
