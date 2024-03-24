import { join } from "path";
import { GilClient } from "../../lib";
const YokiBot = new GilClient({
	token: "YOUR_BOT_TOKEN",
	commandDirectory: join(__dirname, "commands"),
	listenerDirectory: join(__dirname, "listeners"),
});

YokiBot.start();