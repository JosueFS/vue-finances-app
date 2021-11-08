export default {
  methods: {
    amountColor(amount) {
      return amount < 0
        ? 'error--text text--lighten-1'
        : 'green--text text--accent-3';
    },
  },
};
