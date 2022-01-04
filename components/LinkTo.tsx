/** Custom Link Components combining built-in next/link and native anchor tag so that it can easily styled */

import Link from "next/link";

export default function LinkTo(props) {
  let { href = "#", children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}
