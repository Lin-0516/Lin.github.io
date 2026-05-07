"use strict";
(self["webpackChunkvue3_nf0"] = self["webpackChunkvue3_nf0"] || []).push([[549],{

/***/ 3475:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// UNUSED EXPORTS: default

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(2363);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(2788);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/axios/lib/axios.js + 40 modules
var axios = __webpack_require__(2355);
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/thread-loader/dist/cjs.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/img.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  class: "box"
};
const _hoisted_2 = ["width", "height"];
const _hoisted_3 = ["width", "height"];
const _hoisted_4 = {
  style: {
    "display": "flex",
    "justify-content": "flex-end"
  }
};


/* harmony default export */ var imgvue_type_script_setup_true_lang_js = ({
  __name: 'img',
  emits: ['imgChange'],
  setup(__props, {
    expose: __expose,
    emit: __emit
  }) {
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.FN)()?.appContext.config.globalProperties;
    const visible = (0,reactivity_esm_bundler/* ref */.iH)(false); //弹窗
    const loading = (0,reactivity_esm_bundler/* ref */.iH)(false); //上传按钮加载
    const os = (0,reactivity_esm_bundler/* ref */.iH)(false); //控制摄像头开关
    const thisVideo = (0,reactivity_esm_bundler/* ref */.iH)(null);
    const thisContext = (0,reactivity_esm_bundler/* ref */.iH)(null);
    const thisCancas = (0,reactivity_esm_bundler/* ref */.iH)(null);
    const videoWidth = (0,reactivity_esm_bundler/* ref */.iH)(500);
    const videoHeight = (0,reactivity_esm_bundler/* ref */.iH)(400);
    const postOptions = (0,reactivity_esm_bundler/* ref */.iH)([]);
    const CertCtl = (0,reactivity_esm_bundler/* ref */.iH)('');
    const imgSrc = (0,reactivity_esm_bundler/* ref */.iH)('');
    const emit = __emit;
    const getActionUrl = (0,runtime_core_esm_bundler/* computed */.Fl)(() => {
      return context?.$config.name + '/file/upload';
    });
    const uploadSuccess = e => {
      visible.value = false;
      emit('imgChange', e.file);
    };
    // 调用摄像头权限
    const getCompetence = () => {
      //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
      (0,runtime_core_esm_bundler/* nextTick */.Y3)(() => {
        os.value = false; //切换成关闭摄像头
        thisCancas.value = document.getElementById('canvasCamera');
        thisContext.value = document.getElementById('canvasCamera').getContext('2d');
        thisVideo.value = document.getElementById('videoCamera');
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.menavigatordiaDevices = {};
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject);
            });
          };
        }
        const constraints = {
          audio: false,
          video: {
            width: videoWidth.value,
            height: videoHeight.value,
            transform: 'scaleX(-1)'
          }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in thisVideo.value) {
            thisVideo.value.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            thisVideo.value.src = window.URL.createObjectURL(stream);
          }
          thisVideo.value.onloadedmetadata = function (e) {
            thisVideo.value.play();
          };
        }).catch(err => {
          context?.$toolUtil.notify('警告', '没有开启摄像头权限或浏览器版本不兼容.', 'warning');
        });
      });
    };
    /*调用摄像头拍照开始*/
    const onTake = () => {
      visible.value = true;
      getCompetence();
    };

    //声明父级调用
    __expose({
      onTake
    });
    const base64toFile = (dataurl, filename = 'file') => {
      let arr = dataurl.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split('/')[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let file = new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      });
      return file;
    };
    const uploadImg = () => {
      let param = new FormData();
      param.append('file', base64toFile(imgSrc.value));
      axios/* default.post */.Z.post(getActionUrl.value, param, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        emit('imgChange', res.data.file);
      });
    };
    const onCancel = () => {
      if (!imgSrc.value) {
        return context.$message.error('请先选择人脸图片');
      }
      uploadImg();
      visible.value = false;
      /* this.resetCanvas();*/
      stopNavigator();
    };
    const drawImage = () => {
      // 点击，canvas画图
      thisContext.value.drawImage(thisVideo.value, 0, 0, videoWidth.value, videoHeight.value);
      // 获取图片base64链接
      imgSrc.value = thisCancas.value.toDataURL('image/png');
      /*const imgSrc=this.imgSrc;*/
    };
    //清空画布
    const clearCanvas = id => {
      let c = document.getElementById(id);
      let cxt = c.getContext("2d");
      cxt.clearRect(0, 0, c.width, c.height);
    };
    //重置画布
    const resetCanvas = () => {
      imgSrc.value = "";
      clearCanvas('canvasCamera');
    };
    //关闭摄像头
    const stopNavigator = () => {
      if (thisVideo.value && thisVideo.value !== null) {
        thisVideo.value.srcObject.getTracks()[0].stop();
        os.value = true; //切换成打开摄像头
      }
    };

    return (_ctx, _cache) => {
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-button");
      const _component_el_upload = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-upload");
      const _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-dialog");
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_dialog, {
        title: "拍照上传",
        modelValue: visible.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => visible.value = $event),
        width: "1065px"
      }, {
        footer: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_4, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_upload, {
          action: getActionUrl.value,
          "on-success": uploadSuccess,
          "show-file-list": false,
          accept: ".jpg,.png,.jpge",
          style: {
            "margin-right": "10px"
          }
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
            size: "small"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[1] || (_cache[1] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" 上传图片 ", -1)])),
            _: 1,
            __: [1]
          })]),
          _: 1
        }, 8, ["action"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          onClick: drawImage,
          size: "small"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[2] || (_cache[2] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" 拍照 ", -1)])),
          _: 1,
          __: [2]
        }), os.value ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_button, {
          key: 0,
          onClick: getCompetence,
          size: "small"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[3] || (_cache[3] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" 打开摄像头 ", -1)])),
          _: 1,
          __: [3]
        })) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_button, {
          key: 1,
          onClick: stopNavigator,
          size: "small"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[4] || (_cache[4] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" 关闭摄像头 ", -1)])),
          _: 1,
          __: [4]
        })), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          onClick: resetCanvas,
          size: "small"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[5] || (_cache[5] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" 重置 ", -1)])),
          _: 1,
          __: [5]
        }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          onClick: onCancel,
          size: "small"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[6] || (_cache[6] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)(" 完成 ", -1)])),
          _: 1,
          __: [6]
        })])]),
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("video", {
          id: "videoCamera",
          class: "canvas",
          width: videoWidth.value,
          height: videoHeight.value,
          autoPlay: ""
        }, null, 8, _hoisted_2), (0,runtime_core_esm_bundler/* createElementVNode */._)("canvas", {
          id: "canvasCamera",
          class: "canvas",
          width: videoWidth.value,
          height: videoHeight.value
        }, null, 8, _hoisted_3)])]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
