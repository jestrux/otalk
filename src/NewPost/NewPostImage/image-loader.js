/* global createImageBitmap */
function createWorker(f) {
    return new Worker(URL.createObjectURL(new Blob([`(${f})()`])));
}

const worker = createWorker(() => {
    window.self.addEventListener('message', e => {
        var file = e.data;
        var reader = new FileReader();
        reader.onload = function(e) {
            window.self.postMessage({file: file, src: e.target.result});
        }
        reader.readAsDataURL(file);
    });
});

function loadImageWithWorker(file) {
    return new Promise((resolve, reject) => {
        function handler(e) {
            if (e.data.file.name === file.name) {
                worker.removeEventListener('message', handler);
                if (e.data.error) {
                    reject(e.data.error);
                }
                resolve(e.data.bitmap);
            }
        }
        worker.addEventListener('message', handler);
        worker.postMessage(file);
    });
}


const loader = loadImageWithWorker;

export default loader;