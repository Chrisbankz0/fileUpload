<?php

$destination = 'uploads/0.chunk';

move_uploaded_file(
    $_FILES['chunk']['tmp_name'],
    $destination
);

echo "Saved";