;// CONCATENATED MODULE: ./src/components/img.vue?vue&type=script&setup=true&lang=js
 
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/img.vue?vue&type=style&index=0&id=1013dedc&rel=stylesheet%2Fscss&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/img.vue?vue&type=style&index=0&id=1013dedc&rel=stylesheet%2Fscss&lang=scss&scoped=true

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(5536);
;// CONCATENATED MODULE: ./src/components/img.vue



;


const __exports__ = /*#__PURE__*/(/* unused pure expression or super */ null && (exportComponent(script, [['__scopeId',"data-v-1013dedc"]])))

/* harmony default export */ var img = ((/* unused pure expression or super */ null && (__exports__)));

/***/ }),

/***/ 3549:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ detail; }
});

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(2363);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(4240);
// EXTERNAL MODULE: ./src/assets/avatar.png
var avatar = __webpack_require__(8308);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(2788);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-router/dist/vue-router.esm-bundler.js
var vue_router_esm_bundler = __webpack_require__(1017);
// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vuex/dist/vuex.esm-bundler.js + 5 modules
var vuex_esm_bundler = __webpack_require__(7284);
// EXTERNAL MODULE: ./src/components/img.vue + 4 modules
var img = __webpack_require__(3475);
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/thread-loader/dist/cjs.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/forum/detail.vue?vue&type=script&setup=true&lang=js


