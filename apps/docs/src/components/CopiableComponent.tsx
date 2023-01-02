import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react"

export const CopiableComponent = ({ text }: { text: string }) => {
	const [recentlyCopied, setRecentlyCopied] = useState(false);
	return <div
		className="p-2 mt-1 border-2 rounded-lg border-gray bg-black text-white hover:cursor-pointer"
		onClick={async () => {
			await navigator.clipboard.writeText(text);
			setRecentlyCopied(true);
			setTimeout(() => setRecentlyCopied(false), 750);
		}}>
		{recentlyCopied ?
			<p>Copied! <FontAwesomeIcon icon={faCheck} /></p>
			: <p>{text} <FontAwesomeIcon icon={faCopy} /></p>
		}
	</div>
}