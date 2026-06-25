const CHUNK_SIZE = 1 * 1024 * 1024;

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");

async function uploadChunk(formData) {

    const response = await fetch("upload.php", {
        method: "POST",
        body: formData
    });

    const data = await response.text();

    console.log(data);
}

uploadBtn.addEventListener("click", async () => {

    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {

        const start = chunkIndex * CHUNK_SIZE;
        const end = start + CHUNK_SIZE;

        const chunk = file.slice(start, end);

        const formData = new FormData();

        formData.append("chunk", chunk);
        formData.append("chunkIndex", chunkIndex);
        formData.append("totalChunks", totalChunks);
        formData.append("fileName", file.name);

        console.log(`Uploading chunk ${chunkIndex + 1} of ${totalChunks}`);

        await uploadChunk(formData);

    }

    alert("Upload Complete!");

});