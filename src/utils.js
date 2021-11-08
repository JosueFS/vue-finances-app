const currencyFormater = (
  { locale, currency } = {
    locale: 'pt-BR',
    currency: 'BRL',
  }
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
};

const errorHandler = (error, vm, info) => {
  console.log(`Vue [error handler]: `, error, info);

  const jwtErrors = [
    'jwt malformed',
    'jwt expired',
    'jwt not active',
    'invalid token',
  ];

  if (jwtErrors.some((jwtError) => error.message.includes(jwtError))) {
    vm.$router.push({
      path: '/login',
      query: { redirect: vm.$route.path },
    });
  }
};

const formatError = (message) => {
  const messageSplit = message.split(':');

  return messageSplit[messageSplit.length - 1].trim();
};

const groupBy = (array, key, makeCurrentKey) => {
  return array.reduce((accumulator, item) => {
    const currentKey = makeCurrentKey(item, key);

    return {
      ...accumulator,
      [currentKey]: [...(accumulator[currentKey] || []), item],
    };
  }, {});
};

export { currencyFormater, errorHandler, formatError, groupBy };
