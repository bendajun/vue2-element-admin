import dayjs from 'dayjs';
import {
  APP_TITLE,
} from '@/constant/app';

/**
  * 导入指定上下文中所有模块的默认导出，导出结果以文件名为key，默认导出为value
  * @param {RequireContext} modulesFiles 由webpack提供的require.context方法返回的上下文
  * @param {Boolean} bAllExport 是否导出模块中所有export内容，默认只导出export default
  */
export function importAll(modulesFiles, bAllExport = false) {
  const modules = modulesFiles.keys().reduce((modules, modulePath) => { // modulesFiles.keys()是一个文件名数组
    // 排除index.js文件
    if (modulePath.includes('index.js')) { // 排除index.js
      return modules;
    }
    // 以文件名为key
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath); // value就是文件名对应的模块
    modules[moduleName] = bAllExport ? {
      ...value,
    } : value.default;
    return modules;
  }, {});
  return modules;
}

/**
 * 设置文档标题，路由名 - 系统名
 * @param {string} title 文档标题
 */
export function setDocumentTitle(title) {
  document.title = title || APP_TITLE;
}

/**
 * 日期格式化
 * @param {date} date 日期,可以传一个时间戳和时间格式的字符串
 * @param {string} formatter 格式化模板
 */
export function dateFormat(date = new Date(), formatter = 'YYYY-MM-DD HH:mm') {
// 兼容时间戳和字符串格式
  return dayjs(+date ? new Date(+date) : date).format(formatter);
}

/**
 * 获取日期+星期
 * @param {date} date 日期
 * @param {string} formatter 格式化模板
 */
export function dateAndWeekFormat(date = new Date(), formatter = 'MM-DD') {
  var mydate = new Date(date);
  var myddy = mydate.getDay(); // getDay可以获取到一周的周几
  var weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return dayjs(date).format(formatter) + weekday[myddy];
}

/**
 * 日期选择格式化
 * 最近7天、最近15天、最近1个月、最近3个月
 * @param {type} type 类型，为0表示获取最近7天的事件段数组
 * @param {object} formatter 格式化选项，默认千分
 */
export function dates(type, formatter = 'YYYY-MM-DD HH:mm:ss') {
  switch (type) {
    case 0: return [
      dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ];
    case 1: return [
      dayjs().subtract(15, 'day').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ];
    case 2: return [
      dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ];
    case 3: return [
      dayjs().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ];
    case 4: return [
      dayjs().subtract(7, 'day').format(formatter),
      dayjs().subtract(6, 'day').format(formatter),
      dayjs().subtract(5, 'day').format(formatter),
      dayjs().subtract(4, 'day').format(formatter),
      dayjs().subtract(3, 'day').format(formatter),
      dayjs().subtract(2, 'day').format(formatter),
      dayjs().format(formatter)
    ];
  }
}

/**
 * 获取最近一周所有日期
 * @param {string} formatter 格式化模板
 */
export function sevenDate(formatter = 'YYYY-MM-DD') {
  let sevenDays = [
    dayjs().subtract(6, 'day').format(formatter),
    dayjs().subtract(5, 'day').format(formatter),
    dayjs().subtract(4, 'day').format(formatter),
    dayjs().subtract(3, 'day').format(formatter),
    dayjs().subtract(2, 'day').format(formatter),
    dayjs().subtract(1, 'day').format(formatter),
    dayjs().format(formatter)
  ];
  return sevenDays;
}

/** 数组扁平化处理
 * @param {Array} arr 需要扁平化的对象数组，如 [{},{ children: [{}] }]
 */
export function flatArray(arr) {
  let flatArr = [];
  arr.forEach(item => {
    flatArr.push({ ...item });
    if (item.children && item.children.length !== 0) {
      flatArr.push(
        ...flatArray(item.children)
      );
    }
  });
  return flatArr;
};
