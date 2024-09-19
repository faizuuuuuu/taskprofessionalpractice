const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testTaskList() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the React app on localhost:3002
        await driver.get('http://localhost:3002');

        // Wait until the 'Task List' title is visible
        let taskListTitle = await driver.wait(until.elementLocated(By.tagName('h1')), 10000);
        let titleText = await taskListTitle.getText();
        assert.strictEqual(titleText, "Task List", "Title does not match!");
        console.log("Test passed: 'Task List' title is present.");

        // Add a new item to the list
        let inputField = await driver.findElement(By.css('input[type="text"]'));
        await inputField.sendKeys('Buy groceries');
        let addButton = await driver.findElement(By.xpath("//button[contains(text(),'Add Item')]"));
        await addButton.click();
        console.log("Test passed: Item added successfully.");

        // Wait for the newly added item to appear in the list
        let addedItem = await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'Buy groceries')]")), 10000);
        let addedItemText = await addedItem.getText();
        assert.strictEqual(addedItemText, 'Buy groceries', "Item was not added to the list!");
        console.log("Test passed: Item 'Buy groceries' is present in the list.");

        // Delete the item
        let deleteButton = await driver.findElement(By.xpath("//li[contains(text(), 'Buy groceries')]/button[contains(text(),'Delete')]"));
        await deleteButton.click();
        console.log("Test passed: Item deleted successfully.");

        // Verify that the item is removed from the list
        let deletedItem = await driver.findElements(By.xpath("//li[contains(text(), 'Buy groceries')]"));
        assert.strictEqual(deletedItem.length, 0, "Item was not deleted from the list!");
        console.log("Test passed: Item 'Buy groceries' was deleted from the list.");
    } catch (error) {
        console.error("Test failed: ", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
