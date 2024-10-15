"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userRole = user.user.role;
        if (userRole !== requiredRole) {
            return res.status(403).json({ message: "Forbidden: Access is denied" });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
