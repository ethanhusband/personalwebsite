import { FaAngleRight, FaAngleDown, FaBolt } from 'react-icons/fa'
import Link from 'next/link'
import { useMediaQuery } from '@mui/material'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'

// This component is used as a summary for each page, but is reused as the header and background for the corresponding page
// If using as a summary, must specify children = {undefined} AND isPageHeader = {false}
// Otherwise if used as a header, wrap the article with it.
// Title, link and description props are relatively self-explanatory.

export const PostSummary = ({
  title,
  link,
  desc,
  isPageHeader = true,
  active = false,
  children,
}: any) => {
  const [hover, updateHover] = useState(false)
  var postContents = null
  const angleColor = hover ? '#2fdce1' : 'rgb(228 228 231)'

  var angleButton = (
    <FaAngleRight
      className="ml-auto mr-4 my-auto"
      size={35}
      color={angleColor}
    />
  )

  // Need to feed through the content when this element is just the header/wrapper of a page
  if (isPageHeader) {
    postContents = (
      <div>
        <hr className="mt-4 mx-3 border-black border" />
        <div className="p-4 font-arial text-zinc-300 text-base tracking-wide">
          {children}
        </div>
      </div>
    )
    angleButton = (
      <FaAngleDown
        className="ml-auto mr-4 my-auto"
        size={35}
        color={angleColor}
      />
    )
  }

  // Conditions for responsiveness
  var titleStyle = 'text-2xl'
  if (!useMediaQuery('(min-width:550px)')) {
    titleStyle = 'text-xl'
  }
  if (useMediaQuery('(max-width:410px)')) {
    titleStyle = 'text-lg'
  }
  if (useMediaQuery('(max-width:380px)')) {
    titleStyle = 'text-base'
  }
  if (useMediaQuery('(max-width:300px)')) {
    titleStyle = 'text-base'
  }
  titleStyle += ' text-secondary'

  return (
    <div
      className="py-4 px-2 border border-zinc-800 min-50px w-full max-w-900px self-center rounded-xl bg-zinc-700 post-shadow"
      onMouseOver={() => updateHover(true)}
      onMouseOut={() => updateHover(false)}
    >
      <Link href={link}>
        <div className="flex flex-row ">
          <div className="ml-4 flex flex-col justify-center w-full mr-2">
            <div className="flex flex-row">
              <div className={titleStyle}>{title}</div>
              {active && <ActiveTooltip id={title} />}
            </div>
            <div className="mt-0.5 text-base text-zinc-400">{desc}</div>
          </div>
          {angleButton}
        </div>
      </Link>
      {postContents}
    </div>
  )
}

export const ActiveTooltip = ({ size = 22 }: any) => {
  return (
    <Tooltip
      className="my-auto ml-2"
      content={'This project is currently active'}
    >
      <FaBolt color="white" size={size} />
    </Tooltip>
  )
}

export default PostSummary
