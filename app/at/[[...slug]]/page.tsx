import type { Metadata } from "next";
import { MarketPageRoute, marketMetadata, marketStaticParams, type MarketSlugProps } from "@/components/market-route";

export const dynamicParams = false;

export const generateStaticParams = () => marketStaticParams("at");

export const generateMetadata = (props: MarketSlugProps): Promise<Metadata> => marketMetadata("at", props.params);

export default function Page(props: MarketSlugProps) {
  return <MarketPageRoute market="at" params={props.params} />;
}
