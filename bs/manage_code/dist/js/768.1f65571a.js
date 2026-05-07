(self["webpackChunkvue3_nb0"] = self["webpackChunkvue3_nb0"] || []).push([[768],{

/***/ 1339:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(1605);
var aFunction = __webpack_require__(9085);
var anObject = __webpack_require__(3938);
var createIteratorProxy = __webpack_require__(1523);
var callWithSafeIterationClosing = __webpack_require__(1332);

var IteratorProxy = createIteratorProxy(function (arg) {
  var iterator = this.iterator;
  var result = anObject(this.next.call(iterator, arg));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, result.value);
});

$({ target: 'Iterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aFunction(mapper)
    });
  }
});


/***/ }),

/***/ 8329:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(1605);
var $trim = (__webpack_require__(9163).trim);
var forcedStringTrimMethod = __webpack_require__(9233);

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ 8768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ list)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(9258);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(115);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(8636);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(9581);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(8763);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-json.js
var es_date_to_json = __webpack_require__(3270);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(959);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7899);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(5086);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__(8329);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(3725);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.find.js
var esnext_iterator_find = __webpack_require__(2598);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.map.js
var esnext_iterator_map = __webpack_require__(1339);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(33);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(3751);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/menu_manage/list.vue?vue&type=script&setup=true&lang=js














var _hoisted_1 = {
  key: 0,
  "class": "center_view"
};
var _hoisted_2 = {
  style: {
    "text-align": "left",
    "width": "100%",
    "margin-bottom": "20px"
  }
};
var _hoisted_3 = {
  key: 0
};
var _hoisted_4 = {
  style: {
    "width": "100%",
    "display": "flex",
    "justify-content": "space-between",
    "align-items": "center"
  }
};
var _hoisted_5 = {
  style: {
    "font-weight": "700",
    "font-size": "16px"
  }
};
var _hoisted_6 = {
  style: {
    "padding-right": "30px"
  }
};
var _hoisted_7 = {
  style: {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "margin-bottom": "20px"
  }
};
var _hoisted_8 = {
  style: {
    "width": "100%",
    "text-align": "center"
  }
};

