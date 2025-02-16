export async function appLogin(page, url, email, password) {
    await page.goto(url);
    await page.locator("#username").fill(email);
    await page.locator("#password").fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();

    // Ensure login was successful by checking if Logout button is visible
    await page.getByRole("button", { name: "Logout" }).waitFor({ state: "visible" });
}

export async function getColumn(page, columnName) {
  return page.locator(`div:has(> h2:has-text('${columnName}'))`);
}

export async function getCard(column, cardText) {
  return column.locator("div").filter({ hasText: cardText }).first();
}

export async function getTag(card, tagText) {
  return card.locator("span").filter({ hasText: tagText }).first();
  
}
