(async function() { 
    // Do lots of things with await
    const results = [];
    await appStore.iterate(function (value, key, iterationNumber) {
        results.push({
            url: value,
            filename: key
        });
    }).then(function () {
        console.log('Iteration has completed');
    }).catch(function (err) {
        console.log('Iteration has error', err);
    });

    if (results.length === 0) {
        alert('There is currently no item in list');
    }

    chrome.runtime.sendMessage(results, function (response) {
        console.log(response); // Logs 'true'
    });
})()