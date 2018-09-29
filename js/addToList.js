(function () {
    const dialogImage = document.querySelector('div[role="dialog"] img[srcset]');

    if (dialogImage) {
        const srcsets = dialogImage.getAttribute("srcset").split(",");
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
    } else {
        alert('instagram popup dialog not found');
    }
})();