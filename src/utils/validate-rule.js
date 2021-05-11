/**
 * Created by HouShiShu on 2021/02/24.
 * 自定义部分常用验证规则
 */

/**
 * 验证不得为空
 */
export const validEmpty = (rule, value, callback) => {
  if (!value) {
    callback(new Error('必填项信息不得为空！'))
  } else {
    callback()
  }
}

/**
 * 验证图片不得为空
 */
export const validEmptyImg = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请上传图片！'))
  } else {
    callback()
  }
}

/**
 * 验证手机号码
 */
export const validPhone = (rule, value, callback) => {
  if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
    callback(new Error('手机号码有误！'))
  } else {
    callback()
  }
}

/**
 * 验证身份证号码
 */
export const validCard = (rule, value, callback) => {
  if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
    callback(new Error('身份证号码有误！'))
  } else {
    callback()
  }
}

/**
 * 验证企业组织机构代码
 */
export const validCompany = (rule, value, callback) => {
  if (!(/^[A-Z0-9]{8}-[A-Z0-9]$|^[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/.test(value))) {
    callback(new Error('组织机构代码号有误！'))
  } else {
    callback()
  }
}

/**
 * 验证数字为正整数
 */
export const validInt = (rule, value, callback) => {
  if (!(/^[1-9][0-9]*$/.test(value))) {
    callback(new Error('请输入正整数！'))
  } else {
    callback()
  }
}

/**
 * 验证为数字
 */
export const validNum = (rule, value, callback) => {
  if (!(/^\d+$|^\d+[.]?\d+$/.test(value))) {
    callback(new Error('请输入数字！'))
  } else {
    callback()
  }
}
