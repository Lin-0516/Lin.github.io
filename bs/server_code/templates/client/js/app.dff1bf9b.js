/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 476:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: function() { return /* binding */ formModel; }
});

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(3725);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.filter.js
var esnext_iterator_filter = __webpack_require__(5019);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(33);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/news/formModel.vue?vue&type=script&setup=true&lang=js



const _hoisted_1 = {
  class: "news_detail"
};
const _hoisted_2 = {
  class: "news_detail_title",
  style: {
    "text-align": "center"
  }
};
const _hoisted_3 = {
  class: "action-row",
  style: {
    "display": "flex",
    "justify-content": "center",
    "margin-top": "20px"
  }
};
const _hoisted_4 = {
  class: "thumbs_view",
  style: {
    "display": "flex",
    "column-gap": "20px",
    "margin-left": "auto"
  }
};
const _hoisted_5 = {
  class: "textActive"
};
const _hoisted_6 = {
  class: "textActive"
};
const _hoisted_7 = {
  class: "news_detail_time"
};
const _hoisted_8 = {
  key: 0,
  class: "news_detail_img"
};
const _hoisted_9 = ["src"];
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = {
  class: "dialog-footer"
};

/* harmony default export */ var formModelvue_type_script_setup_true_lang_js = ({
  __name: 'formModel',
  setup(__props, {
    expose: __expose
  }) {
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const id = (0,reactivity_esm_bundler/* ref */.KR)(0);
    const detail = (0,reactivity_esm_bundler/* ref */.KR)({});
    const formRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const formVisible = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const formTitle = (0,reactivity_esm_bundler/* ref */.KR)('');
    //初始化
    const init = (refid = null) => {
      detail.value = {};
      if (refid) {
        id.value = refid;
        getInfo();
      }
      // 收藏
      getCollect();
      // 赞踩状态
      getThumbsupOrCrazily();
      formTitle.value = '公告资讯';
      formVisible.value = true;
    };
    //声明父级调用
    __expose({
      init
    });
    //回调父级方法
    const getInfo = () => {
      context?.$http({
        url: `news/detail/${id.value}`,
        method: 'get'
      }).then(res => {
        detail.value = res.data.data;
        formVisible.value = true;
      });
    };
    // 赞or踩
    const thumbsupOrCrazilyInfo = (0,reactivity_esm_bundler/* ref */.KR)({});
    // 获取赞踩状态
    const getThumbsupOrCrazily = () => {
      if (context?.$toolUtil.storageGet('frontToken')) {
        context?.$http({
          url: 'storeup/page',
          method: 'get',
          params: {
            page: 1,
            limit: 1,
            refid: id.value,
            tablename: 'news',
            userid: context?.$toolUtil.storageGet('userid')
          }
        }).then(res => {
          let list = res.data.data.list.filter(item => item.type == 21 || item.type == 22);
          if (!list.length) {
            thumbsupOrCrazilyInfo.value = {};
          } else {
            thumbsupOrCrazilyInfo.value = list[0];
          }
        });
      }
    };
    // 赞踩按钮
    const thumbsupOrCrazilyClick = type => {
      let params = {
        name: detail.value.title,
        picture: detail.value.picture,
        refid: detail.value.id,
        type: type,
        tablename: 'news',
        userid: context?.$toolUtil.storageGet('userid')
      };
      context?.$http({
        url: 'storeup/add',
        method: 'post',
        data: params
      }).then(res => {
        if (type == 21) detail.value.thumbsupNumber += 1;
        if (type == 22) detail.value.crazilyNumber += 1;
        context?.$http({
          url: `news/update`,
          method: 'post',
          data: detail.value
        });
        getThumbsupOrCrazily();
        context?.$toolUtil.message('操作成功', 'success');
      });
    };
    //取消赞踩按钮
    const cancelThumbsupOrCrazilyClick = type => {
      let ids = [];
      ids.push(thumbsupOrCrazilyInfo.value.id);
      context?.$http({
        url: 'storeup/delete',
        method: 'post',
        data: ids
      }).then(res => {
        if (type == 21 && detail.value.thumbsupNumber > 0) detail.value.thumbsupNumber -= 1;
        if (type == 22 && detail.value.crazilyNumber > 0) detail.value.crazilyNumber -= 1;
        context?.$http({
          url: `news/update`,
          method: 'post',
          data: detail.value
        });
        getThumbsupOrCrazily();
        context?.$toolUtil.message('取消成功', 'success');
      });
    };
    // 收藏
    const collectType = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const collectInfo = (0,reactivity_esm_bundler/* ref */.KR)({});
    const getCollect = () => {
      if (context?.$toolUtil.storageGet('frontToken')) {
        context?.$http({
          url: 'storeup/list',
          method: 'get',
          params: {
            page: 1,
            limit: 1,
            type: 1,
            refid: id.value,
            tablename: 'news',
            userid: context?.$toolUtil.storageGet('userid')
          }
        }).then(res => {
          if (res.data.data.list.length) {
            collectType.value = true;
            collectInfo.value = res.data.data.list[0];
          } else {
            collectType.value = false;
            collectInfo.value = {};
          }
        });
      }
    };
    // 收藏按钮
    const collectClick = type => {
      if (type == 1 && !collectType.value) {
        let params = {
          name: detail.value.title,
          picture: detail.value.picture,
          refid: detail.value.id,
          type: type,
          tablename: 'news',
          userid: context?.$toolUtil.storageGet('userid')
        };
        context?.$http({
          url: 'storeup/add',
          method: 'post',
          data: params
        }).then(res => {
          detail.value.storeupNumber += 1;
          context?.$http({
            url: `news/update`,
            method: 'post',
            data: detail.value
          });
          collectType.value = true;
          getCollect();
          context?.$toolUtil.message('收藏成功', 'success');
        });
      } else if (type == -1 && collectType.value) {
        let ids = [];
        ids.push(collectInfo.value.id);
        context?.$http({
          url: 'storeup/delete',
          method: 'post',
          data: ids
        }).then(res => {
          detail.value.storeupNumber -= 1;
          context?.$http({
            url: `news/update`,
            method: 'post',
            data: detail.value
          });
          collectInfo.value = {};
          collectType.value = false;
          context?.$toolUtil.message('取消成功', 'success');
        });
      }
    };
    return (_ctx, _cache) => {
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      const _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dialog");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dialog, {
        modelValue: formVisible.value,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => formVisible.value = $event),
        title: formTitle.value,
        width: "60%",
        class: "news-detail-dialog",
        "destroy-on-close": ""
      }, {
        footer: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", _hoisted_11, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_button, {
          onClick: _cache[6] || (_cache[6] = $event => formVisible.value = false)
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[14] || (_cache[14] = [(0,runtime_core_esm_bundler/* createTextVNode */.eW)("关闭")])),
          _: 1,
          __: [14]
        })])]),
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, (0,shared_esm_bundler/* toDisplayString */.v_)(detail.value.title), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_3, [!collectType.value ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
          key: 0,
          class: "collect_view",
          style: {
            "cursor": "pointer"
          },
          onClick: _cache[0] || (_cache[0] = $event => collectClick(1))
        }, _cache[8] || (_cache[8] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
          class: "iconfont icon-likeline1"
        }, null, -1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "收藏", -1)]))) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
          key: 1,
          class: "collect_view",
          style: {
            "cursor": "pointer"
          },
          onClick: _cache[1] || (_cache[1] = $event => collectClick(-1))
        }, _cache[9] || (_cache[9] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
          class: "iconfont iconfontActive icon-likefill1"
        }, null, -1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
          class: "textActive"
        }, "取消收藏", -1)]))), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_4, [!thumbsupOrCrazilyInfo.value.type ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
          key: 0
        }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
          class: "zan_view",
          style: {
            "cursor": "pointer"
          },
          onClick: _cache[2] || (_cache[2] = $event => thumbsupOrCrazilyClick(21))
        }, [_cache[10] || (_cache[10] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
          class: "iconfont icon-thumb-up-line1"
        }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "赞(" + (0,shared_esm_bundler/* toDisplayString */.v_)(detail.value.thumbsupNumber) + ")", 1)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
          class: "zan_view",
          style: {
            "cursor": "pointer"
          },
          onClick: _cache[3] || (_cache[3] = $event => thumbsupOrCrazilyClick(22))
        }, [_cache[11] || (_cache[11] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
          class: "iconfont icon-thumb-down-line1"
        }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "踩(" + (0,shared_esm_bundler/* toDisplayString */.v_)(detail.value.crazilyNumber) + ")", 1)])], 64)) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
          key: 1
        }, [thumbsupOrCrazilyInfo.value.type == 21 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
          key: 0,
          class: "zan_view",
          style: {
            "cursor": "pointer"
          },
          onClick: _cache[4] || (_cache[4] = $event => cancelThumbsupOrCrazilyClick(21))
        }, [_cache[12] || (_cache[12] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
          class: "iconfont iconfontActive icon-thumb-up-fill1"
        }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", _hoisted_5, "取消赞(" + (0,shared_esm_bundler/* toDisplayString */.v_)(detail.value.thumbsupNumber) + ")", 1)])) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
          key: 1,
          class: "zan_view",
          style: {
            "cursor": "pointer"
          },
          onClick: _cache[5] || (_cache[5] = $event => cancelThumbsupOrCrazilyClick(22))
        }, [_cache[13] || (_cache[13] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
          class: "iconfont iconfontActive icon-thumb-down-fill1"
        }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", _hoisted_6, "取消踩(" + (0,shared_esm_bundler/* toDisplayString */.v_)(detail.value.crazilyNumber) + ")", 1)]))], 64))])]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_7, "发布时间：" + (0,shared_esm_bundler/* toDisplayString */.v_)(detail.value.addtime), 1), detail.value.picture ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_8, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(detail.value.picture.split(','), src => {
          return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("img", {
            src: _ctx.$config.url + src
          }, null, 8, _hoisted_9);
        }), 256))])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
          class: "news_detail_content",
          innerHTML: detail.value.content
        }, null, 8, _hoisted_10)])]),
        _: 1
      }, 8, ["modelValue", "title"])]);
    };
  }
});
;// ./src/views/pages/news/formModel.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/news/formModel.vue?vue&type=style&index=0&id=ca835a56&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/views/pages/news/formModel.vue?vue&type=style&index=0&id=ca835a56&lang=scss

;// ./src/views/pages/news/formModel.vue



;

const __exports__ = formModelvue_type_script_setup_true_lang_js;

/* harmony default export */ var formModel = (__exports__);

/***/ }),

/***/ 1730:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_toolUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6971);

const menu = {
  list() {
    if (_utils_toolUtil__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.storageGet("menus")) {
      return eval('(' + _utils_toolUtil__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.storageGet("menus") + ')');
    } else {
      return null;
    }
  }
};
/* harmony default export */ __webpack_exports__.A = (menu);

/***/ }),

/***/ 1857:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var runtime_dom_esm_bundler = __webpack_require__(3751);
// EXTERNAL MODULE: ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(641);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=template&id=e274e6c6

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("router-view");
  return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_router_view);
}
// EXTERNAL MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=script&lang=js
var Appvue_type_script_lang_js = __webpack_require__(8013);
var Appvue_type_script_lang_js_default = /*#__PURE__*/__webpack_require__.n(Appvue_type_script_lang_js);
;// ./src/App.vue?vue&type=script&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/App.vue?vue&type=style&index=0&id=e274e6c6&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/App.vue?vue&type=style&index=0&id=e274e6c6&lang=scss

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(6262);
;// ./src/App.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.A)((Appvue_type_script_lang_js_default()), [['render',render]])

/* harmony default export */ var App = (__exports__);
// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm-bundler.js
var vue_router_esm_bundler = __webpack_require__(6166);
// EXTERNAL MODULE: ./node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(33);
// EXTERNAL MODULE: ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(953);
// EXTERNAL MODULE: ./src/utils/menu.js
var menu = __webpack_require__(1730);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm-bundler.js + 5 modules
var vuex_esm_bundler = __webpack_require__(6278);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/index.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  id: "index",
  class: "main-containers"
};
const _hoisted_2 = {
  class: "index_top"
};
const _hoisted_3 = {
  class: "top-header"
};
const _hoisted_4 = {
  class: "projectName"
};
const _hoisted_5 = {
  key: 1,
  class: "user"
};
const _hoisted_6 = {
  class: "avatar-wrapper"
};
const _hoisted_7 = ["src"];
const _hoisted_8 = {
  class: "nickname"
};
const _hoisted_9 = {
  class: "menu-wrapper"
};
const _hoisted_10 = {
  class: "rotation_view"
};
const _hoisted_11 = ["src", "onClick"];





/* harmony default export */ var viewsvue_type_script_setup_true_lang_js = ({
  __name: 'index',
  setup(__props) {
    const moment = window.moment;
    const store = (0,vuex_esm_bundler/* useStore */.Pj)();
    const router = (0,vue_router_esm_bundler/* useRouter */.rd)();
    const route = (0,vue_router_esm_bundler/* useRoute */.lq)();
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const baseUrl = (0,reactivity_esm_bundler/* ref */.KR)(context.$config.url);
    const projectName = (0,reactivity_esm_bundler/* ref */.KR)(`基于Python的肉鹅价格数据可视化分析`);
    const Token = (0,reactivity_esm_bundler/* ref */.KR)('');
    if (localStorage.getItem('frontToken') && !store.getters['user/session'].id) {
      store.dispatch('user/getSession');
    }
    (0,runtime_core_esm_bundler/* onBeforeUnmount */.xo)(() => {});
    // 获取默认菜单index
    const setMenuIndex = path => {
      if (path) {
        menuIndex.value = path.replace('Detail', 'List');
      } else {
        menuIndex.value = '';
      }
    };
    // 默认菜单index
    const menuIndex = (0,reactivity_esm_bundler/* ref */.KR)('');
    const routerKey = (0,reactivity_esm_bundler/* ref */.KR)(Math.random());
    (0,runtime_core_esm_bundler/* watch */.wB)(() => router.currentRoute.value, (value, oldValue) => {
      Token.value = context?.$toolUtil.storageGet('frontToken');
      if (value.path == oldValue?.path) {
        //改变路由query时重新加载router-view
        routerKey.value = Math.random();
      }
      if (value.query.centerType) {
        setMenuIndex();
      } else {
        setMenuIndex(value.path);
      }
    }, {
      immediate: true
    });
    const init = () => {
      // 获取菜单
      getMenu();
      // 赋值token
      Token.value = context?.$toolUtil.storageGet('frontToken');
      // 轮播图
      getRotationList();
      if (Token.value) {
        getSession();
      }
    };
    // 切换菜单保存index
    const menuChange = e => {
      if (e == 'chat') return;
    };
    // 轮播图
    const rotationList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const getRotationList = () => {
      context?.$http({
        url: 'config/list',
        method: 'get',
        params: {
          page: 1,
          limit: 3,
          name: '%swiper%'
        }
      }).then(res => {
        rotationList.value = res.data.data.list;
      });
    };

    // 轮播图跳转
    const carouselClick = url => {
      if (url) {
        if (url.startsWith('http')) {
          window.open(url);
        } else {
          context.$router.push(url);
        }
      }
    };
    const menuList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const role = (0,reactivity_esm_bundler/* ref */.KR)('');
    const getMenu = () => {
      let params = {
        page: 1,
        limit: 1,
        sort: 'id'
      };
      context?.$http({
        url: "menu/list",
        method: "get",
        params: params
      }).then(res => {
        context?.$toolUtil.storageSet("menus", res.data.data.list[0].menujson);
      });
      menuList.value = context?.$config.menuList;
    };
    const loginClick = () => {
      context?.$toolUtil.storageSet('toPath', window.history.state.current);
      router.push('/login');
    };
    const loginOut = () => {
      store.dispatch('user/loginOut');
      context?.$toolUtil.message('退出成功', 'success');
      context?.$toolUtil.storageClear();
      router.replace('/index/home');
      Token.value = '';
    };
    //菜单跳转
    const menuHandler = name => {
      if (name == 'center') {
        name = `${context?.$toolUtil.storageGet('frontSessionTable')}Center`;
        menuChange('center');
      }
      router.push(name);
    };
    // 获取用户信息
    const getSession = () => {
      context?.$http({
        url: `${context?.$toolUtil.storageGet('frontSessionTable')}/session`,
        method: 'get'
      }).then(res => {
        context?.$toolUtil.storageSet('userid', res.data.data.id);
        if (context?.$toolUtil.storageGet('frontSessionTable') == 'yonghu') {
          context?.$toolUtil.storageSet("frontName", res.data.data.zhanghao);
        }
        if (context?.$toolUtil.storageGet('frontSessionTable') == 'yonghu') {
          context?.$toolUtil.storageSet('headportrait', res.data.data.touxiang || '');
        }
      });
    };
    init();
    return (_ctx, _cache) => {
      const _component_User = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("User");
      const _component_el_icon = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-icon");
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-button");
      const _component_arrow_down = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("arrow-down");
      const _component_el_dropdown_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dropdown-item");
      const _component_el_dropdown_menu = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dropdown-menu");
      const _component_el_dropdown = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dropdown");
      const _component_el_menu_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-menu-item");
      const _component_el_sub_menu = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-sub-menu");
      const _component_el_menu = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-menu");
      const _component_el_scrollbar = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-scrollbar");
      const _component_mySwiper = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("mySwiper");
      const _component_router_view = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("router-view");
      const _component_el_backtop = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-backtop");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_4, (0,shared_esm_bundler/* toDisplayString */.v_)(projectName.value), 1), !Token.value ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_button, {
        key: 0,
        class: "login",
        onClick: loginClick
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_icon, null, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_User)]),
          _: 1
        }), _cache[2] || (_cache[2] = (0,runtime_core_esm_bundler/* createTextVNode */.eW)("登录 "))]),
        _: 1,
        __: [2]
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), Token.value ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dropdown, {
        class: "avatar-container",
        trigger: "hover"
      }, {
        dropdown: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dropdown_menu, {
          class: "user-dropDown",
          slot: "dropdown"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dropdown_item, {
            onClick: _cache[0] || (_cache[0] = $event => menuHandler('center')),
            class: "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[3] || (_cache[3] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "个人中心", -1)])),
            _: 1,
            __: [3]
          }), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dropdown_item, {
            onClick: loginOut,
            class: "loginOut"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[4] || (_cache[4] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "退出登录", -1)])),
            _: 1,
            __: [4]
          })]),
          _: 1
        })]),
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("img", {
          class: "user-avatar",
          src: (0,reactivity_esm_bundler/* unref */.R1)(store).getters['user/avatar'],
          style: {
            "width": "50px"
          }
        }, null, 8, _hoisted_7), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_8, (0,shared_esm_bundler/* toDisplayString */.v_)((0,reactivity_esm_bundler/* unref */.R1)(store).getters['user/showName']), 1), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_icon, {
          class: "el-icon-arrow-down"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_arrow_down)]),
          _: 1
        })])]),
        _: 1
      })])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_9, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_scrollbar, {
        "wrap-class": "scrollbar-wrapper",
        class: "menu_scrollbar"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_menu, {
          "unique-opened": true,
          "default-active": menuIndex.value,
          class: "menu_view",
          mode: "horizontal",
          onSelect: menuChange,
          key: menuIndex.value,
          ellipsis: false
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_menu_item, {
            class: "first-item",
            index: "/index/home",
            onClick: _cache[1] || (_cache[1] = $event => menuHandler('/'))
          }, {
            title: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => _cache[5] || (_cache[5] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, "首页", -1)])),
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [_cache[6] || (_cache[6] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
              class: "iconfont icon-zhuye2"
            }, null, -1))]),
            _: 1,
            __: [6]
          }), ((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(menuList.value, (menu, index) => {
            return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, {
              key: menu.menu
            }, [menu.child.length > 1 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_sub_menu, {
              key: 0,
              index: menu.name,
              class: "first-item",
              teleported: true
            }, {
              title: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
                class: (0,shared_esm_bundler/* normalizeClass */.C4)(["iconfont", menu.icon])
              }, null, 2), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, (0,shared_esm_bundler/* toDisplayString */.v_)(menu.name), 1)]),
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(menu.child, (child, index1) => {
                return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_menu_item, {
                  class: "second-item",
                  key: index1,
                  index: child.url,
                  onClick: $event => menuHandler(child.url)
                }, {
                  default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.eW)((0,shared_esm_bundler/* toDisplayString */.v_)(child.name), 1)]),
                  _: 2
                }, 1032, ["index", "onClick"]);
              }), 128))]),
              _: 2
            }, 1032, ["index"])) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_menu_item, {
              key: 1,
              index: menu.child[0].url,
              class: "first-item",
              onClick: $event => menuHandler(menu.child[0].url)
            }, {
              title: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", null, (0,shared_esm_bundler/* toDisplayString */.v_)(menu.child[0].name), 1)]),
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("i", {
                class: (0,shared_esm_bundler/* normalizeClass */.C4)(["iconfont", menu.icon])
              }, null, 2)]),
              _: 2
            }, 1032, ["index", "onClick"]))], 64);
          }), 128))]),
          _: 1
        }, 8, ["default-active"]))]),
        _: 1
      })]), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_10, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_mySwiper, {
        type: 3,
        data: rotationList.value,
        autoHeight: false,
        autoplay: true,
        loop: false,
        navigation: false,
        pagination: true,
        paginationType: "2",
        scrollbar: false,
        slidesPerView: "1",
        spaceBetween: "20",
        centeredSlides: false,
        freeMode: false,
        effectType: "0",
        direction: "horizontal"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(scope => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("img", {
          src: scope.row.value ? baseUrl.value + scope.row.value : '',
          onClick: $event => carouselClick(scope.row.url)
        }, null, 8, _hoisted_11)]),
        _: 1
      }, 8, ["data"])])]), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_scrollbar, {
        class: "contain_view body-containers"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_router_view, {
          key: routerKey.value
        })), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_backtop, {
          right: 100,
          bottom: 100
        }), _cache[7] || (_cache[7] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
          class: "bottom_view ql-snow ql-editor"
        }, null, -1))]),
        _: 1,
        __: [7]
      })]);
    };
  }
});
;// ./src/views/index.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/index.vue?vue&type=style&index=0&id=52c19990&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/views/index.vue?vue&type=style&index=0&id=52c19990&lang=scss

;// ./src/views/index.vue



;

const views_exports_ = viewsvue_type_script_setup_true_lang_js;

/* harmony default export */ var views = (views_exports_);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(3725);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.for-each.js
var esnext_iterator_for_each = __webpack_require__(9838);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.iterator.map.js
var esnext_iterator_map = __webpack_require__(1339);
// EXTERNAL MODULE: ./src/views/pages/news/formModel.vue + 4 modules
var formModel = __webpack_require__(476);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/home.vue?vue&type=script&setup=true&lang=js




const homevue_type_script_setup_true_lang_js_hoisted_1 = {
  class: "home_box"
};
const homevue_type_script_setup_true_lang_js_hoisted_2 = {
  class: "newsList_view"
};
const homevue_type_script_setup_true_lang_js_hoisted_3 = {
  class: "list"
};
const homevue_type_script_setup_true_lang_js_hoisted_4 = ["onClick"];
const homevue_type_script_setup_true_lang_js_hoisted_5 = ["src"];
const homevue_type_script_setup_true_lang_js_hoisted_6 = {
  class: "title-row"
};
const homevue_type_script_setup_true_lang_js_hoisted_7 = {
  class: "title"
};
const homevue_type_script_setup_true_lang_js_hoisted_8 = {
  class: "intro text-two-row"
};
const homevue_type_script_setup_true_lang_js_hoisted_9 = {
  class: "date"
};
const homevue_type_script_setup_true_lang_js_hoisted_10 = {
  class: "right"
};
const homevue_type_script_setup_true_lang_js_hoisted_11 = ["onClick"];
const _hoisted_12 = {
  class: "title"
};
const _hoisted_13 = {
  class: "intro text-two-row"
};
const _hoisted_14 = {
  class: "date"
};




