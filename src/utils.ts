class RetirementCalculator {
  private yearOfBirth: number;
  private monthOfBirth: number;
  private type: "male" | "female50" | "female55";

  constructor(
    yearOfBirth: number,
    monthOfBirth: number,
    type: "male" | "female50" | "female55",
  ) {
    this.yearOfBirth = yearOfBirth;
    this.monthOfBirth = monthOfBirth;
    this.type = type;
  }

  /**
   * 计算退休信息
   * @returns RetirementInfo 退休信息对象
   */
  public calculate(): RetirementInfo {
    let retirementAge = "";
    let retirementTime = "";
    let delayMonths = 0;

    switch (this.type) {
      case "male":
        [retirementAge, delayMonths] = this.calculateMale();
        break;
      case "female55":
        [retirementAge, delayMonths] = this.calculateFemale55();
        break;
      case "female50":
        [retirementAge, delayMonths] = this.calculateFemale50();
        break;
    }

    retirementTime = this.calculateRetirementTime(delayMonths);

    return {
      retirementAge,
      retirementTime,
      delayMonths: `${delayMonths}个月`,
    };
  }

  private calculateMale(): [string, number] {
    if (this.yearOfBirth < 1965) {
      return ["60岁", 0];
    } else if (this.yearOfBirth > 1976) {
      return ["63岁", 36];
    } else {
      const diff = Math.ceil(this.monthDiff(1965, 1) / 4);
      return this.formatRetirementAge(60, diff);
    }
  }

  private calculateFemale55(): [string, number] {
    if (this.yearOfBirth < 1970) {
      return ["55岁", 0];
    } else if (this.yearOfBirth > 1981) {
      return ["58岁", 36];
    } else {
      const diff = Math.ceil(this.monthDiff(1970, 1) / 4);
      return this.formatRetirementAge(55, diff);
    }
  }

  private calculateFemale50(): [string, number] {
    if (this.yearOfBirth < 1975) {
      return ["50岁", 0];
    } else if (this.yearOfBirth > 1984) {
      return ["55岁", 60];
    } else {
      const diff = Math.ceil(this.monthDiff(1975, 1) / 2);
      return this.formatRetirementAge(50, diff);
    }
  }

  private formatRetirementAge(baseAge: number, diff: number): [string, number] {
    const extraYears = Math.floor(diff / 12);
    const extraMonths = diff % 12;
    const retirementAge = `${baseAge + extraYears}岁${extraMonths > 0 ? `${extraMonths}个月` : ""}`;
    return [retirementAge, diff];
  }

  private monthDiff(fromYear: number, fromMonth: number): number {
    return (this.yearOfBirth - fromYear) * 12 + this.monthOfBirth - fromMonth;
  }

  private calculateRetirementTime(delayMonths: number): string {
    const baseRetirementAge =
      this.type === "male" ? 60 : this.type === "female55" ? 55 : 50;
    const retirementStartDate = this.addMonths(
      new Date(this.yearOfBirth, this.monthOfBirth - 1),
      baseRetirementAge * 12 + delayMonths,
    );
    return `${retirementStartDate.getFullYear()}年${retirementStartDate.getMonth() + 1}月`;
  }

  private addMonths(date: Date, months: number): Date {
    date.setMonth(date.getMonth() + months);
    return date;
  }
}

// 定义返回值类型
interface RetirementInfo {
  retirementAge: string; // 退休年龄，例如 "60岁" 或 "61岁3个月"
  retirementTime: string; // 具体退休时间，格式为 "YYYY年MM月"
  delayMonths: string; // 延迟退休的月数，格式为 "X个月"
}

// 导出类以供其他文件使用
export { RetirementCalculator, RetirementInfo };
