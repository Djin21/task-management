import { test, expect, Page } from "@playwright/test";
import { Task } from "../../src/types/task";

test.beforeEach(async ({ page }) => {
  // The authentication is make before all tasks tests
  await page.goto("http://localhost:5173/login");
  await page.getByLabel("Email").fill("visitor@gmail.com");
  await page.getByLabel("Password").fill("password");
  await page.getByLabel("Password").press("Enter");
  await expect(page.getByRole("main")).toContainText("Task management");
});

test.describe("Create task", () => {
  test("Should add new task throw the form", async ({ page }) => {
    // Create a new task
    await createTask(page);

    // After the submission of the form, the new task should appear on task list
    await expect(page.getByRole("heading", { name: "New task" })).toBeVisible();
  });

  test("Number of tasks should be the same that have been create", async ({
    page,
  }) => {
    // Init a list of tasks
    const Tasks = [
      { title: "First task", description: "Description of the first task" },
      { title: "Second task", description: "Description of the second task" },
    ];

    // Get the number of current tasks
    const initialTasks = await page.locator("main > ul > li").count();

    // Create a new tasks
    for (const task of Tasks) {
      await createTask(page, task as Task);
    }

    // After the submission of the form, the number of tasks should be more than before
    const newTasks = await page.locator("main > ul > li").count();
    await expect(newTasks).toBe(initialTasks + Tasks.length);
  });

  test("The form should be empty after the creation of the task and the modal invisible", async ({
    page,
  }) => {
    // Create a new task
    await createTask(page);

    // Check that input is empty.
    await expect(await page.locator('input[name="title"]').inputValue()).toBe(
      ""
    );
    await expect(
      await page.locator('textarea[name="description"]').inputValue()
    ).toBe("");

    // Check that the modal is hidden
    await expect(page.locator("#modal")).toBeHidden();

    // After the submission of the form, the new task should appear on task list
    await expect(page.getByRole("heading", { name: "New task" })).toBeVisible();
  });

  test("Should set pending state on new tasks", async ({ page }) => {
    // Create a new task
    await createTask(page);

    // After the submission of the form, the new task should appear on task list
    const taskCard = await page.locator(`li:has-text("New task")`);

    // Check if the list item exists
    await expect(taskCard).toBeVisible();

    // Get the state text and verify it's equal to pending
    const stateText = await taskCard.locator("p").last().textContent();
    expect(stateText).toBe("pending");
  });
});

test.describe("Update task", () => {
  test("Should update modal form have the same task informations of task card", async ({
    page,
  }) => {
    // Get the first task
    const taskCard = await page.locator("main > ul > li").nth(1);

    // Check if the list item exists
    await expect(taskCard).toBeVisible();

    //   Get task informations
    const title = await taskCard.locator("h5").textContent();
    const description = await taskCard.locator("p").first().textContent();

    //   Show task details
    await taskCard.click();

    // Verify that fields values is similar to task card informations
    await expect(await page.locator('input[name="title"]').inputValue()).toBe(
      title
    );
    await expect(
      await page.locator('textarea[name="description"]').inputValue()
    ).toBe(description);
  });

  test("Should update task informations", async ({ page }) => {
    // Declare the new informations of the task that will be updated
    const task = { title: "New title", description: "New description" };

    // Get the first task
    const taskCard = await page.locator("main > ul > li").nth(1);

    // Check if the list item exists
    await expect(taskCard).toBeVisible();

    //   Show task details
    await taskCard.click();

    // Set the new informations of the task
    await page.locator('input[name="title"]').fill(task.title);
    await page.locator('textarea[name="description"]').fill(task.description);
    await page
      .locator("#modal")
      .getByRole("button", { name: "Update" })
      .click();

    // Get new informations appear on task card
    const title = await taskCard.locator("h5").textContent();
    const description = await taskCard.locator("p").first().textContent();

    // Verify that informations appear on task card is the correct update information
    await expect(title).toBe(task.title);
    await expect(description).toBe(task.description);
  });

  test("Should change task status", async ({ page }) => {
    // Get the first task
    const taskCard = await page.locator("main > ul > li").nth(1);

    // Check if the list item exists
    await expect(taskCard).toBeVisible();

    //   Show task details
    await taskCard.click();

    // Click on start button for pass from 'pending' state to 'during' state
    await page.locator("#modal").getByRole("button", { name: "Start" }).click();

    // Get new state appear on task card
    let state = await taskCard.locator("p").last().textContent();

    // Verify that the state appear on task card is the correct update information
    await expect(state).toBe("during");

    //   Show task details
    await taskCard.click();

    // Click on start button for pass from 'during' state to 'completed' state
    await page
      .locator("#modal")
      .getByRole("button", { name: "Finish" })
      .click();

    // Get new state appear on task card
    state = await taskCard.locator("p").last().textContent();

    // Verify that the state appear on task card is the correct update information
    await expect(state).toBe("completed");
  });
});

test.describe("Delete task", () => {
  test("Should delete the task", async ({ page }) => {
    // Create a new task
    await createTask(page);

    // Get the task that was created
    const taskCard = page.getByRole("heading", { name: "New Task" });

    // Check if the task exists
    await expect(taskCard).toBeVisible();

    // Show task details
    await taskCard.click();

    // Set the new informations of the task
    await page
      .locator("#modal")
      .getByRole("button", { name: "Delete" })
      .click();

    // Check if the task has been deleted
    await expect(
      page.getByRole("heading", { name: "New Task" })
    ).not.toBeVisible();
  });
});

// Create function for new task
async function createTask(page: Page, task?: Task) {
  // Search and click on the button that is use for create a new task
  const button = await page.locator("#createTaskBtn");
  await expect(button).toBeVisible();
  await button.click();

  // Wait for the modal to appear
  await page.waitForSelector('div[id="modal"]');
  await expect(page.locator("#modal")).toBeVisible();

  await page.getByLabel("Title").fill(task?.title || "New Task");
  await page
    .getByLabel("Description")
    .fill(task?.description || "Description of the new task");
  await page.locator("#modal").getByRole("button", { name: "Create" }).click();
}
