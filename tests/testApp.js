const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testHelloWorld() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the React app on localhost:3002
        await driver.get('http://localhost:3002');

        // Find the element containing the "Hello, World!" text
        let helloWorldText = await driver.findElement(By.tagName('h1')).getText();

        // Assert that the text is "Hello, World!"
        assert.strictEqual(helloWorldText, "Hello, World!", "Text does not match!");

        console.log("Test passed: 'Hello, World!' is present.");
    } catch (error) {
        console.error("Test failed: ", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
