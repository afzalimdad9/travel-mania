export function htmlToText(html) {
    // Create a new DOM element
    const tempDiv = document.createElement("div");

    // Assign the HTML content to the element
    tempDiv.innerHTML = html;

    // Extract the text content from the element
    return tempDiv.textContent || tempDiv.innerText || "";
}

export function calculateNights(checkin, checkout) {
    // Convert the dates to Date objects
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    // Calculate the difference in time
    const differenceInTime = checkoutDate - checkinDate;

    // Calculate the difference in days (nights)
    const differenceInNights = differenceInTime / (1000 * 3600 * 24);

    return differenceInNights;
}

export function getLocalItem(itemName, defaultValue) {
    return typeof window !== "undefined" &&
        window.localStorage.getItem(itemName) !== null
        ? (typeof defaultValue === 'string' || typeof defaultValue === 'number' ? window.localStorage.getItem(itemName) : JSON.parse(window.localStorage.getItem(itemName)))
        : defaultValue
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate =
        date.getUTCFullYear() +
        "-" +
        String(date.getUTCMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getUTCDate() + 1).padStart(2, "0");
    return formattedDate;
}
export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export function getDifferenceInHoursAndMinutes(date1, date2) {
    const dateObj1 = new Date(date1);
    const dateObj2 = new Date(date2);

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(dateObj2 - dateObj1);

    // Convert milliseconds to hours and minutes
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    return { hours: diffInHours, minutes: diffInMinutes };
}