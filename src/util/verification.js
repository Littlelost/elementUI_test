export function CKEmail(data) {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    return !reg.test(data)
}

export function CKPass(data) {
    let reg=/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,15}$/;
    return !reg.test(data);
}