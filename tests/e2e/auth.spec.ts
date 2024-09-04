import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // The authentication is make before all tasks tests
  await page.goto("http://localhost:5173/login");
});

test.describe("Authentication", () => {
  test("Should be authenticate", async ({ page }) => {
    // User parameters for the authentication
    const userParams = { email: "john@gmail.com", password: "password" };

    // Fill the login form fields with the user parameters
    await page.getByLabel("Email").fill(userParams.email);
    await page.getByLabel("Password").fill(userParams.password);
    await page.getByLabel("Password").press("Enter");

    //   Verify that the user has been authenticated by the redirection to the home page
    await expect(page.getByRole("main")).toContainText("Task management");
  });

  test("Should not authenticate", async ({ page }) => {
    // User parameters for the authentication
    const userParams = { email: "false@gmail.com", password: "password" };

    // Fill the login form fields with the user parameters
    await page.getByLabel("Email").fill(userParams.email);
    await page.getByLabel("Password").fill(userParams.password);
    await page.getByLabel("Password").press("Enter");

    //   Verify that the user has'nt been authenticated by the redirection to the home page
    await expect(page.getByRole("main")).not.toBeVisible();
  });
});
