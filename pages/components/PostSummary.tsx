import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

// This component is used as a summary for each page, but is reused as the header for the corresponding page

export const PostSummary = ({
  title,
  imgUrl,
  link,
  desc,
  isPageHeader = true,
  children,
}: {
  title: string
  imgUrl: string
  link: string
  desc: string
  isPageHeader: boolean
  children: JSX.Element | undefined
}) => {
  var postContents = null
  var angleButton = (
    <FaAngleRight
      className="ml-auto mr-4 my-auto"
      size={35}
      color="rgb(228 228 231)"
    />
  )

  // Need to feed through the content when this element is just the header of a page
  if (isPageHeader) {
    postContents = (
      <div>
        <hr className="my-4 border-black rounded-2xl" />
        <div className="p-4">{children}</div>
      </div>
    )
    angleButton = (
      <FaAngleDown
        className="ml-auto mr-4 my-auto"
        size={35}
        color="rgb(228 228 231)"
      />
    )
  }

  return (
    <div className="flex flex-col p-5 rounded-lg w-auto bg-zinc-700 post-shadow">
      <Link href={link}>
        <div className="flex flex-row">
          <Image
            className="max-h-16"
            src={imgUrl}
            alt=""
            width={150}
            height={50}
          />
          <div className="ml-4 w-4/5">
            <div className="text-2xl">{title}</div>
            <div className="mt-1 text-base text-gray-400">{desc}</div>
          </div>
          {angleButton}
        </div>
      </Link>
      {postContents}
    </div>
  )
}

export default PostSummary
