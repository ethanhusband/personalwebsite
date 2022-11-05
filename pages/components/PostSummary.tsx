import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from '@mui/material'

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
        <hr className="mt-4 mb-2 border-black border" />
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

  // Conditions for responsiveness
  var titleStyle = 'text-2xl'
  var showDesc = true
  var imgWidth = 120
  var imgHeight = isPageHeader ? 65 : 100
  if (!useMediaQuery('(min-width:550px)')) {
    titleStyle = 'text-xl'
    showDesc = false || isPageHeader
  }
  if (useMediaQuery('(max-width:410px)')) {
    titleStyle = 'text-lg'
    imgWidth = 100
  }
  if (useMediaQuery('(max-width:380px)')) {
    titleStyle = 'text-base'
    imgWidth = 80
  }
  if (useMediaQuery('(max-width:300px)')) {
    titleStyle = 'text-base'
    imgWidth = 50
  }
  imgWidth = isPageHeader ? 65 : imgWidth

  return (
    <div className="py-4 px-2 min-h-100px flex flex-col w-full max-w-1000px self-center rounded-lg bg-zinc-700 post-shadow">
      <Link href={link}>
        <div className="flex flex-row h-full">
          <Image
            className="rounded my-auto ml-3 "
            src={imgUrl}
            alt={title}
            width={imgWidth}
            height={imgHeight}
            quality={100}
          />
          <div className="ml-4 flex flex-col align-center w-3/4">
            <div className={titleStyle}>{title}</div>
            {showDesc ? (
              <div className="mt-1 text-base text-gray-400">{desc}</div>
            ) : (
              <div className="mt-1 text-base text-gray-400">See More</div>
            )}
          </div>
          {angleButton}
        </div>
      </Link>
      {postContents}
    </div>
  )
}

export default PostSummary
