"use strict";
(self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || []).push([[490],{

/***/ 3490:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ formModel; }
});

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(2363);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(4240);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/axios/lib/axios.js + 40 modules
var axios = __webpack_require__(2355);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(2788);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-router/dist/vue-router.esm-bundler.js
var vue_router_esm_bundler = __webpack_require__(1017);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vuex/dist/vuex.esm-bundler.js + 5 modules
var vuex_esm_bundler = __webpack_require__(7284);
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/thread-loader/dist/cjs.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/forumReport/formModel.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  class: "detail-page"
};
const _hoisted_2 = {
  class: "breadcrumb-wrapper",
  style: {
    "width": "100%"
  }
};
const _hoisted_3 = {
  class: "back_view"
};
const _hoisted_4 = {
  class: "bread_view"
};
const _hoisted_5 = {
  class: "detail_view"
};
const _hoisted_6 = {
  class: "info_view"
};
const _hoisted_7 = {
  class: "title_view"
};
const _hoisted_8 = {
  class: "detail_title"
};
const _hoisted_9 = {
  class: "info_item"
};
const _hoisted_10 = {
  class: "info_text"
};
const _hoisted_11 = {
  class: "info_item"
};
const _hoisted_12 = {
  class: "info_text"
};
const _hoisted_13 = {
  class: "info_item"
};
const _hoisted_14 = {
  class: "info_text"
};
const _hoisted_15 = {
  class: "info_item"
};
const _hoisted_16 = {
  class: "info_text"
};
const _hoisted_17 = {
  class: "info_item"
};
const _hoisted_18 = {
  class: "info_text"
};
const _hoisted_19 = {
  class: "info_item"
};
const _hoisted_20 = {
  class: "info_text"
};
const _hoisted_21 = {
  class: "btn_view"
};




const tableName = 'forumreport';
const formName = '论坛举报';
//基础信息

