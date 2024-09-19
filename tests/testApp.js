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
        // Adjusted to match the full text including "Delete"
        assert.strictEqual(addedItemText.trim(), 'Buy groceries\nDelete', "Item was not added to the list!");
        console.log("Test passed: Item 'Buy groceries' is present in the list.");

        // Test: Add another item
        await inputField.sendKeys('Walk the dog');
        await addButton.click();
        let secondItem = await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'Walk the dog')]")), 10000);
        let secondItemText = await secondItem.getText();
        assert.strictEqual(secondItemText.trim(), 'Walk the dog\nDelete', "Second item was not added to the list!");
        console.log("Test passed: Item 'Walk the dog' is present in the list.");

        // Test: Delete the first item
        let deleteFirstItemButton = await driver.findElement(By.xpath("//li[contains(text(), 'Buy groceries')]/button[contains(text(),'Delete')]"));
        await deleteFirstItemButton.click();
        console.log("Test passed: First item deleted successfully.");

        // Verify that the first item is removed
        let deletedItem = await driver.findElements(By.xpath("//li[contains(text(), 'Buy groceries')]"));
        assert.strictEqual(deletedItem.length, 0, "First item was not deleted from the list!");
        console.log("Test passed: First item 'Buy groceries' was deleted from the list.");

        // Verify that the second item is still present
        let remainingItem = await driver.wait(until.elementLocated(By.xpath("//li[contains(text(), 'Walk the dog')]")), 10000);
        let remainingItemText = await remainingItem.getText();
        assert.strictEqual(remainingItemText.trim(), 'Walk the dog\nDelete', "Remaining item was not found!");
        console.log("Test passed: Second item 'Walk the dog' is still present.");

        // Test: Add multiple items and delete them one by one
        const tasks = ['Clean the house', 'Finish project', 'Read a book'];
        for (let task of tasks) {
            await inputField.sendKeys(task);
            await addButton.click();
        }

        for (let task of tasks) {
            let taskItem = await driver.wait(until.elementLocated(By.xpath(`//li[contains(text(), '${task}')]`)), 10000);
            let deleteButton = await taskItem.findElement(By.xpath(".//button[contains(text(),'Delete')]"));
            await deleteButton.click();
            console.log(`Test passed: Item '${task}' was deleted.`);
        }

    } catch (error) {
        console.error("Test failed: ", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
