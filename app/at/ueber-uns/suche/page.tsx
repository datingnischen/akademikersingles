import type { Metadata } from "next";
import { MarketSearchRoute, marketSearchMetadata } from "@/components/market-route";

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export const generateMetadata = (props: Props): Promise<Metadata> => marketSearchMetadata("at", props.searchParams);

export default function Page(props: Props) {
  return <MarketSearchRoute market="at" searchParams={props.searchParams} />;
}
