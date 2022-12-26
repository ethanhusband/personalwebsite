import Link from "next/link"

export const SiteLink = ({ href, children }: any) => {
  return (
    <Link className="link-styling" target="_blank" href={href}>
      {children}
    </Link>
  )
}
