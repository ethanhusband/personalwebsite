import React, { useRef } from 'react'

import useScript from '../hooks/UseScript'

const Comments = (title: any) => {
  const comment = useRef(null)

  const status = useScript({
    url: 'https://utteranc.es/client.js',
    theme: 'github-dark',
    issueTerm: title,
    repo: 'ethanhusband/personalwebsite',
    ref: comment,
  })

  return <div className="mb-6">{<div ref={comment}></div>}</div>
}

export default Comments
