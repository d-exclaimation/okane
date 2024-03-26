export const dollarsAndCents = (amount: number) => {
  const dollars = Math.floor(amount);
  const cents = Math.round((amount - Math.floor(amount)) * 100);

  return [dollars, cents] as const;
};
