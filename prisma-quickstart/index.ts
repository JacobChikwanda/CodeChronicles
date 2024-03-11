import { app, port } from "./src/app";

app.listen(port, () => {
    console.log(`[Server]: running on http:localhost:${port}`);
})