const _hoisted_1 = {
  class: "forum_view"
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
  class: "forum_detail"
};
const _hoisted_6 = {
  class: "forum_title"
};
const _hoisted_7 = {
  class: "forum_info"
};
const _hoisted_8 = {
  class: "forum_name"
};
const _hoisted_9 = {
  class: "forum_time"
};
const _hoisted_10 = {
  class: "thumbs_view"
};
const _hoisted_11 = {
  class: "textActive"
};
const _hoisted_12 = {
  class: "textActive"
};
const _hoisted_13 = ["innerHTML"];
const _hoisted_14 = ["src"];
const _hoisted_15 = {
  class: "operate-row"
};
const _hoisted_16 = {
  class: "comment_add_box"
};
const _hoisted_17 = {
  class: "forum_comment_list"
};
const _hoisted_18 = ["onMouseenter"];
const _hoisted_19 = {
  class: "forum_comment_user"
};
const _hoisted_20 = ["src"];
const _hoisted_21 = {
  key: 1,
  class: "forum_comment_user_avatar",
  src: avatar,
  alt: ""
};
const _hoisted_22 = {
  class: "forum_comment_username"
};
const _hoisted_23 = ["innerHTML"];
const _hoisted_24 = {
  class: "forum_comment_reply_view"
};
const _hoisted_25 = ["onClick"];
const _hoisted_26 = ["onClick"];
const _hoisted_27 = {
  key: 0,
  class: "forum_comment_second_list"
};
const _hoisted_28 = ["onMouseenter"];
const _hoisted_29 = {
  class: "forum_comment_second_user"
};
const _hoisted_30 = ["src"];
const _hoisted_31 = {
  key: 1,
  class: "forum_comment_second_user_avatar",
  src: avatar,
  alt: ""
};
const _hoisted_32 = {
  class: "forum_comment_second_username"
};
const _hoisted_33 = ["innerHTML"];
const _hoisted_34 = {
  class: "forum_comment_second_reply_view"
};
const _hoisted_35 = ["onClick"];
const _hoisted_36 = {
  class: "formModel_btn_box"
};
const _hoisted_37 = {
  slot: "footer",
  class: "dialog-footer",
  style: {
    "text-align": "right"
  }
};




