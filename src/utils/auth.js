export function getcurrentAutority() {

    return ["user"];
}
export function check(authority) {

    const current = getcurrentAutority();
    return current.some(item => authority.includes(item));
}
export function isLogin() {
    const current = getcurrentAutority();
    return current && current[0] !== "guest";

}