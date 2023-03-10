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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
//importar o express
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var product_1 = require("./entity/product");
(0, typeorm_1.createConnection)().then(function (db) {
    //do model criar um repositorio
    var productRepository = db.getRepository(product_1.Product);
    //criar a aplica????o express
    var app = express();
    //resolver o cors para o front - resolver json
    app.use(cors({ origin: 'http://localhost:3000' }));
    app.use(express.json());
    //endpoints
    app.get('/api/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.find()
                    //retornar os produtos
                ];
                case 1:
                    products = _a.sent();
                    //retornar os produtos
                    res.json(products);
                    return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.create(req.body)
                    //salvar no banco
                ];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, productRepository.save(product)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    }); });
    app.get('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var idParams, id, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idParams = req.params.idParams;
                    id = parseInt(idParams);
                    return [4 /*yield*/, productRepository.findOneBy({ id: id })];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, res.send({ product: product })];
            }
        });
    }); });
    app.put('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var idparams, id, product, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idparams = req.params.idparams;
                    id = parseInt(idparams);
                    return [4 /*yield*/, productRepository.findOneBy({ id: id })];
                case 1:
                    product = _a.sent();
                    productRepository.merge(product, req.body);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, productRepository.save(product)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
                case 4:
                    error_1 = _a.sent();
                    res.send(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    app.delete('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var idParams, id, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idParams = req.params.idParams;
                    id = parseInt(idParams);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, productRepository.delete(id)];
                case 2:
                    result = _a.sent();
                    res.send({ result: result });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.send(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.post('/api/products/:id/like', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var idParam, id, product, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idParam = req.params.idParam;
                    id = parseInt(idParam);
                    return [4 /*yield*/, productRepository.findOneBy({ id: id })];
                case 1:
                    product = _a.sent();
                    product.likes++;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, productRepository.save(product)];
                case 3:
                    result = _a.sent();
                    res.send({ result: result });
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    res.send(err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    //escutar a porta de backend
    app.listen(5000, function () { return console.log('Servidor na porta 5000'); });
});
