const timeSince = (date: string | number | Date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    const year = Math.floor(interval);
    const textPlural = "Hace {year} años";
    const textSingular = "Hace {year} año";

    if (year <= 1) return textSingular.replace("{year}", `${year}`);
    return textPlural.replace("{year}", `${year}`);
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    const month = Math.floor(interval);
    const textPlural = "Hace {month} meses";
    const textSingular = "Hace {month} mes";

    if (month <= 1) return textSingular.replace("{month}", `${month}`);
    return textPlural.replace("{month}", `${month}`);
  }

  interval = seconds / 86400;
  if (interval > 1) {
    const day = Math.floor(interval);
    const textPlural = "Hace {day} dias";
    const textSingular = "Hace {day} dia";

    if (day <= 1) return textSingular.replace("{day}", `${day}`);
    return textPlural.replace("{day}", `${day}`);
  }

  interval = seconds / 3600;
  if (interval > 1) {
    const hour = Math.floor(interval);
    const textPlural = "Hace {hour} horas";
    const textSingular = "Hace {hour} hora";

    if (hour <= 1) return textSingular.replace("{hour}", `${hour}`);
    return textPlural.replace("{hour}", `${hour}`);
  }

  interval = seconds / 60;
  if (interval > 1) {
    const minute = Math.floor(interval);
    const textPlural = "Hace {minute} minutos";
    const textSingular = "Hace {minute} minuto";

    if (minute <= 1) return textSingular.replace("{minute}", `${minute}`);
    return textPlural.replace("{minute}", `${minute}`);
  }

  const second = Math.floor(seconds);
  const textPlural = "Hace {second} segundos";
  const textSingular = "Hace {second} segundo";

  if (second <= 1) return textSingular.replace("{second}", `${second}`);
  return textPlural.replace("{second}", `${second}`);
};

export default timeSince;
