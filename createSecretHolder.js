function createSecretHolder(secretHolderNumber) {
  let secretValue = secretHolderNumber;
  return {
    getSecret: function () {
      return secretValue;
    },

    setSecret: function (newSecret) {
      secretValue = newSecret;
    },
  };
}
const secret = createSecretHolder("123");
console.log(secret.getSecret());

secret.setSecret("135");
console.log(secret.getSecret());

