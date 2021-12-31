import Link from "next/link";

export default function LinkTo({ children, href, className = "" }) {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
}