/* harmony default export */ var homevue_type_script_setup_true_lang_js = ({
  __name: 'home',
  setup(__props) {
    const moment = window.moment;
    const store = (0,vuex_esm_bundler/* useStore */.Pj)();
    const user = (0,runtime_core_esm_bundler/* computed */.EW)(() => store.getters['user/session']);
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const router = (0,vue_router_esm_bundler/* useRouter */.rd)();
    const baseUrl = (0,reactivity_esm_bundler/* ref */.KR)(context.$config.url);
    //公告资讯弹窗
    const newsFormModelRef = (0,reactivity_esm_bundler/* ref */.KR)(null);
    //公告资讯
    const newsList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const getNewsList = () => {
      context?.$http({
        url: 'news/list',
        method: 'get',
        params: {
          page: 1,
          limit: 5,
          sort: 'id',
          order: 'desc'
        }
      }).then(res => {
        newsList.value = res.data.data.list;
        newsList.value.forEach(item => {
          let urls = item.picture.split(',');
          item.imgUrls = urls.map(url => {
            if (isHttp(url)) {
              return url;
            } else {
              return baseUrl.value + url;
            }
          });
        });
      });
    };
    const newsDetailClick = item => {
      if (item && item.id) {
        newsFormModelRef.value.init(item.id);
      }
    };
    //判断图片链接是否带http
    const isHttp = str => {
      return str && str.substr(0, 4) == 'http';
    };
    //跳转详情
    const detailClick = (table, id) => {
      router.push(`/index/${table}Detail?id=${id}`);
    };
    const moreClick = table => {
      router.push(`/index/${table}List`);
    };
    const init = () => {
      //公告资讯
      getNewsList();
    };
    init();
    return (_ctx, _cache) => {
      const _component_el_carousel_item = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-carousel-item");
      const _component_el_carousel = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-carousel");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_2, [_cache[1] || (_cache[1] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "tableName"
      }, "公告资讯", -1)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_3, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(newsList.value, (item, index) => {
        return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, [index == 0 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
          key: 0,
          class: "left",
          onClick: $event => newsDetailClick(item),
          style: {
            "cursor": "pointer"
          }
        }, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_carousel, null, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(item.imgUrls, item => {
            return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_carousel_item, {
              key: item
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("img", {
                src: item,
                alt: ""
              }, null, 8, homevue_type_script_setup_true_lang_js_hoisted_5)]),
              _: 2
            }, 1024);
          }), 128))]),
          _: 2
        }, 1024), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_7, (0,shared_esm_bundler/* toDisplayString */.v_)(item.title), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_8, (0,shared_esm_bundler/* toDisplayString */.v_)(item.introduction), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_9, (0,shared_esm_bundler/* toDisplayString */.v_)((0,reactivity_esm_bundler/* unref */.R1)(moment)(item.addtime).format('YYYY-MM-DD')), 1)])], 8, homevue_type_script_setup_true_lang_js_hoisted_4)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)], 64);
      }), 256)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", homevue_type_script_setup_true_lang_js_hoisted_10, [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)(newsList.value, (item, index) => {
        return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, [index > 0 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
          key: 0,
          class: "item",
          onClick: $event => newsDetailClick(item),
          style: {
            "cursor": "pointer"
          }
        }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_12, (0,shared_esm_bundler/* toDisplayString */.v_)(item.title), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_13, (0,shared_esm_bundler/* toDisplayString */.v_)(item.introduction), 1), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", _hoisted_14, (0,shared_esm_bundler/* toDisplayString */.v_)((0,reactivity_esm_bundler/* unref */.R1)(moment)(item.addtime).format('YYYY-MM-DD')), 1)], 8, homevue_type_script_setup_true_lang_js_hoisted_11)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)], 64);
      }), 256)), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "more",
        onClick: _cache[0] || (_cache[0] = $event => moreClick('news')),
        style: {
          "cursor": "pointer"
        }
      }, "更多")])])])]), (0,runtime_core_esm_bundler/* createVNode */.bF)((0,reactivity_esm_bundler/* unref */.R1)(formModel/* default */.A), {
        ref_key: "newsFormModelRef",
        ref: newsFormModelRef
      }, null, 512)], 64);
    };
  }
});
;// ./src/views/pages/home.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/home.vue?vue&type=style&index=0&id=cddd824a&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/views/pages/home.vue?vue&type=style&index=0&id=cddd824a&lang=scss

;// ./src/views/pages/home.vue



;

const home_exports_ = homevue_type_script_setup_true_lang_js;

/* harmony default export */ var home = (home_exports_);
;// ./src/router/index.js



const routes = [{
  path: '/',
  redirect: '/index/home'
}, {
  path: '/index',
  component: views,
  children: [{
    path: 'home',
    component: home
  }, {
    path: 'newsList',
    component: () => __webpack_require__.e(/* import() */ 904).then(__webpack_require__.bind(__webpack_require__, 1904))
  }, {
    path: 'forumList',
    component: () => __webpack_require__.e(/* import() */ 670).then(__webpack_require__.bind(__webpack_require__, 3670))
  }, {
    path: 'forumDetail',
    component: () => __webpack_require__.e(/* import() */ 109).then(__webpack_require__.bind(__webpack_require__, 9109))
  }, {
    path: 'forumTypeList',
    component: () => __webpack_require__.e(/* import() */ 600).then(__webpack_require__.bind(__webpack_require__, 5600))
  }, {
    path: 'forumTypeDetail',
    component: () => __webpack_require__.e(/* import() */ 140).then(__webpack_require__.bind(__webpack_require__, 140))
  }, {
    path: 'forumTypeAdd',
    component: () => __webpack_require__.e(/* import() */ 918).then(__webpack_require__.bind(__webpack_require__, 8918))
  }, {
    path: 'forumReportList',
    component: () => __webpack_require__.e(/* import() */ 310).then(__webpack_require__.bind(__webpack_require__, 6929))
  }, {
    path: 'forumReportDetail',
    component: () => __webpack_require__.e(/* import() */ 453).then(__webpack_require__.bind(__webpack_require__, 4453))
  }, {
    path: 'forumReportAdd',
    component: () => __webpack_require__.e(/* import() */ 106).then(__webpack_require__.bind(__webpack_require__, 3106))
  }, {
    path: 'syslogList',
    component: () => __webpack_require__.e(/* import() */ 324).then(__webpack_require__.bind(__webpack_require__, 8324))
  }, {
    path: 'syslogDetail',
    component: () => __webpack_require__.e(/* import() */ 786).then(__webpack_require__.bind(__webpack_require__, 6786))
  }, {
    path: 'syslogAdd',
    component: () => __webpack_require__.e(/* import() */ 189).then(__webpack_require__.bind(__webpack_require__, 4189))
  }, {
    path: 'sensitiveWordList',
    component: () => __webpack_require__.e(/* import() */ 779).then(__webpack_require__.bind(__webpack_require__, 3779))
  }, {
    path: 'sensitiveWordDetail',
    component: () => __webpack_require__.e(/* import() */ 474).then(__webpack_require__.bind(__webpack_require__, 9474))
  }, {
    path: 'sensitiveWordAdd',
    component: () => __webpack_require__.e(/* import() */ 145).then(__webpack_require__.bind(__webpack_require__, 4526))
  }, {
    path: 'cnhnbsgList',
    component: () => __webpack_require__.e(/* import() */ 691).then(__webpack_require__.bind(__webpack_require__, 6691))
  }, {
    path: 'cnhnbsgDetail',
    component: () => __webpack_require__.e(/* import() */ 375).then(__webpack_require__.bind(__webpack_require__, 2375))
  }, {
    path: 'cnhnbsgAdd',
    component: () => __webpack_require__.e(/* import() */ 240).then(__webpack_require__.bind(__webpack_require__, 6240))
  }, {
    path: 'yonghuList',
    component: () => __webpack_require__.e(/* import() */ 563).then(__webpack_require__.bind(__webpack_require__, 4563))
  }, {
    path: 'yonghuDetail',
    component: () => __webpack_require__.e(/* import() */ 229).then(__webpack_require__.bind(__webpack_require__, 2229))
  }, {
    path: 'yonghuAdd',
    component: () => __webpack_require__.e(/* import() */ 657).then(__webpack_require__.bind(__webpack_require__, 1657))
  }, {
    path: 'yonghuCenter',
    component: () => __webpack_require__.e(/* import() */ 400).then(__webpack_require__.bind(__webpack_require__, 4400))
  }, {
    path: 'storeupList',
    component: () => __webpack_require__.e(/* import() */ 760).then(__webpack_require__.bind(__webpack_require__, 3760))
  }, {
    path: 'cnhnbsgforecastList',
    component: () => __webpack_require__.e(/* import() */ 763).then(__webpack_require__.bind(__webpack_require__, 7763))
  }, {
    path: 'cnhnbsgforecastDetail',
    component: () => __webpack_require__.e(/* import() */ 802).then(__webpack_require__.bind(__webpack_require__, 802))
  }, {
    path: 'cnhnbsgforecastAdd',
    component: () => __webpack_require__.e(/* import() */ 935).then(__webpack_require__.bind(__webpack_require__, 3935))
  }]
}, {
  path: '/login',
  component: () => __webpack_require__.e(/* import() */ 526).then(__webpack_require__.bind(__webpack_require__, 1526))
}, {
  path: '/yonghuRegister',
  component: () => __webpack_require__.e(/* import() */ 328).then(__webpack_require__.bind(__webpack_require__, 3328))
}];
const router = (0,vue_router_esm_bundler/* createRouter */.aE)({
  history: (0,vue_router_esm_bundler/* createWebHashHistory */.Bt)("./"),
  routes
});
// 全局后置钩子，路由跳转后执行
router.afterEach(() => {
  // 滚动到顶部
  window.scrollTo(0, 0);
});
/* harmony default export */ var src_router = (router);
// EXTERNAL MODULE: ./src/utils/toolUtil.js
var toolUtil = __webpack_require__(6971);
;// ./src/utils/config.js
const config = {
  get() {
    return {
      url: "http://localhost:8080" + "/cl682072280" + '/',
      name: "/cl682072280",
      menuList: [{
        name: '农产品肉鹅',
        icon: '',
        child: [{
          name: '农产品肉鹅',
          url: '/index/cnhnbsgList'
        }]
      }, {
        name: '肉鹅价格预测',
        icon: '',
        child: [{
          name: '肉鹅价格预测',
          url: '/index/cnhnbsgforecastList'
        }]
      }, {
        name: '论坛交流',
        icon: 'icon-common9',
        child: [{
          name: '论坛交流',
          url: '/index/forumList'
        }]
      }, {
        name: '公告资讯',
        icon: '',
        child: [{
          name: '公告资讯',
          url: '/index/newsList'
        }]
      }]
    };
  },
  getProjectName() {
    return {
      projectName: `基于Python的肉鹅价格数据可视化分析`
    };
  }
};
/* harmony default export */ var utils_config = (config);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 40 modules
var axios = __webpack_require__(2586);
;// ./src/utils/http.js




const http = axios/* default */.A.create({
  timeout: 1000 * 86400,
  withCredentials: true,
  baseURL: "/cl682072280",
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});
// 请求拦截
http.interceptors.request.use(config => {
  config.headers['Token'] = toolUtil/* default */.A.storageGet('frontToken'); // 请求头带上token
  return config;
}, error => {
  return Promise.reject(error);
});
// 响应拦截
http.interceptors.response.use(response => {
  if (response.data && response.data.code == 401) {
    // 401, token失效
    toolUtil/* default */.A.storageClear();
    toolUtil/* default */.A.storageSet('toPath', window.history.state.current);
    ElMessage.error({
      message: response.data.msg,
      grouping: true,
      repeatNum: -99
    });
    setTimeout(() => {
      src_router.push('/login');
    }, 100);
    return Promise.reject(response);
  } else if (response.data && response.data.code == 0) {
    return response;
  } else {
    if (!response.config.noErrorTip) {
      ElMessage.error({
        message: response.data.msg,
        grouping: true,
        repeatNum: -99
      });
    }
    return Promise.reject(response);
  }
}, error => {
  return Promise.reject(error);
});
http.defaults.paramsSerializer = {
  serialize: params => {
    //执行axios默认的URLSearchParams序列化（保留所有原生逻辑）
    const defaultStr = new URLSearchParams(params).toString();
    //仅对[]做全局替换编码，其他字符完全不变
    const finalStr = defaultStr.replace(/\[/g, '%5B') // 全局替换[为%5B
    .replace(/\]/g, '%5D'); // 全局替换]为%5D
    return finalStr;
  }
};
/* harmony default export */ var utils_http = (http);
// EXTERNAL MODULE: ./src/assets/avatar.png
var assets_avatar = __webpack_require__(4211);
;// ./src/store/modules/user.js





/* harmony default export */ var user = ({
  namespaced: true,
  state: {
    session: {},
    sessionTable: ''
  },
  getters: {
    session(state) {
      return state.session;
    },
    avatar(state) {
      let key;
      if (state.sessionTable == 'yonghu') {
        key = 'touxiang';
      }
      let avatar = state.session[key];
      return avatar ? utils_config.get().url + avatar.split(',')[0] : assets_avatar;
    },
    username(state) {
      if (state.sessionTable == 'yonghu') {
        return state.session['zhanghao'];
      }
    },
    showName(state, getters) {
      if (state.sessionTable == 'users') {
        return getters.username;
      }
      if (state.sessionTable == 'yonghu') {
        return getters.username;
      }
    }
  },
  actions: {
    async getSession({
      commit
    }) {
      let sessionTable = toolUtil/* default */.A.storageGet('frontSessionTable');
      if (!sessionTable) {
        src_router.push('/login');
        return;
      }
      commit('set_sessionTable', sessionTable);
      let res = await utils_http.get(`${sessionTable}/session`);
      if (res.data.code == 0) {
        commit('set_session', res.data.data);
      }
      return res;
    },
    async update({
      commit
    }, data) {
      let res = await utils_http.post(`${toolUtil/* default */.A.storageGet('frontSessionTable')}/update`, data);
      if (res.data.code == 0) {
        commit('assign_session', data);
      }
      return res;
    },
    loginOut({
      commit
    }, data) {
      commit('set_session', {});
      commit('set_sessionTable', '');
    }
  },
  mutations: {
    set_session(state, data) {
      state.session = data;
    },
    assign_session(state, data) {
      Object.assign(state.session, JSON.parse(JSON.stringify(data)));
    },
    set_sessionTable(state, data) {
      state.sessionTable = data;
    }
  }
});
;// ./src/store/modules/system.js



/* harmony default export */ var system = ({
  namespaced: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {}
});
;// ./src/store/index.js



/* harmony default export */ var store = ((0,vuex_esm_bundler/* createStore */.y$)({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user: user,
    system: system
  }
}));
// EXTERNAL MODULE: ./node_modules/@vuemap/vue-amap/es/services/injected-amap-api-instance.mjs + 2 modules
var injected_amap_api_instance = __webpack_require__(4287);
// EXTERNAL MODULE: ./node_modules/@vuemap/vue-amap/es/defaults.mjs + 157 modules
var defaults = __webpack_require__(8736);
// EXTERNAL MODULE: ./node_modules/@vuemap/vue-amap/dist/style.css
var style = __webpack_require__(6123);
// EXTERNAL MODULE: ./node_modules/@wangeditor/editor-for-vue/dist/index.esm.js + 1 modules
var index_esm = __webpack_require__(1648);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Editor.vue?vue&type=script&setup=true&lang=js

const Editorvue_type_script_setup_true_lang_js_hoisted_1 = {
  key: 0,
  class: "editor-box"
};



const mode = 'default'; // 或 'simple'

/* harmony default export */ var Editorvue_type_script_setup_true_lang_js = ({
  __name: 'Editor',
  props: {
    type: {
      type: String,
      default: '' //type="AI",使用AI富文本编辑器
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    readonly: {
      type: Boolean,
      // 是否只读
      default: false
    }
  },
  emits: ['change'],
  setup(__props, {
    emit: __emit
  }) {
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const emit = __emit;
    // 编辑器实例，必须用 shallowRef
    const editorRef = (0,reactivity_esm_bundler/* shallowRef */.IJ)();

    // 内容 HTML
    const valueHtml = (0,reactivity_esm_bundler/* ref */.KR)('');
    const props = __props;
    const AiEditorRef = (0,reactivity_esm_bundler/* ref */.KR)();
    let aiEditor = null;
    // 模拟 ajax 异步获取内容
    (0,runtime_core_esm_bundler/* onMounted */.sV)(() => {
      setTimeout(() => {
        valueHtml.value = props.value || '';
      }, 0);
      if (props.type == 'AI') {
        aiEditor = new window.AiEditor({
          element: AiEditorRef.value,
          placeholder: props.placeholder,
          content: props.value,
          editable: !props.readonly,
          //支持讯飞星火spark、chatGPT、文心一言等，参考https://aieditor.com.cn/docs/zh/ai/llm.html
          ai: {
            models: {
              spark: {
                appId: "b2c5ec71",
                apiKey: "50bf24e4cb1e1b9d8c1f325c937f0171",
                apiSecret: "ZTdjNGY3ZmVjZDIzZDRkOGM0NTc2ZGEw",
                version: "v1.1" //https://www.xfyun.cn/doc/spark/Web.html#_1-接口说明
              }
            }
          },
          onChange: aiEditor => {
            let content = aiEditor.getHtml();
            if (content == '<p></p>') {
              content = '';
            }
            emit('change', content);
          }
        });
      }
    });
    (0,runtime_core_esm_bundler/* watch */.wB)(() => props.value, e => {
      if (props.type == 'AI') {
        aiEditor.setContent(e);
      } else {
        if (e != valueHtml.value) {
          valueHtml.value = e;
        }
      }
    }, {
      once: true
    }); //第一次初始化时赋值
    (0,runtime_core_esm_bundler/* watch */.wB)(() => props.value, e => {
      if (!e && valueHtml.value) {
        //外部情况值时，同步清空
        valueHtml.value = e;
      }
    });
    const toolbarConfig = {
      excludeKeys: ['fullScreen', 'group-video', 'insertLink', 'insertImage']
    };
    const editorConfig = {
      placeholder: props.placeholder || '请输入内容...',
      readOnly: props.readonly,
      fontSize: ['12px', '14px', '16px'],
      MENU_CONF: {
        uploadImage: {
          server: context?.$config.name + '/file/upload',
          fieldName: 'file',
          // 单个文件的最大体积限制，默认为 2M
          maximgSize: 10 * 1024 * 1024,
          // 10M
          // 最多可上传几个文件，默认为 100
          maxNumberOfimgs: 10,
          // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
          allowedimgTypes: ['image/*'],
          // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
          meta: {
            // token: 'xxx',
            // otherKey: 'yyy'
            // img:''
          },
          // 将 meta 拼接到 url 参数中，默认 false
          metaWithUrl: false,
          // 自定义增加 http  header
          headers: {
            'Token': context?.$toolUtil.storageGet('Token')
          },
          // 跨域是否传递 cookie ，默认为 false
          withCredentials: true,
          // 超时时间，默认为 10 秒
          timeout: 10 * 1000,
          //10 秒

          // 上传前
          onBeforeUpload(imgs) {
            context?.$toolUtil.message('图片正在上传中,请耐心等待', 'warning');
            return imgs;
          },
          // 自定义插入图片
          customInsert(res, insertFn) {
            // 因为自定义插入导致onSuccess与onFailed回调函数不起作用,自己手动处理

            if (res.code === 0) {
              context?.$toolUtil.message('图片上传成功', 'success');
            } else {
              context?.$toolUtil.message('图片上传失败，请重新尝试', 'error');
            }
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(context?.$config.url + 'file/' + res.file);
            // console.log(res, "res.data")
          },
          // 单个文件上传成功之后
          onSuccess(img, res) {},
          // 单个文件上传失败
          onFailed(img, res) {},
          // 上传进度的回调函数
          onProgress(progress) {
            // console.log('progress', progress);
            // progress 是 0-100 的数字
          },
          // 上传错误，或者触发 timeout 超时
          onError(img, err, res) {
            // console.log(`${img.name} 上传出错`, err, res);
          }
        }
      }
    };

    // 组件销毁时，也及时销毁编辑器
    (0,runtime_core_esm_bundler/* onBeforeUnmount */.xo)(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });
    const handleChange = e => {
      let content = editorRef.value.getHtml();
      if (content == '<p><br></p>') {
        content = '';
      }
      emit('change', content);
    };
    const handleCreated = editor => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    return (_ctx, _cache) => {
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [__props.type != 'AI' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", Editorvue_type_script_setup_true_lang_js_hoisted_1, [(0,runtime_core_esm_bundler/* createVNode */.bF)((0,reactivity_esm_bundler/* unref */.R1)(index_esm/* Toolbar */.M), {
        class: "editorToolbar",
        style: {
          "border-bottom": "1px solid #ccc"
        },
        editor: editorRef.value,
        defaultConfig: toolbarConfig,
        mode: mode
      }, null, 8, ["editor"]), (0,runtime_core_esm_bundler/* createVNode */.bF)((0,reactivity_esm_bundler/* unref */.R1)(index_esm/* Editor */.K), {
        class: "editorContent",
        style: {
          "height": "310px",
          "overflow-y": "hidden"
        },
        modelValue: valueHtml.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => valueHtml.value = $event),
        defaultConfig: editorConfig,
        mode: mode,
        onOnCreated: handleCreated,
        onOnChange: handleChange
      }, null, 8, ["modelValue"])])) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", {
        key: 1,
        ref_key: "AiEditorRef",
        ref: AiEditorRef
      }, _cache[1] || (_cache[1] = [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "aie-container editor-box"
      }, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "aie-container-header editorToolbar"
      }), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "aie-container-main editorContent",
        style: {
          "height": "310px",
          "overflow": "auto"
        }
      }), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
        class: "aie-container-footer",
        style: {
          "display": "none"
        }
      })], -1)]), 512))]);
    };
  }
});
;// ./src/components/Editor.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Editor.vue?vue&type=style&index=0&id=776ba267&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/components/Editor.vue?vue&type=style&index=0&id=776ba267&lang=scss

;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Editor.vue?vue&type=style&index=1&id=776ba267&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/Editor.vue?vue&type=style&index=1&id=776ba267&lang=css

;// ./src/components/Editor.vue



;


const Editor_exports_ = Editorvue_type_script_setup_true_lang_js;

