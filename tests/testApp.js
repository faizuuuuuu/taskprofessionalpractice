const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testReactApp() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the React app on localhost:3002
        await driver.get('http://localhost:3002');

        // Wait for the title to appear and verify it
        await driver.wait(until.elementLocated(By.tagName('h1')), 10000);
        let titleText = await driver.findElement(By.tagName('h1')).getText();
        assert.strictEqual(titleText, "Task List", "Title does not match!");
        console.log("Test passed: 'Task List' title is present.");

        // Test adding an item
        const newItem = "Buy groceries";
        let inputField = await driver.findElement(By.css('input'));
        let addButton = await driver.findElement(By.css('button'));

        // Add the new item and click 'Add'
        await inputField.sendKeys(newItem);
        await addButton.click();

        // Wait for the new item to appear in the list
        await driver.wait(until.elementLocated(By.xpath(`//li[contains(., '${newItem}')]`)), 5000);
        let addedItem = await driver.findElement(By.xpath(`//li[contains(., '${newItem}')]`)).getText();

        // Assert that the new item is added to the list
        assert.strictEqual(addedItem.includes(newItem), true, "Item was not added correctly!");
        console.log("Test passed: Item added successfully.");

        // Test deleting the item
        let deleteButton = await driver.findElement(By.xpath(`//li[contains(., '${newItem}')]/button`));
        await deleteButton.click();

        // Wait for the item to be removed from the list
        await driver.wait(until.stalenessOf(driver.findElement(By.xpath(`//li[contains(., '${newItem}')]`))), 5000);
        console.log("Test passed: Item deleted successfully.");

    } catch (error) {
        console.error("Test failed: ", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
