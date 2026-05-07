"use strict";
(self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || []).push([[189],{

/***/ 4189:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ formAdd; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(3725);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.map.js
var esnext_iterator_map = __webpack_require__(1339);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(33);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm-bundler.js
var vue_router_esm_bundler = __webpack_require__(6166);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm-bundler.js + 5 modules
var vuex_esm_bundler = __webpack_require__(6278);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/syslog/formAdd.vue?vue&type=script&setup=true&lang=js



const _hoisted_1 = {
  class: "edit_view"
};
const _hoisted_2 = {
  class: "breadcrumb-wrapper",
  style: {
    "width": "100%"
  }
};
const _hoisted_3 = {
  class: "bread_view"
};
const _hoisted_4 = {
  class: "formModel_btn_box"
};



const tableName = 'syslog';
const formName = '操作日志';
//基础信息

/* harmony default export */ var formAddvue_type_script_setup_true_lang_js = ({
  __name: 'formAdd',
  setup(__props) {
    const store = (0,vuex_esm_bundler/* useStore */.Pj)();
    const user = (0,runtime_core_esm_bundler/* computed */.EW)(() => store.getters['user/session']);
    const moment = window.moment;
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const route = (0,vue_router_esm_bundler/* useRoute */.lq)();
    const router = (0,vue_router_esm_bundler/* useRouter */.rd)();
    //基础信息
    const breadList = (0,reactivity_esm_bundler/* ref */.KR)([{
      name: formName
    }]);
    //获取唯一标识
    const getUUID = () => {
      return new Date().getTime();
    };
    //form表单
    const form = (0,reactivity_esm_bundler/* ref */.KR)({
      username: '',
      operation: '',
      method: '',
      params: '',
      time: '',
      ip: ''
    });
    const formRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const id = (0,reactivity_esm_bundler/* ref */.KR)(0);
    const type = (0,reactivity_esm_bundler/* ref */.KR)('');
    const disabledForm = (0,reactivity_esm_bundler/* ref */.KR)({
      username: false,
      operation: false,
      method: false,
      params: false,
      time: false,
      ip: false
    });
    const isAdd = (0,reactivity_esm_bundler/* ref */.KR)(false);
    //表单验证
    const rules = (0,reactivity_esm_bundler/* ref */.KR)({
      username: [{
        required: true,
        message: '请输入',
        trigger: 'blur'
      }],
      operation: [{
        required: true,
        message: '请输入',
        trigger: 'blur'
      }],
      method: [],
      params: [],
      time: [],
      ip: []
    });
    //获取info
    const getInfo = () => {
      context?.$http({
        url: `${tableName}/info/${id.value}`,
        method: 'get'
      }).then(res => {
        let reg = new RegExp('../../../file', 'g');
        form.value = res.data.data;
      });
    };
    const crossRow = (0,reactivity_esm_bundler/* ref */.KR)('');
    const crossTable = (0,reactivity_esm_bundler/* ref */.KR)('');
    const crossTips = (0,reactivity_esm_bundler/* ref */.KR)('');
    const crossColumnName = (0,reactivity_esm_bundler/* ref */.KR)('');
    const crossColumnValue = (0,reactivity_esm_bundler/* ref */.KR)('');
    //初始化
    const init = (formId = null, formType = 'add', formNames = '', row = null, table = null, statusColumnName = null, tips = null, statusColumnValue = null) => {
      if (formId) {
        id.value = formId;
        type.value = formType;
      }
      if (formType == 'add') {
        isAdd.value = true;
      } else if (formType == 'info') {
        isAdd.value = false;
        getInfo();
      } else if (formType == 'edit') {
        isAdd.value = true;
        getInfo();
      } else if (formType == 'cross') {
        isAdd.value = true;
        // getInfo()
        for (let x in row) {
          if (x == 'username') {
            form.value.username = row[x];
            disabledForm.value.username = true;
            continue;
          }
          if (x == 'operation') {
            form.value.operation = row[x];
            disabledForm.value.operation = true;
            continue;
          }
          if (x == 'method') {
            form.value.method = row[x];
            disabledForm.value.method = true;
            continue;
          }
          if (x == 'params') {
            form.value.params = row[x];
            disabledForm.value.params = true;
            continue;
          }
          if (x == 'time') {
            form.value.time = row[x];
            disabledForm.value.time = true;
            continue;
          }
          if (x == 'ip') {
            form.value.ip = row[x];
            disabledForm.value.ip = true;
            continue;
          }
        }
        if (row) {
          crossRow.value = row;
        }
        if (table) {
          crossTable.value = table;
        }
        if (tips) {
          crossTips.value = tips;
        }
        if (statusColumnName) {
          crossColumnName.value = statusColumnName;
        }
        if (statusColumnValue) {
          crossColumnValue.value = statusColumnValue;
        }
      }
    };
    //初始化
    //取消
    const backClick = () => {
      history.back();
    };
    //提交
    const save = () => {
      var table = crossTable.value;
      var objcross = JSON.parse(JSON.stringify(crossRow.value));
      let crossUserId = '';
      let crossRefId = '';
      let crossOptNum = '';
      formRef.value.validate(async valid => {
        if (valid) {
          if (type.value == 'cross') {
            if (crossColumnName.value != '') {
              if (!crossColumnName.value.startsWith('[')) {
                for (let o in objcross) {
                  if (o == crossColumnName.value) {
                    objcross[o] = crossColumnValue.value;
                  }
                }
                //修改跨表数据
                await changeCrossData(objcross);
              } else {
                crossUserId = context?.$toolUtil.storageGet('userid');
                crossRefId = objcross['id'];
                crossOptNum = crossColumnName.value.replace(/\[/, "").replace(/\]/, "");
              }
            }
          }
          if (crossUserId && crossRefId) {
            //限制用户操作次数
            form.value.crossuserid = crossUserId;
            form.value.crossrefid = crossRefId;
            let params = {
              page: 1,
              limit: 1000,
              crossuserid: form.value.crossuserid,
              crossrefid: form.value.crossrefid
            };
            context?.$http({
              url: `${tableName}/page`,
              method: 'get',
              params: params
            }).then(async res => {
              if (res.data.data.total >= crossOptNum) {
                context?.$toolUtil.message(`${crossTips.value}`, 'error');
                return false;
              } else {
                context?.$http({
                  url: `${tableName}/${!form.value.id ? "save" : "update"}`,
                  method: 'post',
                  data: form.value
                }).then(async res => {
                  context?.$toolUtil.message(`操作成功`, 'success');
                  history.back();
                });
              }
            });
          } else {
            context?.$http({
              url: `${tableName}/${!form.value.id ? "save" : "update"}`,
              method: 'post',
              data: form.value
            }).then(async res => {
              context?.$toolUtil.message(`操作成功`, 'success');
              history.back();
            });
          }
        }
      });
    };
    //修改跨表数据
    const changeCrossData = (row, key) => {
      if (type.value == 'cross') {
        let data = row;
        if (key) {
          //如果有指定key，则只更新key属性
          data = {
            id: row.id
          };
          data[key] = row[key];
        }
        context?.$http({
          url: `${crossTable.value}/update`,
          method: 'post',
          data: data
        }).then(res => {});
      }
    };
    (0,runtime_core_esm_bundler/* onMounted */.sV)(() => {
      type.value = route.query.type ? route.query.type : 'add';
      let row = null;
      let table = null;
      let statusColumnName = null;
      let tips = null;
      let statusColumnValue = null;
      if (type.value == 'cross') {
        row = context?.$toolUtil.storageGet('crossObj') ? JSON.parse(context?.$toolUtil.storageGet('crossObj')) : {};
        table = context?.$toolUtil.storageGet('crossTable');
        statusColumnName = context?.$toolUtil.storageGet('crossStatusColumnName');
        tips = context?.$toolUtil.storageGet('crossTips');
        statusColumnValue = context?.$toolUtil.storageGet('crossStatusColumnValue');
      }
      init(route.query.id ? route.query.id : null, type.value, '', row, table, statusColumnName, tips, statusColumnValue);
    });
    (0,runtime_core_esm_bundler/* onUnmounted */.hi)(() => {
      Object.keys(localStorage).map(item => {
        if (item.startsWith('cross')) {
          localStorage.removeItem(item);
        }
      });
    });
    return (_ctx, _cache) => {
      const _component_el_breadcrumb_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-breadcrumb-item");
      const _component_el_breadcrumb = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-breadcrumb");
      const _component_el_input = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-input");
      const _component_el_form_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-form-item");
      const _component_el_col = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-col");
      const _component_el_row = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-row");
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      const _component_el_form = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-form");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_breadcrumb, {
        separator: "Ξ",
        class: "breadcrumb"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_breadcrumb_item, {
          class: "first_breadcrumb",
          to: {
            path: '/'
          }
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[6] || (_cache[6] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("首页")])),
          _: 1,
          __: [6]
        }), ((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(breadList.value, (item, index) => {
          return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_breadcrumb_item, {
            class: "second_breadcrumb",
            key: index
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(item.name), 1)]),
            _: 2
          }, 1024);
        }), 128))]),
        _: 1
      })])]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form, {
        ref_key: "formRef",
        ref: formRef,
        model: form.value,
        class: "add_form",
        "label-width": "120px",
        rules: rules.value
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_row, null, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 8
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              label: "用户名",
              prop: "username"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.username,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => form.value.username = $event),
                placeholder: "用户名",
                type: "text",
                readonly: !isAdd.value || disabledForm.value.username ? true : false
              }, null, 8, ["modelValue", "readonly"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 8
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              label: "用户操作",
              prop: "operation"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.operation,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => form.value.operation = $event),
                placeholder: "用户操作",
                type: "text",
                readonly: !isAdd.value || disabledForm.value.operation ? true : false
              }, null, 8, ["modelValue", "readonly"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 8
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              label: "请求方法",
              prop: "method"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.method,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => form.value.method = $event),
                placeholder: "请求方法",
                type: "text",
                readonly: !isAdd.value || disabledForm.value.method ? true : false
              }, null, 8, ["modelValue", "readonly"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 8
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              label: "请求时长(毫秒)",
              prop: "time"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.time,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => form.value.time = $event),
                placeholder: "请求时长(毫秒)",
                type: "text",
                readonly: !isAdd.value || disabledForm.value.time ? true : false
              }, null, 8, ["modelValue", "readonly"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 8
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              label: "ip地址",
              prop: "ip"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                class: "list_inp",
                modelValue: form.value.ip,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => form.value.ip = $event),
                placeholder: "ip地址",
                type: "text",
                readonly: !isAdd.value || disabledForm.value.ip ? true : false
              }, null, 8, ["modelValue", "readonly"])]),
              _: 1
            })]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_col, {
            span: 24
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_form_item, {
              label: "请求参数",
              prop: "params"
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_input, {
                modelValue: form.value.params,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => form.value.params = $event),
                placeholder: "请求参数",
                type: "textarea",
                readonly: !isAdd.value || disabledForm.value.params ? true : false
              }, null, 8, ["modelValue", "readonly"])]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        }), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_4, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          class: "formModel_cancel",
          onClick: backClick
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[7] || (_cache[7] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("取消")])),
          _: 1,
          __: [7]
        }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          class: "formModel_confirm",
          onClick: save,
          type: "success"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[8] || (_cache[8] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 保存 ")])),
          _: 1,
          __: [8]
        })])]),
        _: 1
      }, 8, ["model", "rules"])]);
    };
  }
});
;// ./src/views/pages/syslog/formAdd.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/syslog/formAdd.vue?vue&type=style&index=0&id=46daf670&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/views/pages/syslog/formAdd.vue?vue&type=style&index=0&id=46daf670&lang=scss

;// ./src/views/pages/syslog/formAdd.vue



;

const __exports__ = formAddvue_type_script_setup_true_lang_js;

/* harmony default export */ var formAdd = (__exports__);

/***/ })

}]);
//# sourceMappingURL=189.a8d66b21.js.map