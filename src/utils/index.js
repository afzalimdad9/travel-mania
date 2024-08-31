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