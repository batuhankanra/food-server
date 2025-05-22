"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = routeNotFound;
function routeNotFound(req, res, next) {
    const error = new Error('Route not found');
    res.status(404).json({ error: error.message });
    return;
}
//# sourceMappingURL=routeNotFound.js.map