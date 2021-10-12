export const formatDueDate = (sendDate: string, period: number) => {
  const d = new Date(Date.parse(sendDate) + period * 24 * 60 * 60 * 1000);
  const dueDate = `${
    String(d.getDate()).length === 1 ? "0" + d.getDate() : d.getDate()
  }/${d.getMonth()}/${d.getFullYear()}`;
  return dueDate;
};

export const formatAmount = (amount: string) => {
  const price = amount.split("");
  price.splice(-2, 0, ",");
  price.splice(-6, 0, " ");
  return price.join("");
};

export const formatDiscountedAmount = (amount: string, rate: number) => {
  let price = Number(amount) - Number(amount) * (rate / 100);
  const p: string = String(price);
  return formatAmount(p);
};

export const getTotal = (arr: any[]) => {
  const amount = arr.reduce((acc, curr) => {
    let total = acc;
    if (curr.payedDate) return total;
    if (curr.discount) {
      total +=
        Number(curr.amount) - Number(curr.amount) * (curr.discount.rate / 100);
    } else {
      total += Number(curr.amount);
    }
    return total;
  }, 0);
  return formatAmount(String(amount));
};