/* harmony default export */ var Editor = (Editor_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/upload.vue?vue&type=script&setup=true&lang=js



const uploadvue_type_script_setup_true_lang_js_hoisted_1 = {
  style: {
    "width": "100%",
    "height": "100%"
  }
};
const uploadvue_type_script_setup_true_lang_js_hoisted_2 = ["src"];
const uploadvue_type_script_setup_true_lang_js_hoisted_3 = {
  class: "el-upload-list__item-actions"
};
const uploadvue_type_script_setup_true_lang_js_hoisted_4 = ["onClick"];
const uploadvue_type_script_setup_true_lang_js_hoisted_5 = ["onClick"];
const uploadvue_type_script_setup_true_lang_js_hoisted_6 = {
  class: "el-upload__tip"
};
const uploadvue_type_script_setup_true_lang_js_hoisted_7 = {
  class: "el-upload__tip"
};
const uploadvue_type_script_setup_true_lang_js_hoisted_8 = ["src"];

/* harmony default export */ var uploadvue_type_script_setup_true_lang_js = ({
  __name: 'upload',
  props: {
    action: String,
    limit: {
      type: Number,
      default: 3
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fileUrls: String,
    tip: {
      type: String,
      default: '请上传'
    },
    type: {
      type: String,
      default: 'img'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(__props, {
    emit: __emit
  }) {
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.nI)()?.appContext.config.globalProperties;
    const emit = __emit;
    //props
    const props = __props;
    //data
    const tips = (0,reactivity_esm_bundler/* ref */.KR)('请上传');
    const uploadUrl = (0,reactivity_esm_bundler/* ref */.KR)('');
    const fileList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const fileUrlList = (0,reactivity_esm_bundler/* ref */.KR)([]);
    const {
      action,
      fileUrls,
      limit,
      multiple,
      tip,
      type,
      disabled
    } = (0,reactivity_esm_bundler/* toRefs */.QW)(props);
    const dialogImageUrl = (0,reactivity_esm_bundler/* ref */.KR)('');
    const dialogVisible = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const uploadHeaders = (0,reactivity_esm_bundler/* ref */.KR)({});
    (0,runtime_core_esm_bundler/* watch */.wB)(fileUrls, () => {
      init();
    });
    // // methods

    //移除
    const handleRemove = e => {
      fileUrlList.value.splice(e.uid - 1, 1);
      fileUrlsChange(fileUrlList.value);
      emit('change', fileUrlList.value.join(','));
    };
    //查看图片
    const handlePictureCardPreview = e => {
      dialogImageUrl.value = e.url;
      dialogVisible.value = true;
    };
    //成功回调
    const uploadSuccess = (e, file, fileList) => {
      fileUrlList.value.push("file/" + e.file);
      fileUrlsChange(fileUrlList.value);
      emit('change', fileUrlList.value.join(','));
    };
    const uploadError = e => {
      context?.$toolUtil.message('上传失败', 'error');
    };
    const uploadPreview = e => {
      window.open(e.url);
    };
    //处理上传图片
    const fileUrlsChange = list => {
      var token = context?.$toolUtil.storageGet("token");
      var list1 = [];
      var list2 = [];
      list.forEach(function (item, index) {
        var url = item.split("?")[0];
        var file;
        if (!url.startsWith("http")) {
          var url1 = context?.$config.url + url;
          var name = item.match(/(?<=\/)(\w|\W)+$/)[0];
          file = {
            name: name,
            url: url1 + "?token=" + token,
            uid: index + 1
          };
        } else {
          file = {
            name: url,
            url: url,
            uid: index + 1
          };
        }
        list1.push(file);
        list2.push(url);
      });
      fileList.value = list1;
      fileUrlList.value = list2;
    };
    //超出数量
    const uploadExceed = () => {
      context?.$toolUtil.message(`最多上传${limit.value}个文件`, 'error');
    };
    //created
    const init = () => {
      uploadUrl.value = context?.$config.name + '/' + action.value;
      uploadHeaders.value = {
        'Token': context?.$toolUtil.storageGet("Token")
      };
      if (tip.value) {
        tips.value = tip.value;
      }
      let list = [];
      if (fileUrls.value) {
        list = fileUrls.value.split(',');
      }
      fileUrlsChange(list);
    };
    init();
    return (_ctx, _cache) => {
      const _component_Plus = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("Plus");
      const _component_el_icon = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-icon");
      const _component_zoom_in = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("zoom-in");
      const _component_Delete = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("Delete");
      const _component_el_upload = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-upload");
      const _component_upload_filled = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("upload-filled");
      const _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-dialog");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", null, [(0,reactivity_esm_bundler/* unref */.R1)(type) == 'img' ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_upload, {
        key: 0,
        class: (0,shared_esm_bundler/* normalizeClass */.C4)(["img-uploader", {
          'maxCount': fileUrlList.value.length == (0,reactivity_esm_bundler/* unref */.R1)(limit)
        }]),
        action: uploadUrl.value,
        "list-type": "picture-card",
        limit: (0,reactivity_esm_bundler/* unref */.R1)(limit),
        multiple: (0,reactivity_esm_bundler/* unref */.R1)(multiple),
        "file-list": fileList.value,
        "onUpdate:fileList": _cache[0] || (_cache[0] = $event => fileList.value = $event),
        "on-success": uploadSuccess,
        "on-exceed": uploadExceed,
        disabled: (0,reactivity_esm_bundler/* unref */.R1)(disabled),
        headers: uploadHeaders.value,
        accept: "image/*"
      }, (0,runtime_core_esm_bundler/* createSlots */.eX)({
        file: (0,runtime_core_esm_bundler/* withCtx */.k6)(({
          file
        }) => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", uploadvue_type_script_setup_true_lang_js_hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("img", {
          class: "el-upload-list__item-thumbnail",
          src: file.url,
          alt: "",
          style: {
            "object-fit": "cover"
          }
        }, null, 8, uploadvue_type_script_setup_true_lang_js_hoisted_2), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", uploadvue_type_script_setup_true_lang_js_hoisted_3, [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("span", {
          class: "el-upload-list__item-preview",
          onClick: $event => handlePictureCardPreview(file)
        }, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_icon, null, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_zoom_in)]),
          _: 1
        })], 8, uploadvue_type_script_setup_true_lang_js_hoisted_4), !(0,reactivity_esm_bundler/* unref */.R1)(disabled) ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("span", {
          key: 0,
          class: "el-upload-list__item-delete",
          onClick: $event => handleRemove(file)
        }, [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_icon, null, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_Delete)]),
          _: 1
        })], 8, uploadvue_type_script_setup_true_lang_js_hoisted_5)) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)])])]),
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_icon, null, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_Plus)]),
          _: 1
        })]),
        _: 2
      }, [!(0,reactivity_esm_bundler/* unref */.R1)(disabled) ? {
        name: "tip",
        fn: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", uploadvue_type_script_setup_true_lang_js_hoisted_6, (0,shared_esm_bundler/* toDisplayString */.v_)(tips.value), 1)]),
        key: "0"
      } : undefined]), 1032, ["class", "action", "limit", "multiple", "file-list", "disabled", "headers"])) : ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_upload, {
        key: 1,
        class: "upload-demo",
        drag: "",
        action: uploadUrl.value,
        headers: uploadHeaders.value,
        limit: (0,reactivity_esm_bundler/* unref */.R1)(limit),
        multiple: (0,reactivity_esm_bundler/* unref */.R1)(multiple),
        "file-list": fileList.value,
        "onUpdate:fileList": _cache[1] || (_cache[1] = $event => fileList.value = $event),
        "on-preview": uploadPreview,
        "on-success": uploadSuccess,
        "on-error": uploadError,
        "on-exceed": uploadExceed,
        "on-remove": handleRemove,
        disabled: (0,reactivity_esm_bundler/* unref */.R1)(disabled)
      }, {
        tip: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", uploadvue_type_script_setup_true_lang_js_hoisted_7, (0,shared_esm_bundler/* toDisplayString */.v_)(tips.value), 1)]),
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_icon, {
          class: "el-icon--upload"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createVNode */.bF)(_component_upload_filled)]),
          _: 1
        }), _cache[3] || (_cache[3] = (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("div", {
          class: "el-upload__text"
        }, [(0,runtime_core_esm_bundler/* createTextVNode */.eW)(" 将文件拖到此处，或"), (0,runtime_core_esm_bundler/* createElementVNode */.Lk)("em", null, "点击上传")], -1))]),
        _: 1,
        __: [3]
      }, 8, ["action", "headers", "limit", "multiple", "file-list", "disabled"])), (0,runtime_core_esm_bundler/* createVNode */.bF)(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => dialogVisible.value = $event),
        width: "60%"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,runtime_core_esm_bundler/* createElementVNode */.Lk)("img", {
          "w-full": "",
          src: dialogImageUrl.value,
          alt: "Preview Image",
          style: {
            "width": "100%"
          }
        }, null, 8, uploadvue_type_script_setup_true_lang_js_hoisted_8)]),
        _: 1
      }, 8, ["modelValue"])]);
    };
  }
});
;// ./src/components/upload.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/upload.vue?vue&type=style&index=0&id=31c8a0d4&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/upload.vue?vue&type=style&index=0&id=31c8a0d4&lang=css

;// ./src/components/upload.vue



;

const upload_exports_ = uploadvue_type_script_setup_true_lang_js;

/* harmony default export */ var upload = (upload_exports_);
// EXTERNAL MODULE: ./node_modules/swiper/vue/swiper-vue.js + 11 modules
var swiper_vue = __webpack_require__(8892);
// EXTERNAL MODULE: ./node_modules/swiper/swiper.esm.js + 91 modules
var swiper_esm = __webpack_require__(9025);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/mySwiper/index.vue?vue&type=script&setup=true&lang=js

const mySwipervue_type_script_setup_true_lang_js_hoisted_1 = {
  style: {
    "width": "100%"
  }
};














/* harmony default export */ var mySwipervue_type_script_setup_true_lang_js = ({
  __name: 'index',
  props: {
    type: {
      type: Number,
      default: 1
    },
    //循环播放
    loop: {
      type: Boolean,
      default: false
    },
    //左右按钮
    navigation: {
      type: Boolean,
      default: true
    },
    //底部点
    pagination: {
      type: Boolean,
      default: true
    },
    //滚动条
    scrollbar: {
      type: Boolean,
      default: false
    },
    //同时显示几张图 
    slidesPerView: {
      type: Number,
      default: 3
    },
    //间隔 
    spaceBetween: {
      type: Number,
      default: 30
    },
    //自动高度
    autoHeight: {
      type: Boolean,
      default: false
    },
    //橱窗模式 //与loop不适合一起用
    centeredSlides: {
      type: Boolean,
      default: false
    },
    //自由模式
    freeMode: {
      type: Boolean,
      default: false
    },
    //底部点类型 1、默认。2、动态。3、进度条。4、数字。5、圆圈数字。
    paginationType: {
      type: Number,
      default: 1
    },
    //效果 0、默认。1、褪色。2、3d覆盖。3、3d立方体。4、3d翻转。5、切牌。6、缩小切换。7、替换。8、上下翻转切换。9、滚动切换。10、翻书
    effectType: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: []
    },
    //横向竖向
    direction: {
      type: String,
      default: 'horizontal'
    },
    //自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    slidesPerColumn: {
      type: Number,
      default: 1
    }
  },
  setup(__props) {
    const props = __props;
    const swiperModules = (0,reactivity_esm_bundler/* ref */.KR)([]);
    //多种底部点类型
    const paginationEnd = (0,reactivity_esm_bundler/* ref */.KR)(null);
    const bulletRenderer = (index, className) => {
      const _className = `${className} swiper-pagination-bullet-custom`;
      return `<span class="${_className}">${index + 1}</span>`;
    };
    //滚动条
    const scrollbarEnd = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const {
      type,
      loop,
      navigation,
      pagination,
      scrollbar,
      paginationType,
      spaceBetween,
      autoHeight,
      slidesPerView,
      centeredSlides,
      freeMode,
      effectType,
      data,
      direction,
      autoplay,
      slidesPerColumn
    } = (0,reactivity_esm_bundler/* toRefs */.QW)(props);
    const init = () => {
      //是否展示左右按钮
      navigationChange();
      //底部点类型
      paginationChange();
      //滚动条
      scrollbarChange();
      //自由模式
      freeModeChange();
      //切换动画
      effectTypeChange();
      //自动播放
      autoplayChange();
      // 网格状
      gridChange();
    };
    //是否展示左右按钮
    const navigationChange = () => {
      if (navigation.value) {
        swiperModules.value.push(swiper_esm/* Navigation */.Vx);
      }
    };
    //底部点类型
    const paginationChange = () => {
      if (pagination.value) {
        swiperModules.value.push(swiper_esm/* Pagination */.dK);
        if (paginationType.value == 1) {
          paginationEnd.value = true;
        } else if (paginationType.value == 2) {
          paginationEnd.value = {
            clickable: true,
            dynamicBullets: true
          };
        } else if (paginationType.value == 3) {
          paginationEnd.value = {
            type: 'progressbar'
          };
        } else if (paginationType.value == 4) {
          paginationEnd.value = {
            type: 'fraction'
          };
        } else if (paginationType.value == 5) {
          paginationEnd.value = {
            clickable: true,
            renderBullet: bulletRenderer
          };
        }
      } else {
        paginationEnd.value = false;
      }
    };
    //滚动条
    const scrollbarChange = () => {
      if (scrollbar.value) {
        swiperModules.value.push(swiper_esm/* Scrollbar */.Ze);
        scrollbarEnd.value = {
          hide: true
        };
      }
    };
    //自由模式
    const freeModeChange = () => {
      if (freeMode.value) {
        swiperModules.value.push(swiper_esm/* FreeMode */.U1);
      }
    };
    //切换动画
    const effectEnd = (0,reactivity_esm_bundler/* ref */.KR)('');
    const coverflowEffect = (0,reactivity_esm_bundler/* ref */.KR)({});
    const cubeEffect = (0,reactivity_esm_bundler/* ref */.KR)({});
    const creativeEffect = (0,reactivity_esm_bundler/* ref */.KR)({});
    const effectTypeChange = () => {
      if (effectType.value == 1) {
        effectEnd.value = 'fade';
        swiperModules.value.push(swiper_esm/* EffectFade */._R);
      } else if (effectType.value == 2) {
        effectEnd.value = 'coverflow';
        swiperModules.value.push(swiper_esm/* EffectCoverflow */.t9);
        coverflowEffect.value = {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        };
      } else if (effectType.value == 3) {
        effectEnd.value = 'cube';
        swiperModules.value.push(swiper_esm/* EffectCube */.hw);
        cubeEffect.value = {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        };
      } else if (effectType.value == 4) {
        effectEnd.value = 'flip';
        swiperModules.value.push(swiper_esm/* EffectFlip */.n);
      } else if (effectType.value == 5) {
        effectEnd.value = 'creative';
        swiperModules.value.push(swiper_esm/* EffectCreative */.$j);
        creativeEffect.value = {
          prev: {
            shadow: true,
            translate: [0, 0, -400]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        };
      } else if (effectType.value == 6) {
        effectEnd.value = 'creative';
        swiperModules.value.push(swiper_esm/* EffectCreative */.$j);
        creativeEffect.value = {
          prev: {
            shadow: true,
            translate: ['-120%', 0, -500]
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500]
          }
        };
      } else if (effectType.value == 7) {
        effectEnd.value = 'creative';
        swiperModules.value.push(swiper_esm/* EffectCreative */.$j);
        creativeEffect.value = {
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        };
      } else if (effectType.value == 8) {
        effectEnd.value = 'creative';
        swiperModules.value.push(swiper_esm/* EffectCreative */.$j);
        creativeEffect.value = {
          prev: {
            shadow: true,
            translate: [0, 0, -800],
            rotate: [180, 0, 0]
          },
          next: {
            shadow: true,
            translate: [0, 0, -800],
            rotate: [-180, 0, 0]
          }
        };
      } else if (effectType.value == 9) {
        effectEnd.value = 'creative';
        swiperModules.value.push(swiper_esm/* EffectCreative */.$j);
        creativeEffect.value = {
          prev: {
            shadow: true,
            translate: ['-125%', 0, -800],
            rotate: [0, 0, -90]
          },
          next: {
            shadow: true,
            translate: ['125%', 0, -800],
            rotate: [0, 0, 90]
          }
        };
      } else if (effectType.value == 10) {
        effectEnd.value = 'creative';
        swiperModules.value.push(swiper_esm/* EffectCreative */.$j);
        creativeEffect.value = {
          prev: {
            shadow: true,
            origin: 'left center',
            translate: ['-5%', 0, -200],
            rotate: [0, 100, 0]
          },
          next: {
            origin: 'right center',
            translate: ['5%', 0, -200],
            rotate: [0, -100, 0]
          }
        };
      }
    };
    //自动播放
    const autoplayEnd = (0,reactivity_esm_bundler/* ref */.KR)(false);
    const autoplayChange = () => {
      if (autoplay.value) {
        autoplayEnd.value = {
          delay: 2500,
          disableOnInteraction: false
        };
        swiperModules.value.push(swiper_esm/* Autoplay */.Ij);
      }
    };
    const gridEnd = (0,reactivity_esm_bundler/* ref */.KR)({
      rows: 1,
      fill: 'row'
    });
    const gridChange = () => {
      gridEnd.value.rows = slidesPerColumn.value;
      swiperModules.value.push(swiper_esm/* Grid */.xA);
    };
    init();
    return (_ctx, _cache) => {
      const _component_el_image = (0,runtime_core_esm_bundler/* resolveComponent */.g2)("el-image");
      return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createElementBlock */.CE)("div", mySwipervue_type_script_setup_true_lang_js_hoisted_1, [(0,reactivity_esm_bundler/* unref */.R1)(data) && (0,reactivity_esm_bundler/* unref */.R1)(data).length ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)((0,reactivity_esm_bundler/* unref */.R1)(swiper_vue/* Swiper */.RC), {
        key: 0,
        class: "swiper",
        loop: (0,reactivity_esm_bundler/* unref */.R1)(loop),
        modules: swiperModules.value,
        navigation: (0,reactivity_esm_bundler/* unref */.R1)(navigation),
        pagination: paginationEnd.value,
        scrollbar: scrollbarEnd.value,
        "space-between": (0,reactivity_esm_bundler/* unref */.R1)(spaceBetween),
        "auto-height": (0,reactivity_esm_bundler/* unref */.R1)(autoHeight),
        "slides-per-view": (0,reactivity_esm_bundler/* unref */.R1)(slidesPerView),
        "centered-slides": (0,reactivity_esm_bundler/* unref */.R1)(centeredSlides),
        "free-mode": (0,reactivity_esm_bundler/* unref */.R1)(freeMode),
        effect: effectEnd.value,
        "coverflow-effect": coverflowEffect.value,
        "cube-effect": cubeEffect.value,
        "creative-effect": creativeEffect.value,
        direction: (0,reactivity_esm_bundler/* unref */.R1)(direction),
        autoplay: autoplayEnd.value,
        grid: gridEnd.value
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [((0,runtime_core_esm_bundler/* openBlock */.uX)(true), (0,runtime_core_esm_bundler/* createElementBlock */.CE)(runtime_core_esm_bundler/* Fragment */.FK, null, (0,runtime_core_esm_bundler/* renderList */.pI)((0,reactivity_esm_bundler/* unref */.R1)(data), (item, index) => {
          return (0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)((0,reactivity_esm_bundler/* unref */.R1)(swiper_vue/* SwiperSlide */.qr), {
            class: "slide",
            key: index
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.k6)(() => [(0,reactivity_esm_bundler/* unref */.R1)(type) == 1 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_image, {
              key: 0,
              style: {
                "width": "100%"
              },
              src: item.value ? _ctx.$config.url + item.value : ''
            }, null, 8, ["src"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), (0,reactivity_esm_bundler/* unref */.R1)(type) == 2 ? ((0,runtime_core_esm_bundler/* openBlock */.uX)(), (0,runtime_core_esm_bundler/* createBlock */.Wv)(_component_el_image, {
              key: 1,
              style: {
                "width": "100%"
              },
              src: item ? _ctx.$config.url + item : ''
            }, null, 8, ["src"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true), (0,reactivity_esm_bundler/* unref */.R1)(type) == 3 ? (0,runtime_core_esm_bundler/* renderSlot */.RG)(_ctx.$slots, "default", {
              key: 2,
              row: item,
              index: index
            }) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)]),
            _: 2
          }, 1024);
        }), 128))]),
        _: 3
      }, 8, ["loop", "modules", "navigation", "pagination", "scrollbar", "space-between", "auto-height", "slides-per-view", "centered-slides", "free-mode", "effect", "coverflow-effect", "cube-effect", "creative-effect", "direction", "autoplay", "grid"])) : (0,runtime_core_esm_bundler/* createCommentVNode */.Q3)("", true)]);
    };
  }
});
;// ./src/components/mySwiper/index.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/mySwiper/index.vue?vue&type=style&index=0&id=5915114d&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/components/mySwiper/index.vue?vue&type=style&index=0&id=5915114d&lang=scss

;// ./src/components/mySwiper/index.vue



;

const mySwiper_exports_ = mySwipervue_type_script_setup_true_lang_js;

/* harmony default export */ var mySwiper = (mySwiper_exports_);
// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js
var vue_runtime_esm_bundler = __webpack_require__(8756);
;// ./src/main.js







const app = (0,runtime_dom_esm_bundler/* createApp */.Ef)(App);
app.config.warnHandler = () => null;

//地图


(0,injected_amap_api_instance/* initAMapApiLoader */.r)({
  key: "c4ae6ed30bc3f01acf60971dd5d65e7b",
  //高德key
  securityJsCode: '4d49f68235e05c86c862eeb230ddfc05',
  //高德安全密钥
  plugins: ["AMap.Autocomplete", "AMap.PlaceSearch", "AMap.Scale", "AMap.OverView", "AMap.ToolBar", "AMap.MapType", "AMap.PolyEditor", "AMap.CircleEditor", "AMap.Geocoder", "AMap.Geolocation", "AMap.Marker", "AMap.Driving"]
});
app.use(defaults/* default */.A);

//富文本

app.component('editor', Editor);
//上传组件

app.component('uploads', upload);
//轮播图

app.component('mySwiper', mySwiper);

// 基础配置

//公共方法

app.config.globalProperties.$config = utils_config.get();
app.config.globalProperties.$project = utils_config.getProjectName();
app.config.globalProperties.$toolUtil = toolUtil/* default */.A;
app.config.globalProperties.$http = utils_http; // ajax请求方法

app.use(store);
app.use(src_router);

window.Vue = vue_runtime_esm_bundler;
function loadElementPlus() {
  // 加载Element-plus
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'http://clfile.zggen.cn/20251114/c7545bbab1504da0b6be2f2d2471c87e.js';
    script.onload = () => {
      // 等待下一个 tick，确保 Element Plus 内部组件注册完成
      setTimeout(() => {
        app.use(window.ElementPlus, {
          locale: ElementPlusLocaleZhCn // 国际化
        });
        // 全局字段
        window.ElLoading = ElementPlus.ElLoading;
        window.ElMessage = ElementPlus.ElMessage;
        window.ElMessageBox = ElementPlus.ElMessageBox;
        window.ElNotification = ElementPlus.ElNotification;
        resolve();
      }, 0);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
function loadIcons() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'http://clfile.zggen.cn/20251114/3f6d667b307e408d93ac93092a0b01e6.js';
    script.onload = () => {
      setTimeout(() => {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
          app.component(key, component);
        }
        resolve();
      }, 0);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
async function mount() {
  await loadElementPlus();
  await loadIcons();
  app.mount('#app');
}
mount();

/***/ }),

