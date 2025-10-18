import PayAgencyApi from "@paneruvipin/payagency";

export const api = new PayAgencyApi({
  baseUrl: "https://api.pay.agency",
  encryptionKey:
    process.env.ENCRYPTION_KEY || "89ca59fb3b49ada55851021df12cfbc5",
  secretKey:
    process.env.AUTH_TOKEN ||
    "PA_TEST_94bf3520bcbe435f2ed558c31ac664f3e72dfa3114a3232e436e25f9",
});