const tableName = 'forum';
const formName = '论坛交流';
/* harmony default export */ var detailvue_type_script_setup_true_lang_js = ({
  __name: 'detail',
  setup(__props) {
    const store = (0,vuex_esm_bundler/* useStore */.oR)();
    const user = (0,runtime_core_esm_bundler/* computed */.Fl)(() => store.getters['user/session']);
    const context = (0,runtime_core_esm_bundler/* getCurrentInstance */.FN)()?.appContext.config.globalProperties;
    //基础信息
    const router = (0,vue_router_esm_bundler/* useRouter */.tv)();
    const route = (0,vue_router_esm_bundler/* useRoute */.yj)();
    const sessionTable = localStorage.getItem('frontSessionTable');
    const baseUrl = (0,reactivity_esm_bundler/* ref */.iH)(context.$config.url);
    //权限验证
    const btnAuth = (e, a) => {
      if (context?.$toolUtil.isAuth(e, a)) {
        return true;
      }
      if (centerType.value) {
        return context?.$toolUtil.isBackAuth(e, a);
      }
    };
    //返回
    const backClick = () => {
      history.back();
    };
    const detailForm = (0,reactivity_esm_bundler/* ref */.iH)({});
    const getDetail = () => {
      context?.$http({
        url: `forum/list/${route.query.id}`,
        method: 'get'
      }).then(res => {
        detailForm.value = res.data.data;
        if (detailForm.value.cover) {
          detailForm.value.imgUrls = detailForm.value.cover.split(',').map(url => {
            if (url && url.substr(0, 4) == 'http') {
              return url;
            } else {
              return baseUrl.value + url;
            }
          });
        }
        // 赞踩状态
        getThumbsupOrCrazily();
      });
    };
    // 赞or踩
    const thumbsupOrCrazilyInfo = (0,reactivity_esm_bundler/* ref */.iH)({});
    // 获取赞踩状态
    const getThumbsupOrCrazily = () => {
      if (context?.$toolUtil.storageGet('frontToken')) {
        context?.$http({
          url: 'storeup/page',
          method: 'get',
          params: {
            page: 1,
            limit: 99,
            refid: detailForm.value.id,
            tablename: 'forum',
            userid: user.value.id
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
        name: detailForm.value.title,
        picture: '',
        refid: detailForm.value.id,
        type: type,
        tablename: 'forum',
        userid: user.value.id
      };
      context?.$http({
        url: 'storeup/add',
        method: 'post',
        data: params
      }).then(res => {
        if (type == 21) detailForm.value.thumbsupNumber += 1;
        if (type == 22) detailForm.value.crazilyNumber += 1;
        context?.$http({
          url: `forum/update`,
          method: 'post',
          data: detailForm.value
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
        if (type == 21 && detailForm.value.thumbsupNumber > 0) detailForm.value.thumbsupNumber -= 1;
        if (type == 22 && detailForm.value.crazilyNumber > 0) detailForm.value.crazilyNumber -= 1;
        context?.$http({
          url: `forum/update`,
          method: 'post',
          data: detailForm.value
        });
        getThumbsupOrCrazily();
        context?.$toolUtil.message('取消成功', 'success');
      });
    };
    //评论
    const commentForm = (0,reactivity_esm_bundler/* ref */.iH)({
      content: '',
      parentid: '',
      userid: '',
      username: '',
      avatarurl: ''
    });
    const commentVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    //重置评论
    const resetCommentForm = () => {
      commentForm.value = {
        content: '',
        parentid: '',
        userid: user.value.id,
        username: context?.$toolUtil.storageGet('frontName'),
        avatarurl: context?.$toolUtil.storageGet('headportrait') ? context?.$toolUtil.storageGet('headportrait') : ''
      };
    };
    //发表评论
    const commentClick = () => {
      resetCommentForm();
      commentForm.value.parentid = detailForm.value.id;
      commentVisible.value = true;
    };
    //回复按钮显示
    const commentShowIndex = (0,reactivity_esm_bundler/* ref */.iH)(-1);
    const commentShowIndex1 = (0,reactivity_esm_bundler/* ref */.iH)(-1);
    const commentEnter = index => {
      commentShowIndex.value = index;
    };
    const commentLeave = () => {
      commentShowIndex.value = -1;
    };
    const commentEnter1 = index => {
      commentShowIndex1.value = index;
    };
    const commentLeave1 = () => {
      commentShowIndex1.value = -1;
    };
    //评论内容回调
    const commentChange = e => {
      commentForm.value.content = e;
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
    //发表保存
    const commentSave = () => {
      if (commentForm.value.content == '') {
        context?.$toolUtil.message(`请输入内容`, 'error');
        return false;
      }
      commentForm.value.title = detailForm.value.title;
      for (var i = 0; i < sensitiveWordsArr.value.length; i++) {
        //全局替换
        var reg = new RegExp(sensitiveWordsArr.value[i], "g");
        //判断内容中是否包括敏感词
        if (commentForm.value.content.indexOf(sensitiveWordsArr.value[i]) > -1) {
          // 将敏感词替换为 **
          commentForm.value.content = commentForm.value.content.replace(reg, "**");
        }
      }
      context?.$http({
        url: 'forum/add',
        method: 'post',
        data: commentForm.value
      }).then(res => {
        context.$message.success(`发表成功`);
        getDetail();
        commentVisible.value = false;
      });
    };
    //评论删除
    const commentDelClick = (id = null) => {
      if (id) {
        ElMessageBox.confirm(`是否删除选中评论`, '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          context?.$http({
            url: `forum/delete`,
            method: 'post',
            data: [id]
          }).then(res => {
            context.$message.success('删除成功');
            getDetail();
          });
        }).catch(_ => {});
      }
    };
    //评论回复
    const commentReplyClick = (id = null) => {
      if (id) {
        resetCommentForm();
        commentForm.value.parentid = id;
        commentVisible.value = true;
      }
    };
    const reportVisible = (0,reactivity_esm_bundler/* ref */.iH)(false);
    const reportFormRef = (0,reactivity_esm_bundler/* ref */.iH)();
    const reportForm = (0,reactivity_esm_bundler/* ref */.iH)({
      forumId: '',
      title: '',
      userid: user.value.id,
      reportUserid: user.value.id,
      reportUsername: context?.$toolUtil.storageGet('frontName'),
      reportedUserid: '',
      reportedUsername: '',
      reason: '',
      images: '',
      suggestion: '',
      status: '待处理',
      reporttype: '主题帖举报'
    });
    const reportRules = (0,reactivity_esm_bundler/* ref */.iH)({
      reason: [{
        required: true,
        message: '请输入举报理由',
        trigger: 'blur'
      }]
    });
    //上传回调
    const uploadSuccess = e => {
      reportForm.value.images = e;
    };
    const toReport = () => {
      if (!user.value.id) return context.$message.warning("请先登录");
      if (detailForm.value.userid == user.value.id) return context.$message.error("不能举报自己！");
      reportForm.value = {
        forumId: detailForm.value.id,
        title: detailForm.value.title,
        userid: user.value.id,
        reportUserid: user.value.id,
        reportUsername: context?.$toolUtil.storageGet('frontName'),
        reportedUserid: detailForm.value.userid,
        reportedUsername: detailForm.value.username,
        reason: '',
        images: '',
        suggestion: '',
        status: '待处理',
        reporttype: '主题帖举报'
      };
      reportVisible.value = true;
    };
    const reportSave = () => {
      reportFormRef.value.validate(valid => {
        if (valid) {
          context.$http.post('forumreport/add', reportForm.value).then(res => {
            if (res.data.code == 0) {
              context.$message.success('举报信息已提交!');
              reportVisible.value = false;
            }
          });
        } else {
          return false;
        }
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
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      init();
    });
    return (_ctx, _cache) => {
      const _component_el_button = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-button");
      const _component_el_breadcrumb_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-breadcrumb-item");
      const _component_el_breadcrumb = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-breadcrumb");
      const _component_el_divider = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-divider");
      const _component_el_carousel_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-carousel-item");
      const _component_el_carousel = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-carousel");
      const _component_EditPen = (0,runtime_core_esm_bundler/* resolveComponent */.up)("EditPen");
      const _component_el_icon = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-icon");
      const _component_el_card = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-card");
      const _component_editor = (0,runtime_core_esm_bundler/* resolveComponent */.up)("editor");
      const _component_el_form_item = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-form-item");
      const _component_el_col = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-col");
      const _component_el_row = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-row");
      const _component_el_form = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-form");
      const _component_el_dialog = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-dialog");
      const _component_el_input = (0,runtime_core_esm_bundler/* resolveComponent */.up)("el-input");
      const _component_uploads = (0,runtime_core_esm_bundler/* resolveComponent */.up)("uploads");
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_1, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_2, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_3, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
        class: "back_btn",
        onClick: backClick
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[11] || (_cache[11] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("返回", -1)])),
        _: 1,
        __: [11]
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
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[12] || (_cache[12] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("首页", -1)])),
          _: 1,
          __: [12]
        }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_breadcrumb_item, {
          class: "second_breadcrumb",
          to: {
            path: '/index/forumList'
          }
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)((0,shared_esm_bundler/* toDisplayString */.zw)(formName))]),
          _: 1
        }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_breadcrumb_item, {
          class: "second_breadcrumb"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[13] || (_cache[13] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("内容", -1)])),
          _: 1,
          __: [13]
        })]),
        _: 1
      })])]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_5, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_6, [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.title), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_7, [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_8, " 发布人：" + (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.isAnonymous == 1 && detailForm.value.userid != user.value.id ? '匿名' : detailForm.value.username), 1), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_9, "发布时间：" + (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.addtime), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_10, [!thumbsupOrCrazilyInfo.value.type ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, {
        key: 0
      }, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "zan_view",
        style: {
          "cursor": "pointer"
        },
        onClick: _cache[0] || (_cache[0] = $event => thumbsupOrCrazilyClick(21))
      }, [_cache[14] || (_cache[14] = (0,runtime_core_esm_bundler/* createElementVNode */._)("i", {
        class: "iconfont icon-thumb-up-line1"
      }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, "赞(" + (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.thumbsupNumber) + ")", 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "zan_view",
        style: {
          "cursor": "pointer"
        },
        onClick: _cache[1] || (_cache[1] = $event => thumbsupOrCrazilyClick(22))
      }, [_cache[15] || (_cache[15] = (0,runtime_core_esm_bundler/* createElementVNode */._)("i", {
        class: "iconfont icon-thumb-down-line1"
      }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", null, "踩(" + (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.crazilyNumber) + ")", 1)])], 64)) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, {
        key: 1
      }, [thumbsupOrCrazilyInfo.value.type == 21 ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
        key: 0,
        class: "zan_view",
        style: {
          "cursor": "pointer"
        },
        onClick: _cache[2] || (_cache[2] = $event => cancelThumbsupOrCrazilyClick(21))
      }, [_cache[16] || (_cache[16] = (0,runtime_core_esm_bundler/* createElementVNode */._)("i", {
        class: "iconfont iconfontActive icon-thumb-up-fill1"
      }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_11, "取消赞(" + (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.thumbsupNumber) + ")", 1)])) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
        key: 1,
        class: "zan_view",
        style: {
          "cursor": "pointer"
        },
        onClick: _cache[3] || (_cache[3] = $event => cancelThumbsupOrCrazilyClick(22))
      }, [_cache[17] || (_cache[17] = (0,runtime_core_esm_bundler/* createElementVNode */._)("i", {
        class: "iconfont iconfontActive icon-thumb-down-fill1"
      }, null, -1)), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_12, "取消踩(" + (0,shared_esm_bundler/* toDisplayString */.zw)(detailForm.value.crazilyNumber) + ")", 1)]))], 64))]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_divider), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "forum_content",
        innerHTML: detailForm.value.content
      }, null, 8, _hoisted_13), detailForm.value.imgUrls ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_carousel, {
        key: 0,
        class: "forum_swiper"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)(detailForm.value.imgUrls, item => {
          return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createBlock */.j4)(_component_el_carousel_item, null, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createElementVNode */._)("img", {
              src: item,
              style: {
                "width": "100%",
                "height": "100%",
                "object-fit": "cover"
              }
            }, null, 8, _hoisted_14)]),
            _: 2
          }, 1024);
        }), 256))]),
        _: 1
      })) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_15, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
        class: "report-btn",
        style: {
          "cursor": "pointer"
        },
        onClick: _cache[4] || (_cache[4] = $event => toReport())
      }, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_icon, null, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_EditPen)]),
        _: 1
      }), _cache[18] || (_cache[18] = (0,runtime_core_esm_bundler/* createTextVNode */.Uk)("举报 ", -1))])])]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_card, {
        class: "forum_comment_box"
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_divider, {
          class: "comment_divider",
          "content-position": "center"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[19] || (_cache[19] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("评论列表", -1)])),
          _: 1,
          __: [19]
        }), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_16, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          class: "comment_add",
          onClick: commentClick,
          type: "success"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[20] || (_cache[20] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("发表评论", -1)])),
          _: 1,
          __: [20]
        })]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_17, [((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)(detailForm.value.childs, (item, index) => {
          return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
            class: "forum_comment",
            key: index,
            onMouseenter: $event => commentEnter(index),
            onMouseleave: commentLeave
          }, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_19, [item.avatarurl ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("img", {
            key: 0,
            class: "forum_comment_user_avatar",
            src: baseUrl.value + item.avatarurl.split(',')[0],
            alt: ""
          }, null, 8, _hoisted_20)) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("img", _hoisted_21)), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_22, (0,shared_esm_bundler/* toDisplayString */.zw)(item.username), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
            class: "forum_comment_content",
            innerHTML: item.content
          }, null, 8, _hoisted_23), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_24, [commentShowIndex.value == index && item.userid == user.value.id ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
            key: 0,
            class: "forum_comment_del",
            onClick: $event => commentDelClick(item.id)
          }, "删除", 8, _hoisted_25)) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true), commentShowIndex.value == index ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
            key: 1,
            class: "forum_comment_reply",
            onClick: $event => commentReplyClick(item.id)
          }, "回复", 8, _hoisted_26)) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)]), item.childs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", _hoisted_27, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_divider, {
            class: "forum_comment_second_divider",
            "content-position": "center"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[21] || (_cache[21] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("回复", -1)])),
            _: 1,
            __: [21]
          }), ((0,runtime_core_esm_bundler/* openBlock */.wg)(true), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(runtime_core_esm_bundler/* Fragment */.HY, null, (0,runtime_core_esm_bundler/* renderList */.Ko)(item.childs, (items, indexs) => {
            return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
              class: "forum_comment_second",
              key: indexs,
              onMouseenter: $event => commentEnter1(indexs),
              onMouseleave: commentLeave1
            }, [(0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_29, [items.avatarurl ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("img", {
              key: 0,
              class: "forum_comment_second_user_avatar",
              src: baseUrl.value + items.avatarurl.split(',')[0],
              alt: ""
            }, null, 8, _hoisted_30)) : ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("img", _hoisted_31)), (0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_32, (0,shared_esm_bundler/* toDisplayString */.zw)(items.username), 1)]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", {
              class: "forum_comment_second_content",
              innerHTML: items.content
            }, null, 8, _hoisted_33), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_34, [commentShowIndex.value == index && items.userid == user.value.id && commentShowIndex1.value == indexs ? ((0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)("div", {
              key: 0,
              class: "forum_comment_second_del",
              onClick: $event => commentDelClick(items.id)
            }, "删除", 8, _hoisted_35)) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)])], 40, _hoisted_28);
          }), 128))])) : (0,runtime_core_esm_bundler/* createCommentVNode */.kq)("", true)], 40, _hoisted_18);
        }), 128))])]),
        _: 1
      })]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_dialog, {
        modelValue: commentVisible.value,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => commentVisible.value = $event),
        title: '发表评论',
        width: "50%",
        "destroy-on-close": ""
      }, {
        footer: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createElementVNode */._)("span", _hoisted_36, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          class: "formModel_cancel",
          onClick: _cache[5] || (_cache[5] = $event => commentVisible.value = false)
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[22] || (_cache[22] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("关闭", -1)])),
          _: 1,
          __: [22]
        }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          class: "formModel_confirm",
          type: "primary",
          onClick: commentSave
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[23] || (_cache[23] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("发表", -1)])),
          _: 1,
          __: [23]
        })])]),
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_form, {
          class: "add_form",
          model: commentForm.value,
          "label-width": "120px"
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_row, null, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_col, {
              span: 24
            }, {
              default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_form_item, {
                prop: "content",
                label: "内容"
              }, {
                default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_editor, {
                  value: commentForm.value.content,
                  placeholder: "请输入评论",
                  class: "list_editor",
                  onChange: commentChange
                }, null, 8, ["value"])]),
                _: 1
              })]),
              _: 1
            })]),
            _: 1
          })]),
          _: 1
        }, 8, ["model"])]),
        _: 1
      }, 8, ["modelValue"]), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_dialog, {
        title: "举报",
        modelValue: reportVisible.value,
        "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => reportVisible.value = $event)
      }, {
        default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_form, {
          model: reportForm.value,
          rules: reportRules.value,
          ref_key: "reportFormRef",
          ref: reportFormRef
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_form_item, {
            label: "举报原因",
            "label-width": "80px",
            prop: "reason"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_input, {
              type: "textarea",
              modelValue: reportForm.value.reason,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => reportForm.value.reason = $event),
              rows: 5
            }, null, 8, ["modelValue"])]),
            _: 1
          }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_form_item, {
            label: "补充截图",
            "label-width": "80px"
          }, {
            default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_uploads, {
              action: "file/upload",
              tip: "请上传封面",
              style: {
                "width": "100%",
                "text-align": "left"
              },
              fileUrls: reportForm.value.images ? reportForm.value.images : '',
              onChange: uploadSuccess
            }, null, 8, ["fileUrls"])]),
            _: 1
          })]),
          _: 1
        }, 8, ["model", "rules"]), (0,runtime_core_esm_bundler/* createElementVNode */._)("div", _hoisted_37, [(0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          onClick: _cache[8] || (_cache[8] = $event => reportVisible.value = false)
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[24] || (_cache[24] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("取 消", -1)])),
          _: 1,
          __: [24]
        }), (0,runtime_core_esm_bundler/* createVNode */.Wm)(_component_el_button, {
          type: "primary",
          onClick: _cache[9] || (_cache[9] = $event => reportSave())
        }, {
          default: (0,runtime_core_esm_bundler/* withCtx */.w5)(() => _cache[25] || (_cache[25] = [(0,runtime_core_esm_bundler/* createTextVNode */.Uk)("确 定", -1)])),
          _: 1,
          __: [25]
        })])]),
        _: 1
      }, 8, ["modelValue"])], 64);
    };
  }
});
;// CONCATENATED MODULE: ./src/views/pages/forum/detail.vue?vue&type=script&setup=true&lang=js
 
;// CONCATENATED MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/stylePostLoader.js!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/forum/detail.vue?vue&type=style&index=0&id=d5425b54&scoped=true&lang=scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/views/pages/forum/detail.vue?vue&type=style&index=0&id=d5425b54&scoped=true&lang=scss

// EXTERNAL MODULE: ../../../../../project/back/8082/generator/node_modules_front/1/node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(5536);
;// CONCATENATED MODULE: ./src/views/pages/forum/detail.vue



;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(detailvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-d5425b54"]])

/* harmony default export */ var detail = (__exports__);

/***/ })

}]);
//# sourceMappingURL=549.e9bd354e.js.map