/***/ 2087:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3725);
__webpack_require__(3164);
;
(function (root, factory) {
  if (true) {
    // CommonJS
    module.exports = exports = factory();
  } else // removed by dead control flow
{}
})(this, function () {
  /**
   * CryptoJS core components.
   */
  var CryptoJS = CryptoJS || function (Math, undefined) {
    /*
     * Local polyfil of Object.create
     */
    var create = Object.create || function () {
      function F() {}
      ;
      return function (obj) {
        var subtype;
        F.prototype = obj;
        subtype = new F();
        F.prototype = null;
        return subtype;
      };
    }();

    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = function () {
      return {
        /**
         * Creates a new object that inherits from this object.
         *
         * @param {Object} overrides Properties to copy into the new object.
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         field: 'value',
         *
         *         method: function () {
         *         }
         *     });
         */
        extend: function (overrides) {
          // Spawn
          var subtype = create(this);

          // Augment
          if (overrides) {
            subtype.mixIn(overrides);
          }

          // Create default initializer
          if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
            subtype.init = function () {
              subtype.$super.init.apply(this, arguments);
            };
          }

          // Initializer's prototype is the subtype object
          subtype.init.prototype = subtype;

          // Reference supertype
          subtype.$super = this;
          return subtype;
        },
        /**
         * Extends this object and runs the init method.
         * Arguments to create() will be passed to init().
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var instance = MyType.create();
         */
        create: function () {
          var instance = this.extend();
          instance.init.apply(instance, arguments);
          return instance;
        },
        /**
         * Initializes a newly created object.
         * Override this method to add some logic when your objects are created.
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         init: function () {
         *             // ...
         *         }
         *     });
         */
        init: function () {},
        /**
         * Copies properties into this object.
         *
         * @param {Object} properties The properties to mix in.
         *
         * @example
         *
         *     MyType.mixIn({
         *         field: 'value'
         *     });
         */
        mixIn: function (properties) {
          for (var propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
              this[propertyName] = properties[propertyName];
            }
          }

          // IE won't copy toString using the loop above
          if (properties.hasOwnProperty('toString')) {
            this.toString = properties.toString;
          }
        },
        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = instance.clone();
         */
        clone: function () {
          return this.init.prototype.extend(this);
        }
      };
    }();

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
      /**
       * Initializes a newly created word array.
       *
       * @param {Array} words (Optional) An array of 32-bit words.
       * @param {number} sigBytes (Optional) The number of significant bytes in the words.
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.create();
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
       */
      init: function (words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 4;
        }
      },
      /**
       * Converts this word array to a string.
       *
       * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
       *
       * @return {string} The stringified word array.
       *
       * @example
       *
       *     var string = wordArray + '';
       *     var string = wordArray.toString();
       *     var string = wordArray.toString(CryptoJS.enc.Utf8);
       */
      toString: function (encoder) {
        return (encoder || Hex).stringify(this);
      },
      /**
       * Concatenates a word array to this word array.
       *
       * @param {WordArray} wordArray The word array to append.
       *
       * @return {WordArray} This word array.
       *
       * @example
       *
       *     wordArray1.concat(wordArray2);
       */
      concat: function (wordArray) {
        // Shortcuts
        var thisWords = this.words;
        var thatWords = wordArray.words;
        var thisSigBytes = this.sigBytes;
        var thatSigBytes = wordArray.sigBytes;

        // Clamp excess bits
        this.clamp();

        // Concat
        if (thisSigBytes % 4) {
          // Copy one byte at a time
          for (var i = 0; i < thatSigBytes; i++) {
            var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
          }
        } else {
          // Copy one word at a time
          for (var i = 0; i < thatSigBytes; i += 4) {
            thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
          }
        }
        this.sigBytes += thatSigBytes;

        // Chainable
        return this;
      },
      /**
       * Removes insignificant bits.
       *
       * @example
       *
       *     wordArray.clamp();
       */
      clamp: function () {
        // Shortcuts
        var words = this.words;
        var sigBytes = this.sigBytes;

        // Clamp
        words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
        words.length = Math.ceil(sigBytes / 4);
      },
      /**
       * Creates a copy of this word array.
       *
       * @return {WordArray} The clone.
       *
       * @example
       *
       *     var clone = wordArray.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);
        clone.words = this.words.slice(0);
        return clone;
      },
      /**
       * Creates a word array filled with random bytes.
       *
       * @param {number} nBytes The number of random bytes to generate.
       *
       * @return {WordArray} The random word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.random(16);
       */
      random: function (nBytes) {
        var words = [];
        var r = function (m_w) {
          var m_w = m_w;
          var m_z = 0x3ade68b1;
          var mask = 0xffffffff;
          return function () {
            m_z = 0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10) & mask;
            m_w = 0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10) & mask;
            var result = (m_z << 0x10) + m_w & mask;
            result /= 0x100000000;
            result += 0.5;
            return result * (Math.random() > .5 ? 1 : -1);
          };
        };
        for (var i = 0, rcache; i < nBytes; i += 4) {
          var _r = r((rcache || Math.random()) * 0x100000000);
          rcache = _r() * 0x3ade67b7;
          words.push(_r() * 0x100000000 | 0);
        }
        return new WordArray.init(words, nBytes);
      }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
      /**
       * Converts a word array to a hex string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The hex string.
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          hexChars.push((bite >>> 4).toString(16));
          hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
      },
      /**
       * Converts a hex string to a word array.
       *
       * @param {string} hexStr The hex string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
       */
      parse: function (hexStr) {
        // Shortcut
        var hexStrLength = hexStr.length;

        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
          words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
        }
        return new WordArray.init(words, hexStrLength / 2);
      }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
      /**
       * Converts a word array to a Latin1 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Latin1 string.
       *
       * @static
       *
       * @example
       *
       *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
      },
      /**
       * Converts a Latin1 string to a word array.
       *
       * @param {string} latin1Str The Latin1 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
       */
      parse: function (latin1Str) {
        // Shortcut
        var latin1StrLength = latin1Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
          words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
        }
        return new WordArray.init(words, latin1StrLength);
      }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
      /**
       * Converts a word array to a UTF-8 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-8 string.
       *
       * @static
       *
       * @example
       *
       *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
       */
      stringify: function (wordArray) {
        try {
          return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        } catch (e) {
          throw new Error('Malformed UTF-8 data');
        }
      },
      /**
       * Converts a UTF-8 string to a word array.
       *
       * @param {string} utf8Str The UTF-8 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
       */
      parse: function (utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
      }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
      /**
       * Resets this block algorithm's data buffer to its initial state.
       *
       * @example
       *
       *     bufferedBlockAlgorithm.reset();
       */
      reset: function () {
        // Initial values
        this._data = new WordArray.init();
        this._nDataBytes = 0;
      },
      /**
       * Adds new data to this block algorithm's buffer.
       *
       * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
       *
       * @example
       *
       *     bufferedBlockAlgorithm._append('data');
       *     bufferedBlockAlgorithm._append(wordArray);
       */
      _append: function (data) {
        // Convert string to WordArray, else assume WordArray already
        if (typeof data == 'string') {
          data = Utf8.parse(data);
        }

        // Append
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
      },
      /**
       * Processes available data blocks.
       *
       * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
       *
       * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
       *
       * @return {WordArray} The processed data.
       *
       * @example
       *
       *     var processedData = bufferedBlockAlgorithm._process();
       *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
       */
      _process: function (doFlush) {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var dataSigBytes = data.sigBytes;
        var blockSize = this.blockSize;
        var blockSizeBytes = blockSize * 4;

        // Count blocks ready
        var nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
          // Round up to include partial blocks
          nBlocksReady = Math.ceil(nBlocksReady);
        } else {
          // Round down to include only full blocks,
          // less the number of blocks that must remain in the buffer
          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }

        // Count words ready
        var nWordsReady = nBlocksReady * blockSize;

        // Count bytes ready
        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

        // Process blocks
        if (nWordsReady) {
          for (var offset = 0; offset < nWordsReady; offset += blockSize) {
            // Perform concrete-algorithm logic
            this._doProcessBlock(dataWords, offset);
          }

          // Remove processed words
          var processedWords = dataWords.splice(0, nWordsReady);
          data.sigBytes -= nBytesReady;
        }

        // Return processed words
        return new WordArray.init(processedWords, nBytesReady);
      },
      /**
       * Creates a copy of this object.
       *
       * @return {Object} The clone.
       *
       * @example
       *
       *     var clone = bufferedBlockAlgorithm.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);
        clone._data = this._data.clone();
        return clone;
      },
      _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
      /**
       * Configuration options.
       */
      cfg: Base.extend(),
      /**
       * Initializes a newly created hasher.
       *
       * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
       *
       * @example
       *
       *     var hasher = CryptoJS.algo.SHA256.create();
       */
      init: function (cfg) {
        // Apply config defaults
        this.cfg = this.cfg.extend(cfg);

        // Set initial values
        this.reset();
      },
      /**
       * Resets this hasher to its initial state.
       *
       * @example
       *
       *     hasher.reset();
       */
      reset: function () {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-hasher logic
        this._doReset();
      },
      /**
       * Updates this hasher with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {Hasher} This hasher.
       *
       * @example
       *
       *     hasher.update('message');
       *     hasher.update(wordArray);
       */
      update: function (messageUpdate) {
        // Append
        this._append(messageUpdate);

        // Update the hash
        this._process();

        // Chainable
        return this;
      },
      /**
       * Finalizes the hash computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The hash.
       *
       * @example
       *
       *     var hash = hasher.finalize();
       *     var hash = hasher.finalize('message');
       *     var hash = hasher.finalize(wordArray);
       */
      finalize: function (messageUpdate) {
        // Final message update
        if (messageUpdate) {
          this._append(messageUpdate);
        }

        // Perform concrete-hasher logic
        var hash = this._doFinalize();
        return hash;
      },
      blockSize: 512 / 32,
      /**
       * Creates a shortcut function to a hasher's object interface.
       *
       * @param {Hasher} hasher The hasher to create a helper for.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
       */
      _createHelper: function (hasher) {
        return function (message, cfg) {
          return new hasher.init(cfg).finalize(message);
        };
      },
      /**
       * Creates a shortcut function to the HMAC's object interface.
       *
       * @param {Hasher} hasher The hasher to use in this HMAC helper.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
       */
      _createHmacHelper: function (hasher) {
        return function (message, key) {
          return new C_algo.HMAC.init(hasher, key).finalize(message);
        };
      }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};
    return C;
  }(Math);
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
      /**
       * Converts a word array to a Base64 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Base64 string.
       *
       * @static
       *
       * @example
       *
       *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;
        var map = this._map;

        // Clamp excess bits
        wordArray.clamp();

        // Convert
        var base64Chars = [];
        for (var i = 0; i < sigBytes; i += 3) {
          var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
          var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
          var triplet = byte1 << 16 | byte2 << 8 | byte3;
          for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
            base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
          }
        }

        // Add padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          while (base64Chars.length % 4) {
            base64Chars.push(paddingChar);
          }
        }
        return base64Chars.join('');
      },
      /**
       * Converts a Base64 string to a word array.
       *
       * @param {string} base64Str The Base64 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
       */
      parse: function (base64Str) {
        // Shortcuts
        var base64StrLength = base64Str.length;
        var map = this._map;
        var reverseMap = this._reverseMap;
        if (!reverseMap) {
          reverseMap = this._reverseMap = [];
          for (var j = 0; j < map.length; j++) {
            reverseMap[map.charCodeAt(j)] = j;
          }
        }

        // Ignore padding
        var paddingChar = map.charAt(64);
        if (paddingChar) {
          var paddingIndex = base64Str.indexOf(paddingChar);
          if (paddingIndex !== -1) {
            base64StrLength = paddingIndex;
          }
        }

        // Convert
        return parseLoop(base64Str, base64StrLength, reverseMap);
      },
      _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
    function parseLoop(base64Str, base64StrLength, reverseMap) {
      var words = [];
      var nBytes = 0;
      for (var i = 0; i < base64StrLength; i++) {
        if (i % 4) {
          var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
          var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
          words[nBytes >>> 2] |= (bits1 | bits2) << 24 - nBytes % 4 * 8;
          nBytes++;
        }
      }
      return WordArray.create(words, nBytes);
    }
  })();
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var T = [];

    // Compute constants
    (function () {
      for (var i = 0; i < 64; i++) {
        T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
      }
    })();

    /**
     * MD5 hash algorithm.
     */
    var MD5 = C_algo.MD5 = Hasher.extend({
      _doReset: function () {
        this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
      },
      _doProcessBlock: function (M, offset) {
        // Swap endian
        for (var i = 0; i < 16; i++) {
          // Shortcuts
          var offset_i = offset + i;
          var M_offset_i = M[offset_i];
          M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
        }

        // Shortcuts
        var H = this._hash.words;
        var M_offset_0 = M[offset + 0];
        var M_offset_1 = M[offset + 1];
        var M_offset_2 = M[offset + 2];
        var M_offset_3 = M[offset + 3];
        var M_offset_4 = M[offset + 4];
        var M_offset_5 = M[offset + 5];
        var M_offset_6 = M[offset + 6];
        var M_offset_7 = M[offset + 7];
        var M_offset_8 = M[offset + 8];
        var M_offset_9 = M[offset + 9];
        var M_offset_10 = M[offset + 10];
        var M_offset_11 = M[offset + 11];
        var M_offset_12 = M[offset + 12];
        var M_offset_13 = M[offset + 13];
        var M_offset_14 = M[offset + 14];
        var M_offset_15 = M[offset + 15];

        // Working varialbes
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];

        // Computation
        a = FF(a, b, c, d, M_offset_0, 7, T[0]);
        d = FF(d, a, b, c, M_offset_1, 12, T[1]);
        c = FF(c, d, a, b, M_offset_2, 17, T[2]);
        b = FF(b, c, d, a, M_offset_3, 22, T[3]);
        a = FF(a, b, c, d, M_offset_4, 7, T[4]);
        d = FF(d, a, b, c, M_offset_5, 12, T[5]);
        c = FF(c, d, a, b, M_offset_6, 17, T[6]);
        b = FF(b, c, d, a, M_offset_7, 22, T[7]);
        a = FF(a, b, c, d, M_offset_8, 7, T[8]);
        d = FF(d, a, b, c, M_offset_9, 12, T[9]);
        c = FF(c, d, a, b, M_offset_10, 17, T[10]);
        b = FF(b, c, d, a, M_offset_11, 22, T[11]);
        a = FF(a, b, c, d, M_offset_12, 7, T[12]);
        d = FF(d, a, b, c, M_offset_13, 12, T[13]);
        c = FF(c, d, a, b, M_offset_14, 17, T[14]);
        b = FF(b, c, d, a, M_offset_15, 22, T[15]);
        a = GG(a, b, c, d, M_offset_1, 5, T[16]);
        d = GG(d, a, b, c, M_offset_6, 9, T[17]);
        c = GG(c, d, a, b, M_offset_11, 14, T[18]);
        b = GG(b, c, d, a, M_offset_0, 20, T[19]);
        a = GG(a, b, c, d, M_offset_5, 5, T[20]);
        d = GG(d, a, b, c, M_offset_10, 9, T[21]);
        c = GG(c, d, a, b, M_offset_15, 14, T[22]);
        b = GG(b, c, d, a, M_offset_4, 20, T[23]);
        a = GG(a, b, c, d, M_offset_9, 5, T[24]);
        d = GG(d, a, b, c, M_offset_14, 9, T[25]);
        c = GG(c, d, a, b, M_offset_3, 14, T[26]);
        b = GG(b, c, d, a, M_offset_8, 20, T[27]);
        a = GG(a, b, c, d, M_offset_13, 5, T[28]);
        d = GG(d, a, b, c, M_offset_2, 9, T[29]);
        c = GG(c, d, a, b, M_offset_7, 14, T[30]);
        b = GG(b, c, d, a, M_offset_12, 20, T[31]);
        a = HH(a, b, c, d, M_offset_5, 4, T[32]);
        d = HH(d, a, b, c, M_offset_8, 11, T[33]);
        c = HH(c, d, a, b, M_offset_11, 16, T[34]);
        b = HH(b, c, d, a, M_offset_14, 23, T[35]);
        a = HH(a, b, c, d, M_offset_1, 4, T[36]);
        d = HH(d, a, b, c, M_offset_4, 11, T[37]);
        c = HH(c, d, a, b, M_offset_7, 16, T[38]);
        b = HH(b, c, d, a, M_offset_10, 23, T[39]);
        a = HH(a, b, c, d, M_offset_13, 4, T[40]);
        d = HH(d, a, b, c, M_offset_0, 11, T[41]);
        c = HH(c, d, a, b, M_offset_3, 16, T[42]);
        b = HH(b, c, d, a, M_offset_6, 23, T[43]);
        a = HH(a, b, c, d, M_offset_9, 4, T[44]);
        d = HH(d, a, b, c, M_offset_12, 11, T[45]);
        c = HH(c, d, a, b, M_offset_15, 16, T[46]);
        b = HH(b, c, d, a, M_offset_2, 23, T[47]);
        a = II(a, b, c, d, M_offset_0, 6, T[48]);
        d = II(d, a, b, c, M_offset_7, 10, T[49]);
        c = II(c, d, a, b, M_offset_14, 15, T[50]);
        b = II(b, c, d, a, M_offset_5, 21, T[51]);
        a = II(a, b, c, d, M_offset_12, 6, T[52]);
        d = II(d, a, b, c, M_offset_3, 10, T[53]);
        c = II(c, d, a, b, M_offset_10, 15, T[54]);
        b = II(b, c, d, a, M_offset_1, 21, T[55]);
        a = II(a, b, c, d, M_offset_8, 6, T[56]);
        d = II(d, a, b, c, M_offset_15, 10, T[57]);
        c = II(c, d, a, b, M_offset_6, 15, T[58]);
        b = II(b, c, d, a, M_offset_13, 21, T[59]);
        a = II(a, b, c, d, M_offset_4, 6, T[60]);
        d = II(d, a, b, c, M_offset_11, 10, T[61]);
        c = II(c, d, a, b, M_offset_2, 15, T[62]);
        b = II(b, c, d, a, M_offset_9, 21, T[63]);

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        var nBitsTotalL = nBitsTotal;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;
        data.sigBytes = (dataWords.length + 1) * 4;

        // Hash final blocks
        this._process();

        // Shortcuts
        var hash = this._hash;
        var H = hash.words;

        // Swap endian
        for (var i = 0; i < 4; i++) {
          // Shortcut
          var H_i = H[i];
          H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
        }

        // Return final computed hash
        return hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });
    function FF(a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }
    function GG(a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }
    function HH(a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }
    function II(a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + x + t;
      return (n << s | n >>> 32 - s) + b;
    }

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.MD5('message');
     *     var hash = CryptoJS.MD5(wordArray);
     */
    C.MD5 = Hasher._createHelper(MD5);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacMD5(message, key);
     */
    C.HmacMD5 = Hasher._createHmacHelper(MD5);
  })(Math);
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Reusable object
    var W = [];

    /**
     * SHA-1 hash algorithm.
     */
    var SHA1 = C_algo.SHA1 = Hasher.extend({
      _doReset: function () {
        this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
      },
      _doProcessBlock: function (M, offset) {
        // Shortcut
        var H = this._hash.words;

        // Working variables
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];

        // Computation
        for (var i = 0; i < 80; i++) {
          if (i < 16) {
            W[i] = M[offset + i] | 0;
          } else {
            var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = n << 1 | n >>> 31;
          }
          var t = (a << 5 | a >>> 27) + e + W[i];
          if (i < 20) {
            t += (b & c | ~b & d) + 0x5a827999;
          } else if (i < 40) {
            t += (b ^ c ^ d) + 0x6ed9eba1;
          } else if (i < 60) {
            t += (b & c | b & d | c & d) - 0x70e44324;
          } else /* if (i < 80) */{
              t += (b ^ c ^ d) - 0x359d3e2a;
            }
          e = d;
          d = c;
          c = b << 30 | b >>> 2;
          b = a;
          a = t;
        }

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA1('message');
     *     var hash = CryptoJS.SHA1(wordArray);
     */
    C.SHA1 = Hasher._createHelper(SHA1);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA1(message, key);
     */
    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
  })();
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Initialization and round constants tables
    var H = [];
    var K = [];

    // Compute constants
    (function () {
      function isPrime(n) {
        var sqrtN = Math.sqrt(n);
        for (var factor = 2; factor <= sqrtN; factor++) {
          if (!(n % factor)) {
            return false;
          }
        }
        return true;
      }
      function getFractionalBits(n) {
        return (n - (n | 0)) * 0x100000000 | 0;
      }
      var n = 2;
      var nPrime = 0;
      while (nPrime < 64) {
        if (isPrime(n)) {
          if (nPrime < 8) {
            H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
          }
          K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
          nPrime++;
        }
        n++;
      }
    })();

    // Reusable object
    var W = [];

    /**
     * SHA-256 hash algorithm.
     */
    var SHA256 = C_algo.SHA256 = Hasher.extend({
      _doReset: function () {
        this._hash = new WordArray.init(H.slice(0));
      },
      _doProcessBlock: function (M, offset) {
        // Shortcut
        var H = this._hash.words;

        // Working variables
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        var f = H[5];
        var g = H[6];
        var h = H[7];

        // Computation
        for (var i = 0; i < 64; i++) {
          if (i < 16) {
            W[i] = M[offset + i] | 0;
          } else {
            var gamma0x = W[i - 15];
            var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
            var gamma1x = W[i - 2];
            var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
            W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
          }
          var ch = e & f ^ ~e & g;
          var maj = a & b ^ a & c ^ b & c;
          var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
          var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
          var t1 = h + sigma1 + ch + K[i] + W[i];
          var t2 = sigma0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + t1 | 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 | 0;
        }

        // Intermediate hash value
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
        H[5] = H[5] + f | 0;
        H[6] = H[6] + g | 0;
        H[7] = H[7] + h | 0;
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA256('message');
     *     var hash = CryptoJS.SHA256(wordArray);
     */
    C.SHA256 = Hasher._createHelper(SHA256);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA256(message, key);
     */
    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
  })(Math);
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * UTF-16 BE encoding strategy.
     */
    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
      /**
       * Converts a word array to a UTF-16 BE string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-16 BE string.
       *
       * @static
       *
       * @example
       *
       *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
          var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff;
          utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join('');
      },
      /**
       * Converts a UTF-16 BE string to a word array.
       *
       * @param {string} utf16Str The UTF-16 BE string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
       */
      parse: function (utf16Str) {
        // Shortcut
        var utf16StrLength = utf16Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
          words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
        }
        return WordArray.create(words, utf16StrLength * 2);
      }
    };

    /**
     * UTF-16 LE encoding strategy.
     */
    C_enc.Utf16LE = {
      /**
       * Converts a word array to a UTF-16 LE string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-16 LE string.
       *
       * @static
       *
       * @example
       *
       *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var utf16Chars = [];
        for (var i = 0; i < sigBytes; i += 2) {
          var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 0xffff);
          utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join('');
      },
      /**
       * Converts a UTF-16 LE string to a word array.
       *
       * @param {string} utf16Str The UTF-16 LE string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
       */
      parse: function (utf16Str) {
        // Shortcut
        var utf16StrLength = utf16Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < utf16StrLength; i++) {
          words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
        }
        return WordArray.create(words, utf16StrLength * 2);
      }
    };
    function swapEndian(word) {
      return word << 8 & 0xff00ff00 | word >>> 8 & 0x00ff00ff;
    }
  })();
  (function () {
    // Check if typed arrays are supported
    if (typeof ArrayBuffer != 'function') {
      return;
    }

    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;

    // Reference original init
    var superInit = WordArray.init;

    // Augment WordArray.init to handle typed arrays
    var subInit = WordArray.init = function (typedArray) {
      // Convert buffers to uint8
      if (typedArray instanceof ArrayBuffer) {
        typedArray = new Uint8Array(typedArray);
      }

      // Convert other array views to uint8
      if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
        typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
      }

      // Handle Uint8Array
      if (typedArray instanceof Uint8Array) {
        // Shortcut
        var typedArrayByteLength = typedArray.byteLength;

        // Extract bytes
        var words = [];
        for (var i = 0; i < typedArrayByteLength; i++) {
          words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
        }

        // Initialize this word array
        superInit.call(this, words, typedArrayByteLength);
      } else {
        // Else call normal init
        superInit.apply(this, arguments);
      }
    };
    subInit.prototype = WordArray;
  })();

  /** @preserve
  (c) 2012 by Cédric Mesnil. All rights reserved.
  
  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
      - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */

  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_algo = C.algo;

    // Constants table
    var _zl = WordArray.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
    var _zr = WordArray.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
    var _sl = WordArray.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
    var _sr = WordArray.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
    var _hl = WordArray.create([0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
    var _hr = WordArray.create([0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

    /**
     * RIPEMD160 hash algorithm.
     */
    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
      _doReset: function () {
        this._hash = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
      },
      _doProcessBlock: function (M, offset) {
        // Swap endian
        for (var i = 0; i < 16; i++) {
          // Shortcuts
          var offset_i = offset + i;
          var M_offset_i = M[offset_i];

          // Swap
          M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
        }
        // Shortcut
        var H = this._hash.words;
        var hl = _hl.words;
        var hr = _hr.words;
        var zl = _zl.words;
        var zr = _zr.words;
        var sl = _sl.words;
        var sr = _sr.words;

        // Working variables
        var al, bl, cl, dl, el;
        var ar, br, cr, dr, er;
        ar = al = H[0];
        br = bl = H[1];
        cr = cl = H[2];
        dr = dl = H[3];
        er = el = H[4];
        // Computation
        var t;
        for (var i = 0; i < 80; i += 1) {
          t = al + M[offset + zl[i]] | 0;
          if (i < 16) {
            t += f1(bl, cl, dl) + hl[0];
          } else if (i < 32) {
            t += f2(bl, cl, dl) + hl[1];
          } else if (i < 48) {
            t += f3(bl, cl, dl) + hl[2];
          } else if (i < 64) {
            t += f4(bl, cl, dl) + hl[3];
          } else {
            // if (i<80) {
            t += f5(bl, cl, dl) + hl[4];
          }
          t = t | 0;
          t = rotl(t, sl[i]);
          t = t + el | 0;
          al = el;
          el = dl;
          dl = rotl(cl, 10);
          cl = bl;
          bl = t;
          t = ar + M[offset + zr[i]] | 0;
          if (i < 16) {
            t += f5(br, cr, dr) + hr[0];
          } else if (i < 32) {
            t += f4(br, cr, dr) + hr[1];
          } else if (i < 48) {
            t += f3(br, cr, dr) + hr[2];
          } else if (i < 64) {
            t += f2(br, cr, dr) + hr[3];
          } else {
            // if (i<80) {
            t += f1(br, cr, dr) + hr[4];
          }
          t = t | 0;
          t = rotl(t, sr[i]);
          t = t + er | 0;
          ar = er;
          er = dr;
          dr = rotl(cr, 10);
          cr = br;
          br = t;
        }
        // Intermediate hash value
        t = H[1] + cl + dr | 0;
        H[1] = H[2] + dl + er | 0;
        H[2] = H[3] + el + ar | 0;
        H[3] = H[4] + al + br | 0;
        H[4] = H[0] + bl + cr | 0;
        H[0] = t;
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 0x00ff00ff | (nBitsTotal << 24 | nBitsTotal >>> 8) & 0xff00ff00;
        data.sigBytes = (dataWords.length + 1) * 4;

        // Hash final blocks
        this._process();

        // Shortcuts
        var hash = this._hash;
        var H = hash.words;

        // Swap endian
        for (var i = 0; i < 5; i++) {
          // Shortcut
          var H_i = H[i];

          // Swap
          H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
        }

        // Return final computed hash
        return hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      }
    });
    function f1(x, y, z) {
      return x ^ y ^ z;
    }
    function f2(x, y, z) {
      return x & y | ~x & z;
    }
    function f3(x, y, z) {
      return (x | ~y) ^ z;
    }
    function f4(x, y, z) {
      return x & z | y & ~z;
    }
    function f5(x, y, z) {
      return x ^ (y | ~z);
    }
    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.RIPEMD160('message');
     *     var hash = CryptoJS.RIPEMD160(wordArray);
     */
    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
     */
    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
  })(Math);
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var C_algo = C.algo;

    /**
     * HMAC algorithm.
     */
    var HMAC = C_algo.HMAC = Base.extend({
      /**
       * Initializes a newly created HMAC.
       *
       * @param {Hasher} hasher The hash algorithm to use.
       * @param {WordArray|string} key The secret key.
       *
       * @example
       *
       *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
       */
      init: function (hasher, key) {
        // Init hasher
        hasher = this._hasher = new hasher.init();

        // Convert string to WordArray, else assume WordArray already
        if (typeof key == 'string') {
          key = Utf8.parse(key);
        }

        // Shortcuts
        var hasherBlockSize = hasher.blockSize;
        var hasherBlockSizeBytes = hasherBlockSize * 4;

        // Allow arbitrary length keys
        if (key.sigBytes > hasherBlockSizeBytes) {
          key = hasher.finalize(key);
        }

        // Clamp excess bits
        key.clamp();

        // Clone key for inner and outer pads
        var oKey = this._oKey = key.clone();
        var iKey = this._iKey = key.clone();

        // Shortcuts
        var oKeyWords = oKey.words;
        var iKeyWords = iKey.words;

        // XOR keys with pad constants
        for (var i = 0; i < hasherBlockSize; i++) {
          oKeyWords[i] ^= 0x5c5c5c5c;
          iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();
      },
      /**
       * Resets this HMAC to its initial state.
       *
       * @example
       *
       *     hmacHasher.reset();
       */
      reset: function () {
        // Shortcut
        var hasher = this._hasher;

        // Reset
        hasher.reset();
        hasher.update(this._iKey);
      },
      /**
       * Updates this HMAC with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {HMAC} This HMAC instance.
       *
       * @example
       *
       *     hmacHasher.update('message');
       *     hmacHasher.update(wordArray);
       */
      update: function (messageUpdate) {
        this._hasher.update(messageUpdate);

        // Chainable
        return this;
      },
      /**
       * Finalizes the HMAC computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The HMAC.
       *
       * @example
       *
       *     var hmac = hmacHasher.finalize();
       *     var hmac = hmacHasher.finalize('message');
       *     var hmac = hmacHasher.finalize(wordArray);
       */
      finalize: function (messageUpdate) {
        // Shortcut
        var hasher = this._hasher;

        // Compute HMAC
        var innerHash = hasher.finalize(messageUpdate);
        hasher.reset();
        var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
        return hmac;
      }
    });
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var SHA1 = C_algo.SHA1;
    var HMAC = C_algo.HMAC;

    /**
     * Password-Based Key Derivation Function 2 algorithm.
     */
    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
      /**
       * Configuration options.
       *
       * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
       * @property {Hasher} hasher The hasher to use. Default: SHA1
       * @property {number} iterations The number of iterations to perform. Default: 1
       */
      cfg: Base.extend({
        keySize: 128 / 32,
        hasher: SHA1,
        iterations: 1
      }),
      /**
       * Initializes a newly created key derivation function.
       *
       * @param {Object} cfg (Optional) The configuration options to use for the derivation.
       *
       * @example
       *
       *     var kdf = CryptoJS.algo.PBKDF2.create();
       *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
       *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
       */
      init: function (cfg) {
        this.cfg = this.cfg.extend(cfg);
      },
      /**
       * Computes the Password-Based Key Derivation Function 2.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       *
       * @return {WordArray} The derived key.
       *
       * @example
       *
       *     var key = kdf.compute(password, salt);
       */
      compute: function (password, salt) {
        // Shortcut
        var cfg = this.cfg;

        // Init HMAC
        var hmac = HMAC.create(cfg.hasher, password);

        // Initial values
        var derivedKey = WordArray.create();
        var blockIndex = WordArray.create([0x00000001]);

        // Shortcuts
        var derivedKeyWords = derivedKey.words;
        var blockIndexWords = blockIndex.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;

        // Generate key
        while (derivedKeyWords.length < keySize) {
          var block = hmac.update(salt).finalize(blockIndex);
          hmac.reset();

          // Shortcuts
          var blockWords = block.words;
          var blockWordsLength = blockWords.length;

          // Iterations
          var intermediate = block;
          for (var i = 1; i < iterations; i++) {
            intermediate = hmac.finalize(intermediate);
            hmac.reset();

            // Shortcut
            var intermediateWords = intermediate.words;

            // XOR intermediate with block
            for (var j = 0; j < blockWordsLength; j++) {
              blockWords[j] ^= intermediateWords[j];
            }
          }
          derivedKey.concat(block);
          blockIndexWords[0]++;
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
      }
    });

    /**
     * Computes the Password-Based Key Derivation Function 2.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @param {Object} cfg (Optional) The configuration options to use for this computation.
     *
     * @return {WordArray} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.PBKDF2(password, salt);
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.PBKDF2 = function (password, salt, cfg) {
      return PBKDF2.create(cfg).compute(password, salt);
    };
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var MD5 = C_algo.MD5;

    /**
     * This key derivation function is meant to conform with EVP_BytesToKey.
     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
     */
    var EvpKDF = C_algo.EvpKDF = Base.extend({
      /**
       * Configuration options.
       *
       * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
       * @property {Hasher} hasher The hash algorithm to use. Default: MD5
       * @property {number} iterations The number of iterations to perform. Default: 1
       */
      cfg: Base.extend({
        keySize: 128 / 32,
        hasher: MD5,
        iterations: 1
      }),
      /**
       * Initializes a newly created key derivation function.
       *
       * @param {Object} cfg (Optional) The configuration options to use for the derivation.
       *
       * @example
       *
       *     var kdf = CryptoJS.algo.EvpKDF.create();
       *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
       *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
       */
      init: function (cfg) {
        this.cfg = this.cfg.extend(cfg);
      },
      /**
       * Derives a key from a password.
       *
       * @param {WordArray|string} password The password.
       * @param {WordArray|string} salt A salt.
       *
       * @return {WordArray} The derived key.
       *
       * @example
       *
       *     var key = kdf.compute(password, salt);
       */
      compute: function (password, salt) {
        // Shortcut
        var cfg = this.cfg;

        // Init hasher
        var hasher = cfg.hasher.create();

        // Initial values
        var derivedKey = WordArray.create();

        // Shortcuts
        var derivedKeyWords = derivedKey.words;
        var keySize = cfg.keySize;
        var iterations = cfg.iterations;

        // Generate key
        while (derivedKeyWords.length < keySize) {
          if (block) {
            hasher.update(block);
          }
          var block = hasher.update(password).finalize(salt);
          hasher.reset();

          // Iterations
          for (var i = 1; i < iterations; i++) {
            block = hasher.finalize(block);
            hasher.reset();
          }
          derivedKey.concat(block);
        }
        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
      }
    });

    /**
     * Derives a key from a password.
     *
     * @param {WordArray|string} password The password.
     * @param {WordArray|string} salt A salt.
     * @param {Object} cfg (Optional) The configuration options to use for this computation.
     *
     * @return {WordArray} The derived key.
     *
     * @static
     *
     * @example
     *
     *     var key = CryptoJS.EvpKDF(password, salt);
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
     */
    C.EvpKDF = function (password, salt, cfg) {
      return EvpKDF.create(cfg).compute(password, salt);
    };
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_algo = C.algo;
    var SHA256 = C_algo.SHA256;

    /**
     * SHA-224 hash algorithm.
     */
    var SHA224 = C_algo.SHA224 = SHA256.extend({
      _doReset: function () {
        this._hash = new WordArray.init([0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4]);
      },
      _doFinalize: function () {
        var hash = SHA256._doFinalize.call(this);
        hash.sigBytes -= 4;
        return hash;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA224('message');
     *     var hash = CryptoJS.SHA224(wordArray);
     */
    C.SHA224 = SHA256._createHelper(SHA224);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA224(message, key);
     */
    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
  })();
  (function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var X32WordArray = C_lib.WordArray;

    /**
     * x64 namespace.
     */
    var C_x64 = C.x64 = {};

    /**
     * A 64-bit word.
     */
    var X64Word = C_x64.Word = Base.extend({
      /**
       * Initializes a newly created 64-bit word.
       *
       * @param {number} high The high 32 bits.
       * @param {number} low The low 32 bits.
       *
       * @example
       *
       *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
       */
      init: function (high, low) {
        this.high = high;
        this.low = low;
      }

      /**
       * Bitwise NOTs this word.
       *
       * @return {X64Word} A new x64-Word object after negating.
       *
       * @example
       *
       *     var negated = x64Word.not();
       */
      // not: function () {
      // var high = ~this.high;
      // var low = ~this.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Bitwise ANDs this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to AND with this word.
       *
       * @return {X64Word} A new x64-Word object after ANDing.
       *
       * @example
       *
       *     var anded = x64Word.and(anotherX64Word);
       */
      // and: function (word) {
      // var high = this.high & word.high;
      // var low = this.low & word.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Bitwise ORs this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to OR with this word.
       *
       * @return {X64Word} A new x64-Word object after ORing.
       *
       * @example
       *
       *     var ored = x64Word.or(anotherX64Word);
       */
      // or: function (word) {
      // var high = this.high | word.high;
      // var low = this.low | word.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Bitwise XORs this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to XOR with this word.
       *
       * @return {X64Word} A new x64-Word object after XORing.
       *
       * @example
       *
       *     var xored = x64Word.xor(anotherX64Word);
       */
      // xor: function (word) {
      // var high = this.high ^ word.high;
      // var low = this.low ^ word.low;

      // return X64Word.create(high, low);
      // },

      /**
       * Shifts this word n bits to the left.
       *
       * @param {number} n The number of bits to shift.
       *
       * @return {X64Word} A new x64-Word object after shifting.
       *
       * @example
       *
       *     var shifted = x64Word.shiftL(25);
       */
      // shiftL: function (n) {
      // if (n < 32) {
      // var high = (this.high << n) | (this.low >>> (32 - n));
      // var low = this.low << n;
      // } else {
      // var high = this.low << (n - 32);
      // var low = 0;
      // }

      // return X64Word.create(high, low);
      // },

      /**
       * Shifts this word n bits to the right.
       *
       * @param {number} n The number of bits to shift.
       *
       * @return {X64Word} A new x64-Word object after shifting.
       *
       * @example
       *
       *     var shifted = x64Word.shiftR(7);
       */
      // shiftR: function (n) {
      // if (n < 32) {
      // var low = (this.low >>> n) | (this.high << (32 - n));
      // var high = this.high >>> n;
      // } else {
      // var low = this.high >>> (n - 32);
      // var high = 0;
      // }

      // return X64Word.create(high, low);
      // },

      /**
       * Rotates this word n bits to the left.
       *
       * @param {number} n The number of bits to rotate.
       *
       * @return {X64Word} A new x64-Word object after rotating.
       *
       * @example
       *
       *     var rotated = x64Word.rotL(25);
       */
      // rotL: function (n) {
      // return this.shiftL(n).or(this.shiftR(64 - n));
      // },

      /**
       * Rotates this word n bits to the right.
       *
       * @param {number} n The number of bits to rotate.
       *
       * @return {X64Word} A new x64-Word object after rotating.
       *
       * @example
       *
       *     var rotated = x64Word.rotR(7);
       */
      // rotR: function (n) {
      // return this.shiftR(n).or(this.shiftL(64 - n));
      // },

      /**
       * Adds this word with the passed word.
       *
       * @param {X64Word} word The x64-Word to add with this word.
       *
       * @return {X64Word} A new x64-Word object after adding.
       *
       * @example
       *
       *     var added = x64Word.add(anotherX64Word);
       */
      // add: function (word) {
      // var low = (this.low + word.low) | 0;
      // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
      // var high = (this.high + word.high + carry) | 0;

      // return X64Word.create(high, low);
      // }
    });

    /**
     * An array of 64-bit words.
     *
     * @property {Array} words The array of CryptoJS.x64.Word objects.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var X64WordArray = C_x64.WordArray = Base.extend({
      /**
       * Initializes a newly created word array.
       *
       * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
       * @param {number} sigBytes (Optional) The number of significant bytes in the words.
       *
       * @example
       *
       *     var wordArray = CryptoJS.x64.WordArray.create();
       *
       *     var wordArray = CryptoJS.x64.WordArray.create([
       *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
       *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
       *     ]);
       *
       *     var wordArray = CryptoJS.x64.WordArray.create([
       *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
       *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
       *     ], 10);
       */
      init: function (words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 8;
        }
      },
      /**
       * Converts this 64-bit word array to a 32-bit word array.
       *
       * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
       *
       * @example
       *
       *     var x32WordArray = x64WordArray.toX32();
       */
      toX32: function () {
        // Shortcuts
        var x64Words = this.words;
        var x64WordsLength = x64Words.length;

        // Convert
        var x32Words = [];
        for (var i = 0; i < x64WordsLength; i++) {
          var x64Word = x64Words[i];
          x32Words.push(x64Word.high);
          x32Words.push(x64Word.low);
        }
        return X32WordArray.create(x32Words, this.sigBytes);
      },
      /**
       * Creates a copy of this word array.
       *
       * @return {X64WordArray} The clone.
       *
       * @example
       *
       *     var clone = x64WordArray.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);

        // Clone "words" array
        var words = clone.words = this.words.slice(0);

        // Clone each X64Word object
        var wordsLength = words.length;
        for (var i = 0; i < wordsLength; i++) {
          words[i] = words[i].clone();
        }
        return clone;
      }
    });
  })();
  (function (Math) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var C_algo = C.algo;

    // Constants tables
    var RHO_OFFSETS = [];
    var PI_INDEXES = [];
    var ROUND_CONSTANTS = [];

    // Compute Constants
    (function () {
      // Compute rho offset constants
      var x = 1,
        y = 0;
      for (var t = 0; t < 24; t++) {
        RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
        var newX = y % 5;
        var newY = (2 * x + 3 * y) % 5;
        x = newX;
        y = newY;
      }

      // Compute pi index constants
      for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
          PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
        }
      }

      // Compute round constants
      var LFSR = 0x01;
      for (var i = 0; i < 24; i++) {
        var roundConstantMsw = 0;
        var roundConstantLsw = 0;
        for (var j = 0; j < 7; j++) {
          if (LFSR & 0x01) {
            var bitPosition = (1 << j) - 1;
            if (bitPosition < 32) {
              roundConstantLsw ^= 1 << bitPosition;
            } else /* if (bitPosition >= 32) */{
                roundConstantMsw ^= 1 << bitPosition - 32;
              }
          }

          // Compute next LFSR
          if (LFSR & 0x80) {
            // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
            LFSR = LFSR << 1 ^ 0x71;
          } else {
            LFSR <<= 1;
          }
        }
        ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
      }
    })();

    // Reusable objects for temporary values
    var T = [];
    (function () {
      for (var i = 0; i < 25; i++) {
        T[i] = X64Word.create();
      }
    })();

    /**
     * SHA-3 hash algorithm.
     */
    var SHA3 = C_algo.SHA3 = Hasher.extend({
      /**
       * Configuration options.
       *
       * @property {number} outputLength
       *   The desired number of bits in the output hash.
       *   Only values permitted are: 224, 256, 384, 512.
       *   Default: 512
       */
      cfg: Hasher.cfg.extend({
        outputLength: 512
      }),
      _doReset: function () {
        var state = this._state = [];
        for (var i = 0; i < 25; i++) {
          state[i] = new X64Word.init();
        }
        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
      },
      _doProcessBlock: function (M, offset) {
        // Shortcuts
        var state = this._state;
        var nBlockSizeLanes = this.blockSize / 2;

        // Absorb
        for (var i = 0; i < nBlockSizeLanes; i++) {
          // Shortcuts
          var M2i = M[offset + 2 * i];
          var M2i1 = M[offset + 2 * i + 1];

          // Swap endian
          M2i = (M2i << 8 | M2i >>> 24) & 0x00ff00ff | (M2i << 24 | M2i >>> 8) & 0xff00ff00;
          M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 0x00ff00ff | (M2i1 << 24 | M2i1 >>> 8) & 0xff00ff00;

          // Absorb message into state
          var lane = state[i];
          lane.high ^= M2i1;
          lane.low ^= M2i;
        }

        // Rounds
        for (var round = 0; round < 24; round++) {
          // Theta
          for (var x = 0; x < 5; x++) {
            // Mix column lanes
            var tMsw = 0,
              tLsw = 0;
            for (var y = 0; y < 5; y++) {
              var lane = state[x + 5 * y];
              tMsw ^= lane.high;
              tLsw ^= lane.low;
            }

            // Temporary values
            var Tx = T[x];
            Tx.high = tMsw;
            Tx.low = tLsw;
          }
          for (var x = 0; x < 5; x++) {
            // Shortcuts
            var Tx4 = T[(x + 4) % 5];
            var Tx1 = T[(x + 1) % 5];
            var Tx1Msw = Tx1.high;
            var Tx1Lsw = Tx1.low;

            // Mix surrounding columns
            var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
            var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
            for (var y = 0; y < 5; y++) {
              var lane = state[x + 5 * y];
              lane.high ^= tMsw;
              lane.low ^= tLsw;
            }
          }

          // Rho Pi
          for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
            // Shortcuts
            var lane = state[laneIndex];
            var laneMsw = lane.high;
            var laneLsw = lane.low;
            var rhoOffset = RHO_OFFSETS[laneIndex];

            // Rotate lanes
            if (rhoOffset < 32) {
              var tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
              var tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
            } else /* if (rhoOffset >= 32) */{
                var tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                var tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
              }

            // Transpose lanes
            var TPiLane = T[PI_INDEXES[laneIndex]];
            TPiLane.high = tMsw;
            TPiLane.low = tLsw;
          }

          // Rho pi at x = y = 0
          var T0 = T[0];
          var state0 = state[0];
          T0.high = state0.high;
          T0.low = state0.low;

          // Chi
          for (var x = 0; x < 5; x++) {
            for (var y = 0; y < 5; y++) {
              // Shortcuts
              var laneIndex = x + 5 * y;
              var lane = state[laneIndex];
              var TLane = T[laneIndex];
              var Tx1Lane = T[(x + 1) % 5 + 5 * y];
              var Tx2Lane = T[(x + 2) % 5 + 5 * y];

              // Mix rows
              lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
              lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
            }
          }

          // Iota
          var lane = state[0];
          var roundConstant = ROUND_CONSTANTS[round];
          lane.high ^= roundConstant.high;
          lane.low ^= roundConstant.low;
          ;
        }
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        var blockSizeBits = this.blockSize * 32;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x1 << 24 - nBitsLeft % 32;
        dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 0x80;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Shortcuts
        var state = this._state;
        var outputLengthBytes = this.cfg.outputLength / 8;
        var outputLengthLanes = outputLengthBytes / 8;

        // Squeeze
        var hashWords = [];
        for (var i = 0; i < outputLengthLanes; i++) {
          // Shortcuts
          var lane = state[i];
          var laneMsw = lane.high;
          var laneLsw = lane.low;

          // Swap endian
          laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 0x00ff00ff | (laneMsw << 24 | laneMsw >>> 8) & 0xff00ff00;
          laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 0x00ff00ff | (laneLsw << 24 | laneLsw >>> 8) & 0xff00ff00;

          // Squeeze state to retrieve hash
          hashWords.push(laneLsw);
          hashWords.push(laneMsw);
        }

        // Return final computed hash
        return new WordArray.init(hashWords, outputLengthBytes);
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        var state = clone._state = this._state.slice(0);
        for (var i = 0; i < 25; i++) {
          state[i] = state[i].clone();
        }
        return clone;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA3('message');
     *     var hash = CryptoJS.SHA3(wordArray);
     */
    C.SHA3 = Hasher._createHelper(SHA3);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA3(message, key);
     */
    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
  })(Math);
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Hasher = C_lib.Hasher;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    function X64Word_create() {
      return X64Word.create.apply(X64Word, arguments);
    }

    // Constants
    var K = [X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd), X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc), X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019), X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118), X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe), X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2), X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1), X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694), X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3), X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65), X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483), X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5), X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210), X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4), X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725), X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70), X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926), X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df), X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8), X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b), X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001), X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30), X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910), X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8), X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53), X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8), X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb), X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3), X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60), X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec), X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9), X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b), X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207), X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178), X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6), X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b), X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493), X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c), X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a), X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)];

    // Reusable objects
    var W = [];
    (function () {
      for (var i = 0; i < 80; i++) {
        W[i] = X64Word_create();
      }
    })();

    /**
     * SHA-512 hash algorithm.
     */
    var SHA512 = C_algo.SHA512 = Hasher.extend({
      _doReset: function () {
        this._hash = new X64WordArray.init([new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b), new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1), new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f), new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)]);
      },
      _doProcessBlock: function (M, offset) {
        // Shortcuts
        var H = this._hash.words;
        var H0 = H[0];
        var H1 = H[1];
        var H2 = H[2];
        var H3 = H[3];
        var H4 = H[4];
        var H5 = H[5];
        var H6 = H[6];
        var H7 = H[7];
        var H0h = H0.high;
        var H0l = H0.low;
        var H1h = H1.high;
        var H1l = H1.low;
        var H2h = H2.high;
        var H2l = H2.low;
        var H3h = H3.high;
        var H3l = H3.low;
        var H4h = H4.high;
        var H4l = H4.low;
        var H5h = H5.high;
        var H5l = H5.low;
        var H6h = H6.high;
        var H6l = H6.low;
        var H7h = H7.high;
        var H7l = H7.low;

        // Working variables
        var ah = H0h;
        var al = H0l;
        var bh = H1h;
        var bl = H1l;
        var ch = H2h;
        var cl = H2l;
        var dh = H3h;
        var dl = H3l;
        var eh = H4h;
        var el = H4l;
        var fh = H5h;
        var fl = H5l;
        var gh = H6h;
        var gl = H6l;
        var hh = H7h;
        var hl = H7l;

        // Rounds
        for (var i = 0; i < 80; i++) {
          // Shortcut
          var Wi = W[i];

          // Extend message
          if (i < 16) {
            var Wih = Wi.high = M[offset + i * 2] | 0;
            var Wil = Wi.low = M[offset + i * 2 + 1] | 0;
          } else {
            // Gamma0
            var gamma0x = W[i - 15];
            var gamma0xh = gamma0x.high;
            var gamma0xl = gamma0x.low;
            var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
            var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);

            // Gamma1
            var gamma1x = W[i - 2];
            var gamma1xh = gamma1x.high;
            var gamma1xl = gamma1x.low;
            var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
            var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);

            // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
            var Wi7 = W[i - 7];
            var Wi7h = Wi7.high;
            var Wi7l = Wi7.low;
            var Wi16 = W[i - 16];
            var Wi16h = Wi16.high;
            var Wi16l = Wi16.low;
            var Wil = gamma0l + Wi7l;
            var Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
            var Wil = Wil + gamma1l;
            var Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
            var Wil = Wil + Wi16l;
            var Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
            Wi.high = Wih;
            Wi.low = Wil;
          }
          var chh = eh & fh ^ ~eh & gh;
          var chl = el & fl ^ ~el & gl;
          var majh = ah & bh ^ ah & ch ^ bh & ch;
          var majl = al & bl ^ al & cl ^ bl & cl;
          var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
          var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
          var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
          var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);

          // t1 = h + sigma1 + ch + K[i] + W[i]
          var Ki = K[i];
          var Kih = Ki.high;
          var Kil = Ki.low;
          var t1l = hl + sigma1l;
          var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
          var t1l = t1l + chl;
          var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
          var t1l = t1l + Kil;
          var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
          var t1l = t1l + Wil;
          var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);

          // t2 = sigma0 + maj
          var t2l = sigma0l + majl;
          var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);

          // Update working variables
          hh = gh;
          hl = gl;
          gh = fh;
          gl = fl;
          fh = eh;
          fl = el;
          el = dl + t1l | 0;
          eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
          dh = ch;
          dl = cl;
          ch = bh;
          cl = bl;
          bh = ah;
          bl = al;
          al = t1l + t2l | 0;
          ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
        }

        // Intermediate hash value
        H0l = H0.low = H0l + al;
        H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
        H1l = H1.low = H1l + bl;
        H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
        H2l = H2.low = H2l + cl;
        H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
        H3l = H3.low = H3l + dl;
        H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
        H4l = H4.low = H4l + el;
        H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
        H5l = H5.low = H5l + fl;
        H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
        H6l = H6.low = H6l + gl;
        H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
        H7l = H7.low = H7l + hl;
        H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
      },
      _doFinalize: function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;

        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;

        // Hash final blocks
        this._process();

        // Convert hash to 32-bit word array before returning
        var hash = this._hash.toX32();

        // Return final computed hash
        return hash;
      },
      clone: function () {
        var clone = Hasher.clone.call(this);
        clone._hash = this._hash.clone();
        return clone;
      },
      blockSize: 1024 / 32
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA512('message');
     *     var hash = CryptoJS.SHA512(wordArray);
     */
    C.SHA512 = Hasher._createHelper(SHA512);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA512(message, key);
     */
    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_x64 = C.x64;
    var X64Word = C_x64.Word;
    var X64WordArray = C_x64.WordArray;
    var C_algo = C.algo;
    var SHA512 = C_algo.SHA512;

    /**
     * SHA-384 hash algorithm.
     */
    var SHA384 = C_algo.SHA384 = SHA512.extend({
      _doReset: function () {
        this._hash = new X64WordArray.init([new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507), new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939), new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511), new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)]);
      },
      _doFinalize: function () {
        var hash = SHA512._doFinalize.call(this);
        hash.sigBytes -= 16;
        return hash;
      }
    });

    /**
     * Shortcut function to the hasher's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     *
     * @return {WordArray} The hash.
     *
     * @static
     *
     * @example
     *
     *     var hash = CryptoJS.SHA384('message');
     *     var hash = CryptoJS.SHA384(wordArray);
     */
    C.SHA384 = SHA512._createHelper(SHA384);

    /**
     * Shortcut function to the HMAC's object interface.
     *
     * @param {WordArray|string} message The message to hash.
     * @param {WordArray|string} key The secret key.
     *
     * @return {WordArray} The HMAC.
     *
     * @static
     *
     * @example
     *
     *     var hmac = CryptoJS.HmacSHA384(message, key);
     */
    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
  })();

  /**
   * Cipher core components.
   */
  CryptoJS.lib.Cipher || function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var Base = C_lib.Base;
    var WordArray = C_lib.WordArray;
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
    var C_enc = C.enc;
    var Utf8 = C_enc.Utf8;
    var Base64 = C_enc.Base64;
    var C_algo = C.algo;
    var EvpKDF = C_algo.EvpKDF;

    /**
     * Abstract base cipher template.
     *
     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
     */
    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
      /**
       * Configuration options.
       *
       * @property {WordArray} iv The IV to use for this operation.
       */
      cfg: Base.extend(),
      /**
       * Creates this cipher in encryption mode.
       *
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {Cipher} A cipher instance.
       *
       * @static
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
       */
      createEncryptor: function (key, cfg) {
        return this.create(this._ENC_XFORM_MODE, key, cfg);
      },
      /**
       * Creates this cipher in decryption mode.
       *
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {Cipher} A cipher instance.
       *
       * @static
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
       */
      createDecryptor: function (key, cfg) {
        return this.create(this._DEC_XFORM_MODE, key, cfg);
      },
      /**
       * Initializes a newly created cipher.
       *
       * @param {number} xformMode Either the encryption or decryption transormation mode constant.
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @example
       *
       *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
       */
      init: function (xformMode, key, cfg) {
        // Apply config defaults
        this.cfg = this.cfg.extend(cfg);

        // Store transform mode and key
        this._xformMode = xformMode;
        this._key = key;

        // Set initial values
        this.reset();
      },
      /**
       * Resets this cipher to its initial state.
       *
       * @example
       *
       *     cipher.reset();
       */
      reset: function () {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-cipher logic
        this._doReset();
      },
      /**
       * Adds data to be encrypted or decrypted.
       *
       * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
       *
       * @return {WordArray} The data after processing.
       *
       * @example
       *
       *     var encrypted = cipher.process('data');
       *     var encrypted = cipher.process(wordArray);
       */
      process: function (dataUpdate) {
        // Append
        this._append(dataUpdate);

        // Process available blocks
        return this._process();
      },
      /**
       * Finalizes the encryption or decryption process.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
       *
       * @return {WordArray} The data after final processing.
       *
       * @example
       *
       *     var encrypted = cipher.finalize();
       *     var encrypted = cipher.finalize('data');
       *     var encrypted = cipher.finalize(wordArray);
       */
      finalize: function (dataUpdate) {
        // Final data update
        if (dataUpdate) {
          this._append(dataUpdate);
        }

        // Perform concrete-cipher logic
        var finalProcessedData = this._doFinalize();
        return finalProcessedData;
      },
      keySize: 128 / 32,
      ivSize: 128 / 32,
      _ENC_XFORM_MODE: 1,
      _DEC_XFORM_MODE: 2,
      /**
       * Creates shortcut functions to a cipher's object interface.
       *
       * @param {Cipher} cipher The cipher to create a helper for.
       *
       * @return {Object} An object with encrypt and decrypt shortcut functions.
       *
       * @static
       *
       * @example
       *
       *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
       */
      _createHelper: function () {
        function selectCipherStrategy(key) {
          if (typeof key == 'string') {
            return PasswordBasedCipher;
          } else {
            return SerializableCipher;
          }
        }
        return function (cipher) {
          return {
            encrypt: function (message, key, cfg) {
              return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
            },
            decrypt: function (ciphertext, key, cfg) {
              return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
            }
          };
        };
      }()
    });

    /**
     * Abstract base stream cipher template.
     *
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
     */
    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
      _doFinalize: function () {
        // Process partial blocks
        var finalProcessedBlocks = this._process(!!'flush');
        return finalProcessedBlocks;
      },
      blockSize: 1
    });

    /**
     * Mode namespace.
     */
    var C_mode = C.mode = {};

    /**
     * Abstract base block cipher mode template.
     */
    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
      /**
       * Creates this mode for encryption.
       *
       * @param {Cipher} cipher A block cipher instance.
       * @param {Array} iv The IV words.
       *
       * @static
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
       */
      createEncryptor: function (cipher, iv) {
        return this.Encryptor.create(cipher, iv);
      },
      /**
       * Creates this mode for decryption.
       *
       * @param {Cipher} cipher A block cipher instance.
       * @param {Array} iv The IV words.
       *
       * @static
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
       */
      createDecryptor: function (cipher, iv) {
        return this.Decryptor.create(cipher, iv);
      },
      /**
       * Initializes a newly created mode.
       *
       * @param {Cipher} cipher A block cipher instance.
       * @param {Array} iv The IV words.
       *
       * @example
       *
       *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
       */
      init: function (cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
      }
    });

    /**
     * Cipher Block Chaining mode.
     */
    var CBC = C_mode.CBC = function () {
      /**
       * Abstract base CBC mode.
       */
      var CBC = BlockCipherMode.extend();

      /**
       * CBC encryptor.
       */
      CBC.Encryptor = CBC.extend({
        /**
         * Processes the data block at offset.
         *
         * @param {Array} words The data words to operate on.
         * @param {number} offset The offset where the block starts.
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock: function (words, offset) {
          // Shortcuts
          var cipher = this._cipher;
          var blockSize = cipher.blockSize;

          // XOR and encrypt
          xorBlock.call(this, words, offset, blockSize);
          cipher.encryptBlock(words, offset);

          // Remember this block to use with next block
          this._prevBlock = words.slice(offset, offset + blockSize);
        }
      });

      /**
       * CBC decryptor.
       */
      CBC.Decryptor = CBC.extend({
        /**
         * Processes the data block at offset.
         *
         * @param {Array} words The data words to operate on.
         * @param {number} offset The offset where the block starts.
         *
         * @example
         *
         *     mode.processBlock(data.words, offset);
         */
        processBlock: function (words, offset) {
          // Shortcuts
          var cipher = this._cipher;
          var blockSize = cipher.blockSize;

          // Remember this block to use with next block
          var thisBlock = words.slice(offset, offset + blockSize);

          // Decrypt and XOR
          cipher.decryptBlock(words, offset);
          xorBlock.call(this, words, offset, blockSize);

          // This block becomes the previous block
          this._prevBlock = thisBlock;
        }
      });
      function xorBlock(words, offset, blockSize) {
        // Shortcut
        var iv = this._iv;

        // Choose mixing block
        if (iv) {
          var block = iv;

          // Remove IV for subsequent blocks
          this._iv = undefined;
        } else {
          var block = this._prevBlock;
        }

        // XOR blocks
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= block[i];
        }
      }
      return CBC;
    }();

    /**
     * Padding namespace.
     */
    var C_pad = C.pad = {};

    /**
     * PKCS #5/7 padding strategy.
     */
    var Pkcs7 = C_pad.Pkcs7 = {
      /**
       * Pads data using the algorithm defined in PKCS #5/7.
       *
       * @param {WordArray} data The data to pad.
       * @param {number} blockSize The multiple that the data should be padded to.
       *
       * @static
       *
       * @example
       *
       *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
       */
      pad: function (data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4;

        // Count padding bytes
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

        // Create padding word
        var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;

        // Create padding
        var paddingWords = [];
        for (var i = 0; i < nPaddingBytes; i += 4) {
          paddingWords.push(paddingWord);
        }
        var padding = WordArray.create(paddingWords, nPaddingBytes);

        // Add padding
        data.concat(padding);
      },
      /**
       * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
       *
       * @param {WordArray} data The data to unpad.
       *
       * @static
       *
       * @example
       *
       *     CryptoJS.pad.Pkcs7.unpad(wordArray);
       */
      unpad: function (data) {
        // Get number of padding bytes from last byte
        var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

        // Remove padding
        data.sigBytes -= nPaddingBytes;
      }
    };

    /**
     * Abstract base block cipher template.
     *
     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
     */
    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
      /**
       * Configuration options.
       *
       * @property {Mode} mode The block mode to use. Default: CBC
       * @property {Padding} padding The padding strategy to use. Default: Pkcs7
       */
      cfg: Cipher.cfg.extend({
        mode: CBC,
        padding: Pkcs7
      }),
      reset: function () {
        // Reset cipher
        Cipher.reset.call(this);

        // Shortcuts
        var cfg = this.cfg;
        var iv = cfg.iv;
        var mode = cfg.mode;

        // Reset block mode
        if (this._xformMode == this._ENC_XFORM_MODE) {
          var modeCreator = mode.createEncryptor;
        } else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
            var modeCreator = mode.createDecryptor;
            // Keep at least one block in the buffer for unpadding
            this._minBufferSize = 1;
          }
        if (this._mode && this._mode.__creator == modeCreator) {
          this._mode.init(this, iv && iv.words);
        } else {
          this._mode = modeCreator.call(mode, this, iv && iv.words);
          this._mode.__creator = modeCreator;
        }
      },
      _doProcessBlock: function (words, offset) {
        this._mode.processBlock(words, offset);
      },
      _doFinalize: function () {
        // Shortcut
        var padding = this.cfg.padding;

        // Finalize
        if (this._xformMode == this._ENC_XFORM_MODE) {
          // Pad data
          padding.pad(this._data, this.blockSize);

          // Process final blocks
          var finalProcessedBlocks = this._process(!!'flush');
        } else /* if (this._xformMode == this._DEC_XFORM_MODE) */{
            // Process final blocks
            var finalProcessedBlocks = this._process(!!'flush');

            // Unpad data
            padding.unpad(finalProcessedBlocks);
          }
        return finalProcessedBlocks;
      },
      blockSize: 128 / 32
    });

    /**
     * A collection of cipher parameters.
     *
     * @property {WordArray} ciphertext The raw ciphertext.
     * @property {WordArray} key The key to this ciphertext.
     * @property {WordArray} iv The IV used in the ciphering operation.
     * @property {WordArray} salt The salt used with a key derivation function.
     * @property {Cipher} algorithm The cipher algorithm.
     * @property {Mode} mode The block mode used in the ciphering operation.
     * @property {Padding} padding The padding scheme used in the ciphering operation.
     * @property {number} blockSize The block size of the cipher.
     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
     */
    var CipherParams = C_lib.CipherParams = Base.extend({
      /**
       * Initializes a newly created cipher params object.
       *
       * @param {Object} cipherParams An object with any of the possible cipher parameters.
       *
       * @example
       *
       *     var cipherParams = CryptoJS.lib.CipherParams.create({
       *         ciphertext: ciphertextWordArray,
       *         key: keyWordArray,
       *         iv: ivWordArray,
       *         salt: saltWordArray,
       *         algorithm: CryptoJS.algo.AES,
       *         mode: CryptoJS.mode.CBC,
       *         padding: CryptoJS.pad.PKCS7,
       *         blockSize: 4,
       *         formatter: CryptoJS.format.OpenSSL
       *     });
       */
      init: function (cipherParams) {
        this.mixIn(cipherParams);
      },
      /**
       * Converts this cipher params object to a string.
       *
       * @param {Format} formatter (Optional) The formatting strategy to use.
       *
       * @return {string} The stringified cipher params.
       *
       * @throws Error If neither the formatter nor the default formatter is set.
       *
       * @example
       *
       *     var string = cipherParams + '';
       *     var string = cipherParams.toString();
       *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
       */
      toString: function (formatter) {
        return (formatter || this.formatter).stringify(this);
      }
    });

    /**
     * Format namespace.
     */
    var C_format = C.format = {};

    /**
     * OpenSSL formatting strategy.
     */
    var OpenSSLFormatter = C_format.OpenSSL = {
      /**
       * Converts a cipher params object to an OpenSSL-compatible string.
       *
       * @param {CipherParams} cipherParams The cipher params object.
       *
       * @return {string} The OpenSSL-compatible string.
       *
       * @static
       *
       * @example
       *
       *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
       */
      stringify: function (cipherParams) {
        // Shortcuts
        var ciphertext = cipherParams.ciphertext;
        var salt = cipherParams.salt;

        // Format
        if (salt) {
          var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
        } else {
          var wordArray = ciphertext;
        }
        return wordArray.toString(Base64);
      },
      /**
       * Converts an OpenSSL-compatible string to a cipher params object.
       *
       * @param {string} openSSLStr The OpenSSL-compatible string.
       *
       * @return {CipherParams} The cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
       */
      parse: function (openSSLStr) {
        // Parse base64
        var ciphertext = Base64.parse(openSSLStr);

        // Shortcut
        var ciphertextWords = ciphertext.words;

        // Test for salt
        if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
          // Extract salt
          var salt = WordArray.create(ciphertextWords.slice(2, 4));

          // Remove salt from ciphertext
          ciphertextWords.splice(0, 4);
          ciphertext.sigBytes -= 16;
        }
        return CipherParams.create({
          ciphertext: ciphertext,
          salt: salt
        });
      }
    };

    /**
     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
     */
    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
      /**
       * Configuration options.
       *
       * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
       */
      cfg: Base.extend({
        format: OpenSSLFormatter
      }),
      /**
       * Encrypts a message.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {WordArray|string} message The message to encrypt.
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {CipherParams} A cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       */
      encrypt: function (cipher, message, key, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Encrypt
        var encryptor = cipher.createEncryptor(key, cfg);
        var ciphertext = encryptor.finalize(message);

        // Shortcut
        var cipherCfg = encryptor.cfg;

        // Create and return serializable cipher params
        return CipherParams.create({
          ciphertext: ciphertext,
          key: key,
          iv: cipherCfg.iv,
          algorithm: cipher,
          mode: cipherCfg.mode,
          padding: cipherCfg.padding,
          blockSize: cipher.blockSize,
          formatter: cfg.format
        });
      },
      /**
       * Decrypts serialized ciphertext.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
       * @param {WordArray} key The key.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {WordArray} The plaintext.
       *
       * @static
       *
       * @example
       *
       *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
       */
      decrypt: function (cipher, ciphertext, key, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // Decrypt
        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
        return plaintext;
      },
      /**
       * Converts serialized ciphertext to CipherParams,
       * else assumed CipherParams already and returns ciphertext unchanged.
       *
       * @param {CipherParams|string} ciphertext The ciphertext.
       * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
       *
       * @return {CipherParams} The unserialized ciphertext.
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
       */
      _parse: function (ciphertext, format) {
        if (typeof ciphertext == 'string') {
          return format.parse(ciphertext, this);
        } else {
          return ciphertext;
        }
      }
    });

    /**
     * Key derivation function namespace.
     */
    var C_kdf = C.kdf = {};

    /**
     * OpenSSL key derivation function.
     */
    var OpenSSLKdf = C_kdf.OpenSSL = {
      /**
       * Derives a key and IV from a password.
       *
       * @param {string} password The password to derive from.
       * @param {number} keySize The size in words of the key to generate.
       * @param {number} ivSize The size in words of the IV to generate.
       * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
       *
       * @return {CipherParams} A cipher params object with the key, IV, and salt.
       *
       * @static
       *
       * @example
       *
       *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
       *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
       */
      execute: function (password, keySize, ivSize, salt) {
        // Generate random salt
        if (!salt) {
          salt = WordArray.random(64 / 8);
        }

        // Derive key and IV
        var key = EvpKDF.create({
          keySize: keySize + ivSize
        }).compute(password, salt);

        // Separate key and IV
        var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;

        // Return params
        return CipherParams.create({
          key: key,
          iv: iv,
          salt: salt
        });
      }
    };

    /**
     * A serializable cipher wrapper that derives the key from a password,
     * and returns ciphertext as a serializable cipher params object.
     */
    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
      /**
       * Configuration options.
       *
       * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
       */
      cfg: SerializableCipher.cfg.extend({
        kdf: OpenSSLKdf
      }),
      /**
       * Encrypts a message using a password.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {WordArray|string} message The message to encrypt.
       * @param {string} password The password.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {CipherParams} A cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
       *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
       */
      encrypt: function (cipher, message, password, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Derive key and other params
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

        // Add IV to config
        cfg.iv = derivedParams.iv;

        // Encrypt
        var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

        // Mix in derived params
        ciphertext.mixIn(derivedParams);
        return ciphertext;
      },
      /**
       * Decrypts serialized ciphertext using a password.
       *
       * @param {Cipher} cipher The cipher algorithm to use.
       * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
       * @param {string} password The password.
       * @param {Object} cfg (Optional) The configuration options to use for this operation.
       *
       * @return {WordArray} The plaintext.
       *
       * @static
       *
       * @example
       *
       *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
       *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
       */
      decrypt: function (cipher, ciphertext, password, cfg) {
        // Apply config defaults
        cfg = this.cfg.extend(cfg);

        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);

        // Derive key and other params
        var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

        // Add IV to config
        cfg.iv = derivedParams.iv;

        // Decrypt
        var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
        return plaintext;
      }
    });
  }();

  /**
   * Cipher Feedback block mode.
   */
  CryptoJS.mode.CFB = function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();
    CFB.Encryptor = CFB.extend({
      processBlock: function (words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + blockSize);
      }
    });
    CFB.Decryptor = CFB.extend({
      processBlock: function (words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;

        // Remember this block to use with next block
        var thisBlock = words.slice(offset, offset + blockSize);
        generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

        // This block becomes the previous block
        this._prevBlock = thisBlock;
      }
    });
    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
      // Shortcut
      var iv = this._iv;

      // Generate keystream
      if (iv) {
        var keystream = iv.slice(0);

        // Remove IV for subsequent blocks
        this._iv = undefined;
      } else {
        var keystream = this._prevBlock;
      }
      cipher.encryptBlock(keystream, 0);

      // Encrypt
      for (var i = 0; i < blockSize; i++) {
        words[offset + i] ^= keystream[i];
      }
    }
    return CFB;
  }();

  /**
   * Electronic Codebook block mode.
   */
  CryptoJS.mode.ECB = function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();
    ECB.Encryptor = ECB.extend({
      processBlock: function (words, offset) {
        this._cipher.encryptBlock(words, offset);
      }
    });
    ECB.Decryptor = ECB.extend({
      processBlock: function (words, offset) {
        this._cipher.decryptBlock(words, offset);
      }
    });
    return ECB;
  }();

  /**
   * ANSI X.923 padding strategy.
   */
  CryptoJS.pad.AnsiX923 = {
    pad: function (data, blockSize) {
      // Shortcuts
      var dataSigBytes = data.sigBytes;
      var blockSizeBytes = blockSize * 4;

      // Count padding bytes
      var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

      // Compute last byte position
      var lastBytePos = dataSigBytes + nPaddingBytes - 1;

      // Pad
      data.clamp();
      data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
      data.sigBytes += nPaddingBytes;
    },
    unpad: function (data) {
      // Get number of padding bytes from last byte
      var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

      // Remove padding
      data.sigBytes -= nPaddingBytes;
    }
  };

  /**
   * ISO 10126 padding strategy.
   */
  CryptoJS.pad.Iso10126 = {
    pad: function (data, blockSize) {
      // Shortcut
      var blockSizeBytes = blockSize * 4;

      // Count padding bytes
      var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

      // Pad
      data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    },
    unpad: function (data) {
      // Get number of padding bytes from last byte
      var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;

      // Remove padding
      data.sigBytes -= nPaddingBytes;
    }
  };

  /**
   * ISO/IEC 9797-1 Padding Method 2.
   */
  CryptoJS.pad.Iso97971 = {
    pad: function (data, blockSize) {
      // Add 0x80 byte
      data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

      // Zero pad the rest
      CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    },
    unpad: function (data) {
      // Remove zero padding
      CryptoJS.pad.ZeroPadding.unpad(data);

      // Remove one more byte -- the 0x80 byte
      data.sigBytes--;
    }
  };

  /**
   * Output Feedback block mode.
   */
  CryptoJS.mode.OFB = function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = OFB.Encryptor = OFB.extend({
      processBlock: function (words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var keystream = this._keystream;

        // Generate keystream
        if (iv) {
          keystream = this._keystream = iv.slice(0);

          // Remove IV for subsequent blocks
          this._iv = undefined;
        }
        cipher.encryptBlock(keystream, 0);

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    OFB.Decryptor = Encryptor;
    return OFB;
  }();

  /**
   * A noop padding strategy.
   */
  CryptoJS.pad.NoPadding = {
    pad: function () {},
    unpad: function () {}
  };
  (function (undefined) {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var CipherParams = C_lib.CipherParams;
    var C_enc = C.enc;
    var Hex = C_enc.Hex;
    var C_format = C.format;
    var HexFormatter = C_format.Hex = {
      /**
       * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
       *
       * @param {CipherParams} cipherParams The cipher params object.
       *
       * @return {string} The hexadecimally encoded string.
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
       */
      stringify: function (cipherParams) {
        return cipherParams.ciphertext.toString(Hex);
      },
      /**
       * Converts a hexadecimally encoded ciphertext string to a cipher params object.
       *
       * @param {string} input The hexadecimally encoded string.
       *
       * @return {CipherParams} The cipher params object.
       *
       * @static
       *
       * @example
       *
       *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
       */
      parse: function (input) {
        var ciphertext = Hex.parse(input);
        return CipherParams.create({
          ciphertext: ciphertext
        });
      }
    };
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // Lookup tables
    var SBOX = [];
    var INV_SBOX = [];
    var SUB_MIX_0 = [];
    var SUB_MIX_1 = [];
    var SUB_MIX_2 = [];
    var SUB_MIX_3 = [];
    var INV_SUB_MIX_0 = [];
    var INV_SUB_MIX_1 = [];
    var INV_SUB_MIX_2 = [];
    var INV_SUB_MIX_3 = [];

    // Compute lookup tables
    (function () {
      // Compute double table
      var d = [];
      for (var i = 0; i < 256; i++) {
        if (i < 128) {
          d[i] = i << 1;
        } else {
          d[i] = i << 1 ^ 0x11b;
        }
      }

      // Walk GF(2^8)
      var x = 0;
      var xi = 0;
      for (var i = 0; i < 256; i++) {
        // Compute sbox
        var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
        sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;

        // Compute multiplication
        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4];

        // Compute sub bytes, mix columns tables
        var t = d[sx] * 0x101 ^ sx * 0x1010100;
        SUB_MIX_0[x] = t << 24 | t >>> 8;
        SUB_MIX_1[x] = t << 16 | t >>> 16;
        SUB_MIX_2[x] = t << 8 | t >>> 24;
        SUB_MIX_3[x] = t;

        // Compute inv sub bytes, inv mix columns tables
        var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
        INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
        INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
        INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
        INV_SUB_MIX_3[sx] = t;

        // Compute next counter
        if (!x) {
          x = xi = 1;
        } else {
          x = x2 ^ d[d[d[x8 ^ x2]]];
          xi ^= d[d[xi]];
        }
      }
    })();

    // Precomputed Rcon lookup
    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

    /**
     * AES block cipher algorithm.
     */
    var AES = C_algo.AES = BlockCipher.extend({
      _doReset: function () {
        // Skip reset of nRounds has been set before and key did not change
        if (this._nRounds && this._keyPriorReset === this._key) {
          return;
        }

        // Shortcuts
        var key = this._keyPriorReset = this._key;
        var keyWords = key.words;
        var keySize = key.sigBytes / 4;

        // Compute number of rounds
        var nRounds = this._nRounds = keySize + 6;

        // Compute number of key schedule rows
        var ksRows = (nRounds + 1) * 4;

        // Compute key schedule
        var keySchedule = this._keySchedule = [];
        for (var ksRow = 0; ksRow < ksRows; ksRow++) {
          if (ksRow < keySize) {
            keySchedule[ksRow] = keyWords[ksRow];
          } else {
            var t = keySchedule[ksRow - 1];
            if (!(ksRow % keySize)) {
              // Rot word
              t = t << 8 | t >>> 24;

              // Sub word
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];

              // Mix Rcon
              t ^= RCON[ksRow / keySize | 0] << 24;
            } else if (keySize > 6 && ksRow % keySize == 4) {
              // Sub word
              t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
            }
            keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
          }
        }

        // Compute inv key schedule
        var invKeySchedule = this._invKeySchedule = [];
        for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
          var ksRow = ksRows - invKsRow;
          if (invKsRow % 4) {
            var t = keySchedule[ksRow];
          } else {
            var t = keySchedule[ksRow - 4];
          }
          if (invKsRow < 4 || ksRow <= 4) {
            invKeySchedule[invKsRow] = t;
          } else {
            invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
          }
        }
      },
      encryptBlock: function (M, offset) {
        this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
      },
      decryptBlock: function (M, offset) {
        // Swap 2nd and 4th rows
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
        this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

        // Inv swap 2nd and 4th rows
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
      },
      _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
        // Shortcut
        var nRounds = this._nRounds;

        // Get input, add round key
        var s0 = M[offset] ^ keySchedule[0];
        var s1 = M[offset + 1] ^ keySchedule[1];
        var s2 = M[offset + 2] ^ keySchedule[2];
        var s3 = M[offset + 3] ^ keySchedule[3];

        // Key schedule row counter
        var ksRow = 4;

        // Rounds
        for (var round = 1; round < nRounds; round++) {
          // Shift rows, sub bytes, mix columns, add round key
          var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
          var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
          var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
          var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

          // Update state
          s0 = t0;
          s1 = t1;
          s2 = t2;
          s3 = t3;
        }

        // Shift rows, sub bytes, add round key
        var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
        var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
        var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
        var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

        // Set output
        M[offset] = t0;
        M[offset + 1] = t1;
        M[offset + 2] = t2;
        M[offset + 3] = t3;
      },
      keySize: 256 / 32
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
     */
    C.AES = BlockCipher._createHelper(AES);
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var BlockCipher = C_lib.BlockCipher;
    var C_algo = C.algo;

    // Permuted Choice 1 constants
    var PC1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];

    // Permuted Choice 2 constants
    var PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];

    // Cumulative bit shift constants
    var BIT_SHIFTS = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

    // SBOXes and round permutation constants
    var SBOX_P = [{
      0x0: 0x808200,
      0x10000000: 0x8000,
      0x20000000: 0x808002,
      0x30000000: 0x2,
      0x40000000: 0x200,
      0x50000000: 0x808202,
      0x60000000: 0x800202,
      0x70000000: 0x800000,
      0x80000000: 0x202,
      0x90000000: 0x800200,
      0xa0000000: 0x8200,
      0xb0000000: 0x808000,
      0xc0000000: 0x8002,
      0xd0000000: 0x800002,
      0xe0000000: 0x0,
      0xf0000000: 0x8202,
      0x8000000: 0x0,
      0x18000000: 0x808202,
      0x28000000: 0x8202,
      0x38000000: 0x8000,
      0x48000000: 0x808200,
      0x58000000: 0x200,
      0x68000000: 0x808002,
      0x78000000: 0x2,
      0x88000000: 0x800200,
      0x98000000: 0x8200,
      0xa8000000: 0x808000,
      0xb8000000: 0x800202,
      0xc8000000: 0x800002,
      0xd8000000: 0x8002,
      0xe8000000: 0x202,
      0xf8000000: 0x800000,
      0x1: 0x8000,
      0x10000001: 0x2,
      0x20000001: 0x808200,
      0x30000001: 0x800000,
      0x40000001: 0x808002,
      0x50000001: 0x8200,
      0x60000001: 0x200,
      0x70000001: 0x800202,
      0x80000001: 0x808202,
      0x90000001: 0x808000,
      0xa0000001: 0x800002,
      0xb0000001: 0x8202,
      0xc0000001: 0x202,
      0xd0000001: 0x800200,
      0xe0000001: 0x8002,
      0xf0000001: 0x0,
      0x8000001: 0x808202,
      0x18000001: 0x808000,
      0x28000001: 0x800000,
      0x38000001: 0x200,
      0x48000001: 0x8000,
      0x58000001: 0x800002,
      0x68000001: 0x2,
      0x78000001: 0x8202,
      0x88000001: 0x8002,
      0x98000001: 0x800202,
      0xa8000001: 0x202,
      0xb8000001: 0x808200,
      0xc8000001: 0x800200,
      0xd8000001: 0x0,
      0xe8000001: 0x8200,
      0xf8000001: 0x808002
    }, {
      0x0: 0x40084010,
      0x1000000: 0x4000,
      0x2000000: 0x80000,
      0x3000000: 0x40080010,
      0x4000000: 0x40000010,
      0x5000000: 0x40084000,
      0x6000000: 0x40004000,
      0x7000000: 0x10,
      0x8000000: 0x84000,
      0x9000000: 0x40004010,
      0xa000000: 0x40000000,
      0xb000000: 0x84010,
      0xc000000: 0x80010,
      0xd000000: 0x0,
      0xe000000: 0x4010,
      0xf000000: 0x40080000,
      0x800000: 0x40004000,
      0x1800000: 0x84010,
      0x2800000: 0x10,
      0x3800000: 0x40004010,
      0x4800000: 0x40084010,
      0x5800000: 0x40000000,
      0x6800000: 0x80000,
      0x7800000: 0x40080010,
      0x8800000: 0x80010,
      0x9800000: 0x0,
      0xa800000: 0x4000,
      0xb800000: 0x40080000,
      0xc800000: 0x40000010,
      0xd800000: 0x84000,
      0xe800000: 0x40084000,
      0xf800000: 0x4010,
      0x10000000: 0x0,
      0x11000000: 0x40080010,
      0x12000000: 0x40004010,
      0x13000000: 0x40084000,
      0x14000000: 0x40080000,
      0x15000000: 0x10,
      0x16000000: 0x84010,
      0x17000000: 0x4000,
      0x18000000: 0x4010,
      0x19000000: 0x80000,
      0x1a000000: 0x80010,
      0x1b000000: 0x40000010,
      0x1c000000: 0x84000,
      0x1d000000: 0x40004000,
      0x1e000000: 0x40000000,
      0x1f000000: 0x40084010,
      0x10800000: 0x84010,
      0x11800000: 0x80000,
      0x12800000: 0x40080000,
      0x13800000: 0x4000,
      0x14800000: 0x40004000,
      0x15800000: 0x40084010,
      0x16800000: 0x10,
      0x17800000: 0x40000000,
      0x18800000: 0x40084000,
      0x19800000: 0x40000010,
      0x1a800000: 0x40004010,
      0x1b800000: 0x80010,
      0x1c800000: 0x0,
      0x1d800000: 0x4010,
      0x1e800000: 0x40080010,
      0x1f800000: 0x84000
    }, {
      0x0: 0x104,
      0x100000: 0x0,
      0x200000: 0x4000100,
      0x300000: 0x10104,
      0x400000: 0x10004,
      0x500000: 0x4000004,
      0x600000: 0x4010104,
      0x700000: 0x4010000,
      0x800000: 0x4000000,
      0x900000: 0x4010100,
      0xa00000: 0x10100,
      0xb00000: 0x4010004,
      0xc00000: 0x4000104,
      0xd00000: 0x10000,
      0xe00000: 0x4,
      0xf00000: 0x100,
      0x80000: 0x4010100,
      0x180000: 0x4010004,
      0x280000: 0x0,
      0x380000: 0x4000100,
      0x480000: 0x4000004,
      0x580000: 0x10000,
      0x680000: 0x10004,
      0x780000: 0x104,
      0x880000: 0x4,
      0x980000: 0x100,
      0xa80000: 0x4010000,
      0xb80000: 0x10104,
      0xc80000: 0x10100,
      0xd80000: 0x4000104,
      0xe80000: 0x4010104,
      0xf80000: 0x4000000,
      0x1000000: 0x4010100,
      0x1100000: 0x10004,
      0x1200000: 0x10000,
      0x1300000: 0x4000100,
      0x1400000: 0x100,
      0x1500000: 0x4010104,
      0x1600000: 0x4000004,
      0x1700000: 0x0,
      0x1800000: 0x4000104,
      0x1900000: 0x4000000,
      0x1a00000: 0x4,
      0x1b00000: 0x10100,
      0x1c00000: 0x4010000,
      0x1d00000: 0x104,
      0x1e00000: 0x10104,
      0x1f00000: 0x4010004,
      0x1080000: 0x4000000,
      0x1180000: 0x104,
      0x1280000: 0x4010100,
      0x1380000: 0x0,
      0x1480000: 0x10004,
      0x1580000: 0x4000100,
      0x1680000: 0x100,
      0x1780000: 0x4010004,
      0x1880000: 0x10000,
      0x1980000: 0x4010104,
      0x1a80000: 0x10104,
      0x1b80000: 0x4000004,
      0x1c80000: 0x4000104,
      0x1d80000: 0x4010000,
      0x1e80000: 0x4,
      0x1f80000: 0x10100
    }, {
      0x0: 0x80401000,
      0x10000: 0x80001040,
      0x20000: 0x401040,
      0x30000: 0x80400000,
      0x40000: 0x0,
      0x50000: 0x401000,
      0x60000: 0x80000040,
      0x70000: 0x400040,
      0x80000: 0x80000000,
      0x90000: 0x400000,
      0xa0000: 0x40,
      0xb0000: 0x80001000,
      0xc0000: 0x80400040,
      0xd0000: 0x1040,
      0xe0000: 0x1000,
      0xf0000: 0x80401040,
      0x8000: 0x80001040,
      0x18000: 0x40,
      0x28000: 0x80400040,
      0x38000: 0x80001000,
      0x48000: 0x401000,
      0x58000: 0x80401040,
      0x68000: 0x0,
      0x78000: 0x80400000,
      0x88000: 0x1000,
      0x98000: 0x80401000,
      0xa8000: 0x400000,
      0xb8000: 0x1040,
      0xc8000: 0x80000000,
      0xd8000: 0x400040,
      0xe8000: 0x401040,
      0xf8000: 0x80000040,
      0x100000: 0x400040,
      0x110000: 0x401000,
      0x120000: 0x80000040,
      0x130000: 0x0,
      0x140000: 0x1040,
      0x150000: 0x80400040,
      0x160000: 0x80401000,
      0x170000: 0x80001040,
      0x180000: 0x80401040,
      0x190000: 0x80000000,
      0x1a0000: 0x80400000,
      0x1b0000: 0x401040,
      0x1c0000: 0x80001000,
      0x1d0000: 0x400000,
      0x1e0000: 0x40,
      0x1f0000: 0x1000,
      0x108000: 0x80400000,
      0x118000: 0x80401040,
      0x128000: 0x0,
      0x138000: 0x401000,
      0x148000: 0x400040,
      0x158000: 0x80000000,
      0x168000: 0x80001040,
      0x178000: 0x40,
      0x188000: 0x80000040,
      0x198000: 0x1000,
      0x1a8000: 0x80001000,
      0x1b8000: 0x80400040,
      0x1c8000: 0x1040,
      0x1d8000: 0x80401000,
      0x1e8000: 0x400000,
      0x1f8000: 0x401040
    }, {
      0x0: 0x80,
      0x1000: 0x1040000,
      0x2000: 0x40000,
      0x3000: 0x20000000,
      0x4000: 0x20040080,
      0x5000: 0x1000080,
      0x6000: 0x21000080,
      0x7000: 0x40080,
      0x8000: 0x1000000,
      0x9000: 0x20040000,
      0xa000: 0x20000080,
      0xb000: 0x21040080,
      0xc000: 0x21040000,
      0xd000: 0x0,
      0xe000: 0x1040080,
      0xf000: 0x21000000,
      0x800: 0x1040080,
      0x1800: 0x21000080,
      0x2800: 0x80,
      0x3800: 0x1040000,
      0x4800: 0x40000,
      0x5800: 0x20040080,
      0x6800: 0x21040000,
      0x7800: 0x20000000,
      0x8800: 0x20040000,
      0x9800: 0x0,
      0xa800: 0x21040080,
      0xb800: 0x1000080,
      0xc800: 0x20000080,
      0xd800: 0x21000000,
      0xe800: 0x1000000,
      0xf800: 0x40080,
      0x10000: 0x40000,
      0x11000: 0x80,
      0x12000: 0x20000000,
      0x13000: 0x21000080,
      0x14000: 0x1000080,
      0x15000: 0x21040000,
      0x16000: 0x20040080,
      0x17000: 0x1000000,
      0x18000: 0x21040080,
      0x19000: 0x21000000,
      0x1a000: 0x1040000,
      0x1b000: 0x20040000,
      0x1c000: 0x40080,
      0x1d000: 0x20000080,
      0x1e000: 0x0,
      0x1f000: 0x1040080,
      0x10800: 0x21000080,
      0x11800: 0x1000000,
      0x12800: 0x1040000,
      0x13800: 0x20040080,
      0x14800: 0x20000000,
      0x15800: 0x1040080,
      0x16800: 0x80,
      0x17800: 0x21040000,
      0x18800: 0x40080,
      0x19800: 0x21040080,
      0x1a800: 0x0,
      0x1b800: 0x21000000,
      0x1c800: 0x1000080,
      0x1d800: 0x40000,
      0x1e800: 0x20040000,
      0x1f800: 0x20000080
    }, {
      0x0: 0x10000008,
      0x100: 0x2000,
      0x200: 0x10200000,
      0x300: 0x10202008,
      0x400: 0x10002000,
      0x500: 0x200000,
      0x600: 0x200008,
      0x700: 0x10000000,
      0x800: 0x0,
      0x900: 0x10002008,
      0xa00: 0x202000,
      0xb00: 0x8,
      0xc00: 0x10200008,
      0xd00: 0x202008,
      0xe00: 0x2008,
      0xf00: 0x10202000,
      0x80: 0x10200000,
      0x180: 0x10202008,
      0x280: 0x8,
      0x380: 0x200000,
      0x480: 0x202008,
      0x580: 0x10000008,
      0x680: 0x10002000,
      0x780: 0x2008,
      0x880: 0x200008,
      0x980: 0x2000,
      0xa80: 0x10002008,
      0xb80: 0x10200008,
      0xc80: 0x0,
      0xd80: 0x10202000,
      0xe80: 0x202000,
      0xf80: 0x10000000,
      0x1000: 0x10002000,
      0x1100: 0x10200008,
      0x1200: 0x10202008,
      0x1300: 0x2008,
      0x1400: 0x200000,
      0x1500: 0x10000000,
      0x1600: 0x10000008,
      0x1700: 0x202000,
      0x1800: 0x202008,
      0x1900: 0x0,
      0x1a00: 0x8,
      0x1b00: 0x10200000,
      0x1c00: 0x2000,
      0x1d00: 0x10002008,
      0x1e00: 0x10202000,
      0x1f00: 0x200008,
      0x1080: 0x8,
      0x1180: 0x202000,
      0x1280: 0x200000,
      0x1380: 0x10000008,
      0x1480: 0x10002000,
      0x1580: 0x2008,
      0x1680: 0x10202008,
      0x1780: 0x10200000,
      0x1880: 0x10202000,
      0x1980: 0x10200008,
      0x1a80: 0x2000,
      0x1b80: 0x202008,
      0x1c80: 0x200008,
      0x1d80: 0x0,
      0x1e80: 0x10000000,
      0x1f80: 0x10002008
    }, {
      0x0: 0x100000,
      0x10: 0x2000401,
      0x20: 0x400,
      0x30: 0x100401,
      0x40: 0x2100401,
      0x50: 0x0,
      0x60: 0x1,
      0x70: 0x2100001,
      0x80: 0x2000400,
      0x90: 0x100001,
      0xa0: 0x2000001,
      0xb0: 0x2100400,
      0xc0: 0x2100000,
      0xd0: 0x401,
      0xe0: 0x100400,
      0xf0: 0x2000000,
      0x8: 0x2100001,
      0x18: 0x0,
      0x28: 0x2000401,
      0x38: 0x2100400,
      0x48: 0x100000,
      0x58: 0x2000001,
      0x68: 0x2000000,
      0x78: 0x401,
      0x88: 0x100401,
      0x98: 0x2000400,
      0xa8: 0x2100000,
      0xb8: 0x100001,
      0xc8: 0x400,
      0xd8: 0x2100401,
      0xe8: 0x1,
      0xf8: 0x100400,
      0x100: 0x2000000,
      0x110: 0x100000,
      0x120: 0x2000401,
      0x130: 0x2100001,
      0x140: 0x100001,
      0x150: 0x2000400,
      0x160: 0x2100400,
      0x170: 0x100401,
      0x180: 0x401,
      0x190: 0x2100401,
      0x1a0: 0x100400,
      0x1b0: 0x1,
      0x1c0: 0x0,
      0x1d0: 0x2100000,
      0x1e0: 0x2000001,
      0x1f0: 0x400,
      0x108: 0x100400,
      0x118: 0x2000401,
      0x128: 0x2100001,
      0x138: 0x1,
      0x148: 0x2000000,
      0x158: 0x100000,
      0x168: 0x401,
      0x178: 0x2100400,
      0x188: 0x2000001,
      0x198: 0x2100000,
      0x1a8: 0x0,
      0x1b8: 0x2100401,
      0x1c8: 0x100401,
      0x1d8: 0x400,
      0x1e8: 0x2000400,
      0x1f8: 0x100001
    }, {
      0x0: 0x8000820,
      0x1: 0x20000,
      0x2: 0x8000000,
      0x3: 0x20,
      0x4: 0x20020,
      0x5: 0x8020820,
      0x6: 0x8020800,
      0x7: 0x800,
      0x8: 0x8020000,
      0x9: 0x8000800,
      0xa: 0x20800,
      0xb: 0x8020020,
      0xc: 0x820,
      0xd: 0x0,
      0xe: 0x8000020,
      0xf: 0x20820,
      0x80000000: 0x800,
      0x80000001: 0x8020820,
      0x80000002: 0x8000820,
      0x80000003: 0x8000000,
      0x80000004: 0x8020000,
      0x80000005: 0x20800,
      0x80000006: 0x20820,
      0x80000007: 0x20,
      0x80000008: 0x8000020,
      0x80000009: 0x820,
      0x8000000a: 0x20020,
      0x8000000b: 0x8020800,
      0x8000000c: 0x0,
      0x8000000d: 0x8020020,
      0x8000000e: 0x8000800,
      0x8000000f: 0x20000,
      0x10: 0x20820,
      0x11: 0x8020800,
      0x12: 0x20,
      0x13: 0x800,
      0x14: 0x8000800,
      0x15: 0x8000020,
      0x16: 0x8020020,
      0x17: 0x20000,
      0x18: 0x0,
      0x19: 0x20020,
      0x1a: 0x8020000,
      0x1b: 0x8000820,
      0x1c: 0x8020820,
      0x1d: 0x20800,
      0x1e: 0x820,
      0x1f: 0x8000000,
      0x80000010: 0x20000,
      0x80000011: 0x800,
      0x80000012: 0x8020020,
      0x80000013: 0x20820,
      0x80000014: 0x20,
      0x80000015: 0x8020000,
      0x80000016: 0x8000000,
      0x80000017: 0x8000820,
      0x80000018: 0x8020820,
      0x80000019: 0x8000020,
      0x8000001a: 0x8000800,
      0x8000001b: 0x0,
      0x8000001c: 0x20800,
      0x8000001d: 0x820,
      0x8000001e: 0x20020,
      0x8000001f: 0x8020800
    }];

    // Masks that select the SBOX input
    var SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];

    /**
     * DES block cipher algorithm.
     */
    var DES = C_algo.DES = BlockCipher.extend({
      _doReset: function () {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;

        // Select 56 bits according to PC1
        var keyBits = [];
        for (var i = 0; i < 56; i++) {
          var keyBitPos = PC1[i] - 1;
          keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
        }

        // Assemble 16 subkeys
        var subKeys = this._subKeys = [];
        for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
          // Create subkey
          var subKey = subKeys[nSubKey] = [];

          // Shortcut
          var bitShift = BIT_SHIFTS[nSubKey];

          // Select 48 bits according to PC2
          for (var i = 0; i < 24; i++) {
            // Select from the left 28 key bits
            subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;

            // Select from the right 28 key bits
            subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
          }

          // Since each subkey is applied to an expanded 32-bit input,
          // the subkey can be broken into 8 values scaled to 32-bits,
          // which allows the key to be used without expansion
          subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
          for (var i = 1; i < 7; i++) {
            subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
          }
          subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
        }

        // Compute inverse subkeys
        var invSubKeys = this._invSubKeys = [];
        for (var i = 0; i < 16; i++) {
          invSubKeys[i] = subKeys[15 - i];
        }
      },
      encryptBlock: function (M, offset) {
        this._doCryptBlock(M, offset, this._subKeys);
      },
      decryptBlock: function (M, offset) {
        this._doCryptBlock(M, offset, this._invSubKeys);
      },
      _doCryptBlock: function (M, offset, subKeys) {
        // Get input
        this._lBlock = M[offset];
        this._rBlock = M[offset + 1];

        // Initial permutation
        exchangeLR.call(this, 4, 0x0f0f0f0f);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeLR.call(this, 1, 0x55555555);

        // Rounds
        for (var round = 0; round < 16; round++) {
          // Shortcuts
          var subKey = subKeys[round];
          var lBlock = this._lBlock;
          var rBlock = this._rBlock;

          // Feistel function
          var f = 0;
          for (var i = 0; i < 8; i++) {
            f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
          }
          this._lBlock = rBlock;
          this._rBlock = lBlock ^ f;
        }

        // Undo swap from last round
        var t = this._lBlock;
        this._lBlock = this._rBlock;
        this._rBlock = t;

        // Final permutation
        exchangeLR.call(this, 1, 0x55555555);
        exchangeRL.call(this, 8, 0x00ff00ff);
        exchangeRL.call(this, 2, 0x33333333);
        exchangeLR.call(this, 16, 0x0000ffff);
        exchangeLR.call(this, 4, 0x0f0f0f0f);

        // Set output
        M[offset] = this._lBlock;
        M[offset + 1] = this._rBlock;
      },
      keySize: 64 / 32,
      ivSize: 64 / 32,
      blockSize: 64 / 32
    });

    // Swap bits across the left and right words
    function exchangeLR(offset, mask) {
      var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
      this._rBlock ^= t;
      this._lBlock ^= t << offset;
    }
    function exchangeRL(offset, mask) {
      var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
      this._lBlock ^= t;
      this._rBlock ^= t << offset;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
     */
    C.DES = BlockCipher._createHelper(DES);

    /**
     * Triple-DES block cipher algorithm.
     */
    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
      _doReset: function () {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;

        // Create DES instances
        this._des1 = DES.createEncryptor(WordArray.create(keyWords.slice(0, 2)));
        this._des2 = DES.createEncryptor(WordArray.create(keyWords.slice(2, 4)));
        this._des3 = DES.createEncryptor(WordArray.create(keyWords.slice(4, 6)));
      },
      encryptBlock: function (M, offset) {
        this._des1.encryptBlock(M, offset);
        this._des2.decryptBlock(M, offset);
        this._des3.encryptBlock(M, offset);
      },
      decryptBlock: function (M, offset) {
        this._des3.decryptBlock(M, offset);
        this._des2.encryptBlock(M, offset);
        this._des1.decryptBlock(M, offset);
      },
      keySize: 192 / 32,
      ivSize: 64 / 32,
      blockSize: 64 / 32
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
     */
    C.TripleDES = BlockCipher._createHelper(TripleDES);
  })();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    /**
     * RC4 stream cipher algorithm.
     */
    var RC4 = C_algo.RC4 = StreamCipher.extend({
      _doReset: function () {
        // Shortcuts
        var key = this._key;
        var keyWords = key.words;
        var keySigBytes = key.sigBytes;

        // Init sbox
        var S = this._S = [];
        for (var i = 0; i < 256; i++) {
          S[i] = i;
        }

        // Key setup
        for (var i = 0, j = 0; i < 256; i++) {
          var keyByteIndex = i % keySigBytes;
          var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 0xff;
          j = (j + S[i] + keyByte) % 256;

          // Swap
          var t = S[i];
          S[i] = S[j];
          S[j] = t;
        }

        // Counters
        this._i = this._j = 0;
      },
      _doProcessBlock: function (M, offset) {
        M[offset] ^= generateKeystreamWord.call(this);
      },
      keySize: 256 / 32,
      ivSize: 0
    });
    function generateKeystreamWord() {
      // Shortcuts
      var S = this._S;
      var i = this._i;
      var j = this._j;

      // Generate keystream word
      var keystreamWord = 0;
      for (var n = 0; n < 4; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;

        // Swap
        var t = S[i];
        S[i] = S[j];
        S[j] = t;
        keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
      }

      // Update counters
      this._i = i;
      this._j = j;
      return keystreamWord;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
     */
    C.RC4 = StreamCipher._createHelper(RC4);

    /**
     * Modified RC4 stream cipher algorithm.
     */
    var RC4Drop = C_algo.RC4Drop = RC4.extend({
      /**
       * Configuration options.
       *
       * @property {number} drop The number of keystream words to drop. Default 192
       */
      cfg: RC4.cfg.extend({
        drop: 192
      }),
      _doReset: function () {
        RC4._doReset.call(this);

        // Drop
        for (var i = this.cfg.drop; i > 0; i--) {
          generateKeystreamWord.call(this);
        }
      }
    });

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
     */
    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
  })();

  /** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   */
  CryptoJS.mode.CTRGladman = function () {
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
    function incWord(word) {
      if ((word >> 24 & 0xff) === 0xff) {
        //overflow
        var b1 = word >> 16 & 0xff;
        var b2 = word >> 8 & 0xff;
        var b3 = word & 0xff;
        if (b1 === 0xff)
          // overflow b1
          {
            b1 = 0;
            if (b2 === 0xff) {
              b2 = 0;
              if (b3 === 0xff) {
                b3 = 0;
              } else {
                ++b3;
              }
            } else {
              ++b2;
            }
          } else {
          ++b1;
        }
        word = 0;
        word += b1 << 16;
        word += b2 << 8;
        word += b3;
      } else {
        word += 0x01 << 24;
      }
      return word;
    }
    function incCounter(counter) {
      if ((counter[0] = incWord(counter[0])) === 0) {
        // encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
        counter[1] = incWord(counter[1]);
      }
      return counter;
    }
    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
      processBlock: function (words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var counter = this._counter;

        // Generate keystream
        if (iv) {
          counter = this._counter = iv.slice(0);

          // Remove IV for subsequent blocks
          this._iv = undefined;
        }
        incCounter(counter);
        var keystream = counter.slice(0);
        cipher.encryptBlock(keystream, 0);

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    CTRGladman.Decryptor = Encryptor;
    return CTRGladman;
  }();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm
     */
    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
      _doReset: function () {
        // Shortcuts
        var K = this._key.words;
        var iv = this.cfg.iv;

        // Swap endian
        for (var i = 0; i < 4; i++) {
          K[i] = (K[i] << 8 | K[i] >>> 24) & 0x00ff00ff | (K[i] << 24 | K[i] >>> 8) & 0xff00ff00;
        }

        // Generate initial state values
        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

        // Generate initial counter values
        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

        // Carry bit
        this._b = 0;

        // Iterate the system four times
        for (var i = 0; i < 4; i++) {
          nextState.call(this);
        }

        // Modify the counters
        for (var i = 0; i < 8; i++) {
          C[i] ^= X[i + 4 & 7];
        }

        // IV setup
        if (iv) {
          // Shortcuts
          var IV = iv.words;
          var IV_0 = IV[0];
          var IV_1 = IV[1];

          // Generate four subvectors
          var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
          var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
          var i1 = i0 >>> 16 | i2 & 0xffff0000;
          var i3 = i2 << 16 | i0 & 0x0000ffff;

          // Modify counter values
          C[0] ^= i0;
          C[1] ^= i1;
          C[2] ^= i2;
          C[3] ^= i3;
          C[4] ^= i0;
          C[5] ^= i1;
          C[6] ^= i2;
          C[7] ^= i3;

          // Iterate the system four times
          for (var i = 0; i < 4; i++) {
            nextState.call(this);
          }
        }
      },
      _doProcessBlock: function (M, offset) {
        // Shortcut
        var X = this._X;

        // Iterate the system
        nextState.call(this);

        // Generate four keystream words
        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
        for (var i = 0; i < 4; i++) {
          // Swap endian
          S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

          // Encrypt
          M[offset + i] ^= S[i];
        }
      },
      blockSize: 128 / 32,
      ivSize: 64 / 32
    });
    function nextState() {
      // Shortcuts
      var X = this._X;
      var C = this._C;

      // Save old counter values
      for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
      }

      // Calculate new counter values
      C[0] = C[0] + 0x4d34d34d + this._b | 0;
      C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
      C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
      C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
      C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
      C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
      C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
      C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
      this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

      // Calculate the g-values
      for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];

        // Construct high and low argument for squaring
        var ga = gx & 0xffff;
        var gb = gx >>> 16;

        // Calculate high and low result of squaring
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
        var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

        // High XOR low
        G[i] = gh ^ gl;
      }

      // Calculate new state values
      X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
      X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
      X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
      X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
      X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
      X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
      X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
      X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
     */
    C.Rabbit = StreamCipher._createHelper(Rabbit);
  })();

  /**
   * Counter block mode.
   */
  CryptoJS.mode.CTR = function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = CTR.Encryptor = CTR.extend({
      processBlock: function (words, offset) {
        // Shortcuts
        var cipher = this._cipher;
        var blockSize = cipher.blockSize;
        var iv = this._iv;
        var counter = this._counter;

        // Generate keystream
        if (iv) {
          counter = this._counter = iv.slice(0);

          // Remove IV for subsequent blocks
          this._iv = undefined;
        }
        var keystream = counter.slice(0);
        cipher.encryptBlock(keystream, 0);

        // Increment counter
        counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;

        // Encrypt
        for (var i = 0; i < blockSize; i++) {
          words[offset + i] ^= keystream[i];
        }
      }
    });
    CTR.Decryptor = Encryptor;
    return CTR;
  }();
  (function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var StreamCipher = C_lib.StreamCipher;
    var C_algo = C.algo;

    // Reusable objects
    var S = [];
    var C_ = [];
    var G = [];

    /**
     * Rabbit stream cipher algorithm.
     *
     * This is a legacy version that neglected to convert the key to little-endian.
     * This error doesn't affect the cipher's security,
     * but it does affect its compatibility with other implementations.
     */
    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
      _doReset: function () {
        // Shortcuts
        var K = this._key.words;
        var iv = this.cfg.iv;

        // Generate initial state values
        var X = this._X = [K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16];

        // Generate initial counter values
        var C = this._C = [K[2] << 16 | K[2] >>> 16, K[0] & 0xffff0000 | K[1] & 0x0000ffff, K[3] << 16 | K[3] >>> 16, K[1] & 0xffff0000 | K[2] & 0x0000ffff, K[0] << 16 | K[0] >>> 16, K[2] & 0xffff0000 | K[3] & 0x0000ffff, K[1] << 16 | K[1] >>> 16, K[3] & 0xffff0000 | K[0] & 0x0000ffff];

        // Carry bit
        this._b = 0;

        // Iterate the system four times
        for (var i = 0; i < 4; i++) {
          nextState.call(this);
        }

        // Modify the counters
        for (var i = 0; i < 8; i++) {
          C[i] ^= X[i + 4 & 7];
        }

        // IV setup
        if (iv) {
          // Shortcuts
          var IV = iv.words;
          var IV_0 = IV[0];
          var IV_1 = IV[1];

          // Generate four subvectors
          var i0 = (IV_0 << 8 | IV_0 >>> 24) & 0x00ff00ff | (IV_0 << 24 | IV_0 >>> 8) & 0xff00ff00;
          var i2 = (IV_1 << 8 | IV_1 >>> 24) & 0x00ff00ff | (IV_1 << 24 | IV_1 >>> 8) & 0xff00ff00;
          var i1 = i0 >>> 16 | i2 & 0xffff0000;
          var i3 = i2 << 16 | i0 & 0x0000ffff;

          // Modify counter values
          C[0] ^= i0;
          C[1] ^= i1;
          C[2] ^= i2;
          C[3] ^= i3;
          C[4] ^= i0;
          C[5] ^= i1;
          C[6] ^= i2;
          C[7] ^= i3;

          // Iterate the system four times
          for (var i = 0; i < 4; i++) {
            nextState.call(this);
          }
        }
      },
      _doProcessBlock: function (M, offset) {
        // Shortcut
        var X = this._X;

        // Iterate the system
        nextState.call(this);

        // Generate four keystream words
        S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
        S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
        S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
        S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
        for (var i = 0; i < 4; i++) {
          // Swap endian
          S[i] = (S[i] << 8 | S[i] >>> 24) & 0x00ff00ff | (S[i] << 24 | S[i] >>> 8) & 0xff00ff00;

          // Encrypt
          M[offset + i] ^= S[i];
        }
      },
      blockSize: 128 / 32,
      ivSize: 64 / 32
    });
    function nextState() {
      // Shortcuts
      var X = this._X;
      var C = this._C;

      // Save old counter values
      for (var i = 0; i < 8; i++) {
        C_[i] = C[i];
      }

      // Calculate new counter values
      C[0] = C[0] + 0x4d34d34d + this._b | 0;
      C[1] = C[1] + 0xd34d34d3 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
      C[2] = C[2] + 0x34d34d34 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
      C[3] = C[3] + 0x4d34d34d + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
      C[4] = C[4] + 0xd34d34d3 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
      C[5] = C[5] + 0x34d34d34 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
      C[6] = C[6] + 0x4d34d34d + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
      C[7] = C[7] + 0xd34d34d3 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
      this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;

      // Calculate the g-values
      for (var i = 0; i < 8; i++) {
        var gx = X[i] + C[i];

        // Construct high and low argument for squaring
        var ga = gx & 0xffff;
        var gb = gx >>> 16;

        // Calculate high and low result of squaring
        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
        var gl = ((gx & 0xffff0000) * gx | 0) + ((gx & 0x0000ffff) * gx | 0);

        // High XOR low
        G[i] = gh ^ gl;
      }

      // Calculate new state values
      X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
      X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
      X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
      X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
      X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
      X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
      X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
      X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
    }

    /**
     * Shortcut functions to the cipher's object interface.
     *
     * @example
     *
     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
     */
    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
  })();

  /**
   * Zero padding strategy.
   */
  CryptoJS.pad.ZeroPadding = {
    pad: function (data, blockSize) {
      // Shortcut
      var blockSizeBytes = blockSize * 4;

      // Pad
      data.clamp();
      data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
    },
    unpad: function (data) {
      // Shortcut
      var dataWords = data.words;

      // Unpad
      var i = data.sigBytes - 1;
      while (!(dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff)) {
        i--;
      }
      data.sigBytes = i + 1;
    }
  };
  return CryptoJS;
});

