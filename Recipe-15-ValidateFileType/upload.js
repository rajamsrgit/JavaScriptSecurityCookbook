// upload.js
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedTypes.includes(file.type)) {
            // Proceed with file upload
            alert('File is valid. Uploading...');
            // You can submit the form or send the file to the server using AJAX
        } else {
            alert('Invalid file type. Please upload a JPG or PNG file.');
        }
    } else {
        alert('Please choose a file before uploading.');
    }
}
