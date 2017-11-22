/**
 * 2017.8.30
 * wzh
 * 路由控制器
 */

'use strict'


import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [{
    path: '/index/:id',
    component: index,
    children: [{
        path: "",
        component: main
      },
      {
        path: "car",
        component: car
      },
      {
        path: "order",
        meta: {
          requireAuth: true,
        },
        component: order
      },
      {
        path: "mine",
        meta: {
          // 添加该字段，表示进入这个路由是需要登录的
          requireAuth: true,
        },
        component: mine
      },
    ]
  }, {
    path: '/',
    redirect: '/index/main',
    name: 'index',
    component: index
  },
  {
    path: '/chaneel',
    name: 'chaneel',
    component: chaneel
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/logincode',
    name: 'logincode',
    component: logincode
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/forget',
    name: 'forget',
    component: forget
  }, {
    path: '/list',
    name: 'list',
    component: list
  }, {
    path: '/search',
    name: 'search',
    component: search
  }, {
    path: '/goodsinfo/:id',
    name: 'goodsinfo',
    component: goodsinfo
  }, {
    path: '/authInfo',
    name: 'authInfo',
    component: authInfo
  }, {
    path: '/authPage',
    name: 'authPage',
    component: authPage
  }, {
    path: '/goodslease/:id',
    name: 'goodslease',
    component: goodslease
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: authentication
  }, {
    path: '/help',
    name: 'help',
    component: help
  },
  {
    path: '/card',
    name: 'card',
    component: card
  },
  {
    path: '/opinion',
    name: 'opinion',
    component: opinion
  }, {
    path: '/logistics',
    name: 'logistics',
    component: logistics
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: agreement
  },
  {
    path: '/service',
    name: 'service',
    component: service
  }, {
    path: '/transaction',
    name: 'transaction',
    component: transaction
  }, {
    path: '/addressList',
    name: 'addressList',
    meta: {
      requireAuth: true,
    },
    component: addressList
  }, {
    path: '/editAddress/:id',
    name: 'editAddress',
    meta: {
      requireAuth: true,
    },
    component: editAddress
  }, {
    path: '/editAddress',
    meta: {
      requireAuth: true,
    },
    redirect: '/editAddress/add'
  }, {
    path: '/orderInfo/:id',
    meta: {
      requireAuth: true,
    },
    name: 'orderInfo',
    component: orderInfo
  }, {
    path: '/orderLogistics/:id',
    name: 'orderLogistics',
    component: orderLogistics
  }, {
    path: '/orderReturn',
    name: 'orderReturn',
    component: orderReturn
  },
  {
    path: '/goodsList/',
    name: 'goodsList',
    component: goodsList
  }, {
    path: '/collection',
    name: 'collection',
    component: collection
  }, {
    path: '/setting',
    name: 'setting',
    component: setting
  }, {
    path: '/about',
    name: 'about',
    component: about
  }, {
    path: '/shop/:id',
    name: 'shop',
    component: shop
  }, {
    path: '/shopInfo/:id',
    name: 'shopInfo',
    component: shopInfo
  },
  {
    path: '/selected',
    name: 'selected',
    component: selected
  },
  {
    path: '/download',
    name: 'download',
    component: download
  }, {
    path: '/orderAction/:id',
    name: 'orderAction',
    component: orderAction
  }, {
    path: '/orderSuccess',
    name: 'orderSuccess',
    component: orderSuccess
  }, {
    path: '/settlement',
    name: 'settlement',
    component: settlement
  }, {
    path: '/moreHot',
    name: 'moreHot',
    component: moreHot
  },{
    path: '/share',
    name: 'share',
    component: share
  },
  /* 绘本相关路由控制器 */
  {
    path: '/book/:id',
    component: B_home,
    children: [{
        path: "",
        component: B_index
      },
      {
        path: "car",
        meta: {
          requireAuth: true,
        },
        component: B_car
      },
      {
        path: "collect",
        meta: {
          requireAuth: true,
        },
        component: B_collect
      },
      {
        path: "mine",
        meta: {
          // 添加该字段，表示进入这个路由是需要登录的
          requireAuth: true,
        },
        component: B_mine
      },
    ]
  }, {
    path: '/book',
    redirect: '/book/main',
    name: 'book',
    component: B_home
  },{
    path: '/mine_plan',
    name: 'B_mine_plan',
    component: B_mine_plan  
  },{
    path: '/mine_order',
    name: 'B_mine_order',
    component: B_mine_order  
  },{
    path: '/mine_setting',
    name: 'B_mine_setting',
    component: B_mine_setting  
  },{
    path: '/mine_age',
    name: 'B_mine_age',
    component: B_mine_age  
  },{
    path: '/book_bookInfo/:id',
    name: 'B_bookInfo',
    component: B_bookInfo  
  },{
    path: '/book_planInfo',
    name: 'B_mine_planInfo',
    component: B_mine_planInfo  
  }

  /* 列表页面 */
  ,{
    path: '/book_bookNew',
    name: 'B_bookNew',
    component: B_bookNew  
  },{
    path: '/book_bookEnglish',
    name: 'B_bookEnglish',
    component: B_bookEnglish  
  },{
    path: '/book_bookHot',
    name: 'B_bookHot',
    component: B_bookHot  
  },{
    path: '/book_bookSeries',
    name: 'B_bookSeries',
    component: B_bookSeries  
  },{
    path: '/book_bookSeriesList',
    name: 'B_bookSeriesList',
    component: B_bookSeriesList  
  },
  /* 选书页面 */
  {
    path: '/book_bookSearch',
    name: 'B_bookSearch',
    component: B_bookSearch  
  },{
    path: '/book_bookPerSearch',
    name: 'B_bookSearch',
    component: B_bookSearch  
  },{
    path: '/book_bookSearchRe',
    name: 'B_bookSearchRe',
    component: B_bookSearchRe  
  },{
    path: '/book_bookPerSearchRe',
    name: 'B_bookPerSearchRe',
    component: B_bookPerSearchRe  
  },
  /* 计划和图书租赁订单相关 */
  {
    path: '/book_bookCard',
    name: 'B_bookCard',
    component: B_bookCard  
  },{
    path: '/book_bookCardInfo',
    name: 'B_bookCardInfo',
    component: B_bookCardInfo  
  },{
    path: '/book_bookOrderInfo',
    name: 'B_bookOrderInfo',
    component: B_bookOrderInfo  
  },{
    path: '/book_bookOrderMessage/:id',
    name: 'B_bookOrderMessage',
    component: B_bookOrderMessage  
  },{
    /* 下单成功 */
    path: '/book_bookSuccess',
    name: 'B_success',
    component: B_success  
  },{
    /* 下单成功 */
    path: '/book_bookFail',
    name: 'B_fail',
    component: B_fail  
  },{
    /* 下单成功 */
    path: '/book_rule',
    name: 'B_rules',
    component: B_rules  
  },{
    /* 精选页面 */
    path: '/featured',
    component: featured  
  },{
    // 更多图书改为HTML
    path: '/books',
    component: books  
  }
  

  
];



export default new Router({
  mode: 'hash',
  routes
});
