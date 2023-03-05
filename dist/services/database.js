"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
class Database {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            const port = process.env.DATABASE_PORT;
            const username = process.env.DATABASE_USERNAME;
            const password = process.env.DATABASE_PASSWORDas;
            const driver = neo4j_driver_1.default.driver(`neo4j://localhost:${port}`, neo4j_driver_1.default.auth.basic(username, password));
            process.on('exit', () => {
                console.log('Close Database');
                driver.close();
            });
            console.log('hehe');
        });
    }
}
exports.default = Database;
