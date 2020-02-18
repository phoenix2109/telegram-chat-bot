module.exports = {

  /**
   * The `port` setting determines witch TCP port your app be deployed on.
    */

  port: 3000,

  /**
   *
   * `host`
   *
    */

  host: 'localhost',
  /**
   *
   * `views`
    */

  views: require('path').join(__basepath, 'apps', 'views'),

  /**
   *
   * `view-engine`
   *
    */

  view_engine: 'ejs',

  /**
   *
   * `adminWhiteList`
   *
    */

  adminWhiteList: ['397823380', '373181771', '473405808'],

  /**
   *
   * `memberWhiteList`
   *
    */

  memberWhiteList: ['397823380', '373181771', '754735674', '473405808'],

  adminChannel: '-1001444501600',

  followChannel: '-374052879',

  gupChannel: '-1001217141928',

  sourceSignal: ['vip2world', 'altfx', 'proforex', 's1whatsapp', 's2whatsapp', 'dinhchien', 'mcm', 'th', 'qu', 'ht'],

  salt: 10
}
