const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CertModuleV", (m) => {

  const cert = m.contract("Cert");

  return { cert };
});
