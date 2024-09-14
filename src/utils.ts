// 定义返回值类型
type RetirementInfo = {
  retirementAge: string; // 退休年龄，例如 "60岁" 或 "61岁3个月"
  retirementTime: string; // 具体退休时间，格式为 "YYYY年MM月"
  delayMonths: string; // 延迟退休的月数，格式为 "X个月"
};

/**
 * 计算两个日期之间的月份差
 * @param fromYear 起始年份
 * @param fromMonth 起始月份
 * @param toYear 结束年份
 * @param toMonth 结束月份
 * @returns 月份差
 */
const monthDiff = (
  fromYear: number,
  fromMonth: number,
  toYear: number,
  toMonth: number
): number => {
  return (toYear - fromYear) * 12 + toMonth - fromMonth;
};

/**
 * 给指定日期增加月份
 * @param date 起始日期
 * @param months 要增加的月数
 * @returns 增加月份后的新日期
 */
const addMonths = (date: Date, months: number): Date => {
  date.setMonth(date.getMonth() + months);
  return date;
};

/**
 * 计算退休信息
 * @param yearOfBirth 出生年份
 * @param monthOfBirth 出生月份
 * @param type 类型：'male' 男性, 'female50' 50岁退休女性, 'female55' 55岁退休女性
 * @returns RetirementInfo 退休信息对象
 */
function calculateRetirement(
  yearOfBirth: number,
  monthOfBirth: number,
  type: 'male' | 'female50' | 'female55'
): RetirementInfo {
  let retirementAge = '';
  let retirementTime = '';
  let delayMonths = 0;

  // 根据不同类型计算退休年龄和延迟月数
  if (type === 'male') {
    // 男性退休计算逻辑
    if (yearOfBirth < 1965) {
      retirementAge = '60岁';
      delayMonths = 0;
    } else if (yearOfBirth > 1976) {
      retirementAge = '63岁';
      delayMonths = 36;
    } else {
      // 1965年至1976年出生的男性，每4个月延迟1个月
      const diff = Math.ceil(monthDiff(1965, 1, yearOfBirth, monthOfBirth) / 4);
      const extraYears = Math.floor(diff / 12);
      const extraMonths = diff % 12;
      retirementAge = `${60 + extraYears}岁${
        extraMonths > 0 ? `${extraMonths}个月` : ''
      }`;
      delayMonths = diff;
    }
  } else if (type === 'female55') {
    // 55岁退休女性计算逻辑
    if (yearOfBirth < 1970) {
      retirementAge = '55岁';
      delayMonths = 0;
    } else if (yearOfBirth > 1981) {
      retirementAge = '58岁';
      delayMonths = 36;
    } else {
      // 1970年至1981年出生的女性，每4个月延迟1个月
      const diff = Math.ceil(monthDiff(1970, 1, yearOfBirth, monthOfBirth) / 4);
      const extraYears = Math.floor(diff / 12);
      const extraMonths = diff % 12;
      retirementAge = `${55 + extraYears}岁${
        extraMonths > 0 ? `${extraMonths}个月` : ''
      }`;
      delayMonths = diff;
    }
  } else if (type === 'female50') {
    // 50岁退休女性计算逻辑
    if (yearOfBirth < 1975) {
      retirementAge = '50岁';
      delayMonths = 0;
    } else if (yearOfBirth > 1984) {
      retirementAge = '55岁';
      delayMonths = 60;
    } else {
      // 1975年至1984年出生的女性，每2个月延迟1个月
      const diff = Math.ceil(monthDiff(1975, 1, yearOfBirth, monthOfBirth) / 2);
      const extraYears = Math.floor(diff / 12);
      const extraMonths = diff % 12;
      retirementAge = `${50 + extraYears}岁${
        extraMonths > 0 ? `${extraMonths}个月` : ''
      }`;
      delayMonths = diff;
    }
  }

  // 计算具体退休时间
  const retirementStartDate = addMonths(
    new Date(yearOfBirth, monthOfBirth - 1),
    (type === 'male' ? 60 : type === 'female55' ? 55 : 50) * 12 + delayMonths
  );
  retirementTime = `${retirementStartDate.getFullYear()}年${
    retirementStartDate.getMonth() + 1
  }月`;

  // 返回退休信息对象
  return {
    retirementAge,
    retirementTime,
    delayMonths: `${delayMonths}个月`,
  };
}

// 导出函数以供其他文件使用
export { calculateRetirement };
