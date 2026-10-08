import type { Metadata } from "next";
import { MarketPageRoute, marketMetadata, marketStaticParams, type MarketSlugProps } from "@/components/market-route";

export const dynamicParams = false;

export const generateStaticParams = () => marketStaticParams("ch");

export const generateMetadata = (props: MarketSlugProps): Promise<Metadata> => marketMetadata("ch", props.params);

export default function Page(props: MarketSlugProps) {
  return <MarketPageRoute market="ch" params={props.params} />;
}
