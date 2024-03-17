"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
app_1.app.listen(app_1.port, () => {
    console.log(`[Server]: started running on http://localhost:${app_1.port}`);
});
