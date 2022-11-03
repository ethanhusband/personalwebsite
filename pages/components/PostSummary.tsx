import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

// This component is used as a summary for each page, but is reused as the header for the corresponding page

export const PostSummary = ({
  title,
  imgUrl,
  link,
  isPageHeader = true,
  children,
}: {
  title: string
  imgUrl: string
  link: string
  isPageHeader: boolean
  children: JSX.Element | undefined
}) => {
  var postContents = null
  var angleButton = (
    <FaAngleRight
      className="ml-auto mr-4 my-auto"
      size={35}
      color="rgb(55 65 81)"
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
        color="rgb(55 65 81)"
      />
    )
  }

  return (
    <div className="flex flex-col p-5 rounded-lg w-auto bg-zinc-200 red-shadow border-black border post-shadow">
      <Link href={link}>
        <div className="flex flex-row">
          <Image src={imgUrl} alt="" />
          <div className="text-2xl">{title}</div>
          {angleButton}
        </div>
      </Link>
      {postContents}
    </div>
  )
}

export default PostSummary
