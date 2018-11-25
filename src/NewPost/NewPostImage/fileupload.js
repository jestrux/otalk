import axios from 'axios';
import EM from 'EventEmitter';
export let em;
var upload_path = "";
export function Init(el, url) {
    em = new EM();
    upload_path = url;

    el.addEventListener("dragover", FileDragHover, false);
    el.addEventListener("dragleave", FileDragHover, false);
    el.addEventListener("drop", FileSelectHandler, false);
}

function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.type == "dragover")
        e.target.classList.add("hover");
    else
        e.target.classList.remove("hover");
}

function FileSelectHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    FileDragHover(e);

    var files = e.target.files || e.dataTransfer.files;

    if(!files || !files.length)
        return;

    let file = files[0];

    if (file.type.indexOf("image") == -1) {
        em.emit("nonimage", file.name);
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        em.emit("loaded", file, e.target.result);
        UploadFile(file);
    }
    reader.readAsDataURL(file);
}

function UploadFile(file){
    // && file.size <= $id("MAX_FILE_SIZE").value
    // if (xhr.upload && file.type == "image/jpeg") {

    const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
            var per = progressEvent.loaded / progressEvent.total * 100;
            console.log("Progress: ", per);
            em.emit("progress", per);
        }
    }
    var form = new FormData();
    var name = file.name.replace(/ /g, "-");
    var ext = name.split('.').pop()
    form.append('photo', file);
    form.append('name', name);
    form.append('ext', ext);

    axios.post(upload_path, form, config)
        .then(result => {
            const res = result.data;
            const payload = res.success ? res.path : res.msg;
            em.emit("complete", res.success, payload);
        }).catch(() => {
            em.emit("complete", false, "A network or server error occured!");
        });
}