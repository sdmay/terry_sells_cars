"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var NewsLetterSchema = new mongoose.Schema({
    newsLetterEmail: String
});
var NewsLetter = mongoose.model('NL', NewsLetterSchema);
exports.default = NewsLetter;
//# sourceMappingURL=newsletter.js.map