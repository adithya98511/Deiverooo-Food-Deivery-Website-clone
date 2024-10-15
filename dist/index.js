"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./util/db"));
const PORT = 8080;
const app = (0, server_1.default)();
db_1.default
    .authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
    db_1.default
        .sync({ force: false })
        .then(() => {
        console.log("User table has been created (if it didn't already exist).");
        app.listen(PORT, () => {
            console.log('Server running on port', PORT);
        });
    })
        .catch((err) => {
        console.error('Error creating the table:', err);
    });
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
app.get('/', (req, res) => {
    res.send(`Serving on port ${PORT}`);
});
