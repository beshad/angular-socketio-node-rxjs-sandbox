"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = void 0;
const moment_1 = __importDefault(require("moment"));
const data_1 = require("@data/data");
let counter = 0;
const updateData = () => {
    const diff = Math.floor(Math.random() * 1000) / 100;
    const lastDay = (0, moment_1.default)(data_1.data[0].date, 'DD-MM-YYYY').add(1, 'days');
    let open;
    let close;
    if (counter % 2 === 0) {
        open = data_1.data[0].open + diff;
        close = data_1.data[0].close + diff;
    }
    else {
        open = Math.abs(data_1.data[0].open - diff);
        close = Math.abs(data_1.data[0].close - diff);
    }
    data_1.data.unshift({
        date: lastDay.format('DD-MM-YYYY'),
        open,
        close,
    });
    counter++;
};
exports.updateData = updateData;
//# sourceMappingURL=update.data.js.map