interface IDateUnits {
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const DateUnits: IDateUnits = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

const getUnitAndValueDate = (secondsElapsed: number) => {
  const entries = Object.entries(DateUnits);

  for (let index = 0; index < entries.length; index += 1) {
    const unit = entries[index][0];
    const secondsInUnit = entries[index][1];

    const match = secondsElapsed >= secondsInUnit || unit === "second";

    if (match) {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
      return { value, unit };
    }
  }

  return { unit: "day", value: 0 };
};

const timeSince = (date: string, locale: string) => {
  const secondsDiff = (Date.now() - Date.parse(date)) / 1000;

  const rtf = new Intl.RelativeTimeFormat(locale);
  const { value, unit }: any = getUnitAndValueDate(secondsDiff);

  return rtf.format(value || 0, unit || "day");
};

export default timeSince;
