import { opendir } from "fs/promises";
import path from "path";

/** Walks through a directory allowing you to process it with a for await loop */
export async function* walk(dir: string): AsyncGenerator<any, any, unknown> {
    const folder = await opendir(dir).catch(console.log);
    if (!folder) return;

    for await (const d of folder) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* await walk(entry);

        if (![".js", ".ts"].some((suffix) => entry.endsWith(suffix))) continue;
        else if (d.isFile()) yield [d.name, require(entry)];
    }
}
