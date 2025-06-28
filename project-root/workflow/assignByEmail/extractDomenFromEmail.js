export function extractDomenFromEmail(email_value) {
    const match = email_value.match(/@.+$/);
  return match ? match[0] : null;
}