/***/ }),

/***/ 4211:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "img/avatar.82999e9a.png";

/***/ }),

/***/ 6971:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1730);
/* harmony import */ var _cryptojs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2087);
/* harmony import */ var _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cryptojs_js__WEBPACK_IMPORTED_MODULE_1__);


let KEY = '1234567890123456';
let IV = 'abcdefghijklmnop';
const toolUtil = {
  //提示语
  message(msg, type, close = null) {
    ElMessage({
      message: msg,
      type: type,
      duration: 2500,
      onClose() {
        if (close) {
          close();
        }
      }
    });
  },
  //右部提示语
  notify(title, msg, type = 'success', close = null) {
    ElNotification({
      title: title,
      message: msg,
      type: type,
      onClose() {
        if (close) {
          close();
        }
      }
    });
  },
  storageSet(key, value) {
    localStorage.setItem(key, value);
  },
  storageGet(key) {
    return localStorage.getItem(key) ? localStorage.getItem(key) : "";
  },
  storageGetObj(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  },
  storageRemove(key) {
    localStorage.removeItem(key);
  },
  storageClear() {
    localStorage.removeItem('userid');
    localStorage.removeItem('frontToken');
    localStorage.removeItem('frontRole');
    localStorage.removeItem('frontSessionTable');
    localStorage.removeItem('frontName');
    localStorage.removeItem('toPath');
  },
  /**
   * 邮箱
   * 
   */
  isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
  },
  /**
   * 手机号码
   * 
   */
  isMobile(s) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]|17[01345678]|18[0-9]|14[579]|19[0-35-9])[0-9]{8}$/.test(s);
  },
  /**
   * 电话号码
   * 
   */
  isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
  },
  /**
   * URL地址
   * 
   */
  isURL(s) {
    return /^http[s]?:\/\/.*/.test(s);
  },
  /**
   * 匹配数字，可以是小数，不可以是负数,可以为空
   *  
   */
  isNumber(s) {
    return /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
  },
  /**
   * 匹配整数，可以为空
   *  
   */
  isIntNumer(s) {
    return /(^-?\d+$)|(^$)/.test(s);
  },
  /**
   * 身份证校验
   */
  checkIdCard(idcard) {
    const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdCard.test(idcard)) {
      return false;
    } else {
      return true;
    }
  },
  //中文校验
  isChinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  //英文校验
  isEnglish(value) {
    let reg = /^[A-Za-z]+$/;
    if (!reg.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  //同时包含中英文校验
  isEnglishNumber(value) {
    let reg = /^[A-Za-z0-9]+$/;
    let reg2 = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
    if (!reg.test(value) || !reg2.test(value)) {
      return false;
    } else {
      return true;
    }
  },
  /*form表单校验*/
  validator: {
    //匹配整数
    intNumber: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.isIntNumer(value)) {
        callback(new Error("请输入整数"));
      } else {
        callback();
      }
    },
    //匹配数字
    number: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.isNumber(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    },
    //匹配手机号码
    mobile: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.isMobile(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    },
    //匹配电话号码
    phone: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.isPhone(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    },
    //匹配邮箱
    email: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.isEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    },
    //匹配身份证
    idCard: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.checkIdCard(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    },
    //匹配网站地址
    url: (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!toolUtil.isURL(value)) {
        callback(new Error("请输入正确的URL地址"));
      } else {
        callback();
      }
    },
    richText: (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (/[^(<p>|</p>|<br>|\s)]/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入"));
        }
      }
    },
    Chinese: (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5]+$/;
      if (value && reg.test(value) === false) {
        callback(new Error('请输入中文'));
      } else {
        callback();
      }
    },
    English: (rule, value, callback) => {
      let reg = /^[A-Za-z]+$/;
      if (value && reg.test(value) === false) {
        callback(new Error('请输入英文'));
      } else {
        callback();
      }
    },
    EnglishNumber: (rule, value, callback) => {
      let reg = /^[A-Za-z0-9]+$/;
      let reg2 = /^(?=.*\d)(?=.*[a-zA-Z]).+$/;
      if (value && reg.test(value) === false || reg2.test(value) === false) {
        callback(new Error('请输入英文和数字'));
      } else {
        callback();
      }
    }
  },
  /**
   * 是否有前台权限（管理员的前台权限视为公共前台权限）
   * @param {*} key
   */
  isFrontAuth(tableName, key) {
    let menus = _menu__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.list();
    if (menus && menus.length) {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].tableName == 'users') {
          if (menus[i].frontMenu && menus[i].frontMenu.length) {
            for (let j = 0; j < menus[i].frontMenu.length; j++) {
              if (menus[i].frontMenu[j].child && menus[i].frontMenu[j].child.length) {
                for (let k = 0; k < menus[i].frontMenu[j].child.length; k++) {
                  if (tableName == menus[i].frontMenu[j].child[k].tableName) {
                    return menus[i].frontMenu[j].child[k].buttons.includes(key);
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  },
  /**
   * 角色是否有前台权限
   * @param {*} key
   */
  isAuth(tableName, key) {
    let role = toolUtil.storageGet("frontRole");
    if (!role) {
      return false;
    }
    let menus = _menu__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.list();
    if (menus && menus.length) {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].roleName == role) {
          if (menus[i].frontMenu && menus[i].frontMenu.length) {
            for (let j = 0; j < menus[i].frontMenu.length; j++) {
              if (menus[i].frontMenu[j].child && menus[i].frontMenu[j].child.length) {
                for (let k = 0; k < menus[i].frontMenu[j].child.length; k++) {
                  if (tableName == menus[i].frontMenu[j].child[k].tableName) {
                    return menus[i].frontMenu[j].child[k].buttons.includes(key);
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  },
  /**
   * 是否有后台权限
   * @param {*} key
   */
  isBackAuth(tableName, key) {
    let role = toolUtil.storageGet("frontRole");
    if (!role) {
      role = '管理员';
    }
    let menus = _menu__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.list();
    if (menus && menus.length) {
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].roleName == role) {
          if (menus[i].backMenu && menus[i].backMenu.length) {
            for (let j = 0; j < menus[i].backMenu.length; j++) {
              if (menus[i].backMenu[j].child && menus[i].backMenu[j].child.length) {
                for (let k = 0; k < menus[i].backMenu[j].child.length; k++) {
                  if (tableName.split('/').length > 1) {
                    if (tableName.split('/')[0] == menus[i].backMenu[j].child[k].tableName && tableName.split('/')[1] == menus[i].backMenu[j].child[k].menuJump) {
                      return menus[i].backMenu[j].child[k].buttons.includes(key);
                    }
                  } else {
                    if (tableName == 'orders') {
                      if (!menus[i].backMenu[j].child[k].menuJump && tableName == menus[i].backMenu[j].child[k].tableName) {
                        return menus[i].backMenu[j].child[k].buttons.includes(key);
                      }
                    } else {
                      if (tableName == menus[i].backMenu[j].child[k].tableName) {
                        return menus[i].backMenu[j].child[k].buttons.includes(key);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  },
  /**
   * 获取当前时间（yyyy-MM-dd hh:mm:ss）
   */
  getCurDateTime() {
    let currentTime = new Date(),
      year = currentTime.getFullYear(),
      month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
      day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
      hour = currentTime.getHours(),
      minute = currentTime.getMinutes(),
      second = currentTime.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  },
  /**
   *  获取当前日期（yyyy-MM-dd）
   */
  getCurDate() {
    let currentTime = new Date(),
      year = currentTime.getFullYear(),
      month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
      day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
    return year + "-" + month + "-" + day;
  },
  encryptDes(message) {
    const keyHex = _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Utf8.parse(KEY);
    const encrypted = _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().DES.encrypt(message, keyHex, {
      mode: (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().mode).ECB,
      padding: (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().pad).Pkcs7
    });
    return encrypted.toString();
  },
  decryptDes(ciphertext) {
    const keyHex = _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Utf8.parse(KEY);
    // direct decrypt ciphertext
    const decrypted = _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().DES.decrypt({
      ciphertext: _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Base64.parse(ciphertext)
    }, keyHex, {
      mode: (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().mode).ECB,
      padding: (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().pad).Pkcs7
    });
    return decrypted.toString((_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc).Utf8);
  },
  encryptAes(msg) {
    let cmode = (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().mode).CBC;
    let cpad = (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().pad).Pkcs7;
    let ciphertext = _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().AES.encrypt(msg, _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Utf8.parse(KEY), {
      mode: cmode,
      padding: cpad,
      iv: _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Utf8.parse(IV)
    }).toString();
    return ciphertext;
  },
  decryptAes(msg) {
    let cmode = (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().mode).CBC;
    let cpad = (_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().pad).Pkcs7;
    var bytes = _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().AES.decrypt(msg, _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Utf8.parse(KEY), {
      mode: cmode,
      padding: cpad,
      iv: _cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc.Utf8.parse(IV)
    });
    var originText = bytes.toString((_cryptojs_js__WEBPACK_IMPORTED_MODULE_1___default().enc).Utf8);
    return originText;
  }
};
/* harmony default export */ __webpack_exports__.A = (toolUtil);

/***/ }),

/***/ 8013:
/***/ (function() {

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + "." + {"106":"1f06978d","109":"c27e58ac","140":"a43fcf4e","145":"e69d6b33","189":"a8d66b21","229":"0bbf74b6","240":"18817454","310":"f20644c9","324":"36b83e4f","328":"fbb6e1dc","375":"186c3001","400":"5fb751e7","453":"b15f229a","474":"7b60d781","526":"4ddd0888","563":"2e2a9712","600":"f4c78d99","657":"5a544810","670":"c47248d6","691":"b2b12a3b","760":"84aaa7cd","763":"0e021650","779":"79a148c5","786":"3db02af3","802":"74115de0","904":"20f8d836","918":"ce6bf9cd","935":"4f51c363"}[chunkId] + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "css/" + chunkId + "." + {"106":"42c0ebd2","109":"ad14b982","140":"0a1951b3","145":"1769632a","189":"21d688c3","229":"03dca444","240":"b0d5643e","328":"00b54d04","375":"e566e407","400":"c7bcf983","453":"7c05a543","474":"40a231ac","526":"4fc2c968","657":"b9f4509b","670":"86d31957","691":"0d901956","786":"4d839dd1","802":"2225934a","904":"88b0da33","918":"1769632a","935":"1769632a"}[chunkId] + ".css";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "vue3-nf0:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "./";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	!function() {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = function(chunkId, fullhref, oldTag, resolve, reject) {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = function(event) {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = function(href, fullhref) {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = function(chunkId) {
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			524: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = function(chunkId, promises) {
/******/ 			var cssChunks = {"106":1,"109":1,"140":1,"145":1,"189":1,"229":1,"240":1,"328":1,"375":1,"400":1,"453":1,"474":1,"526":1,"657":1,"670":1,"691":1,"786":1,"802":1,"904":1,"918":1,"935":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(function() {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, function(e) {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			524: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [504], function() { return __webpack_require__(1857); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.dff1bf9b.js.map