import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import { capitalize } from "../../lib/util";

export const Qualities = ({ qualities, name }: { name: string, qualities: DeclarationReflection[] }) => {
	if (!qualities.length) return null;

	return <div className="md: ml-20">
		<h1 className="text-guilded text-4xl font-bold pb-6 underline underline-offset-8">{capitalize(name)}</h1>
		<div className="grid grid-rows-[auto] grid-cols-1 md:grid-cols-3 gap-x-[1rem]">
			{qualities.map(quality =>
				<a className="text-md md:text-xl hover:text-guilded text-white" href={`#${quality.name}`} key={quality.name}>{quality.name}</a>
			)}
		</div>
	</div>
}