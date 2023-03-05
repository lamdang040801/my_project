"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ActorController {
    static getAll(req, res) {
        return res.status(200).json({
            success: true,
            message: "Welcome"
        });
    }
}
exports.default = ActorController;
