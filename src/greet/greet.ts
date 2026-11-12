// 01 — Hello, who?
// Make the tests in greet.test.js green. Run them with: node --test

export function greet(name  = ""): string {
  const trimmedName = name.trim();
  const greetingName = trimmedName
    ? `${trimmedName.charAt(0).toUpperCase()}${trimmedName.slice(1).toLowerCase()}`
    : "stranger";

  return `Hello, ${greetingName}!`;
}