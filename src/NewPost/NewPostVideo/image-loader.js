export function load(e) {
    return new Promise((resolve, reject) => {
        console.log("New Image to process!");
        var file = e.data;
        var reader = new FileReader();
        reader.onload = function(e) {
            console.log("Image processed!");
            resolve(e.target.result);
        }
        reader.readAsDataURL(file);
    });
}