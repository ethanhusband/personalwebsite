import { NextPage } from 'next'
import { BlogPage } from './Blog'

export const ProjectMenu: NextPage = () => {
  // Deprecated - point to blog
  return <BlogPage />
}

export default ProjectMenu
