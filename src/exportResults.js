export const exportResults = (result) => {
  const fileContent = `
  退休计算结果:
  退休年龄: ${result.retirementAge}
  退休时间: ${result.retirementTime}
  延迟退休: ${result.delayMonths}
    `;

  const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "retirement_calculation.txt";
  link.click();
  URL.revokeObjectURL(url);
};