/* harmony default export */ var formModelvue_type_script_setup_true_lang_js = ({
  __name: 'formModel',
  setup(__props) {
    const moment = window.moment;
    const store = (0,vuex_esm_bundler/* useStore */.oR)();
    const user = (0,runtime_core_esm_bundler/* computed */.Fl)(() => store.getters['user/session']);
    const userAvatar = (0,runtime_core_esm_bundler/* computed */.Fl)(() => store.getters['user/avatar']);
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.FN)()?.appContext.config.globalProperties;
    const route = (0,vue_router_esm_bundler/* useRoute */.yj)();
    const router = (0,vue_router_esm_bundler/* useRouter */.tv)();
    const baseUrl = (0,reactivity_esm_bundler/* ref */.iH)(context.$config.url);
    //基础信息
    const breadList = (0,reactivity_esm_bundler/* ref */.iH)([{
      name: formName
    }]);
    //权限验证
    const btnAuth = (e, a) => {
      if (centerType.value) {
        return context?.$toolUtil.isBackAuth(e, a);
      } else {
        return context?.$toolUtil.isAuth(e, a);
      }
    };
    //查看权限验证
    const btnFrontAuth = (e, a) => {
      if (centerType.value) {
        return context?.$toolUtil.isBackAuth(e, a);
      } else {
        return context?.$toolUtil.isFrontAuth(e, a);
      }
    };
    // 返回
    const backClick = () => {
      history.back();
    };
    // 轮播图
    const bannerList = (0,reactivity_esm_bundler/* ref */.iH)([]);
    // 详情
    const title = (0,reactivity_esm_bundler/* ref */.iH)('');
    const detail = (0,reactivity_esm_bundler/* ref */.iH)({});
    const activeName = (0,reactivity_esm_bundler/* ref */.iH)('false');
    const getDetail = () => {
      context?.$http({
        url: `${tableName}/detail/${route.query.id}`,
        method: 'get'
      }).then(res => {
        title.value = res.data.data.title;
        detail.value = res.data.data;
      });
    };
    // 下载文件
    const downClick = file => {
      if (!file) {
        context?.$toolUtil.message('文件不存在', 'error');
      }
      let arr = file.replace(new RegExp('file/', "g"), "");
      axios/* default.get */.Z.get((location.href.split(context?.$config.name).length > 1 ? location.href.split(context?.$config.name)[0] : '') + context?.$config.name + '/file/download?fileName=' + arr, {
        headers: {
          token: context?.$toolUtil.storageGet('frontToken')
        },
        responseType: "blob"
      }).then(({
        data
      }) => {
        const binaryData = [];
        binaryData.push(data);
        const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
          type: 'application/pdf;chartset=UTF-8'
        }));
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = arr;
        // a.click()
        // 下面这个写法兼容火狐
        a.dispatchEvent(new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        }));
        window.URL.revokeObjectURL(data);
      });
    };
    const approvalSave = async form => {
      context.$http.post(`${tableName}/update`, form).then(res => {
        context.$message.success('审核成功');
        approvalRef.value.approvalVisible = false;
        init();
      });
    };
    // 判断是否从个人中心跳转
    const centerType = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const init = () => {
      if (route.query.centerType) {
        centerType.value = true;
      }
      getDetail();
    };
    const sensitiveWordsArr = (0,reactivity_esm_bundler/* ref */.iH)([]);
    const getSensitiveWords = () => {
      context.$http.get('sensitiveword/detail/1').then(res => {
        if (res.data.data.content) {
          sensitiveWordsArr.value = res.data.data.content.split(',');
        }
      });
    };
    getSensitiveWords();
    //修改
    const editClick = () => {
      router.push(`/index/${tableName}Add?id=${detail.value.id}&&type=edit`);
    };
    //删除
    const delClick = () => {
      ElMessageBox.confirm(`是否删除此${formName}？`, '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        context?.$http({
          url: `${tableName}/delete`,
          method: 'post',
          data: [detail.value.id]
        }).then(res => {
          context?.$toolUtil.message('删除成功', 'success', () => {
            history.back();
          });
        });
      }).catch(_ => {});
    };
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      init();
    });
    return (_ctx, _cache) => {
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-button");
      const _component_el_breadcrumb_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-breadcrumb-item");
      const _component_el_breadcrumb = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-breadcrumb");
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        class: "back_btn",
        onClick: backClick
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[0] || (_cache[0] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("返回", -1)])),
        _: 1,
        __: [0]
      })]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_4, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_breadcrumb, {
        separator: "Ξ",
        class: "breadcrumb"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_breadcrumb_item, {
          class: "first_breadcrumb",
          to: {
            path: '/'
          }
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[1] || (_cache[1] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("首页", -1)])),
          _: 1,
          __: [1]
        }), ((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)(breadList.value, (item, index) => {
          return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_breadcrumb_item, {
            class: "second_breadcrumb",
            key: index
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(item.name), 1)]),
            _: 2
          }, 1024);
        }), 128))]),
        _: 1
      })])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_7, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_8, [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.title), 1)])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_9, [_cache[2] || (_cache[2] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "info_label"
      }, "举报人账号", -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_10, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.reportUsername), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_11, [_cache[3] || (_cache[3] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "info_label"
      }, "被举报人账号", -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_12, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.reportedUsername), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_13, [_cache[4] || (_cache[4] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "info_label"
      }, "举报原因", -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_14, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.reason), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_15, [_cache[5] || (_cache[5] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "info_label"
      }, "处理建议", -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_16, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.suggestion), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_17, [_cache[6] || (_cache[6] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "info_label"
      }, "处理状态", -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_18, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.status), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_19, [_cache[7] || (_cache[7] = (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "info_label"
      }, "举报类型", -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_20, (0,shared_esm_bundler/* toDisplayString */.zw)(detail.value.reportType), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_21, [centerType.value && btnAuth('forum_report', '修改') ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_button, {
        key: 0,
        class: "edit_btn",
        type: "primary",
        onClick: editClick
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[8] || (_cache[8] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("修改", -1)])),
        _: 1,
        __: [8]
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), centerType.value && btnAuth('forum_report', '删除') ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_button, {
        key: 1,
        class: "del_btn",
        type: "danger",
        onClick: delClick
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[9] || (_cache[9] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("删除", -1)])),
        _: 1,
        __: [9]
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)])])])]);
    };
  }
});
;// CONCATENATED MODULE: ./src/views/pages/forumReport/formModel.vue?vue&type=script&setup=true&lang=js
 
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/forumReport/formModel.vue?vue&type=style&index=0&id=19daacda&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/views/pages/forumReport/formModel.vue?vue&type=style&index=0&id=19daacda&lang=scss&scoped=true

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(5536);
;// CONCATENATED MODULE: ./src/views/pages/forumReport/formModel.vue



;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(formModelvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-19daacda"]])

/* harmony default export */ var formModel = (__exports__);

/***/ })

}]);
//# sourceMappingURL=490.2dc42731.js.map