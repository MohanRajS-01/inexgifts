$images = @{
    "main-lamp.jpg" = "https://images.unsplash.com/photo-1542451313056-b7c8e626645f?w=800&q=80"
    "thumb1.jpg" = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=150&q=80"
    "thumb2.jpg" = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=150&q=80"
    "thumb3.jpg" = "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=150&q=80"
    "thumb4.jpg" = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=150&q=80"
    "example-photo.jpg" = "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&q=80"
    "base-wood.jpg" = "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=150&q=80"
    "base-white.jpg" = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&q=80"
}

foreach ($key in $images.Keys) {
    $url = $images[$key]
    $path = "e:\ec\public\assets\images\$key"
    try {
        Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -Headers @{"User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"}
        Write-Host "Downloaded $key"
    } catch {
        Write-Host "Failed to download $key"
    }
}
