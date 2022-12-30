import { useState } from 'react'
import { FaClipboard } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'

export const SiteCodeBlock = ({ children }: any) => {
  const [copied, updateCopied] = useState(false)
  var copySection = (
    <FaClipboard
      className="ml-auto mr-4 my-auto"
      onClick={() => {
        console.log('triggered')
        updateCopied(true)
        navigator.clipboard.writeText(children)
      }}
    />
  )

  if (copied) {
    copySection = (
      <FaCheck
        className="ml-auto mr-4 my-auto"
        onClick={() => navigator.clipboard.writeText(children)}
        onMouseMove={() => updateCopied(false)}
      />
    )
  }

  return (
    <div className="rounded-lg bg-dark my-2 flex flex-row p-2 font-mono">
      <div className="ml-1">{children}</div>
      {copySection}
    </div>
  )
}
