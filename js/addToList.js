(function () {
    const addImageToStore = function (img) {
        if (img) {
            const srcsets = img.getAttribute("srcset").split(",");
            const data = [];

            srcsets.forEach(function (el) {
                const srcset = el.split(' ');
                data.push({
                    src: srcset[0],
                    size: parseInt(srcset[1].slice(0, -1))
                });
            });

            let largest = data.reduce(function (prev, current) {
                return (prev.size > current.size) ? prev : current
            });

            if (largest) {
                let url = largest.src;
                let filename = url.substring(url.lastIndexOf('/') + 1);
                appStore.setItem(filename, url);
            }
        }
    }

    // Posts dialog image
    const dialogImages = document.querySelectorAll('div[role="dialog"] img[srcset]');

    if (dialogImages.length > 0) {
        dialogImages.forEach(function (el) {
            addImageToStore(el);
        });
    } else {
        // try to get from Tagged inner image
        const taggedImages = document.querySelectorAll('img[srcset]');
        
        if (taggedImages.length > 0) {
            taggedImages.forEach(function (el) {
                addImageToStore(el);
            });
        } else {
            alert('instagram posts dialog images or tagged details images not found');
        }
    }    
})();