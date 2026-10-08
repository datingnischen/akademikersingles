import NextLink from "next/link";
import type { ComponentProps } from "react";
import { requestMarket } from "@/lib/market-context";
import { localizePath } from "@/lib/markets";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };

// Wie next/link, hängt aber auf den Marktseiten (/at/, /ch/) das Marktpräfix an interne Seitenpfade an.
export default function Link({ href, ...rest }: Props) {
  return <NextLink href={localizePath(href, requestMarket())} {...rest} />;
}
