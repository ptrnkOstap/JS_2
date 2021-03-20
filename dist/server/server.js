/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar app = express();\nvar API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\n/**\r\n * Активируем мидлвары\r\n */\n\napp.use(express.json()); // Даем знать приложению, что работаем с json'ом\n\napp.use('/', express[\"static\"]('./public')); // запросы в корень нашего сайт отдают содержимое public\n\n/**\r\n * API Каталога\r\n */\n\napp.get('/api/products', function (req, res) {\n  fs.readFile('./server/db/products.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\n/**\r\n * API Корзины\r\n */\n\napp.get('/api/cart', function (req, res) {\n  fs.readFile('./server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n}); // Добавление нового товара в корзине\n\napp.post('/api/cart', function (req, res) {\n  fs.readFile('./server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      // парсим текущую корзину\n      var cart = JSON.parse(data); // добавляем новый товар\n\n      cart.contents.push(req.body); // пишем обратно\n\n      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), function (err) {\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          res.send('{\"result\": 1}');\n        }\n      });\n    }\n  });\n}); // Изменяем количество товара\n\napp.put('/api/cart/:id', function (req, res) {\n  fs.readFile('./server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      // парсим текущую корзину\n      var cart = JSON.parse(data); // ищем товар по id\n\n      var find = cart.contents.find(function (el) {\n        return el.id_product === +req.params.id;\n      }); // изменяем количество\n\n      find.quantity += req.body.quantity; // пишем обратно\n\n      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), function (err) {\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          res.send('{\"result\": 1}');\n        }\n      });\n    }\n  });\n});\napp[\"delete\"]('/api/cart/:id', function (req, res) {\n  fs.readFile('./server/db/userCart.json', 'utf-8', function (err, data) {\n    if (err) {\n      console.log(err);\n    } else {\n      var cart = JSON.parse(data);\n      cart.contents.splice(cart.contents.findIndex(function (x) {\n        return x.id_product === +req.params.id;\n      }), 1);\n      fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), function (err) {\n        if (err) {\n          res.send('{\"result\":0}');\n        } else {\n          res.send('{\"result\":1}');\n        }\n      });\n    }\n  });\n});\n/**\r\n * Запуск сервера\r\n * @type {string|number}\r\n */\n// const port = process.env.PORT || 3000;\n\nvar port = 3000; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)\n\napp.listen(port, function () {\n  console.log(\"Listening \".concat(port, \" port\"));\n});\n\n//# sourceURL=webpack://js_2/./server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	
/******/ })()
;