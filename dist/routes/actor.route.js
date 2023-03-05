"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actor_controller_1 = __importDefault(require("../controllers/actor.controller"));
const actorRoute = (0, express_1.Router)();
actorRoute.get('/', actor_controller_1.default.getAll);
exports.default = actorRoute;
