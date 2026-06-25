<?php

$uploadDir = "uploads";
$completedDir = "completed";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir);
}

if (!is_dir($completedDir)) {
    mkdir($completedDir);
}

$chunkIndex = (int)$_POST["chunkIndex"];
$totalChunks = (int)$_POST["totalChunks"];
$fileName = $_POST["fileName"];

$chunkPath = $uploadDir . DIRECTORY_SEPARATOR . $chunkIndex . ".chunk";

move_uploaded_file(
    $_FILES["chunk"]["tmp_name"],
    $chunkPath
);

echo "Saved chunk {$chunkIndex}\n";



if ($chunkIndex == $totalChunks - 1) {

    $finalFile = $completedDir . DIRECTORY_SEPARATOR . $fileName;

    $output = fopen($finalFile, "wb");

    for ($index = 0; $index < $totalChunks; $index++) {

        $chunk = fopen(
            $uploadDir . DIRECTORY_SEPARATOR . $index . ".chunk",
            "rb"
        );

        while (!feof($chunk)) {

            fwrite(
                $output,
                fread($chunk, 8192)
            );

        }

        fclose($chunk);

    }

    fclose($output);

    echo "File merged successfully!";
}