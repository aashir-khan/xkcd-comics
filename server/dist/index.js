"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const PORT = process.env.PORT || 3000;
const oxfordApiBaseUrl = "https://od-api.oxforddictionaries.com/api/v2";
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.get("/", (_, res) => {
    res.send("Hello World");
});
app.use("/api/word-search", http_proxy_middleware_1.createProxyMiddleware({
    target: `${oxfordApiBaseUrl}/search/en-us`,
    changeOrigin: true,
    pathRewrite: {
        ["^/api/word-search"]: "",
    },
}));
app.use("/api/word-entries", http_proxy_middleware_1.createProxyMiddleware({
    target: `${oxfordApiBaseUrl}/entries/en-us`,
    changeOrigin: true,
    pathRewrite: {
        ["^/api/word-entries"]: "",
    },
}));
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map