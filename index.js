const puppeteer = require("puppeteer-extra");
const devtools = require("puppeteer-extra-plugin-devtools");
const userPreferences = require("puppeteer-extra-plugin-user-preferences");

puppeteer.use(devtools());
puppeteer.use(
  userPreferences({
    // Set download directory to the desired path
    prefs: {
      "profile.default_content_settings.popups": 0,
      "download.default_directory":
        "C:\\Users\\Sahil\\Desktop\\React Projects\\sdssa\\test15\\",
    },
  })
);

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch({ headless: false });

  // Open a new page
  const page = await browser.newPage();

  // Go to WhatsApp Web
  await page.goto("https://web.whatsapp.com/", { waitUntil: "networkidle0" });

  // Wait for the user to log in manually
  console.log("Please log in to WhatsApp Web and press Enter to continue...");
  await page.waitForSelector(".lhggkp7q");

  // Load video file
  const videoPath =
    "C:\Users\Sahil\Desktop\React Projects\sdssa\test15\TestVideo.mp4"; // Path to your video file

  // Select unsaved contacts
  const unsavedContacts = ["Pranal"]; // Add your unsaved contacts here

  for (const contact of unsavedContacts) {
    // Click on the input text field to start a new chat
    await page.click('div[data-tab="3"]');

    // Wait for the input text field to appear
    await page.waitForSelector('div[data-tab="3"][contenteditable="true"]');

    // Type the contact name or number in the input field
    await page.type('div[data-tab="3"][contenteditable="true"]', contact);

    // Wait for the contact to appear in the search results
    await page.waitForSelector(`span[title="${contact}"]`);

    // Click on the contact from the search results
    await page.click(`span[title="${contact}"]`);

    // Wait for the chat box to appear
    await page.waitForSelector('div[role="textbox"][contenteditable="true"]');

    // Click on the attachment button
    await page.click('span[data-icon="attach-menu-plus"]');

    // Wait for the attach menu to expand
    await page.waitForSelector(".bugiwsl0.fooq7fky");

    // Click on the "Photos & Videos" option
    await page.click('div.bugiwsl0.fooq7fky li[class*="jScby"] span');

    // Wait for the file upload input to appear with a longer timeout
    const fileChooser = await page.waitForFileChooser({ timeout: 60000 }); // Increase the timeout to 60 seconds

    // Press Tab key to focus on the file chooser dialog
    await page.keyboard.press("Tab");

    // Press Enter key to open the file chooser dialog
    await page.keyboard.press("Enter");

    // Wait for a short duration to ensure the file chooser dialog is fully loaded
    await page.waitForTimeout(2000);

    // Press Tab key to navigate to the file input field
    await page.keyboard.press("Tab");

    // Provide the file path to the file input field and press Enter to confirm
    await page.keyboard.type(
      "C:\Users\Sahil\Desktop\React Projects\sdssa\test15\TestVideo.mp4"
    );
    await page.keyboard.press("Enter");

    console.log("File selected");

    // Wait for the file to be uploaded (adjust timeout if needed)
    await page.waitForTimeout(3000);

    // Click on the submit button in the file chooser window
    await page.click("div._3wFFT");

    console.log("Submit button clicked");

    // Wait for the message to be sent (adjust timeout if needed)
    await page.waitForTimeout(3000);

    console.log(`Video sent to ${contact}`);
  }

  // Close the browser
  await browser.close();
})();
