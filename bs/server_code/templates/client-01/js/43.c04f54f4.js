"use strict";
(self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || []).push([[43],{

/***/ 5043:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ login; }
});

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(2363);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(4240);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(7910);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(2788);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vuex/dist/vuex.esm-bundler.js + 5 modules
var vuex_esm_bundler = __webpack_require__(7284);
// EXTERNAL MODULE: ./src/utils/menu.js
var menu = __webpack_require__(8740);
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/thread-loader/dist/cjs.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/login.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  class: "login_view"
};
const _hoisted_2 = {
  class: "form",
  style: {
    "z-index": "1"
  }
};
const _hoisted_3 = {
  class: "projectName"
};
const _hoisted_4 = {
  key: 0,
  class: "form-item userName"
};
const _hoisted_5 = {
  class: "label"
};
const _hoisted_6 = {
  key: 1,
  class: "form-item password"
};
const _hoisted_7 = {
  class: "label"
};
const _hoisted_8 = {
  key: 2,
  class: "form-item roles"
};
const _hoisted_9 = {
  class: "forget-row"
};
const _hoisted_10 = {
  class: "register-row"
};



/* harmony default export */ var loginvue_type_script_setup_true_lang_js = ({
  __name: 'login',
  setup(__props) {
    const store = (0,vuex_esm_bundler/* useStore */.oR)();
    const projectName = (0,reactivity_esm_bundler/* ref */.iH)(`基于Python的鹅肉价格数据可视化分析`);
    const userList = (0,reactivity_esm_bundler/* ref */.iH)([]);
    const menus = (0,reactivity_esm_bundler/* ref */.iH)([]);
    const loginForm = (0,reactivity_esm_bundler/* ref */.iH)({
      role: '',
      username: '',
      password: ''
    });
    const tableName = (0,reactivity_esm_bundler/* ref */.iH)('');
    const loginType = (0,reactivity_esm_bundler/* ref */.iH)(1);
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.FN)()?.appContext.config.globalProperties;
    //注册
    const handleRegister = tableName => {
      context?.$router.push(`/${tableName}Register`);
    };
    const handleLogin = () => {
      if (!loginForm.value.username) {
        context?.$toolUtil.message('请输入用户名', 'error');
        return;
      }
      if (!loginForm.value.password) {
        context?.$toolUtil.message('请输入密码', 'error');
        return;
      }
      if (userList.value.length > 1) {
        if (!loginForm.value.role) {
          context?.$toolUtil.message('请选择角色', 'error');
          verifySlider.reset();
          return;
        }
        for (let i = 0; i < menus.value.length; i++) {
          if (menus.value[i].roleName == loginForm.value.role) {
            tableName.value = menus.value[i].pathName || menus.value[i].tableName;
          }
        }
      } else {
        tableName.value = userList.value[0].pathName || userList.value[0].tableName;
        loginForm.value.role = userList.value[0].roleName;
      }
      login();
    };
    const login = () => {
      context?.$http({
        url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
        method: 'post'
      }).then(res => {
        context?.$toolUtil.storageSet("frontToken", res.data.token);
        context?.$toolUtil.storageSet("frontRole", loginForm.value.role);
        context?.$toolUtil.storageSet("frontSessionTable", tableName.value);
        store.dispatch('user/getSession');
        let path = context?.$toolUtil.storageGet('toPath');
        if (path && path != '/login') {
          context?.$router.replace(path);
          context?.$toolUtil.storageRemove('toPath');
          return;
        }
        context?.$router.replace(`/index/${tableName.value}Center`);
      }, err => {});
    };
    //获取菜单
    const getMenu = async () => {
      let arr = menu/* default.list */.Z.list();
      if (!arr) {
        let res = await context?.$http.get("menu/list");
        context?.$toolUtil.storageSet("menus", res.data.data.list[0].menujson);
        arr = JSON.parse(res.data.data.list[0].menujson);
      }
      menus.value = arr;
      for (let i = 0; i < menus.value.length; i++) {
        if (menus.value[i].hasFrontLogin == '是') {
          userList.value.push(menus.value[i]);
        }
      }
    };
    //初始化
    const init = async () => {
      await getMenu();
      loginForm.value.role = userList.value[0].roleName;
    };
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      init();
    });
    return (_ctx, _cache) => {
      const _component_User = (0,runtime_core_esm_bundler/* resolveComponent */.up)("User");
      const _component_el_icon = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-icon");
      const _component_el_input = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-input");
      const _component_Lock = (0,runtime_core_esm_bundler/* resolveComponent */.up)("Lock");
      const _component_el_radio = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-radio");
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-button");
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_2, [_cache[6] || (_cache[6] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "logo"
      }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_3, (0,shared_esm_bundler/* toDisplayString */.zw)(projectName.value), 1), _cache[7] || (_cache[7] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "tip"
      }, "请登录以继续", -1)), loginType.value == 1 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_4, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_icon, null, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_User)]),
        _: 1
      })]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input, {
        class: "item-input",
        modelValue: loginForm.value.username,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => loginForm.value.username = $event),
        placeholder: "请输入账号",
        name: "username"
      }, null, 8, ["modelValue"])])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), loginType.value == 1 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_7, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_icon, null, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_Lock)]),
        _: 1
      })]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input, {
        class: "item-input",
        modelValue: loginForm.value.password,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => loginForm.value.password = $event),
        type: "password",
        "show-password": "",
        placeholder: "请输入密码",
        onKeydown: (0,runtime_dom_esm_bundler/* withKeys */.D2)(handleLogin, ["enter", "native"])
      }, null, 8, ["modelValue"])])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), userList.value.length > 1 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_8, [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)(userList.value, (item, index) => {
        return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_radio, {
          class: "role",
          key: index,
          modelValue: loginForm.value.role,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => loginForm.value.role = $event),
          label: item.roleName
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(item.roleName), 1)]),
          _: 2
        }, 1032, ["modelValue", "label"]);
      }), 128))])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), loginType.value == 1 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_button, {
        key: 3,
        class: "login",
        onClick: handleLogin
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[4] || (_cache[4] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("登录", -1)])),
        _: 1,
        __: [4]
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_9, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_10, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        class: "register",
        onClick: _cache[3] || (_cache[3] = $event => handleRegister('yonghu'))
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[5] || (_cache[5] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("注册用户", -1)])),
        _: 1,
        __: [5]
      })])]), _cache[8] || (_cache[8] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "form-circle1"
      }, null, -1)), _cache[9] || (_cache[9] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "form-circle2"
      }, null, -1))]), _cache[10] || (_cache[10] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "circle1"
      }, null, -1)), _cache[11] || (_cache[11] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "circle2"
      }, null, -1))]);
    };
  }
});
;// CONCATENATED MODULE: ./src/views/pages/login.vue?vue&type=script&setup=true&lang=js
 
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/login.vue?vue&type=style&index=0&id=08eb1600&lang=scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/views/pages/login.vue?vue&type=style&index=0&id=08eb1600&lang=scss

;// CONCATENATED MODULE: ./src/views/pages/login.vue



;

const __exports__ = loginvue_type_script_setup_true_lang_js;

/* harmony default export */ var login = (__exports__);

/***/ })

}]);
//# sourceMappingURL=43.c04f54f4.js.map