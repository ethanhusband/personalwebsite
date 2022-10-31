import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import Image from 'next/image'

export const DropdownPost = ({ name, imgUrl, children }: any) => {
  const [content, updateContent] = useState(false)

  var postContents = null
  if (content) {
    postContents = (
      <div>
        <hr className="my-4" />
        HERE IS THE CONTENT
      </div>
    )
  }
  return (
    <div
      className="flex flex-col p-5 rounded-lg w-auto bg-white red-shadow "
      onClick={() => updateContent(!content)}
    >
      <div className="flex flex-row">
        <Image src={imgUrl} alt="" />
        <div className="text-2xl">{name}</div>
        <FaAngleDown
          className="ml-auto mr-4 my-auto"
          size={35}
          color="rgb(55 65 81)"
        />
      </div>
      {postContents}
    </div>
  )
}

export default DropdownPost
