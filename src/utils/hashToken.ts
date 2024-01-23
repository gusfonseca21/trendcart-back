import crypto from "crypto";

const hashToken = (unhashedToken: string) => {
  return crypto.createHash("sha256").update(unhashedToken).digest("hex");
};

export default hashToken;
