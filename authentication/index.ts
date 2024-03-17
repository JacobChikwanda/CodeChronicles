import { port, app } from "./src/app";

app.listen(port, () => {
    console.log(`[Server]: started running on http://localhost:${port}`);
});