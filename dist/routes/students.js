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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../db/client");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    client_1.prisma.students
        .findMany()
        .then((students) => {
        res.json(students);
    })
        .catch(() => {
        res.status(500).json({ message: "Failed to fetch students" });
    });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.default = router;
//# sourceMappingURL=students.js.map