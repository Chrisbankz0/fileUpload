const CHUNK_FILE = 1 * 1024 *1024;

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", () =>{
    const file = fileInput.files[0];

    if(!file){
        alert("please add a file mumu!")
        return
    }
    console.log(file);

    const CHUNK_SIZE = 1 * 1024 * 1024;

    const chunkFile = file.slice(0, CHUNK_SIZE);
    const chunkIndex = 0;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    console.log(chunkFile);
    console.log("Original file size:", file.size);
    console.log("Chunk size:", chunkFile.size);

    const chunk = file.slice(0, CHUNK_SIZE);
    

    const formData = new FormData();

    formData.append("chunk", chunk);
    formData.append("chunkIndex", chunkIndex);
    formData.append("totalChunks", totalChunks);
    formData.append("fileName", file.name);

    for (const pair of formData.entries()) {
        console.log(pair);
    }

fetch("upload.php", {
    method: "POST",
    body: formData
})
.then(response => response.text())
.then(data => {
    console.log("PHP RESPONSE:");
    console.log(data);
})
.catch(error => {
    console.error(error);
});
});