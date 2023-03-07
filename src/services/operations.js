import { saveAs } from 'file-saver';

export const ConvertToExcel = ({ jsonData, fileName }) => {
    // Convert the JSON data to an Excel spreadsheet
    // const xlsData = json2xls(jsonData);

    // // Create a Blob object from the data
    // const blob = new Blob([xlsData], { type: 'application/vnd.ms-excel' });

    // // Save the file using the FileSaver library
    // saveAs(blob, `${fileName || "data"}.xlsx`);
}

export const copyToClipboard = (text) => {
    // Create a temporary input element
    const tempInput = document.createElement("input");

    // Set its value to the text we want to copy
    tempInput.value = text;

    // Append the input element to the DOM
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();

    // Copy the selected text to clipboard
    document.execCommand("copy");

    // Remove the input element from the DOM
    document.body.removeChild(tempInput);
}
