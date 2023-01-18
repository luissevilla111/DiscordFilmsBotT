function getDecimalPart(num: number) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split(".")[1];
  return Number(decimalStr);
}

const getEmojiStars = (number: number) => {
  let stars = "";

  for (let index = 0; index < number; index++) {
    stars += "⭐";
  }

  return stars;
};

export const getStarScore = (score: number | null) => {
  if (score == null) {
    return "❔";
  }

  const num = Math.floor(score);

  if (num < 0) {
    return "🤮";
  }

  if (num == 0) {
    return "🤢";
  }

  const stars = getEmojiStars(num);

  const decimal = getDecimalPart(score);

  if (decimal == 0) {
    return stars;
  }

  if (decimal < 5) {
    return `${stars}🥉`;
  }

  return `${stars}🥈`;
};