/* harmony default export */ const listvue_type_script_setup_true_lang_js = ({
  __name: 'list',
  setup: function setup(__props) {
    var _getCurrentInstance;
    var context = (_getCurrentInstance = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.appContext.config.globalProperties;

    //权限验证
    var btnAuth = function btnAuth(e, a) {
      return context === null || context === void 0 ? void 0 : context.$toolUtil.isAuth(e, a);
    };
    var menus = (0,reactivity_esm_bundler/* ref */.KR)([]);
    var role_index = (0,reactivity_esm_bundler/* ref */.KR)(0); //当前选中的角色index
    var first_index = (0,reactivity_esm_bundler/* ref */.KR)(0); //当前选中的一级菜单index
    var collapse_default = (0,reactivity_esm_bundler/* ref */.KR)([]); //展开的collapse
    var getMenus = function getMenus() {
      context.$http.get('menu/lists').then(function (res) {
        menus.value = JSON.parse(res.data.data[0].menujson);
        collapse_default.value = menus.value[role_index.value].backMenu.map(function (item) {
          return item.menu;
        });
      });
    };
    getMenus();
    var tabClick = function tabClick() {
      collapse_default.value = menus.value[role_index.value].backMenu.map(function (item) {
        return item.menu;
      });
    };
    var save = function save() {
      context.$http.post('menu/update', {
        id: 1,
        menujson: JSON.stringify(menus.value)
      }).then(function (res) {
        if (res.data.code == 0) {
          ElMessage.success('保存成功，重新登录后生效');
        }
      });
    };
    var dialogVisible = (0,reactivity_esm_bundler/* ref */.KR)(false);
    var n_first_index = (0,reactivity_esm_bundler/* ref */.KR)(null); //选中的父级菜单
    var o_index = (0,reactivity_esm_bundler/* ref */.KR)(0); //需要移动的二级菜单的index
    var toMove = function toMove(t_index, index) {
      first_index.value = t_index;
      n_first_index.value = t_index;
      o_index.value = index;
      dialogVisible.value = true;
    };
    var moveTo = function moveTo() {
      var _menus$value$role_ind;
      var items = menus.value[role_index.value].backMenu[first_index.value].child.splice(o_index.value, 1);
      (_menus$value$role_ind = menus.value[role_index.value].backMenu[n_first_index.value].child).push.apply(_menus$value$role_ind, (0,toConsumableArray/* default */.A)(items));
      dialogVisible.value = false;
    };
    var changeName = function changeName(row, arr) {
      ElMessageBox.prompt('请输入新菜单名', '修改菜单名', {
        inputValidator: function inputValidator(value) {
          if (!value || !value.trim()) return '请输入菜单名';
          if (arr.find(function (item) {
            return item.menu == value.trim();
          })) {
            return '该菜单名已存在';
          }
        }
      }).then(function (_ref) {
        var value = _ref.value;
        row.menu = value.trim();
      })["catch"](function () {});
    };
    var moveUp = function moveUp(arr, index) {
      var _arr;
      if (index == 0) return;
      (_arr = arr).splice.apply(_arr, [index - 1, 0].concat((0,toConsumableArray/* default */.A)(arr.splice(index, 1))));
      arr = JSON.parse(JSON.stringify(arr));
    };
    return function (_ctx, _cache) {
      var _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      var _component_el_table_column = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-table-column");
      var _component_el_checkbox = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-checkbox");
      var _component_el_checkbox_group = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-checkbox-group");
      var _component_el_table = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-table");
      var _component_el_collapse_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-collapse-item");
      var _component_el_collapse = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-collapse");
      var _component_el_tab_pane = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-tab-pane");
      var _component_el_tabs = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-tabs");
      var _component_el_option = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-option");
      var _component_el_select = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-select");
      var _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dialog");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [btnAuth('menu', '菜单管理') || btnAuth('menu', '修改') ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
        type: "primary",
        style: {
          "width": "100px"
        },
        onClick: save
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
          return _cache[4] || (_cache[4] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("保存修改")]);
        }),
        _: 1,
        __: [4]
      })]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_tabs, {
        type: "border-card",
        modelValue: role_index.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
          return role_index.value = $event;
        }),
        onTabChange: tabClick
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
          return [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(menus.value, function (role, r_index) {
            return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_tab_pane, {
              key: role.roleName,
              label: role.roleName,
              name: r_index
            }, {
              "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                return [r_index == role_index.value ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_collapse, {
                  modelValue: collapse_default.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
                    return collapse_default.value = $event;
                  })
                }, {
                  "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                    return [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(role.backMenu, function (table, t_index) {
                      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_collapse_item, {
                        name: table.menu
                      }, {
                        title: (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                          return [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_5, (0,shared_esm_bundler/* toDisplayString */.v_)(table.menu), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_6, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
                            size: "small",
                            onClick: (0,runtime_dom_esm_bundler/* withModifiers */.D$)(function ($event) {
                              return moveUp(role.backMenu, t_index);
                            }, ["stop"])
                          }, {
                            "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                              return _cache[5] || (_cache[5] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 上移 ")]);
                            }),
                            _: 2,
                            __: [5]
                          }, 1032, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
                            size: "small",
                            type: "primary",
                            onClick: (0,runtime_dom_esm_bundler/* withModifiers */.D$)(function ($event) {
                              return changeName(table, role.backMenu);
                            }, ["stop"])
                          }, {
                            "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                              return _cache[6] || (_cache[6] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 修改菜单名 ")]);
                            }),
                            _: 2,
                            __: [6]
                          }, 1032, ["onClick"])])])];
                        }),
                        "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                          return [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table, {
                            data: table.child,
                            "show-header": false,
                            style: {
                              "width": "100%",
                              "background": "#edeef0",
                              "border": "1px solid #ddd"
                            }
                          }, {
                            "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                              return [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
                                prop: "menu",
                                label: "菜单名",
                                width: "180"
                              }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
                                label: "权限"
                              }, {
                                "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function (scope) {
                                  return [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_checkbox_group, {
                                    modelValue: scope.row.buttons,
                                    "onUpdate:modelValue": function onUpdateModelValue($event) {
                                      return scope.row.buttons = $event;
                                    }
                                  }, {
                                    "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                                      return [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(scope.row.allButtons, function (item) {
                                        return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_checkbox, {
                                          label: item,
                                          value: item
                                        }, null, 8, ["label", "value"]);
                                      }), 256))];
                                    }),
                                    _: 2
                                  }, 1032, ["modelValue", "onUpdate:modelValue"])];
                                }),
                                _: 1
                              }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_table_column, {
                                label: "操作"
                              }, {
                                "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function (scope) {
                                  return [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
                                    size: "small",
                                    onClick: function onClick($event) {
                                      return moveUp(table.child, scope.$index);
                                    }
                                  }, {
                                    "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                                      return _cache[7] || (_cache[7] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 上移 ")]);
                                    }),
                                    _: 2,
                                    __: [7]
                                  }, 1032, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
                                    size: "small",
                                    type: "primary",
                                    onClick: function onClick($event) {
                                      return changeName(scope.row, table.child);
                                    }
                                  }, {
                                    "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                                      return _cache[8] || (_cache[8] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 修改菜单名 ")]);
                                    }),
                                    _: 2,
                                    __: [8]
                                  }, 1032, ["onClick"]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
                                    size: "small",
                                    type: "warning",
                                    onClick: function onClick($event) {
                                      return toMove(t_index, scope.$index);
                                    }
                                  }, {
                                    "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
                                      return _cache[9] || (_cache[9] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 修改父级菜单 ")]);
                                    }),
                                    _: 2,
                                    __: [9]
                                  }, 1032, ["onClick"])];
                                }),
                                _: 2
                              }, 1024)];
                            }),
                            _: 2
                          }, 1032, ["data"])];
                        }),
                        _: 2
                      }, 1032, ["name"]);
                    }), 256))];
                  }),
                  _: 2
                }, 1032, ["modelValue"])])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)];
              }),
              _: 2
            }, 1032, ["label", "name"]);
          }), 128))];
        }),
        _: 1
      }, 8, ["modelValue"])])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dialog, {
        title: "修改父级菜单",
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
          return dialogVisible.value = $event;
        }),
        width: "30%"
      }, {
        "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
          return [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_7, [_cache[10] || (_cache[10] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", null, "父级菜单：", -1)), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_select, {
            modelValue: n_first_index.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
              return n_first_index.value = $event;
            }),
            placeholder: "请选择父级菜单",
            style: {
              "width": "200px"
            }
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
              return [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(menus.value[role_index.value].backMenu, function (item, index) {
                return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_option, {
                  key: item.menu,
                  label: item.menu,
                  value: index
                }, null, 8, ["label", "value"]);
              }), 128))];
            }),
            _: 1
          }, 8, ["modelValue"])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_8, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
            type: "primary",
            onClick: moveTo
          }, {
            "default": (0,runtime_core_esm_bundler/* withCtx */.k6)(function () {
              return _cache[11] || (_cache[11] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("确 定")]);
            }),
            _: 1,
            __: [11]
          })])];
        }),
        _: 1
      }, 8, ["modelValue"])]);
    };
  }
});
;// ./src/views/menu_manage/list.vue?vue&type=script&setup=true&lang=js
 
;// ./src/views/menu_manage/list.vue



const __exports__ = listvue_type_script_setup_true_lang_js;

/* harmony default export */ const list = (__exports__);

/***/ }),

/***/ 9233:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(2074);
var whitespaces = __webpack_require__(5073);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ 9581:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(1605);
var $map = (__webpack_require__(1344).map);
var arrayMethodHasSpeciesSupport = __webpack_require__(5634);
var arrayMethodUsesToLength = __webpack_require__(3638);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ })

}]);
//# sourceMappingURL=768.1f65571a.js.map