const formatMoney = (amount) => {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(amount);
};

export default formatMoney;
