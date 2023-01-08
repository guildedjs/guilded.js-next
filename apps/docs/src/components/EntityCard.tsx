import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faICursor, faAtom, faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { EntityType } from "../lib/types";

const entityTypeToIcon: Record<string, IconDefinition> = { classes: faBox, functions: faAtom, types: faICursor }
export const EntityChildCard = ({ entity, entityChild, libName }: { entity: string, entityChild: EntityType, libName: string }) => {
	return <Link href={`/docs/${libName}/${entityChild.name}`}>
		<div className="min-w-[20rem] md:max-w-6xl border-[1px] border-white p-4 md:p-8 hover:cursor-pointer" id={entityChild.name}>
			<span className="text-md md:text-3xl text-guilded ">
				<FontAwesomeIcon icon={entityTypeToIcon[entity]} />
				<h1 className="inline pl-2">{entityChild.name}</h1>
			</span>
			{entityChild.comment?.summary.length && <p className="text-sm md:text-xl text-white">{entityChild.comment.summary[0].text}</p>}
			<p className="text-guilded md:text-md">Click to see properties, methods, and more </p>
		</div>
	</Link>
}