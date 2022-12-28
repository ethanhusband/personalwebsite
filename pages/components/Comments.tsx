import React, { useRef } from 'react'

import useScript from '../lib/UseScript'

const Comments = () => {
  const comment = useRef(null)

  const status = useScript({
    url: 'https://utteranc.es/client.js',
    theme: 'github-dark',
    issueTerm: 'url',
    repo: 'ethanhusband/personalwebsite',
    ref: comment,
  })

  return (
    <div className="mt-8 py-4 border border-zinc-800 min-50px w-full max-w-900px self-center rounded-xl bg-zinc-700 post-shadow">
      {<div ref={comment}></div>}
    </div>
  )
}

export default Comments
